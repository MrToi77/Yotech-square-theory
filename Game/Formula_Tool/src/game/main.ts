import Boot from './scenes/Boot';
import GameOver from './scenes/GameOver';
import MainGame from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import Preloader from './scenes/Preloader';
import { AUTO, Game } from 'phaser';
import { PreloadFishing } from './scenes/LoadingScene';
import SquareGridScene from './scenes/TestSquare';
import FormulaProofScene from './scenes/Animation';
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    scene: [
        Boot,
        SquareGridScene

    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
