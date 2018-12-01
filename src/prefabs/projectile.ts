import Phaser from 'phaser-ce';

export class Projectile extends Phaser.Sprite 
{
    constructor(game: Phaser.Game, initPosition : Phaser.Point, 
        direction : Phaser.Point, speed : number) 
    {
      super(game, initPosition.x, initPosition.y, "projectile");  

      this.anchor.setTo(0.5);
      this.game.physics.arcade.enableBody(this);
      this.checkWorldBounds = true;

      this.body.collideWorldBounds = false;
      this.body.allowGravity = true;
      this.body.velocity = direction.normalize().multiply(speed, speed);
    

    }

    update()
    {

    }
}
