import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Mushroom} from '../prefabs/mushroom';
import {Background} from '../prefabs/background';
import {City} from '../prefabs/city';

export class Game extends Phaser.State {
    private mushroom: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private text: Phaser.Text;
    private spaceKey: Phaser.Key;

    private background: Background;
    private player1City: City;
    private player2City: City;

    public create(): void {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Press Arrows / Space', {fill: 'white'});
        this.text.x = this.text.x - ~~(this.text.width * 0.5);

        this.mushroom = new Mushroom(this.game, this.game.world.centerX, this.game.world.centerY);
        this.game.add.existing(this.mushroom);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {
            this.mushroom.x = this.game.world.centerX;
            this.mushroom.y = this.game.world.centerY;
        }, this);
        this.initializeWorld();
    }

    public update(): void {
        this.game.input.update();

        if (this.cursors.down.isDown) {
            this.game.camera.y += 5;
        }
        if (this.cursors.up.isDown) {
            this.game.camera.y -= 5;
        }
        if (this.cursors.left.isDown) {
            this.game.camera.x -= 5;
        }
        if (this.cursors.right.isDown) {
            this.game.camera.x += 5;
        }
    }

    public render(): void {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

    private initializeWorld(): void {
        this.background = new Background(this.game, 0, 0);
        this.game.add.existing(this.background);

        this.player1City = new City(this.game, 0, 0, 1);
        this.game.add.existing(this.player1City);

        this.player2City = new City(this.game, this.background.getBounds().right, 0, 2);
        this.game.add.existing(this.player2City);

        this.game.world.setBounds(this.background.getBounds().left, this.background.getBounds().top, this.background.getBounds().right, this.background.getBounds().bottom);
    }
}
