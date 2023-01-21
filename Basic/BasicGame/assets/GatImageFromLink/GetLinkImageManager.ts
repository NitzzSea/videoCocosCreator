import { _decorator, Component, Node, assetManager, ImageAsset, SpriteFrame, Layers, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GetLinkImageManager')
export class GetLinkImageManager extends Component {
    @property(Node) parentNode : Node= null!;
    photo_url : string = "";

    start() {
        this.getImageUrl();
    }

    getImageUrl() {
        assetManager.loadRemote<ImageAsset>(this.photo_url, (err, imageAsset) => {
            const spriteFrame = SpriteFrame.createWithImage(imageAsset);
        
            const newNode = new Node()
        
            // add new Sprite component
            newNode.layer = Layers.Enum.UI_2D
            newNode.addComponent(Sprite)
            const sprite = newNode.getComponent(Sprite)
        
            // assign sprite frame to the new Sprite Node
            sprite.spriteFrame = spriteFrame
        
            // set node content size
            const newNodeTransform = newNode.getComponent(UITransform)
            newNodeTransform.setContentSize(200, 200)
        
            // add to other node
            this.parentNode.parent.addChild(newNode)
        });
    }
}


