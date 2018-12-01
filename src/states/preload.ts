import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';
import {Loadingbar} from '../helpers/loadingbar';

export class Preload extends Phaser.State {

    private loadingBar: Loadingbar;

    public preload(): void {
        this.loadingBar = new Loadingbar(this.game, 100, 15, this.game.width / 2, this.game.height / 2, 0xFFFFFF);

        this.game.load.image('mushroom', 'assets/sprites/mushroom.png');
        this.game.load.image('city', 'assets/sprites/city.png');
        //this.game.load.image('canon', 'assets/sprites/canon.png');
        this.game.load.image('projectile', 'assets/sprites/projectile.png');
        this.game.load.image('background', 'assets/sprites/background.png');
    }
}
