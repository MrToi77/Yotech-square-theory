import Boot from './scenes/Boot';
import GameOver from './scenes/GameOver';
import MainGame from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { LoadingScene } from './scenes/LoadingScene';
import ABSquareRoot from './scenes/ABSquareRoot';
import ABCSquareRoot from './scenes/ABCSquareRoot';
import GeoEngine from './scenes/GeoEngine';
import Preloader from './scenes/Preloader';
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#ffffff',
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
        LoadingScene,
        Boot,
        GeoEngine

    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
