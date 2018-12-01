import Phaser from 'phaser-ce';
import { Wind } from './wind';
import { Human } from './human';
import { CollisionObject } from './collisionObject';

export class Projectile extends CollisionObject 
{
    private wind : Wind;
    private human : Human;

    constructor(game: Phaser.Game, wind: Wind) 
    {
      super(game, 0, 0, 'projectile');  // Default sprite used at the beginning

      this.wind = wind;

      this.anchor.setTo(0.5);
      this.checkWorldBounds = true;
      this.body.collideWorldBounds = false;
      this.body.allowGravity = true;

      this.events.onKilled.add(this.onKilled, this);

      this.setObjectState(false);
    }

    update() : void
    {
        if(!this.visible) { return; }
        
        this.body.velocity.x += (this.wind.directionStrength.x * this.game.time.physicsElapsed) / this.human.weight;
        this.body.velocity.y += (this.wind.directionStrength.y * this.game.time.physicsElapsed) / this.human.weight;

        this.rotation += Math.PI * this.game.time.physicsElapsed;

        if(this.y > this.game.world.bounds.bottom)
        {
            this.explode();
        }
    }

    private setObjectState(state : boolean) : void
    {
        this.visible = state;
        this.alive = state;
    }

    public explode() : void
    {
        this.setObjectState(false);
    }

    public fire(human : Human, initPosition : Phaser.Point, direction : Phaser.Point, speed : number)
    {
        this.human = human;
        this.key = human.spriteKey;
        this.x = initPosition.x;
        this.y = initPosition.y;
        this.body.velocity = direction.normalize().multiply(speed, speed);

        this.setObjectState(true);
    }

    public onKilled() : void
    {
        console.log("Projectile object killed.");
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        if(!this.visible) { return; }
        
        console.log("collision of: " + sprite1.key +  " and " + sprite2.key);

        this.explode();
    }
}
