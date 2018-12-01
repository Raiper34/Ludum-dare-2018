import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';
import {Projectile} from '../prefabs/projectile';
import {Wind} from '../prefabs/wind';
import {Human} from '../prefabs/human';
import {CollisionManager} from '../prefabs/collisionManager';
import {Player} from '../prefabs/player.enum';

export class Game extends Phaser.State {
    private collisionManager : CollisionManager;
    private projectile : Projectile;
    private wind : Wind;
    private testHuman : Human;
    private cursors: Phaser.CursorKeys;
    private spaceKey: Phaser.Key;

    private background: Background;
    private cities: City[] = [];

    private activePlayer: Player = Player.one;

    public create(): void {
        this.initializeWorld();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity = new Phaser.Point(0.0, 100);
        this.collisionManager = new CollisionManager(this.game);

        this.wind = new Wind(0, 150);
        this.testHuman = new Human(10.0, 'projectile');

        this.projectile = new Projectile(this.game, this.wind);
        this.game.add.existing(this.projectile);
        this.collisionManager.add(this.projectile);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {this.changePlayer()}, this);
    }

    public update(): void {
        this.game.input.update();
        this.collisionManager.update();
        this.controlCannon();

        if(this.projectile.visible)
        {
            this.game.camera.follow(this.projectile);
        }
        else
        {
           this.game.camera.follow(this.cities[this.activePlayer]);
        }
    }

    private controlCannon(): void {
        if (this.cursors.left.isDown) {
            this.cities[this.activePlayer].cannon.rotateLeft();
        }
        if (this.cursors.right.isDown) {
            this.cities[this.activePlayer].cannon.rotateRight();
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.F)) {
            this.cities[this.activePlayer].cannon.fire(this.testHuman, this.projectile);
            this.game.camera.follow(this.projectile);
        }


    }

    public render(): void {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.player1City.cannon, 32, 32);
    }

    private initializeWorld(): void {
        this.background = new Background(this.game, 0, 0);
        this.game.add.existing(this.background);
        this.game.world.setBounds(0, 0, this.background.getBounds().right, this.background.getBounds().bottom);

        this.cities[Player.one] = new City(this.game, 0, this.background.getBounds().bottom / 2, Player.one);
        this.game.add.existing(this.cities[Player.one]);
        this.cities[Player.one].prepareCity();

        this.cities[Player.two] = new City(this.game, this.background.getBounds().right, this.background.getBounds().bottom / 2, Player.two);
        this.game.add.existing(this.cities[Player.two]);
        this.cities[Player.two].prepareCity();

        this.camera.follow(this.cities[this.activePlayer]);
    }

    changePlayer(): void {
        this.activePlayer = this.activePlayer === Player.one ? Player.two : Player.one;
        this.camera.follow(this.cities[this.activePlayer]);
        this.cities[this.activePlayer].cannon.setDefaultAngle();
    }
}
