import Phaser from 'phaser-ce';
import {Cannon} from './cannon';

export class City extends Phaser.Sprite {

    private cannon: Cannon;

    constructor(game: Phaser.Game, x: number, y: number,
                private playerNumber: number) {
        super(game, x, y, 'city');
        this.initialize();
    }

    private initialize(): void {
        this.x += this.playerNumber === 2 ? -this.width / 2 : this.width / 2;
        this.y += this.height / 2;
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }

    initializeCannon(): void {
        this.cannon = new Cannon(this.game, this.x, this.y, this.playerNumber);
        this.game.add.existing(this.cannon);
    }
}
