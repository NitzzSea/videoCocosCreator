import { _decorator, Component, director, Label, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingProgress')
export class LoadingProgress extends Component {
    @property(ProgressBar) barLoading : ProgressBar = null!;
    @property(Label) textLoading : Label = null!;

    firstProgress : number = 2;
    progressValue : number = 0;

    start() {
        this.StartProgress();
    }

    StartProgress() {
        let counTime = 0;
        let callback = () => {
            if(counTime >= this.firstProgress) {
                this.unschedule(callback);
                this.LoadScene();
            }

            this.progressValue = (counTime/this.firstProgress)/this.firstProgress;
            this.ProgresBar();
            counTime +=0.2;
        }

        //cal the function every 0.2 ms 
        this.schedule(callback, 0.2);
    }

    ProgresBar () {
        this.barLoading.progress = this.progressValue;
        this.textLoading.string = (this.progressValue*100).toFixed()+"%";
    }

    LoadScene() {
        director.preloadScene("MainScene", 
        (completedCount: number, totalCount: number, item: any) => {
            if(completedCount > this.progressValue) {
                this.progressValue = completedCount;
                this.ProgresBar();
            }
        }, 
        () => {
            director.loadScene("MainScene");
        })
    }
}


