import Phaser from 'phaser-ce';

export class Background extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'background');
        this.initialize();
    }

    initialize(): void {
        this.anchor.setTo(0, 0.5);
    }
}
