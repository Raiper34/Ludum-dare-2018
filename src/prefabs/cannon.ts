import Phaser from 'phaser-ce';

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
        if (this.cursors.left.isDown && this.angle > -90) {
            this.angle -= 5;
        }
        if (this.cursors.right.isDown && this.angle < 0) {
            this.angle += 5;
        }
    }
}
