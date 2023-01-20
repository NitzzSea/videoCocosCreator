import { _decorator, Component, Node, Color, Layout, instantiate, Sprite, Button, game, Label, CCInteger } from 'cc';
import { GameGlobal } from './GameGlobal';
import { GameRules } from './GameRules';
import { ItemColorBox } from './ItemColorBox';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Color) colorBox: Color[] =[];
    @property(Color) colorDefault: Color = null!;

    @property(Node) panelButtonPlay: Node =null!;
    @property(Node) nodeButtonPlay: Node =null!;
    @property(Node) nodeButtonReload: Node =null!;
    @property(Node) nodeLabelHi: Node =null!;
    @property(Node) nodeLabelCurrentScore: Node =null!;

    @property(Node) panelBox: Node =null!;
    @property(Layout) layoutBox: Layout =null!;
    @property(Node) prefabBox: Node =null!;
    @property(Node) prefabParentBox: Node =null!;
    
    @property(Node) drageBox: Node =null!;
    @property(Sprite) spriteBox: Sprite =null!;

    @property(Label) lblValueHIScore: Label =null!;
    @property(Label) lblValueCurrentScore: Label =null!;
    @property(Label) lblValueScore: Label =null!;
    @property(Label) lblValueTimer: Label =null!;

    @property(CCInteger) timeNum : number = 0;

    totalTime : number = 0;

    callbackScheduleTime : any;
    callbackCheckGame : any;

    onLoad() {
        GameGlobal.scrManager = this;
        GameGlobal.gameStop = false;
        this.totalTime = this.timeNum;
    }

    onPlayGame() {
        this.panelButtonPlay.active = false;
        this.nodeButtonPlay.active = false;
        this.createGridBox();
    }


    createGridBox() {
        this.layoutBox.enabled = true;
        this.panelBox.removeAllChildren();
        let arrRow = [];
        let arrColumn = [];

        GameGlobal.listFirstRaw = [];
        for(let i = 0; i < GameGlobal.colomx; i++) {
            GameGlobal.listFirstRaw.push[i];
        } 

        for(let ix = 0; ix < GameGlobal.maxBox; ix++) {
            let parentBox : Node = instantiate(this.prefabParentBox);
            let box : Node = instantiate(this.prefabBox);
            let boxScript : ItemColorBox = parentBox.getComponent(ItemColorBox);
            parentBox!.parent = this.panelBox;
            parentBox!.name = "parentBox_"+ix.toString();
            box!.parent = parentBox;
            box!.name = "box_"+ix.toString();
            
            boxScript.nodeBox = box!;
            boxScript.spriteBox = box!.getComponent(Sprite)!;
            boxScript.idColor = this.RandomColor();
            boxScript.spriteBox.color = this.colorBox[boxScript.idColor];  
            boxScript.idBox = ix;
            boxScript.startEvent();
            boxScript.getSidePos();

            setTimeout(() => {
                boxScript.getDefaultPos();
            }, 20);

            GameGlobal.listParentColorBox.push(parentBox);
            GameGlobal.listColorBox.push(box);
            GameGlobal.listScriptColorBox.push(boxScript);

            // if(ix == GameGlobal.listStartRow.length * GameGlobal.colomx ) GameGlobal.listStartRow.push(ix);

            arrRow.push(ix);
            if(ix == GameGlobal.colomx * (GameGlobal.listColumnLimit.length+1)-1) { //7, 15, 23, 3, 39, 47, 55
                GameGlobal.listColumnLimit.push(ix);
                GameGlobal.listAllRow.push(arrRow);
                arrRow = [];
            }

            if(ix ==  GameGlobal.maxBox - (GameGlobal.colomx - GameGlobal.listRowLimit.length)) { //48,49,50,51,52,53,54,55
                arrColumn = [];
                arrColumn.push(ix)
                for(let aix = 1; aix < GameGlobal.colomy; aix++) {
                    arrColumn.push(ix-(GameGlobal.colomx*(aix)))
                }
                GameGlobal.listRowLimit.push(ix);
                GameGlobal.listAllColumn.push(arrColumn);
            } 
            
            
        }

        setTimeout(() => {
            this.layoutBox.enabled = false; 
            this.RunGameRules(); 
            this.countdownTimer();
        }, 20*GameGlobal.maxBox);
    }
    
    RandomColor() {
        return Math.floor(Math.random()*this.colorBox.length);
    }

    RunGameRules() {
        this. callbackCheckGame = setInterval(() => {
            if(GameGlobal.gameStop) return;
            GameRules.checkSameColor();
        }, 100);
    }

    countdownTimer() {
        this.lblValueTimer.string = this.timeNum.toString();
        console.log("triasss111");
        
        this.callbackScheduleTime = function (){
            this.timeNum--;
            console.log("timenun : "+ this.timeNum);
            this.lblValueTimer.string = this.timeNum.toString();

            if(this.timeNum == 0) {
                this.unschedule(this.callbackScheduleTime)
                this.winGame();
            }
        }
        console.log("triasss222");

        this.schedule(this.callbackScheduleTime, 1);
        console.log("triasss333");
    }

    winGame() {
        GameGlobal.gameStop = true;
        this.panelButtonPlay.active = true;
        this.nodeButtonReload.active = true;
        this.nodeLabelHi.active = true;
        this.nodeLabelCurrentScore.active = true;

        console.log("testttt1 >> "+ GameGlobal.hightScoreValue)
        console.log("testttt2 >> "+ GameGlobal.scoreValue)
        this.lblValueHIScore.string = GameGlobal.hightScoreValue.toString();
        this.lblValueCurrentScore.string = GameGlobal.scoreValue.toString();

       if(GameGlobal.hightScoreValue <= GameGlobal.scoreValue){
            GameGlobal.hightScoreValue = GameGlobal.scoreValue;
       }
       this.cleanGame();
    }

    cleanGame() {
        clearInterval(this.callbackCheckGame);
        GameGlobal.scoreValue= 0;
        this.lblValueScore.string = "0";

        for(let boxScript of GameGlobal.listScriptColorBox){
            boxScript.idColor = -1;
            boxScript.spriteBox.color = GameGlobal.scrManager.colorDefault;
        }
    }

    onReloadGame() {
        GameGlobal.gameStop = false;
        this.panelButtonPlay.active = false;

        this.timeNum = this.totalTime;

        for(let boxScript of GameGlobal.listScriptColorBox){
            boxScript.idColor = GameGlobal.scrManager.RandomColor();
            boxScript.spriteBox.color = GameGlobal.scrManager.colorBox[boxScript.idColor];
        }

        this.RunGameRules(); 
        this.countdownTimer();
    }
}

    


