import Phaser from 'phaser-ce';
import { Projectile } from './projectile';
import { CollisionManager } from './collisionManager';
import { Wind } from './wind';

export class ProjectileGenerator
{
    private game : Phaser.Game;
    private collManager : CollisionManager;
    private wind : Wind;

    constructor(game : Phaser.Game, collManager : CollisionManager, wind : Wind)
    {
        this.game = game;
        this.collManager = collManager;
        this.wind = wind;
    }

    public generateProjectile(x : number, y : number, direction : Phaser.Point, speed : number) : Projectile
    {
        let newProjectile = new Projectile(this.game, this.wind, new Phaser.Point(x, y), direction, speed);
        
        newProjectile.onExplodeCallback = new Phaser.Signal();
        newProjectile.onExplodeCallback.add(() => {{
            this.game.camera.shake(0.05, 100);
        }}, true);
        
        this.game.add.existing(newProjectile);
        this.collManager.add(newProjectile);

        return newProjectile;
    }
}