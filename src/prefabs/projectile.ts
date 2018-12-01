import Phaser from 'phaser-ce';
import { Wind } from './wind';
import { Human } from './human';

export class Projectile extends Phaser.Sprite 
{
    private wind : Wind;
    private human : Human;

    constructor(game: Phaser.Game, wind: Wind, human : Human, initPosition : Phaser.Point, 
        direction : Phaser.Point, speed : number) 
    {
      super(game, initPosition.x, initPosition.y, human.spriteKey);  

      this.wind = wind;
      this.human = human;

      this.anchor.setTo(0.5);
      this.game.physics.arcade.enableBody(this);
      this.checkWorldBounds = true;

      this.body.collideWorldBounds = false;
      this.body.allowGravity = true;
      this.body.velocity = direction.normalize().multiply(speed, speed);
    }

    update()
    {
        this.body.velocity.x += (this.wind.directionStrength.x * this.game.time.physicsElapsed) / this.human.weight;
        this.body.velocity.y += (this.wind.directionStrength.y * this.game.time.physicsElapsed) / this.human.weight;
    }
}
