import Phaser from 'phaser-ce';
import { CollisionObject } from './collisionObject';
import {Projectile} from '../prefabs/projectile';
import { PlayerInfo } from '../playerInfo';
import { Config } from '../config';
import { Cannon } from './cannon';

export class Enemy extends CollisionObject
{
    private playerDamage : number = 2;
    private target : Phaser.Point;
    private speed : number;

    constructor(game: Phaser.Game, x : number, y : number, target : Phaser.Point, speed : number)
    {
        super(game, x, y, 'wallTile'); // TODO REPLACE in the same way as in case of clouds?

        this.target = target;
        this.checkWorldBounds = true;
        this.body.collideWorldBounds = false;
        this.body.allowGravity = false;

        this.speed = speed;
    }

    public update() : void
    {
        let tmp : Phaser.Point = new Phaser.Point(this.target.x, this.target.y);
        tmp.subtract(this.x, this.y);
        let d2t : Phaser.Point = new Phaser.Point(tmp.x, tmp.y).normalize();

        this.body.velocity.x = d2t.x * this.speed;
        this.body.velocity.y = d2t.y * this.speed;
    }

    protected onCollisionEnter(sprite1 : Phaser.Sprite, sprite2 : Phaser.Sprite) : void
    {
        if(sprite2 == null) { return; }

        let shouldBeDestroyed : boolean = false;

        if(sprite2 instanceof Projectile)
        {
            ++PlayerInfo.score;
            let hitEffect = this.game.add.audio('enemyHitSound');
            hitEffect.playOnce = true;
            hitEffect.play();

            let emitter = this.game.add.emitter(this.x, this.y, 15);

            emitter.makeParticles('explosion_small');
            emitter.gravity = this.game.physics.arcade.gravity;
            emitter.start(true, 0, null, 15);
            this.game.time.events.add(5000, () => { emitter.destroy(); }, this);

            shouldBeDestroyed = true;
            
        }
        else if(sprite2 instanceof Cannon)
        {
            // NOTE BAD CODE! If this is edited, projectile.onCollisionEnter should be as well
            this.game.camera.shake(0.02, 100);
            this.game.camera.flash(0xff0000, 500);
            PlayerInfo.causeDamage(this.playerDamage);
            let chEffect = this.game.add.audio('cityHitEffect');
            chEffect.playOnce = true;
            chEffect.play();

            shouldBeDestroyed = true;
        }

        if(shouldBeDestroyed)
        {
            this.destroy();
        }
    } 

}