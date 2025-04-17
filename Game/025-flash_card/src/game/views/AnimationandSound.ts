import BaseView from "../mct_common/BaseView";
import CharacterDTO from "../DTOs/CharacterDTO";
const FRAME_RATE: number = 7;
export default class CharacterView extends BaseView {
    private characterData: CharacterDTO;
    public character!: Phaser.GameObjects.Sprite;
    public initial!: Phaser.Sound.BaseSound;
    public failure!: Phaser.Sound.BaseSound;
    public catch!: Phaser.Sound.BaseSound;
    public success!: Phaser.Sound.BaseSound;
    public sparkle!: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, characterData: CharacterDTO) {
        super(scene);
        this.characterData = characterData;
        this.initialCharacter();
        this.createAnimations();
        this.setViewPosition(characterData.positionX, characterData.positionY);
        scene.add.existing(this);
    }

    private initialCharacter(): void {
        this.character = this.scene.add
            .sprite(0, 0, this.characterData.texture)
            .setOrigin(0.5, 0.5).setDepth(2);
        this.sparkle = this.scene.add.sprite(385, 680, 'sparkle');
        this.initial = this.scene.sound.add("initial");
        this.failure = this.scene.sound.add("failure");
        this.catch = this.scene.sound.add("catch");
        this.success = this.scene.sound.add("success");
        this.add(this.character);
    }

    private createAnimations(): void {
        this.scene.anims.create({
            key: "character-success",
            frames: [
                { key: "characters", frame: 0 },
                { key: "characters", frame: 7 },
                { key: "characters", frame: 8 },
            ],
            frameRate: FRAME_RATE,
            repeat: 0,
        });

        this.scene.anims.create({
            key: "character-fail",
            frames: [
                { key: "characters", frame: 5 },
                { key: "characters", frame: 6 },
            ],
            frameRate: FRAME_RATE,
            repeat: 0,
        });

        this.scene.anims.create({
            key: "character-catch",
            frames: [
                { key: "characters", frame: 3 },
                { key: "characters", frame: 4 },
                { key: "characters", frame: 2 },
                { key: "characters", frame: 1 },
                { key: "characters", frame: 0 },
            ],
            frameRate: FRAME_RATE,
            repeat: 0,
        });

        this.scene.anims.create({
            key: "character-wait",
            frames: [
                { key: "characters", frame: 4 },
                { key: "characters", frame: 3 },
            ],
            frameRate: FRAME_RATE,
            repeat: 0,
        });

        this.scene.anims.create({
            key: "sparkle",
            frames: this.scene.anims.generateFrameNumbers("sparkle", {
                start: 0,
                end: 8,
            }) as Phaser.Types.Animations.AnimationFrame[],
            frameRate: FRAME_RATE,
            repeat: -1,
        });
    }
}
