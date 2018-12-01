import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';

export class Mushroom extends CollisionObject {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'mushroom');

        this.anchor.setTo(0.5);
    }

    update() {
        this.angle += 1;
    }
}
