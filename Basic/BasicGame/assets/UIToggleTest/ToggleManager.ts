import { _decorator, Component, Node, Sprite, Label, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleManager')
export class ToggleManager extends Component {
    @property(Node) nodeThumb : Node = null!;
    @property(Sprite) spriteBg : Sprite = null!;
    @property(Label) labelToggle : Label = null!;
    @property(Color) colorBg : Color[] = []; //0:on, 1 : off

    isOnToggle : boolean = false;

    start() {
        this.labelToggle.string = "OFF";
        this.spriteBg.color = this.colorBg[1];
    }

    setToggle(){
        if(this.isOnToggle) {
            this.isOnToggle = false;
            this.labelToggle.string = "OFF";
            this.spriteBg.color = this.colorBg[1];
        }else {
            this.isOnToggle = true;
            this.labelToggle.string = "ON";
            this.spriteBg.color = this.colorBg[0];
        }

        this.nodeThumb.setPosition((0-this.nodeThumb.position.x),0,0)
    }
}


