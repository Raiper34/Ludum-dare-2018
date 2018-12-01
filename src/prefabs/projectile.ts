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
    }

    update() : void
    {
        this.body.velocity.x += (this.wind.directionStrength.x * this.game.time.physicsElapsed) / this.human.weight;
        this.body.velocity.y += (this.wind.directionStrength.y * this.game.time.physicsElapsed) / this.human.weight;

        this.rotation += Math.PI * this.game.time.physicsElapsed;
    }

    public explode() : void
    {
        this.visible = false;
        this.alive = false;
        this.visible = false;
    }

    public fire(human : Human, initPosition : Phaser.Point, direction : Phaser.Point, speed : number)
    {
        this.human = human;
        this.key = human.spriteKey;
        this.x = initPosition.x;
        this.y = initPosition.y;
        this.body.velocity = direction.normalize().multiply(speed, speed);

        this.visible = true;
        this.alive = true;
        this.visible = true;
    }

    public onKilled() : void
    {
        console.log("Projectile object killed.");
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        console.log("collision of: " + sprite1.key +  " and " + sprite2.key);

        this.explode();
    }
}
