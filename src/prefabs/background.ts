import Phaser from 'phaser-ce';

export class Background extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'background');
    }
}
