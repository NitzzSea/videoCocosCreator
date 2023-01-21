import { _decorator, Component, Node, EditBox, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Editboxmanager')
export class Editboxmanager extends Component {
    @property(EditBox) editBox : EditBox = null!;
    @property(Label) labelBox : Label = null;

    AddChatLabel() {
        this.labelBox.string = this.editBox.string;
        this.editBox.string = "";
    }
}


