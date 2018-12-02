import Phaser, { Game } from 'phaser-ce';
import { CollisionObject } from './collisionObject';

export class CollisionManager
{
    private objects : Array<CollisionObject>;
    private game : Phaser.Game;

    constructor(game : Phaser.Game) 
    {
        this.game = game;
        this.objects = new Array<CollisionObject>();
    }

    public add(object : CollisionObject)
    {
        this.objects.push(object);
    }

    public update() : void
    {
        this.objects.forEach(element => {
            this.objects.forEach(x => {
                if(element != x)
                {
                    this.game.physics.arcade.overlap(element, x)
                }
            });
        });
    }
}