import Phaser from 'phaser-ce';
import { Wind } from './wind';
import { Human } from './human';
import { CollisionObject } from './collisionObject';
import { Config } from '../config';

export class Projectile extends CollisionObject 
{
    private wind : Wind;
    private scaleSpeed : number = 0.75;
    
    public onExplodeCallback : Phaser.Signal;
    public onFireCallback : Phaser.Signal;

    constructor(game: Phaser.Game, wind: Wind, initPosition : Phaser.Point, direction : Phaser.Point, speed : number) 
    {
      super(game, initPosition.x, initPosition.y, 'human_' + Math.floor(Phaser.Math.random(1, Config.humanCount)));

      this.wind = wind;

      this.anchor.setTo(0.5);
      this.checkWorldBounds = true;
      this.body.collideWorldBounds = false;
      this.body.allowGravity = true;

      this.events.onKilled.add(this.onKilled, this);

      this.scale.x = 0;
      this.scale.y = 0;

      this.body.velocity = direction.normalize().multiply(speed, speed);
      this.setObjectState(true);

      if(this.onFireCallback != null)
      {
        this.onFireCallback.dispatch();
      }
    }

    update() : void
    {
        if(!this.visible) { return; }
        
        this.body.velocity.x += this.wind.directionStrength.x * this.game.time.physicsElapsed;
        this.body.velocity.y += this.wind.directionStrength.y * this.game.time.physicsElapsed;

        this.rotation += Math.PI * this.game.time.physicsElapsed;
        this.scale.x = Phaser.Math.clamp(this.scale.x + this.scaleSpeed * this.game.time.physicsElapsed, 0.0, 1.0);
        this.scale.y = Phaser.Math.clamp(this.scale.y + this.scaleSpeed * this.game.time.physicsElapsed, 0.0, 1.0);

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
        this.scale.x = 0;
        this.scale.y = 0;
        
        if(this.onExplodeCallback != null)
        {
            this.onExplodeCallback.dispatch();
        }

        this.destroy();
    }

    public onKilled() : void
    {
        console.log("Projectile object killed.");
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        if(!this.visible) { return; }
        
        console.log("collision of: " + sprite1.key +  " and " + sprite2.key);

        // TODO replace with enemy
        if(sprite2.key.toString().toLowerCase().includes('walltile'))
        {
            sprite2.destroy();
        }

        this.explode();
    }
}
