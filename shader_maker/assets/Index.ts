
import { _decorator, Component, Node, macro, view, CCLoader, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Index')
export class Index extends Component {
    @property(Sprite)
    imgPeople: Sprite = null;

    _onEnableTime: number = 0;

    onEnable () {
        this._onEnableTime = Date.now();
    }

    update () {
        let curr = Date.now();
        let passedSecond = (curr - this._onEnableTime) / 1000;
        this.imgPeople.material.setProperty(`ps`, passedSecond);
    }
}