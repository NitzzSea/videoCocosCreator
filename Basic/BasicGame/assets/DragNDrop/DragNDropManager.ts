import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DragNDropManager')
export class DragNDropManager extends Component {
    @property(Node) nodeImage :Node = null!;

    onLoad() {
        this.nodeImage.on(Node.EventType.TOUCH_MOVE, (event : EventTouch) => {
            let loc = event.getLocation();

            this.nodeImage.setWorldPosition(new Vec3(loc.x, loc.y));
        })

        this.nodeImage.on(Node.EventType.TOUCH_END, (event : EventTouch) => {
            this.setDefaultPosition();
        })

        this.nodeImage.on(Node.EventType.TOUCH_CANCEL, (event : EventTouch) => {
            this.setDefaultPosition();
        })
    }


    setDefaultPosition() {
        this.nodeImage.setPosition(Vec3.ZERO);
    }
}


