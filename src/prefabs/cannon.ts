import Phaser from 'phaser-ce';

const ANGLE_LIMITS = {
    1: {left: -90, right: 0},
    2: {left: -0, right: 90},
};

export class Cannon extends Phaser.Sprite {

    private cursors: Phaser.CursorKeys;

    constructor(game: Phaser.Game, x: number, y: number, private playerNumber: number) {
        super(game, x, y, 'canon');
        this.initialize();
    }

    initialize(): void {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.anchor.setTo(0.5);
        if (this.playerNumber === 1) {
            this.scale.setTo(-1, 1);
        }
    }

    update(): void {
        if (this.cursors.left.isDown && this.angle > ANGLE_LIMITS[this.playerNumber].left) {
            this.angle -= 5;
        }
        if (this.cursors.right.isDown && this.angle < ANGLE_LIMITS[this.playerNumber].right) {
            this.angle += 5;
        }
    }
}
