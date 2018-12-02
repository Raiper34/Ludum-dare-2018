import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';
import {Projectile} from '../prefabs/projectile';
import { PlayerInfo } from '../playerInfo';

export class Enemy extends CollisionObject
{
    private playerDamage : number = 2;
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

        this.body.velocity.x = d2t.x * this.speed;
        this.body.velocity.y = d2t.y * this.speed;

        if(Phaser.Math.distance(this.target.x, this.target.y, this.x, this.y) < this.distThreshold)
        {
            PlayerInfo.causeDamage(this.playerDamage);
            this.destroy();
        }
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        if(sprite2 == null) { return; }

        if(sprite2 instanceof Projectile)
        {
            ++PlayerInfo.score;

            console.log(PlayerInfo.score);
        }
    } 

}