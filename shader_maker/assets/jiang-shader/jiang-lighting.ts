
import { _decorator, Component, Node, macro, view, CCLoader, Sprite, Material, renderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JiangLighting')
export class JiangLighting extends Component {
    _img: Sprite = null;
    _onEnableTime: number = 0;

    onLoad () {
        this._img = this.node.getComponent(Sprite);
    }

    start () {
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            this._img.materials[i] = new renderer.MaterialInstance({parent: originMat});
        };
    }

    onEnable () {
        if (this._img == null) { 
            return;
        };

        this._onEnableTime = Date.now();
    }

    update () {
        if (this._img == null) {
            return;
        };
    }
}