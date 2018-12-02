import Phaser from 'phaser-ce';
import {Human} from './human';
import {Projectile} from './projectile';
import { ProjectileGenerator } from './projectileGenerator';
import { CollisionObject } from './collisionObject';

// NOTE Still ready for two players. No time to clean
// ==================================================

const DEFAULT_ANGLE = 0;
const ROTATION_SPEED = 5;
const MOVE_SPEED = 2;
const FIRE_INTERVAL = 0.5;

const ANGLE_LIMITS = [
    {left: -179 + ROTATION_SPEED, right: ROTATION_SPEED},
    {left: -0, right: 90},
];

const PROJECTILE_DIR: number[] = [1, -1];

export class Cannon extends CollisionObject {
    private lastFireTime : number;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'canon');
        this.initialize();
    }

    private initialize(): void {
        this.anchor.setTo(0.5);
        this.scale.setTo(-1, 1);

        this.checkWorldBounds = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = false;

        this.lastFireTime = this.game.time.totalElapsedSeconds();
    }

    setDefaultAngle(): void {
        this.angle = DEFAULT_ANGLE;
    }

    getAimDirection(): Phaser.Point {
        return new Phaser.Point(Math.cos((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)),
            Math.sin((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)))
            .multiply(PROJECTILE_DIR[0], PROJECTILE_DIR[0]);
    }

    rotateLeft(): void {
        if (this.angle > ANGLE_LIMITS[0].left) {
            this.angle -= ROTATION_SPEED;
        }
    }

    rotateRight(): void {
        if (this.angle < ANGLE_LIMITS[0].right) {
            this.angle += ROTATION_SPEED;
        }
    }

    moveLeft(): void {
        this.x -= MOVE_SPEED;
    }

    moveRight(): void {
        this.x += MOVE_SPEED;
    }

    fire(projectileGenerator : ProjectileGenerator): void {
        if(this.game.time.totalElapsedSeconds() - this.lastFireTime > FIRE_INTERVAL)
        {
            projectileGenerator.generateProjectile(this.x, this.y, this.getAimDirection(), 500.0);
            let fireEffect = this.game.add.audio('fireEffect');
            fireEffect.playOnce = true;
            fireEffect.play();
            this.lastFireTime = this.game.time.totalElapsedSeconds();
        }
    }

    updateAim() : void {
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        if(this.game.input.activePointer.y < this.y)
        {
            this.angle = Phaser.Math.clamp(this.angle, ANGLE_LIMITS[0].left, ANGLE_LIMITS[0].right);
        }
        else
        {
            this.angle = Phaser.Math.clamp(-this.angle, ANGLE_LIMITS[0].left, ANGLE_LIMITS[0].right);
        }
    }
}
