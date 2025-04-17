
export default class TextService{
    private successIndex: number = 0;
    private failIndex: number = 0;
    constructor(){
    }

    getSuccessMessage(): string {
        const messages = ['Good job boy 👍!', 'You are a genius ! 🤓', 'You are a master! 🎉'];
        const message = messages[this.successIndex];
        this.successIndex = (this.successIndex + 1) % messages.length;
        return message;
    }

    getFailureMessage(): string {
        const messages = ['Not quite 🤔 !', 'Try again bro! 😅', 'Really Bro 🙄! '];
        const message = messages[this.failIndex];
        this.failIndex = (this.failIndex + 1) % messages.length;
        return message;
    }

    getInitialMessage(): string{
        return 'Select an answer below'
    }
}