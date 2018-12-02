import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';
import {Projectile} from '../prefabs/projectile';
import {Wind} from '../prefabs/wind';
import {Human} from '../prefabs/human';
import {CollisionManager} from '../prefabs/collisionManager';
import { Cloud } from '../prefabs/cloud';
import { WallTile } from '../prefabs/wallTile';
import { Enemy } from '../prefabs/enemy';
import { EnemySpawner } from '../prefabs/enemySpawner';
import { ProjectileGenerator } from '../prefabs/projectileGenerator';
import { Config } from '../config';
import { PlayerInfo } from '../playerInfo';
import { throws } from 'assert';

export class Game extends Phaser.State {
    private collisionManager : CollisionManager;
    private wind : Wind;
    private projectileGen : ProjectileGenerator;
    private clouds : Array<Cloud>;
    //private wallTiles : Array<WallTile>;
    private enemySpawners : Array<EnemySpawner>;
    private cursors: Phaser.CursorKeys;
    private spaceKey: Phaser.Key;

    private background: Background;
    private city : City;
    private cloudBackground: Phaser.TileSprite;
    private scoreText : Phaser.BitmapText;
    private healthText : Phaser.BitmapText;
    //private changeTurnText: Phaser.Text;

    public create(): void {
        PlayerInfo.reset();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity = new Phaser.Point(0.0, 100);
        this.collisionManager = new CollisionManager(this.game);

        this.initializeWorld();

        this.wind = new Wind(0, 150);

        this.clouds = new Array<Cloud>();
        for(let i : number = 0; i < 30; ++i) // TODO Fix this magic constant
        {
            this.clouds.push(new Cloud(this.game, this.wind, this.background.getBounds().top, this.background.getBounds().bottom * 0.75));
            this.game.add.existing(this.clouds[this.clouds.length - 1]);
        }

        /*
        this.wallTiles = new Array<WallTile>();
        for(let i : number = 0; i < 5; ++i)
        {
            this.wallTiles = this.wallTiles.concat(this.createWallTower(500, this.background.getBounds().right - 500, 500, 640, 3, 6));
        }

        this.wallTiles.forEach(element => {
            this.game.add.existing(element);
            this.collisionManager.add(element);
        });*/

        this.enemySpawners = new Array<EnemySpawner>();
        this.enemySpawners.push(new EnemySpawner(this.game, this.collisionManager, Config.gameWidth, 0, 2.0, this.city.cannon.position));
        this.enemySpawners.push(new EnemySpawner(this.game, this.collisionManager, 0, 0, 2.0, this.city.cannon.position));
        
        this.projectileGen = new ProjectileGenerator(this.game, this.collisionManager, this.wind);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 

        // INIT GUI
        // ========

        this.healthText = this.game.add.bitmapText(25, 25, 'carrier_command','', 24);
        this.healthText.fixedToCamera = true;

        this.scoreText = this.game.add.bitmapText(25, 60, 'carrier_command','', 24);
        this.scoreText.fixedToCamera = true;

        this.updateGUI();
    }
    

    public update(): void {
        this.cloudBackground.tilePosition.x -= 3;
        this.game.input.update();
        this.collisionManager.update();
        this.enemySpawners.forEach(element => {
            element.update();
        });
        
        this.controlCannon();
        this.updateGUI();
    }

    private updateGUI()
    {
        this.healthText.text = 'Health: ' + PlayerInfo.health;
        this.scoreText.text = 'Score: ' + PlayerInfo.score;
    }

    private controlCannon(): void {
        /*if (this.cursors.up.isDown) {
            this.city.cannon.rotateLeft();
        }
        if (this.cursors.down.isDown) {
            this.city.cannon.rotateRight();
        }*/
       
        this.city.cannon.updateAim();

        if(this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
            this.city.cannon.moveLeft();
        }
        if(this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
            this.city.cannon.moveRight();
        }

        if(this.game.input.activePointer.leftButton.isDown)
        {
            this.city.cannon.fire(this.projectileGen);
        }
    }

    public render(): void {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.city.cannon, 32, 32);
    }

    private initializeWorld(): void {
        this.background = new Background(this.game, 0, 0);
        this.game.add.existing(this.background);
        this.game.world.setBounds(0, 0, this.background.getBounds().right, this.background.getBounds().bottom);

        this.city = new City(this.game, Config.gameWidth / 2, this.background.getBounds().bottom / 2);
        this.game.add.existing(this.city);
        this.city.prepareCity(this.collisionManager);

        this.camera.follow(this.city.cannon);

        /*this.changeTurnText = this.game.add.text(0,0);
        this.changeTurnText.fixedToCamera = true;
        this.changeTurnText.cameraOffset.setTo(this.game.world.camera.width / 2, this.game.world.camera.height / 2);
        this.changeTurnText.anchor.setTo(0.5);*/

        this.cloudBackground = this.game.add.tileSprite(0, 0, this.background.getBounds().right, this.game.world.camera.height, 'cloud_background');
        this.cloudBackground.tileScale.y = 2.0;
    }
}
