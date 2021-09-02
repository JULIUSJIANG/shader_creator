// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const lightK = 1;

@ccclass
export default class Exam extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    start () {
        let width = 400;
        let height = 200;
        this.sprite.spriteFrame = this.createImg(width, height, []);
        this.sprite.node.width = width;
        this.sprite.node.height = height;
    }

    createImg (width: number, height: number, bytes: number[]) {
        // 多少像素就会导致消失
        var disappearedPixel = 100;
        var alphaDec = 255/disappearedPixel;
        var begin = Date.now();
        var spriteFrame = new cc.SpriteFrame();
        var tex = new cc.Texture2D();
        var leftBorder = width / 4;
        var rightBorder = width - leftBorder;
        var topBorder = height / 4;
        var bottomBorder = height - topBorder;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var r = 255;
                var g = 255;
                var b = 255;
                var a = 0;
                // 形状区域以外的，不存在透明度衰减
                if (leftBorder < x && x < rightBorder && topBorder <= y && y < bottomBorder) {
                    a = alphaDec;
                };
                if (x < leftBorder && bottomBorder < y ) {
                    a = alphaDec;
                };
                var i = (y * width + x) * 4;
                bytes[i] = r;
                bytes[i + 1] = g;
                bytes[i + 2] = b;
                bytes[i + 3] = a;
            };
        };
        
        tex.initWithData(new Uint8Array(bytes), cc.Texture2D.PixelFormat.RGBA8888, width, height);
        spriteFrame.setTexture(tex);
        var end = Date.now();
        console.log(`创建纹理[${width}]*[${height}]耗时[${end - begin}]`);
        return spriteFrame;
    }

    verReverse (width: number, height: number, bytes: number[]) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var i = (y * width + x) * 4;
                var r = bytes[i];
                var g = bytes[i + 1];
                var b = bytes[i + 2];
                var a = bytes[i + 3];

                // 初始化为满透明度
                var preA = 255;
                // 如果有左上角，那么取左上角的
                if (0 < x && 0 < y) {
                    preA = bytes[((y - 1) * width + (x - 1)) * 4 + 3];
                };
                // 透明度衰减
                bytes[i + 3] = preA - bytes[i + 3];
                bytes[i + 3] = Math.max(0, bytes[i + 3]);
            };
        };
    }
}
