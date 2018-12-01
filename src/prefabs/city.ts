import Phaser from 'phaser-ce';

export class City extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number,
                private playerNumber: number) {
        super(game, x, y, 'city');
        this.initialize();
    }

    initialize(): void {
        const anchorY = this.playerNumber === 2 ? 1 : 0;
        this.anchor.setTo(0, anchorY);
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }
}
