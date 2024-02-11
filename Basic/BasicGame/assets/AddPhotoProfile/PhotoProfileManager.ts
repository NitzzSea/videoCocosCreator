import { _decorator, Component, Node, Sprite, input, Texture2D, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PhotoProfileManager')
export class PhotoProfileManager extends Component {
    @property(Sprite) photoPlayer :Sprite = null!;

    newFile : any = null!;

    onChoosePhoto() {
        let inputfile = document.createElement('input');
        inputfile.type = 'file';
        inputfile.click();

        inputfile.onchange = ()=> {
            let fileImage = inputfile.files;

            if(fileImage!.length > 0) {
                this.newFile = fileImage![0];
                this.changeToImage();
            }
             
        }
    }

    changeToImage() {
        let reader = new FileReader();

        let that = this;

        reader.onload = ()=>{
            if(reader.readyState == reader.DONE) {
                let imgSrc : string |undefined = reader.result?.toString();
                let img = new Image();

                img.onload = ()=> {
                    let texture = new Texture2D();
                    texture.reset({
                        width: img.width,
                        height: img.height,
                    });
                    texture.uploadData(img, 0, 0);
                    let spf = new SpriteFrame();
                    spf.texture = texture;
                    that.changePhotos(spf);
                }

                img.src = imgSrc;
            }
        }

        reader.readAsDataURL(this.newFile);
    }

    changePhotos(_newPhoto) {
        this.photoPlayer.spriteFrame = _newPhoto;
    }
}


