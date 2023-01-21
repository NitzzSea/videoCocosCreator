import { _decorator, Component, Node, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColorManager')
export class ColorManager extends Component {
    @property(Sprite) boxImage :Sprite = null!;

    ChangeColor() {
        this.boxImage.color = new Color(this.RandomNumber(), this.RandomNumber(), this.RandomNumber(), 255);
    }

    RandomNumber() {
        return Math.floor(Math.random()*256) // > 0-255
    }
}


