import { _decorator, Component, Node, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MouseEventManager')
export class MouseEventManager extends Component {

    @property(Node) card1 : Node = null!;
    @property(Node) card2 : Node = null!;
    @property(Node) cardClose : Node = null!;
    @property(Sprite) cardCloseSprite : Sprite = null!;

    start() {
        // its usually for mouse over 
        this.card1.on(Node.EventType.MOUSE_ENTER, (event) => {
            // console.log("Mouse Enter")
            this.card1.setScale(1.2, 1.2);
        })

        this.card1.on(Node.EventType.MOUSE_LEAVE, (event) => {
            // console.log("Mouse leave")
            this.card1.setScale(1, 1);
        })

        //for scroll mouse
        // make card scroll up and down
        this.card2.on(Node.EventType.MOUSE_WHEEL, (event) => {
            // console.log("Mouse Wheel" + event.getScrollY());
            if((event.getScrollY()+0) > 0 ) this.card2.setPosition(this.card2.position.x, this.card2.position.y+2)
            else this.card2.setPosition(this.card2.position.x, this.card2.position.y-2);
        })

        
        this.cardClose.on(Node.EventType.MOUSE_DOWN, (event) => {
            // console.log("Mouse Down");
            this.cardCloseSprite.color = new Color(225, 255, 255, 0);
        })

        this.cardClose.on(Node.EventType.MOUSE_UP, (event) => {
            // console.log("Mouse Up");
            this.cardCloseSprite.color = new Color(225, 255, 255, 255);
        })


    }
}


