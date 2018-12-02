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

        for(let i : number = 1; i <= Config.cloudCount; ++i)
        {
            this.game.load.image('cloud_' + i, 'assets/sprites/cloud' + i + '.png');
        }

        for(let i : number = 1; i <= Config.humanCount; ++i)
        {
            this.game.load.image('human_' + i, 'assets/sprites/human' + i + '.png');
        }

        this.game.load.image('wallTile', 'assets/sprites/wallTile.png');
    }
}
