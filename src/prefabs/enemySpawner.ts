import Phaser from 'phaser-ce';
import { CollisionManager } from './collisionManager';
import { Enemy } from './enemy';

export class EnemySpawner
{
    private minSpeed : number = 100.0;
    private maxSpeed : number = 125.0;
    private endMaxSpeed : number = 200.0;
    private speedIncreaseStep : number = 1;

    private game : Phaser.Game;
    private collManager : CollisionManager;
    private target : Phaser.Point;
    private position : Phaser.Point;
    private spawnRate : number;
    private lastTime : number;

    constructor(game : Phaser.Game, collManager : CollisionManager, x : number, y : number, spawnRate : number, enemyTarget : Phaser.Point)
    {
        this.game = game;
        this.collManager = collManager;
        this.position = new Phaser.Point(x, y);
        this.spawnRate = spawnRate;
        this.target = enemyTarget;

        this.lastTime = this.game.time.totalElapsedSeconds();
    }

    update() : void
    {
        if(this.game.time.totalElapsedSeconds() - this.lastTime > this.spawnRate)
        {
            let newEnemy : Enemy = 
                    new Enemy(this.game, this.position.x, this.position.y, this.target, Phaser.Math.random(this.minSpeed, this.maxSpeed));
            this.game.add.existing(newEnemy);
            this.collManager.add(newEnemy);

            this.lastTime = this.game.time.totalElapsedSeconds();

            if(this.maxSpeed < this.endMaxSpeed)
            {
                this.minSpeed += this.speedIncreaseStep;
                this.maxSpeed += this.speedIncreaseStep;
            }
        }
    }
}