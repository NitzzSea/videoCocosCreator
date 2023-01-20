import { _decorator, Component, Node, Vec3, EventTouch, Sprite, CCInteger, game, Color } from 'cc';
import { GameGlobal } from './GameGlobal';
const { ccclass, property } = _decorator;

@ccclass('ItemColorBox')
export class ItemColorBox extends Component {
    @property(Node) nodeBox: Node =null!;
    @property(Sprite) spriteBox: Sprite =null!;

    @property(CCInteger) idBox: number =-1;
    @property(CCInteger) idColor: number =-1;
    @property(CCInteger) leftId: number = -1;
    @property(CCInteger) rightId: number = -1;
    @property(CCInteger) topId: number = -1;
    @property(CCInteger) bottomId: number = -1;

    defaultPos : Vec3 = null!;
    defaultWorldPos : Vec3 = null!;
    

    startEvent() {
        this.nodeBox.on(Node.EventType.TOUCH_MOVE, (event : EventTouch)=>{
            let loc = event.getUILocation();

            if(!GameGlobal.scrManager.drageBox.active) {
                GameGlobal.scrManager.drageBox.active = true;
                GameGlobal.scrManager.spriteBox.color = this.spriteBox.color;
                this.spriteBox.color = new Color(this.spriteBox.color.r, this.spriteBox.color.g, this.spriteBox.color.b, 1);
            }
            
            GameGlobal.scrManager.drageBox.setWorldPosition(new Vec3(loc.x, loc.y, 0));

            if(loc.x > (this.defaultWorldPos.x+GameGlobal.widthBox*0.5) && this.rightId == -1) this.setDefaultPos()
            if(loc.x < (this.defaultWorldPos.x-GameGlobal.widthBox*0.5) && this.leftId == -1) this.setDefaultPos()
            if(loc.y > (this.defaultWorldPos.y+GameGlobal.heightBox*0.5) && this.topId == -1) this.setDefaultPos()
            if(loc.y < (this.defaultWorldPos.y-GameGlobal.heightBox*0.5) && this.bottomId == -1) this.setDefaultPos()

            
        })

        this.nodeBox.on(Node.EventType.TOUCH_END, (event : EventTouch)=>{
            this.setDefaultPos()
        })

        this.nodeBox.on(Node.EventType.TOUCH_CANCEL, (event : EventTouch)=>{
            let loc = event.getUILocation();

            this.setDefaultPos();
            // console.log("loc x >> ", loc.x);
            // console.log("loc y >> ", loc.y);
            // console.log("this.defaultWorldPos.x+GameGlobal.widthBox*0.5 >> ", (this.defaultWorldPos.x+GameGlobal.widthBox*0.5));
            // console.log("this.defaultWorldPos.x-GameGlobal.widthBox*0.5 >> ", (this.defaultWorldPos.x-GameGlobal.widthBox*0.5));
            // console.log("this.defaultWorldPos.y+GameGlobal.heightBox*0.5 >> ", (this.defaultWorldPos.y+GameGlobal.heightBox*0.5));
            // console.log("this.defaultWorldPos.y-GameGlobal.heightBox*0.8 >> ", (this.defaultWorldPos.y-GameGlobal.heightBox*0.8));

            // console.log("this.defaultWorldPos.x+(GameGlobal.widthBox*1.5) >> ", (this.defaultWorldPos.x+(GameGlobal.widthBox*1.5)));
            // console.log("this.defaultWorldPos.x-(GameGlobal.widthBox*1.5) >> ", (this.defaultWorldPos.x-(GameGlobal.widthBox*1.5)));
            // console.log("this.defaultWorldPos.y+(GameGlobal.widthBox*1.5) >> ", (this.defaultWorldPos.y+(GameGlobal.widthBox*1.5)));
            // console.log("this.defaultWorldPos.y-(GameGlobal.widthBox*1.5) >> ", (this.defaultWorldPos.y-(GameGlobal.widthBox*1.5)));

            if(loc.x > (this.defaultWorldPos.x+GameGlobal.widthBox*0.5) && this.rightId == -1) return;
            if(loc.x < (this.defaultWorldPos.x-GameGlobal.widthBox*0.5) && this.leftId == -1) return;
            if(loc.y > (this.defaultWorldPos.y+GameGlobal.heightBox*0.5) && this.topId == -1) return;
            if(loc.y < (this.defaultWorldPos.y-GameGlobal.heightBox*0.8) && this.bottomId == -1) return;

            if(loc.x >= (this.defaultWorldPos.x+GameGlobal.widthBox*0.5) && loc.x < (this.defaultWorldPos.x+(GameGlobal.widthBox*1.5))) this.changePosRight()
            else if(loc.x < (this.defaultWorldPos.x-GameGlobal.widthBox*0.5) && loc.x > (this.defaultWorldPos.x-(GameGlobal.widthBox*1.5))) this.changePosLeft()
            else if(loc.y > (this.defaultWorldPos.y+GameGlobal.heightBox*0.5) && loc.y < (this.defaultWorldPos.y+(GameGlobal.widthBox*1.5))) this.changePosTop()
            else if(loc.y < (this.defaultWorldPos.y-GameGlobal.heightBox*0.8)&& loc.y > (this.defaultWorldPos.y-(GameGlobal.widthBox*1.5))) this.changePosBottom()
        })
    }

