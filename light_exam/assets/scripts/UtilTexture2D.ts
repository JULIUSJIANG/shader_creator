const utilTexture2D = {
    grid (width: number, height: number, pixelCount: number, bytes: number[]) {
        let t0 = Date.now();
        bytes.length = width * height * 4;
        let t1 = Date.now();
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var i = (y * width + x) * 4;
                if (x%pixelCount == 0 || x%pixelCount == 1||y%pixelCount == 0 || y%pixelCount == 1) {
                    bytes[i] = 255;
                    bytes[i + 1] = 255;
                    bytes[i + 2] = 255;
                    bytes[i + 3] = 255;
                }
                else {
                    bytes[i] = 0;
                    bytes[i + 1] = 0;
                    bytes[i + 2] = 0;
                    bytes[i + 3] = 0;
                };
            };
        };
        let t2 = Date.now();
        utilTexture2D.verReverse(width, height, bytes);
        let t3 = Date.now();
        var tex = new cc.Texture2D();
        tex.initWithData(new Uint8Array(bytes), cc.Texture2D.PixelFormat.RGBA8888, width, height);
        let t4 = Date.now();
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(tex);
        let t5 = Date.now();
        console.log(`t5 - t4[${t5 - t4}], t4 - t3[${t4 - t3}], t3 - t2[${t3 - t2}], t2 - t1[${t2 - t1}], t1 - t0[${t1 - t0}]`);
        return spriteFrame;
    },

    verReverse (width: number, height: number, bytes: number[]) {
        var halfHeight = Math.floor( height / 2 );
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < halfHeight; y++) {
                var i = (y * width + x) * 4;
                var mirrorI = ((height - y - 1) * width + x) * 4;
                // 上下反转
                [
                    bytes[i],
                    bytes[i + 1],
                    bytes[i + 2],
                    bytes[i + 3],

                    bytes[mirrorI],
                    bytes[mirrorI + 1],
                    bytes[mirrorI + 2],
                    bytes[mirrorI + 3],
                ]
                = 
                [
                    bytes[mirrorI],
                    bytes[mirrorI + 1],
                    bytes[mirrorI + 2],
                    bytes[mirrorI + 3],

                    bytes[i],
                    bytes[i + 1],
                    bytes[i + 2],
                    bytes[i + 3]
                ]
            };
        };
    }
}

export default utilTexture2D;