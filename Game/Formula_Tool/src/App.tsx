import { ChangeEvent, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import GeoEngine from './game/scenes/GeoEngine';
import { EdgesData } from './game/types/EdgesDataType';
import EdgeDTO from './game/dtos/EdgeDTO';

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>({game: null, scene: null});
    const [geoEngineScene, setEngineScene] = useState<GeoEngine | null>(null);
    
    // Cạnh
    
    // Chứa cạnh
    const [Edges, EdgeManager] = useState<EdgesData[]>();
    // Cạnh
    const [Edge, SetEdge] = useState<EdgeDTO>();

    function onActiveScene(scene: Phaser.Scene) {
        if (scene instanceof GeoEngine) {
          setEngineScene(scene);
        }
    }

    
    
    
    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {}

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
              
              
            </div>
        </div>
    )
}

export default App
