const left = document.getElementById("left");
const right = document.getElementById("right");
class Controls{
    constructor(){
        this.left = false;
        this.right = false;
        this.special = false;
        this.#addKeyboardListeners();
        this.#addTouchListeners();
    }
    #addKeyboardListeners(){
        document.onkeydown = (event) => {
            switch(event.key){
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case " ":
                    this.special = true;
                    break;
            }
        }
        document.onkeyup = (event) => {
            switch(event.key){
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case " ":
                    this.special = false;
                    break;
            }
        }
    }
    #addTouchListeners(){
        left.ontouchstart = () => {
            this.left = true;
        }
        left.ontouchend = () => {
            this.left = false;
        }
        right.ontouchstart = () => {
            this.right = true;
        }
        right.ontouchend = () => {
            this.right = false;
        }
    }
}