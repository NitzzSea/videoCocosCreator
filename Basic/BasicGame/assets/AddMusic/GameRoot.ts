import { _decorator, Component, Node, AudioSource, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameRoot')
export class GameRoot extends Component {
    @property(AudioSource) private _audioSource: AudioSource = null;

    onLoad() {
        const audioSource = this.getComponent(AudioSource)!;
        this._audioSource = audioSource;
        director.addPersistRootNode(this.node);
    }

    start() {
        this._audioSource.play();
    }

    onChangeScene() {
        director.loadScene('dragndrop', ()=> {
            console.log('SUccess add bg music in another scene');
        })
    }
}


