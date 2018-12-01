import Phaser from 'phaser-ce';
import { Wind } from './wind';
import { Config } from '../config';

export class Cloud extends Phaser.Sprite
{
    private wind : Wind;

    constructor(game: Phaser.Game, wind : Wind, minY : number, maxY : number,)
    {
        super(game, 
            Phaser.Math.random(0, game.world.bounds.right), 
            Phaser.Math.random(minY, maxY),
            'cloud_' + Math.round(Phaser.Math.random(1, Config.cloudCount)));

            this.wind = wind;
    }

    update() : void
    {
        this.x += this.wind.directionStrength.x * this.game.time.physicsElapsed;

        if(this.right < 0)
        {
            this.left = this.game.world.bounds.right;
        }
        else if(this.left > this.game.world.bounds.right)
        {
            this.right = 0;
        }
    }
}