import { _decorator, Component, Node, Layers, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('labelManager')
export class labelManager extends Component {
    @property(Node) testLabel : Node = null;
    @property(Node) parentForLabel : Node = null;

    start() {
        this.testLabel = new Node;
        this.testLabel.name = "testLabel";
        this.testLabel.layer = Layers.Enum.UI_2D;
        this.testLabel.setPosition(new Vec3(-300, 100))
        let lblTest = this.testLabel.addComponent(Label);
        lblTest.string = "Test Done";
        lblTest.fontSize = 80;
        lblTest.lineHeight = 80;
        lblTest.horizontalAlign= 2;
        lblTest.verticalAlign= 2;
        lblTest.overflow = 3;
        lblTest.enableWrapText = false;
        lblTest.cacheMode = 1;
        lblTest.isBold = true;
        lblTest.isItalic = true;
        lblTest.isUnderline = true;

        this.parentForLabel.addChild(this.testLabel);

    }
}


