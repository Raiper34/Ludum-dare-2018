import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';
import {Projectile} from '../prefabs/projectile';
import {Wind} from '../prefabs/wind';
import {Human} from '../prefabs/human';
import {CollisionManager} from '../prefabs/collisionManager';
import {player} from '../prefabs/player.enum';

export class Game extends Phaser.State {
    private collisionManager : CollisionManager;
    private projectile : Projectile;
    private wind : Wind;
    private testHuman : Human;
    private cursors: Phaser.CursorKeys;
    private spaceKey: Phaser.Key;

    private background: Background;
    private cities: City[] = [];

    private activePlayer: player = player.one;

    public create(): void {
        this.initializeWorld();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity = new Phaser.Point(0.0, 100);
        this.collisionManager = new CollisionManager(this.game);

        this.wind = new Wind(0, 150);
        this.testHuman = new Human(10.0, 'projectile');

        this.projectile = new Projectile(this.game, this.wind);
        this.projectile.onExplodeCallback = new Phaser.Signal();
        this.projectile.onExplodeCallback.add(() => {this.changePlayer()}, true);
        this.game.add.existing(this.projectile);
        this.collisionManager.add(this.projectile);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {this.changePlayer()}, this);
    }

    public update(): void {
        this.game.input.update();
        this.collisionManager.update();

        if(this.projectile.visible)
        {
            this.game.camera.follow(this.projectile);
        }
        else
        {
           this.game.camera.x = this.cities[this.activePlayer].x;
           this.game.camera.y = this.cities[this.activePlayer].y;
        }

        this.cities[this.activePlayer].updateCity(this.testHuman, this.projectile);
    }

    public render(): void {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.player1City.cannon, 32, 32);
    }

    private initializeWorld(): void {
        this.background = new Background(this.game, 0, 0);
        this.game.add.existing(this.background);
        this.game.world.setBounds(0, 0, this.background.getBounds().right, this.background.getBounds().bottom);

        this.cities[player.one] = new City(this.game, 0, this.background.getBounds().bottom / 2, player.one);
        this.game.add.existing(this.cities[player.one]);
        this.cities[player.one].prepareCity();

        this.cities[player.two] = new City(this.game, this.background.getBounds().right, this.background.getBounds().bottom / 2, player.two);
        this.game.add.existing(this.cities[player.two]);
        this.cities[player.two].prepareCity();
    }

    changePlayer(): void {
        this.activePlayer = this.activePlayer === player.one ? player.two : player.one;
        this.camera.follow(this.cities[this.activePlayer]);
        this.cities[this.activePlayer].cannon.setDefaultAngle();
    }
}
