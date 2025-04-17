// import Phaser from "phaser";
// import { AnimationModel } from "./AnimationView";
// import { GameState } from "../models/GameState";
// import { TextService } from "../services/TextService";
// import { CardView } from "./CardView";
// import { ContainerView } from "./ContainerView";

// // View không cần biết về controller trực tiếp.
// // Thay vào đó, chúng ta nhận các callback từ controller.
// export class AnswerView {
//     private scene: Phaser.Scene;
//     private state: GameState;
//     private animationModel: AnimationModel;
//     private correctText: Phaser.GameObjects.Text;
//     private incorrectText: Phaser.GameObjects.Text;
//     private answerText: Phaser.GameObjects.Text;
//     private tutorialText: Phaser.GameObjects.Text;
//     private textService: TextService;
//     private containerView: ContainerView;
//     private cardView: CardView;

//     // Callback được truyền vào để xử lý việc cập nhật điểm và tạo câu hỏi mới.
//     private onScoreUpdate: (isCorrect: boolean) => void;
//     private onNewQuestion: () => void;

//     constructor(
//         scene: Phaser.Scene,
//         state: GameState,
//         textService: TextService,
//         containerView: ContainerView,
//         cardView: CardView,
//         onScoreUpdate: (isCorrect: boolean) => void,
//         onNewQuestion: () => void,
//     ) {
//         this.scene = scene;
//         this.state = state;
//         this.textService = textService;
//         this.containerView = containerView;
//         this.cardView = cardView;
//         this.onScoreUpdate = onScoreUpdate;
//         this.onNewQuestion = onNewQuestion;
//         this.animationModel = new AnimationModel(scene);

//         // Khởi tạo UI (ví dụ, tạo text hiển thị)
//         this.correctText = this.scene.add.text(50, 50, "Correct: 0", { fontSize: "24px", color: "#00ff00" });
//         this.incorrectText = this.scene.add.text(50, 80, "Incorrect: 0", { fontSize: "24px", color: "#ff0000" });
//         this.answerText = this.scene.add.text(400, 300, "", { fontSize: "48px", color: "#ffffff" }).setOrigin(0.5);
//         this.tutorialText = this.scene.add.text(400, 350, "Select an answer below.", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
//     }

//     checkAnswer(selected: number): void {
//         // Vô hiệu hóa các nút lựa chọn qua ContainerView (View tự quản lý giao diện)
//         this.containerView.answerButtons.forEach((choice) => choice.btn.disableInteractive());

//         if (selected === this.state.correctAnswer) {
//             // Cập nhật điểm qua callback (do Controller xử lý)
//             this.onScoreUpdate(true);
//             this.correctText.setText(`Correct: ${this.state.correctCount}`);
//             this.answerText.setText(selected.toString());
//             this.tutorialText.setText(this.textService.getSuccessMessage());
//             this.animationModel.playCharacterSuccess();
//             this.animationModel.sparkles.setVisible(true);
//             this.animationModel.playSparkle();
//         } else {
//             this.onScoreUpdate(false);
//             this.incorrectText.setText(`Incorrect: ${this.state.incorrectCount}`);
//             this.answerText.setText(selected.toString());
//             this.tutorialText.setText(this.textService.getFailureMessage());
//             this.animationModel.playCharacterFail();
//         }

//         this.scene.time.delayedCall(1500, () => {
//             this.animationModel.sparkles.setVisible(false);
//             this.answerText.setText("");
//             this.tutorialText.setText("Select an answer below.");
//             this.cardView.dropCardAnimation(() => {
//                 this.animationModel.playCharacterCatch();
//                 this.onNewQuestion();
//             });
//         });
//     }
// }
