import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Mushroom} from '../prefabs/mushroom';
import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';
import {Projectile} from '../prefabs/projectile';
import {Wind} from '../prefabs/wind';
import {Human} from '../prefabs/human';
import {CollisionManager} from '../prefabs/collisionManager';
import {player} from '../prefabs/player.enum';

export class Game extends Phaser.State {
    private mushroom: Mushroom;
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

        this.mushroom = new Mushroom(this.game, 100, 100);
        this.game.add.existing(this.mushroom);

        this.wind = new Wind(0, 150);
        this.testHuman = new Human(10.0, 'projectile');

        this.projectile = new Projectile(this.game, this.wind);
        this.game.add.existing(this.projectile);
        this.collisionManager.add(this.projectile);

        this.projectile.fire(this.testHuman, new Phaser.Point(0, this.game.world.centerY), new Phaser.Point(1.0, -1.0), 150.0);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {this.changePlayer()}, this);
    }

    public update(): void {
        this.game.input.update();
        this.collisionManager.update();

        if(this.projectile.visible)
        {
            this.game.camera.follow(this.cities[this.activePlayer]);
        }
        else
        {
           // this.game.camera.x = this.player1City.x;
           // this.game.camera.y = this.player1City.y;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.F))
        {
            this.projectile.fire(this.testHuman, new Phaser.Point(0, this.game.world.centerY), new Phaser.Point(1.0, -1.0), 150.0);
        }

        if (this.cursors.down.isDown) {
            this.mushroom.y += 5;
        }
        if (this.cursors.up.isDown) {
            this.mushroom.y -= 5;
        }
        if (this.cursors.left.isDown) {
            this.mushroom.x -= 5;
        }
        if (this.cursors.right.isDown) {
            this.mushroom.x += 5;
        }
    }

    public render(): void {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.spriteInfo(this.mushroom, 300, 300);
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
