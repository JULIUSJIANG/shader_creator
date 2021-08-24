
import { _decorator, Component, Node, Sprite, renderer, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JiangOutline')
export class JiangOutline extends Component {
    _ui: UITransform = null;
    _img: Sprite = null;

    onLoad () {
        this._ui = this.node.getComponent(UITransform);
        this._img = this.node.getComponent(Sprite);
    }

    start () {
        let texWidth = this._img.spriteFrame.texture.width;
        let oneDivideTexWidth = 1 / this._img.spriteFrame.texture.width;
        let texHeight = this._img.spriteFrame.texture.height;
        let oneDivideTexHeight = 1 / this._img.spriteFrame.texture.height;
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            this._img.materials[i] = new renderer.MaterialInstance({parent: originMat});
            this._img.materials[i].setProperty(`texWidth`, texWidth);
            this._img.materials[i].setProperty(`oneDivideTexWidth`, oneDivideTexWidth);
            this._img.materials[i].setProperty(`texHeight`, texHeight);
            this._img.materials[i].setProperty(`oneDivideTexHeight`, oneDivideTexHeight);
        };
    }

    update () {
        let texWidth = this._img.spriteFrame.texture.width;
        let texHeight = this._img.spriteFrame.texture.height;
        let matrix = this.node.getWorldMatrix();
        let horSccale = matrix.m00 * this._ui.width / texWidth;
        let verScale = matrix.m05 * this._ui.height / texHeight;
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            this._img.materials[i] = new renderer.MaterialInstance({parent: originMat});
            this._img.materials[i].setProperty(`horScale`, horSccale);
            this._img.materials[i].setProperty(`verScale`, verScale);
        };
    }
}