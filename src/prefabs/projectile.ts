import Phaser from 'phaser-ce';
import { Wind } from './wind';

export class Projectile extends Phaser.Sprite 
{
    private wind : Wind;

    constructor(game: Phaser.Game, wind: Wind, initPosition : Phaser.Point, 
        direction : Phaser.Point, speed : number) 
    {
      super(game, initPosition.x, initPosition.y, 'projectile');  

      this.wind = wind;

      this.anchor.setTo(0.5);
      this.game.physics.arcade.enableBody(this);
      this.checkWorldBounds = true;

      this.body.collideWorldBounds = false;
      this.body.allowGravity = true;
      this.body.velocity = direction.normalize().multiply(speed, speed);
    }

    update()
    {
        this.body.velocity.x += this.wind.directionStrength.x * this.game.time.physicsElapsed;
        this.body.velocity.y += this.wind.directionStrength.y * this.game.time.physicsElapsed;

        console.log(this.body.velocity);
    }
}
