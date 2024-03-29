import Phaser, { Sprite } from 'phaser-ce';

export abstract class CollisionObject extends Phaser.Sprite
{
    constructor(game: Phaser.Game, x : number, y: number, key : string)
    {
        super(game, x, y, key);

        this.game.physics.arcade.enableBody(this);
        
        this.body.onCollide = new Phaser.Signal();
        this.body.onOverlap = new Phaser.Signal();

        this.body.onCollide.add(this.onCollisionEnter, this);
        this.body.onOverlap.add(this.onCollisionEnter, this);
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        
    }
}