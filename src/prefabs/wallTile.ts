import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';

export class WallTile extends CollisionObject
{
    constructor(game: Phaser.Game, x : number, y : number)
    {
        super(game, x, y, 'wallTile');

        this.checkWorldBounds = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = true;
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        console.log("wall died!");
        //this.destroy();
    }
}