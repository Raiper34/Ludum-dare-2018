import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';

export class Enemy extends CollisionObject
{
    private target : Phaser.Point;
    private speed : number;
    private distThreshold : number = 10.0;

    constructor(game: Phaser.Game, x : number, y : number, target : Phaser.Point, speed : number)
    {
        super(game, x, y, 'wallTile'); // TODO REPLACE in the same way as in case of clouds?

        this.target = target;
        this.checkWorldBounds = true;
        this.body.collideWorldBounds = false;
        this.body.allowGravity = false;

        this.speed = speed;
    }

    public update() : void
    {
        let tmp : Phaser.Point = new Phaser.Point(this.target.x, this.target.y);
        let d2t : Phaser.Point = tmp.subtract(this.x, this.y).normalize();

        this.body.velocity.x += d2t.x * this.speed * this.game.time.physicsElapsed;
        this.body.velocity.y += d2t.y * this.speed * this.game.time.physicsElapsed;

        if(Phaser.Math.distance(this.target.x, this.target.y, this.x, this.y) < this.distThreshold)
        {
            this.destroy();
        }
    }
}