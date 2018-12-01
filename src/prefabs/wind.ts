import Phaser from 'phaser-ce';

export class Wind
{
    private minStrength : number;
    private maxStrength : number;
    
    public directionStrength : Phaser.Point;

    constructor(minStrength : number, maxStrength: number)
    {
        this.minStrength = minStrength;
        this.maxStrength = maxStrength;

        this.computeNewDirection();
    }

    computeNewDirection() : void
    {
        const direction = 
            new Phaser.Point(Math.random() < 0.5 ? -1.0 : 1.0, 0.0);
        const strength = Math.random() * (this.maxStrength - this.minStrength) + this.minStrength;
        
        this.directionStrength = direction.multiply(strength, strength);
    }
}