import Phaser from 'phaser-ce';
import {Cannon} from './cannon';
import {Human} from '../prefabs/human';
import {player} from './player.enum';
import {Projectile} from '../prefabs/projectile';

const INITIAL_PEOPLE_COUNT = 1000;

export class City extends Phaser.Sprite {

    public cannon: Cannon;
    private peopleCount: number = INITIAL_PEOPLE_COUNT;
    private peopleCountText: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number,
                private playerNumber: player) {
        super(game, x, y, 'city');
        this.initialize();
    }

    private initialize(): void {
        this.x += this.playerNumber === player.two ? -this.width / 2 : this.width / 2;
        this.y += this.height / 2;
        this.anchor.setTo(0.5);

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }

    public prepareCity(): void {
        this.cannon = new Cannon(this.game, this.x, this.y, this.playerNumber);
        this.game.add.existing(this.cannon);

        const textOffset = 150;
        this.peopleCountText = this.game.add.text(this.x, this.y - textOffset, ``);
        this.peopleCountText.anchor.set(0.5);
        this.setPeopleCount(INITIAL_PEOPLE_COUNT);
    }

    public updateCity(human : Human, projectile : Projectile) : void
    {
        this.cannon.updateAim(human, projectile);
    }

    public setPeopleCount(peopleCount: number): void {
        this.peopleCount = peopleCount;
        this.peopleCountText.text = `People: ${this.peopleCount}`
    }

    public getPeopleCount(): number {
        return this.peopleCount;
    }
}
