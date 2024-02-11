import { _decorator, Component, Node } from 'cc';
import { OPManager } from './OPManager';
const { ccclass, property } = _decorator;

@ccclass('OPGlobal')
export class OPGlobal{
    static listArrayImage1 : number[] = [];
    static listArrayImage2 : number[] = [];
    static listArrayImage3 : number[] = [];

    static listAllArrayImage : any[] = [];
    static listRandomAll : number[] = [];

    static listRandomNumber : number[] = []; //-1 : no insert 0:insert All >0 : random insert

    static numRandom : number = 50;


    static scrManager : OPManager = null!;


    static maxWidh : number = 960;
    static maxHeight : number = 426;


    static setAllArray() {
        this.listAllArrayImage.push(this.listArrayImage1);
        this.listAllArrayImage.push(this.listArrayImage2);
        this.listAllArrayImage.push(this.listArrayImage3);
    }

    static setListRandom() {
        this.listRandomAll = [];
        for( let i in this.listRandomNumber) {
            if(this.listRandomNumber[i] == -1) continue;
            if(this.listRandomNumber[i] == 0) {
                for(let n of this.listAllArrayImage[i]) {
                    this.listRandomAll.push(n);
                }
            }else if(this.listRandomNumber[i] > 0) {
                let iRand;
                for(let n = 0; n < this.listRandomNumber[i]; n++) {
                    iRand = Math.floor(Math.random() * this.listAllArrayImage[i].length);
                    this.listRandomAll.push(this.listAllArrayImage[i][iRand]);
                }
            }
        }

        this.scrManager.setAnimationRandom()
    }
}