    setDefaultPos() {
        // this.nodeBox.setPosition(this.defaultPos);
        // this.nodeBox.active = true;
        this.spriteBox.color = new Color(this.spriteBox.color.r, this.spriteBox.color.g, this.spriteBox.color.b, 255);
        GameGlobal.scrManager.drageBox.active = false;
    }

    changePosRight() {
        let nextIdcolor = GameGlobal.listScriptColorBox[this.rightId].idColor;
        
        GameGlobal.listScriptColorBox[this.rightId].spriteBox.color = this.spriteBox.color;
        GameGlobal.listScriptColorBox[this.rightId].idColor = this.idColor;
        this.spriteBox.color = GameGlobal.scrManager.colorBox[nextIdcolor];;
        this.idColor = nextIdcolor;
    }

    changePosLeft() {
        let nextIdcolor = GameGlobal.listScriptColorBox[this.leftId].idColor;
        
        GameGlobal.listScriptColorBox[this.leftId].spriteBox.color = this.spriteBox.color;
        GameGlobal.listScriptColorBox[this.leftId].idColor = this.idColor;
        this.spriteBox.color = GameGlobal.scrManager.colorBox[nextIdcolor];;
        this.idColor = nextIdcolor;
    }

    changePosTop() {
        let nextIdcolor = GameGlobal.listScriptColorBox[this.topId].idColor;
        
        GameGlobal.listScriptColorBox[this.topId].spriteBox.color = this.spriteBox.color;
        GameGlobal.listScriptColorBox[this.topId].idColor = this.idColor;
        this.spriteBox.color = GameGlobal.scrManager.colorBox[nextIdcolor];;
        this.idColor = nextIdcolor;
    }

    changePosBottom() {
        let nextIdcolor = GameGlobal.listScriptColorBox[this.bottomId].idColor;
        
        GameGlobal.listScriptColorBox[this.bottomId].spriteBox.color = this.spriteBox.color;
        GameGlobal.listScriptColorBox[this.bottomId].idColor = this.idColor;
        this.spriteBox.color = GameGlobal.scrManager.colorBox[nextIdcolor];;
        this.idColor = nextIdcolor;
    }

    getSidePos(){
        this.setDefaultSidePos();

        //top
        if(this.idBox >= GameGlobal.colomx) this.topId = this.idBox-GameGlobal.colomx;

        //bottom
        if(this.idBox < (GameGlobal.colomy**2)-1 ) this.bottomId = this.idBox+GameGlobal.colomx;

        //left
        if(this.idBox > 0) {
            if(this.idBox < GameGlobal.colomx) this.leftId= this.idBox-1;
            else if((this.idBox % GameGlobal.colomx > 0)) this.leftId= this.idBox-1;
        }

        //right
        if(((this.idBox+1) % GameGlobal.colomx > 0)) this.rightId= this.idBox+1;
    }

    getDefaultPos() {
        this.defaultPos = this.nodeBox.getPosition();
        this.defaultWorldPos = this.nodeBox.getWorldPosition();
    }

    setDefaultSidePos() {
        this.leftId= -1;
        this.rightId= -1;
        this.topId= -1;
        this.bottomId= -1;
    }
    
}


