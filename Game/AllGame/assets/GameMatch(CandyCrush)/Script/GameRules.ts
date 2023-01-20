import { _decorator, Component, Node, Vec3, instantiate } from 'cc';
import { GameGlobal } from './GameGlobal';
import { ItemColorBox } from './ItemColorBox';
const { ccclass, property } = _decorator;

@ccclass('GameRules')
export class GameRules{
    public static checkSameColor() {
        for(let i = 0; i < GameGlobal.listParentColorBox.length; i++){
            if(GameGlobal.listScriptColorBox[i].idColor == -1) continue;
            let currentColor = GameGlobal.listScriptColorBox[i].idColor;
            let indexRow = GameGlobal.listColumnLimit.find(index => {return i <= index});
            let idexArrColumn = getArrColumn();

            function getArrColumn() {
                for(let elmnt of GameGlobal.listAllColumn){
                    if(elmnt.includes(i)){
                        return elmnt.indexOf(i);
                    }
                }
                
            }

            let arrRowFour = (indexRow - i >= 3)?[i, i+1, i+2, i+3]:[];//[i, i+1, i+2, i+3]
            let arrColumnFour = (idexArrColumn >= 3)?[i, i+GameGlobal.colomx*1, i+GameGlobal.colomx*2, i+GameGlobal.colomx*3]:[];//[i, i+GameGlobal.colomx+1, i+GameGlobal.colomx+2, i+GameGlobal.colomx+3]
            let arrRowThree = (indexRow - i >= 2)?[i, i+1, i+2]:[];//[i, i+1, i+2]
            let arrColumnThree = (idexArrColumn >= 2)?[i, i+GameGlobal.colomx*1, i+GameGlobal.colomx*2]:[]; //[i, i+GameGlobal.colomx+1, i+GameGlobal.colomx+2]

            if(arrRowFour.length > 0 && arrRowFour.every(chechEvery)) {
                arrRowFour.forEach(idx => {
                    GameGlobal.scoreValue += 2;
                    GameGlobal.scrManager.lblValueScore.string = GameGlobal.scoreValue.toString();
                    GameGlobal.listScriptColorBox[idx].idColor = -1;
                    GameGlobal.listScriptColorBox[idx].spriteBox.color = GameGlobal.scrManager.colorDefault;
                })
            }   

            if(arrColumnFour.length > 0 && arrColumnFour.every(chechEvery)) {
                arrColumnFour.forEach(idx => {
                    GameGlobal.scoreValue += 2;
                    GameGlobal.scrManager.lblValueScore.string = GameGlobal.scoreValue.toString();
                    GameGlobal.listScriptColorBox[idx].idColor = -1;
                    GameGlobal.listScriptColorBox[idx].spriteBox.color = GameGlobal.scrManager.colorDefault;
                })
            }

            if(arrRowThree.length > 0 && arrRowThree.every(chechEvery)) {
                arrRowThree.forEach(idx => {
                    GameGlobal.scoreValue += 1;
                    GameGlobal.scrManager.lblValueScore.string = GameGlobal.scoreValue.toString();
                    GameGlobal.listScriptColorBox[idx].idColor = -1;
                    GameGlobal.listScriptColorBox[idx].spriteBox.color = GameGlobal.scrManager.colorDefault;
                })
            }

            if(arrColumnThree.length > 0 && arrColumnThree.every(chechEvery)) {
                arrColumnThree.forEach(idx => {
                    GameGlobal.scoreValue += 1;
                    GameGlobal.scrManager.lblValueScore.string = GameGlobal.scoreValue.toString();
                    GameGlobal.listScriptColorBox[idx].idColor = -1;
                    GameGlobal.listScriptColorBox[idx].spriteBox.color = GameGlobal.scrManager.colorDefault;
                })
            }

            function chechEvery(_idx) {
                if(GameGlobal.listScriptColorBox[_idx].idColor == currentColor && GameGlobal.listScriptColorBox[_idx].idColor !=-1) return true;
            }
        }
        this.getBoxToMove();
    }

    public static getBoxToMove() {
     
        for (let i = 0; i < GameGlobal.maxBox; i ++) {
            if(i + GameGlobal.colomx > GameGlobal.maxBox-1)continue;
            if(GameGlobal.listScriptColorBox[i+GameGlobal.colomx]!.idColor == -1) {
                GameGlobal.listScriptColorBox[i+GameGlobal.colomx].spriteBox.color = GameGlobal.listScriptColorBox[i].spriteBox.color;
                GameGlobal.listScriptColorBox[i+GameGlobal.colomx].idColor = GameGlobal.listScriptColorBox[i].idColor;
                GameGlobal.listScriptColorBox[i+GameGlobal.colomx].idBox = i+GameGlobal.colomx;
                GameGlobal.listScriptColorBox[i+GameGlobal.colomx].nodeBox.name = "box_"+(i+GameGlobal.colomx).toString();

                let isFirstRow = GameGlobal.listFirstRaw.includes(i);

                if (isFirstRow && (GameGlobal.listScriptColorBox[i].idColor == -1)) {
                    GameGlobal.listScriptColorBox[i].idColor = GameGlobal.scrManager.RandomColor();
                    GameGlobal.listScriptColorBox[i].spriteBox.color = GameGlobal.scrManager.colorBox[GameGlobal.listScriptColorBox[i].idColor];
                }
            }else if(GameGlobal.listScriptColorBox[i].idColor == -1) {
                GameGlobal.listScriptColorBox[i].idColor = GameGlobal.scrManager.RandomColor();
                GameGlobal.listScriptColorBox[i].spriteBox.color = GameGlobal.scrManager.colorBox[GameGlobal.listScriptColorBox[i].idColor];
            }
        }
    }
}


