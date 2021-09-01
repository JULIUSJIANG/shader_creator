const utilTexture2D = {
    grid (width: number, height: number, pixelCount: number, bytes: number[]) {
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
        var tex = new cc.Texture2D();
        tex.initWithData(new Uint8Array(bytes), cc.Texture2D.PixelFormat.RGBA8888, width, height);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(tex);
        return spriteFrame;
    }
}

export default utilTexture2D;