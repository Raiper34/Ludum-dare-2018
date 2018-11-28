import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import {Mushroom} from '../prefabs/mushroom';

export class Game extends Phaser.State {
    private mushroom: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private text: Phaser.Text;
    private spaceKey: Phaser.Key;

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
    }

    public update(): void {
        this.game.input.update();

        if (this.cursors.down.isDown) {
            this.mushroom.position.y++;
        }
        if (this.cursors.up.isDown) {
            this.mushroom.position.y--;
        }
        if (this.cursors.left.isDown) {
            this.mushroom.position.x--;
        }
        if (this.cursors.right.isDown) {
            this.mushroom.position.x++;
        }
    }
}
