import Phaser from 'phaser-ce';
import {player} from './player.enum';
import {Human} from '../prefabs/human';
import {Projectile} from '../prefabs/projectile';

const DEFAULT_ANGLE = 0;

const ANGLE_LIMITS = [
    {left: -90, right: 0},
    {left: -0, right: 90},
];

const PROJECTILE_DIR : number[] = [1, -1];

export class Cannon extends Phaser.Sprite {

    private cursors: Phaser.CursorKeys;
    
    constructor(game: Phaser.Game, x: number, y: number, private playerNumber: player) {
        super(game, x, y, 'canon');
        this.initialize();
    }

    initialize(): void {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.anchor.setTo(0.5);
        if (this.playerNumber === player.one) {
            this.scale.setTo(-1, 1);
        }
    }

    setDefaultAngle(): void {
        this.angle = DEFAULT_ANGLE;
    }

    getAimDirection() : Phaser.Point
    {
        return new Phaser.Point(Math.cos((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)), 
                                Math.sin((Math.PI / 180.0) * (this.angle - DEFAULT_ANGLE)))
                                .multiply(PROJECTILE_DIR[this.playerNumber], PROJECTILE_DIR[this.playerNumber]);
    }

    updateAim(human : Human, projectile : Projectile): void {
        if (this.cursors.left.isDown && this.angle > ANGLE_LIMITS[this.playerNumber].left) {
            this.angle -= 5;
        }
        if (this.cursors.right.isDown && this.angle < ANGLE_LIMITS[this.playerNumber].right) {
            this.angle += 5;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.F))
        {
            projectile.fire(human, new Phaser.Point(this.x, this.y), this.getAimDirection(), 500.0);
        }
    }
}
