import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
import { ItemColorBox } from './ItemColorBox';
const { ccclass, property } = _decorator;

@ccclass('GameGlobal')
export class GameGlobal {
    //#region  var Global
    static maxBox : number = 56;
    static colomx : number = 8;
    static colomy : number = 7;
    static listParentColorBox : Node[] = [];
    static listColorBox : Node[] = [];
    static listScriptColorBox : ItemColorBox[] = [];
    
    static listFirstRaw : any;
    static listColumnLimit : number[] = [];
    static listRowLimit : number[] = [];
    static listAllRow : any[]= [];
    static listAllColumn : any []= [];

    static widthBox : number = 85;
    static heightBox : number = 85;

    static hightScoreValue : number = 0;
    static scoreValue : number = 0;
    static timerValue : number = 0;

    static gameStop : boolean = false;
    //#endregion  var Global


    //#region script
    static scrManager : GameManager = null!;
    //#endregion script
}


