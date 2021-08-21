
import { _decorator, Component, Node, macro, view, CCLoader, Sprite, Material, renderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EffectInfoInvoke')
export class EffectInfoInvoke extends Component {
    _img: Sprite = null;
    _onEnableTime: number = 0;

    onLoad () {
        this._img = this.node.getComponent(Sprite);
    }

    start () {
        // console.log(this._img.material);
        // return;
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            // let freshMat = new Material();
            // freshMat.initialize({effectAsset: originMat.effectAsset});
            // let propsTarget = originMat["_props"][0];
            // for (let key in propsTarget) {
            //     freshMat.setProperty(key, propsTarget[key]);
            // };
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
        
        let curr = Date.now();
        let passedSecond = (curr - this._onEnableTime) / 1000;
        this._img.material.setProperty(`ps`, passedSecond);
    }
}