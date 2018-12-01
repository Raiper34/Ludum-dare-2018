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
    private humans : Array<Human>;
    private cursors: Phaser.CursorKeys;
    private spaceKey: Phaser.Key;

    private background: Background;
    private cities: City[] = [];
    private changeTurnText: Phaser.Text;

    private activePlayer: Player = Player.one;
    private activePlayerInControl : boolean = true;

    public create(): void {
        this.initializeWorld();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity = new Phaser.Point(0.0, 100);
        this.collisionManager = new CollisionManager(this.game);

        this.wind = new Wind(0, 150);

        this.humans = new Array<Human>();
        this.humans.push(new Human(10.0, 'human_light'));
        this.humans.push(new Human(20.0, 'human_medium'));
        this.humans.push(new Human(30.0, 'human_heavy'));

        this.projectile = new Projectile(this.game, this.wind);
        this.projectile.onExplodeCallback = new Phaser.Signal();
        this.projectile.onExplodeCallback.add(() => {{
            this.changePlayer();
            this.game.camera.shake(0.05, 100);
        }}, true);
        this.game.add.existing(this.projectile);
        this.collisionManager.add(this.projectile);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {
            let humanIdx : number = Math.floor(Phaser.Math.random(0, this.humans.length));
            this.cities[this.activePlayer].cannon.fire(this.humans[humanIdx], this.projectile);
            this.game.camera.follow(this.projectile);
            this.activePlayerInControl = false;
        }, this);
    }

    public update(): void {
        this.game.input.update();
        this.collisionManager.update();
        if(this.activePlayerInControl)
        {
            this.controlCannon();
        }
    }

    private controlCannon(): void {
        if (this.cursors.left.isDown) {
            this.cities[this.activePlayer].cannon.rotateLeft();
        }
        if (this.cursors.right.isDown) {
            this.cities[this.activePlayer].cannon.rotateRight();
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

        this.changeTurnText = this.game.add.text(0,0);
        this.changeTurnText.fixedToCamera = true;
        this.changeTurnText.cameraOffset.setTo(this.game.world.camera.width / 2, this.game.world.camera.height / 2);
        this.changeTurnText.anchor.setTo(0.5);
    }

    private changePlayer(): void {
        this.activePlayer = this.activePlayer === Player.one ? Player.two : Player.one;
        this.activePlayerInControl = true;
        this.camera.follow(this.cities[this.activePlayer], 0, 0.05, 0.05);
        this.cities[this.activePlayer].cannon.setDefaultAngle();
        this.showChangePlayerText();
        console.log(this.game.world.camera.height);
        console.log(this.game.world.camera.width);
    }

    private showChangePlayerText(): void {
        this.changeTurnText.alpha = 1;
        this.changeTurnText.text = `Player ${this.activePlayer + 1} turn!`;
        this.game.add.tween(this.changeTurnText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
    }
}
