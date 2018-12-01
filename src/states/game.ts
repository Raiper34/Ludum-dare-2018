import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Mushroom} from '../prefabs/mushroom';
import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';
import {Projectile} from '../prefabs/projectile';
import { Wind } from '../prefabs/wind';
import { Human } from '../prefabs/human';
import { CollisionManager } from '../prefabs/collisionManager';

export class Game extends Phaser.State {
    private mushroom: Mushroom;
    private collisionManager : CollisionManager;
    private projectile : Projectile;
    private wind : Wind;
    private testHuman : Human;
    private cursors: Phaser.CursorKeys;
    private spaceKey: Phaser.Key;

    private background: Background;
    private player1City: City;
    private player2City: City;

    public create(): void {
        this.initializeWorld();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity = new Phaser.Point(0.0, 100);
        this.collisionManager = new CollisionManager(this.game);

        this.mushroom = new Mushroom(this.game, 100, 100);
        this.game.add.existing(this.mushroom);
        this.collisionManager.add(this.mushroom);

        this.wind = new Wind(0, 150);
        this.testHuman = new Human(10.0, 'projectile');

        this.projectile = new Projectile(this.game, this.wind, this.testHuman, new Phaser.Point(0, this.game.world.centerY), new Phaser.Point(1.0, -1.0), 150.0);
        this.game.add.existing(this.projectile);
        this.game.camera.follow(this.projectile);
        this.collisionManager.add(this.projectile);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {}, this);
    }

    public update(): void {
        this.game.input.update();
        this.collisionManager.update();

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
        this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }

    private initializeWorld(): void {
        this.background = new Background(this.game, 0, 0);
        this.game.add.existing(this.background);
        this.game.world.setBounds(0, 0, this.background.getBounds().right, this.background.getBounds().bottom);

        this.player1City = new City(this.game, 0, this.background.getBounds().bottom / 2, 1);
        this.game.add.existing(this.player1City);

        this.player2City = new City(this.game, this.background.getBounds().right, 0, 2);
        this.game.add.existing(this.player2City);
    }
}
