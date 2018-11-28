import Phaser from 'phaser-ce';

export class Loadingbar {

    private game: Phaser.Game;
    private ladingBorder: Phaser.Graphics;
    private loadingFill: Phaser.Graphics;
    private assetName: Phaser.Text;
    private width: number;
    private height: number;
    private x: number;
    private y: number;
    private color: number;

    constructor(game: Phaser.Game, width: number, height: number, x: number, y: number, color: number) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;

        this.createLadingBorder(this.width, this.height, this.x, this.y);
        this.createLadingFill(this.width, this.height, this.x, this.y, 0);
        this.createAssetText();

        this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.load.onFileComplete.addOnce(this.onFileComplete, this);
    }


    private createLadingBorder(width: number, height: number, x: number, y: number): void {
        const startX = x - width / 2;
        const startY = y - height / 2;
        this.ladingBorder = this.game.add.graphics(0, 0);
        this.ladingBorder.lineStyle(2, this.color, 1);
        this.ladingBorder.drawRect(startX, startY, width, height);
    }

    private createLadingFill(width: number, height: number, x: number, y: number, actualWidth: number): void {
        const startX = x - width / 2;
        const startY = y - height / 2;
        this.loadingFill = this.game.add.graphics(0, 0);
        this.loadingFill.lineStyle(0);
        this.loadingFill.beginFill(this.color, 1);
        this.loadingFill.drawRect(startX, startY, actualWidth, height);
        this.loadingFill.endFill();
    }

    private createAssetText(): void {
        const padding = 10;
        this.assetName = this.game.add.text(this.x, this.y + this.height + padding, '', {
            fill: '#' + ('00000' + (this.color | 0).toString(16)).substr(-6),
            align: 'center',
            fontSize: 16,
        });
        this.assetName.anchor.set(0.5);
    }

    private onFileComplete(progress: number, cacheKey: string, success: boolean, totalLoaded: number, totalFiles: number): void {
        this.update(progress, cacheKey);
    }

    private onLoadComplete(): void {
        this.game.state.start('Game');
    }

    private update(value: number, asset: string = ''): void {
        this.assetName.text = asset;
        const fillWidth = this.width * value / 100;
        this.loadingFill.destroy();
        this.createLadingFill(this.width, this.height, this.x, this.y, fillWidth);
    }

}
