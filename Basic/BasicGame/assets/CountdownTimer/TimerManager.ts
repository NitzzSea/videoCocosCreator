import { _decorator, Component, Node, Label, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimerManager')
export class TimerManager extends Component {
    @property(Label) labelTime : Label = null!;
    @property(Label) labelResult : Label = null!;

    @property(CCInteger) timeNum : number = 0;

    callbackSchedule : any;

    start() {
        this.StartCountdown();
    }

    StartCountdown() {
        this.labelTime.string = this.timeNum.toString();

        this.callbackSchedule = function() {
            this.timeNum--;
            this.labelTime.string = this.timeNum.toString();

            if(this.timeNum == 0) {
                this.labelResult.string = "Time Stoped";
                this.unschedule(this.callbackSchedule);
            }
        }

        this.schedule(this.callbackSchedule, 1);
    }
}


