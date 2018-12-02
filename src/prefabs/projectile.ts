import Phaser from 'phaser-ce';
import { Wind } from './wind';
import { Human } from './human';
import { CollisionObject } from './collisionObject';
import { Config } from '../config';
import { Cannon } from './cannon';
import { PlayerInfo } from '../playerInfo';
import { Enemy } from './enemy';

export class Projectile extends CollisionObject 
{
    private playerDamage : number = 1;
    private wind : Wind;
    private scaleSpeed : number = 1.25;
    
    public onExplodeCallback : Phaser.Signal;
    public onFireCallback : Phaser.Signal;

    constructor(game: Phaser.Game, wind: Wind, initPosition : Phaser.Point, direction : Phaser.Point, speed : number) 
    {
      super(game, initPosition.x, initPosition.y, 'human_' + Math.floor(Phaser.Math.random(1, Config.humanCount + 1)));

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
        // TODO Should be better to solve with sth like collision layers
        if(!this.visible ||  sprite1 == null || 
            sprite2 instanceof Projectile)
         { return; }


        // TODO Replace magic constant for fast falling projectiles
        if(sprite2 instanceof Cannon)
        {
            if(this.body.velocity.y > 150)
            {
                this.game.camera.shake(0.02, 100);
                this.game.camera.flash(0xff0000, 500);
                PlayerInfo.causeDamage(this.playerDamage);
                let chEffect = this.game.add.audio('cityHitEffect');
                chEffect.playOnce = true;
                chEffect.play();
            }
            else { return; }
        }

        this.explode();
    }
}
