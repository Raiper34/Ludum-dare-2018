import Phaser from 'phaser-ce';
import {Player} from './player.enum';
import {Human} from './human';
import {Projectile} from './projectile';

// NOTE Still ready for two players. No time to clean

const DEFAULT_ANGLE = 0;
const ROTATION_SPEED = 5;

const ANGLE_LIMITS = [
    {left: -179 + ROTATION_SPEED, right: ROTATION_SPEED},
    {left: -0, right: 90},
];

const PROJECTILE_DIR: number[] = [1, -1];

export class Cannon extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number, private playerNumber: Player) {
        super(game, x, y, 'canon');
        this.initialize();
    }

    private initialize(): void {
        this.anchor.setTo(0.5);
        if (this.playerNumber === Player.one) {
            this.scale.setTo(-1, 1);
        }
    }

    setDefaultAngle(): void {
        this.angle = DEFAULT_ANGLE;
    }

    getAimDirection(): Phaser.Point {
        return new Phaser.Point(Math.cos((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)),
            Math.sin((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)))
            .multiply(PROJECTILE_DIR[this.playerNumber], PROJECTILE_DIR[this.playerNumber]);
    }

    rotateLeft(): void {
        if (this.angle > ANGLE_LIMITS[this.playerNumber].left) {
            this.angle -= ROTATION_SPEED;
        }
    }

    rotateRight(): void {
        if (this.angle < ANGLE_LIMITS[this.playerNumber].right) {
            this.angle += ROTATION_SPEED;
        }
    }

    fire(human: Human, projectile: Projectile): void {
        projectile.fire(human, new Phaser.Point(this.x, this.y), this.getAimDirection(), 500.0);
    }
}
