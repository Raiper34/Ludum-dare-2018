import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';

export class WallTile extends CollisionObject
{
    constructor(game: Phaser.Game, x : number, y : number, allowGravity : boolean = true)
    {
        super(game, x, y, 'wallTile');

        this.checkWorldBounds = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = allowGravity;
    }
}