
import { _decorator, Component, Node, Sprite, renderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JiangOutline')
export class JiangOutline extends Component {
    _img: Sprite = null;

    onLoad () {
        this._img = this.node.getComponent(Sprite);
    }

    start () {
        let oneDivideTexWidth = 1 / this._img.spriteFrame.texture.width;
        let oneDivideTexHeight = 1 / this._img.spriteFrame.texture.height;
        console.error(`oneDivideTexWidth[${oneDivideTexWidth}] oneDivideTexHeight[${oneDivideTexHeight}]`);
        for (let i = 0; i < this._img.materials.length; i++) {
            let originMat = this._img.materials[i];
            this._img.materials[i] = new renderer.MaterialInstance({parent: originMat});
            this._img.materials[i].setProperty(`oneDivideTexWidth`, oneDivideTexWidth);
            this._img.materials[i].setProperty(`oneDivideTexHeight`, oneDivideTexHeight);
        };
    }
}