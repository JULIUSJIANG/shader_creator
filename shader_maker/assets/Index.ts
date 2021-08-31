
import { _decorator, Component, Node, CCLoader, Sprite, RenderTexture, SpriteFrame, Widget, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Index')
export class Index extends Component {

    @property(Sprite)
    photo: Sprite = null;

    @property(RenderTexture)
    rt: RenderTexture = null;

    @property(Widget)
    widget: Widget = null;

    start () {
        var spf = new SpriteFrame();
        spf.texture = this.rt;
        this.photo.spriteFrame = spf;
    }
}
