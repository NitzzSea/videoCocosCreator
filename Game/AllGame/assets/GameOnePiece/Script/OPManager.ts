import { _decorator, Component, Node, CCInteger, Sprite, resources, SpriteFrame, UITransform, Label } from 'cc';
import { OPGlobal } from './OPGlobal';
import { OPNameCharacter } from './OPNameCharacter';
const { ccclass, property } = _decorator;

@ccclass('OPManager')
export class OPManager extends Component {
    @property(CCInteger) totalImages1 : number = 0;
    @property(CCInteger) totalImages2 : number = 0;
    @property(CCInteger) totalImages3 : number = 0;

    @property(CCInteger) totalTimeAnimate : number = 0;

    @property(Sprite) spriteImageStop : Sprite = null!;
    @property(Sprite) spriteImageRandom : Sprite = null!;

    @property(UITransform) uiTransImageStop : UITransform = null!;
    @property(UITransform) uiTransImageRandom : UITransform = null!;

    @property(Label) nameChar : Label = null!;
    @property(Label) valueNakamaLbl : Label = null!;

    @property(SpriteFrame) arrAllImages : SpriteFrame[] = [];

    valNakama : number = 0;
    timeNum : number = 0;
    decTime : number = 0.1;
    callbackScheduleAnimate : any;
    
    onLoad() {
        let i;
        let idx;
        

        for(let i in this.arrAllImages) {
            idx = Number(i);
            if(idx == 0) continue

            if(idx <= this.totalImages1) {
                OPGlobal.listArrayImage1.push(idx);
            } else if(idx > this.totalImages1 && idx <= this.totalImages2) {
                OPGlobal.listArrayImage2.push(idx);
            } else if(idx > this.totalImages1) {
                OPGlobal.listArrayImage3.push(idx);
            }
        }

        OPGlobal.setAllArray();
    }

    start() {
        OPGlobal.scrManager = this;

        this.spriteImageRandom.node.active = false;
        this.spriteImageStop.node.active = false;
        this.nameChar.node.active = false;
    }

    onRandom1() {
        let iRand = Math.floor(Math.random() * OPGlobal.numRandom);
        if(iRand == 0) iRand = 1;
        let iRand2 = Math.floor(Math.random() * OPGlobal.numRandom);
        if(iRand2 == 0) iRand2 = 1;
        OPGlobal.listRandomNumber = [0, iRand, iRand2];
        OPGlobal.setListRandom();
        this.countNakama();
    }

    onRandom2() {
        let iRand = Math.floor(Math.random() * OPGlobal.numRandom);
        if(iRand == 0) iRand = 1;
        OPGlobal.listRandomNumber = [this.totalImages1/2, 0, iRand];
        OPGlobal.setListRandom();
        this.countNakama();
    }

    onRandom3() {
        let iRand = Math.floor((Math.random() * OPGlobal.numRandom)/2);
        if(iRand == 0) iRand = 1;
        let iRand2 = Math.floor((Math.random() * OPGlobal.numRandom)/2);
        if(iRand2 == 0) iRand2 = 1;
        console.log("=== iRand " + iRand)
        console.log("=== iRand2 " + iRand2)
        OPGlobal.listRandomNumber = [iRand, iRand2, 0];
        OPGlobal.setListRandom();
        this.countNakama();
    }

    setAnimationRandom() {
        this.spriteImageRandom.node.active = true;
        this.spriteImageStop.node.active = false;
        this.nameChar.node.active = false;

        let iRand = Math.floor(Math.random() * OPGlobal.listRandomAll.length);
        let getIdx = OPGlobal.listRandomAll[iRand];

        this.timeNum = this.totalTimeAnimate;

        this.callbackScheduleAnimate = function (){
            this.timeNum -= this.decTime;

            this.spriteImageRandom.spriteFrame = this.arrAllImages[getIdx];
            this.uiTransImageRandom.node.setScale(1, 1, 1);
            if(this.uiTransImageRandom.contentSize.x >= OPGlobal.maxWidh || this.uiTransImageRandom.contentSize.y >= OPGlobal.maxHeight){
                this.uiTransImageRandom.node.setScale(0.5, 0.5, 1);
            }

            iRand = Math.floor(Math.random() * OPGlobal.listRandomAll.length);
            getIdx = OPGlobal.listRandomAll[iRand];

            console.log(getIdx)

            if(this.timeNum <= 0) {
                this.unschedule(this.callbackScheduleAnimate)
                this.setActiveStop(getIdx);
            }
        }

        this.schedule(this.callbackScheduleAnimate, this.decTime);
    }

    setActiveStop(getIdx : number) {
        this.spriteImageRandom.node.active = false;
        this.spriteImageStop.node.active = true;

        this.spriteImageStop.spriteFrame = this.arrAllImages[getIdx];
        this.uiTransImageStop.node.setScale(1, 1, 1);
        if(this.uiTransImageStop.contentSize.x >= OPGlobal.maxWidh || this.uiTransImageStop.contentSize.y >= OPGlobal.maxHeight){
            this.uiTransImageStop.node.setScale(0.5, 0.5, 1);
        }

        this.nameChar.node.active = true;
        this.nameChar.string = OPNameCharacter.listAllName[getIdx]["nameChar"];
    }


    countNakama() {
        this.valNakama++;
        this.valueNakamaLbl.string = this.valNakama.toString();
    }

    onReset() {
        this.valNakama = 0;
        this.valueNakamaLbl.string = this.valNakama.toString();
        
        this.spriteImageRandom.node.active = false;
        this.spriteImageStop.node.active = false;
        this.nameChar.node.active = false;
    }
    
}


