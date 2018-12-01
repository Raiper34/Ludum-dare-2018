import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';
import {Loadingbar} from '../helpers/loadingbar';
import { Config } from '../config';

export class Preload extends Phaser.State {

    private loadingBar: Loadingbar;

    public preload(): void {
        this.loadingBar = new Loadingbar(this.game, 100, 15, this.game.width / 2, this.game.height / 2, 0xFFFFFF);

        this.game.load.image('city', 'assets/sprites/city.png');
        this.game.load.image('canon', 'assets/sprites/canon.png');
        this.game.load.image('background', 'assets/sprites/background.png');
        this.game.load.image('cloud_background', 'assets/sprites/cloudBackground.png');

        this.game.load.image('human_light', 'assets/sprites/humanLight.png');
        this.game.load.image('human_medium', 'assets/sprites/humanMedium.png');
        this.game.load.image('human_heavy', 'assets/sprites/humanHeavy.png');

        for(let i : number = 1; i <= Config.cloudCount; ++i)
        {
            this.game.load.image('cloud_' + i, 'assets/sprites/cloud' + i + '.png');
        }
    }
}
