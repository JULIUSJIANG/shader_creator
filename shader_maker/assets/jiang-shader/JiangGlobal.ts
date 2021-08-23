
import { _decorator, Component, Node, macro, view, CCLoader, Sprite, Material, renderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EffectInfoInvoke')
export class JiangGlobal extends Component {
    _img: Sprite = null;
    _onEnableTime: number = 0;

    onLoad () {
        this._img = this.node.getComponent(Sprite);
    }

    start () {
        let textureWidth = this._img.spriteFrame.texture.width;
        let oneDivideTexWidth = 1 / textureWidth;
        let textureHeight = this._img.spriteFrame.texture.height;
        let oneDivideTexHeight = 1 / textureHeight;
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            this._img.materials[i] = new renderer.MaterialInstance({parent: originMat});
            this._img.materials[i].setProperty(`textureWidth`, textureWidth);
            this._img.materials[i].setProperty(`oneDivideTexWidth`, oneDivideTexWidth);
            this._img.materials[i].setProperty(`textureHeight`, textureHeight);
            this._img.materials[i].setProperty(`oneDivideTexHeight`, oneDivideTexHeight);
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
        let passedSeconds = (curr - this._onEnableTime) / 1000;
        for (let i = 0; i < this._img.materials.length; i++) {
            let mat = this._img.materials[i];
            mat.setProperty(`passedSeconds`, passedSeconds);
        };
    }
}