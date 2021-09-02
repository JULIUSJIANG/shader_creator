// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import dataStorage from "./scripts/DataStorage";
import ViewBlockEdit from "./scripts/ViewBlockEdit";
import BtnBlock from "./scripts/BtnBlock";
import ColorRecord from "./scripts/ColorRecord";
import utilTexture2D from "./scripts/UtilTexture2D";
import globalConfig from "./scripts/GlobalConfig";
import BtnBind from "./scripts/BtnBind";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {
    
    public static inst: Index;

    /**
     * 侧边栏
     */
    @property(cc.Node)
    public sideNav: cc.Node = null;
    /**
     * 按钮-建造
     */
    @property(cc.Node)
    public btnBuild: cc.Node = null;
    /**
     * 按钮-销毁
     */
    @property(cc.Node)
    public btnDestory: cc.Node = null;
    /**
     * 用于编辑的界面
     */
    @property(ViewBlockEdit)
    public viewBlockEdit: ViewBlockEdit = null;
    /**
     * 用于放置方块的容器
     */
    @property(cc.Node)
    public blockContainer: cc.Node = null;
    /**
     * 方块的预制体
     */
    @property(cc.Prefab)
    public btnBlockPrefab: cc.Prefab = null;
    /**
     * 用于添加方块的按钮
     */
    @property(cc.Node)
    public btnAddBlock: cc.Node = null;
    /**
     * 背景网格精灵
     */
    @property(cc.Sprite)
    public grid: cc.Sprite = null;
    /**
     * 用于展示的精灵
     */
    @property(cc.Sprite)
    public display: cc.Sprite = null;

    /**
     * 水平方向格子数
     */
    horGridCount: number;

    /**
     * 垂直方向格子数
     */
    verGridCount: number;

    /**
     * 纹理宽
     */
    texWidth: number;

    /**
     * 纹理高
     */
    texHeight: number;

    /**
     * 绘制的宽
     */
    drawWidth: number;

    /**
     * 绘制的高
     */
    drawHeigh: number;

    /**
     * 颜色数据集
     */
    blockBytes: number[] = [];

    start () {
        Index.inst = this;
        this.viewBlockEdit.node.active = false;

        this.initForEditType();
        this.refreshLeftNav();
        this.btnAddBlock.on(cc.Node.EventType.TOUCH_START, () => {
            dataStorage.vo.colorPool.push(new ColorRecord());
            this.refreshLeftNav();
        });

        // 计算出要绘制的纹理尺寸
        this.horGridCount = Math.ceil(this.node.width / globalConfig.gridPixel);
        this.texWidth = this.horGridCount * globalConfig.gridPixel;
        this.drawWidth = this.horGridCount * globalConfig.drawPixel;
        this.verGridCount = Math.ceil(this.node.height / globalConfig.gridPixel);
        this.texHeight = this.verGridCount * globalConfig.gridPixel;
        this.drawHeigh = this.verGridCount * globalConfig.drawPixel;
        // 设置用于绘制的纹理的宽、高
        this.grid.node.width = this.texWidth;
        this.grid.node.height = this.texHeight;
        // 设置用于表现的纹理的宽、高
        this.display.node.width = this.texWidth;
        this.display.node.height = this.texHeight;
        // 绘制背景格子
        this.grid.spriteFrame = utilTexture2D.grid(
            this.texWidth,
            this.texHeight,
            globalConfig.gridPixel,
            this.blockBytes
        );

        // 监听交互
        let onTouched = (args) => {
            var location = args.currentTouch.getLocation();
            var gridX = Math.floor(location.x / globalConfig.gridPixel);
            var gridY = Math.floor(location.y / globalConfig.gridPixel);
            this.btnList[dataStorage.vo.editTypeIndex].onGrid(gridX, gridY);
        };
        this.display.node.on(cc.Node.EventType.TOUCH_START, onTouched);
        this.display.node.on(cc.Node.EventType.TOUCH_MOVE, onTouched);

        this.refreshGridDraw();
    }

    /**
     * 按钮列表
     */
    btnList: BtnBind[];

    /**
     * 初始化当前的编辑类型
     */
    initForEditType () {
        this.btnList = [
            {
                btn: this.btnBuild,
                onEnable: () => {
                    this.sideNav.active = true;
                },
                onDisable: () => {
                    this.sideNav.active = false;
                },
                onGrid: (gridX: number, gridY: number) => {
                    var targetColorTag = dataStorage.vo.colorIndex;
                    if (dataStorage.vo.gridRec[gridY] == null) {
                        dataStorage.vo.gridRec[gridY] = [];
                    };
                    if (dataStorage.vo.gridRec[gridY][gridX] == targetColorTag) {
                        return;
                    };
                    dataStorage.vo.gridRec[gridY][gridX] = targetColorTag;
                    this.refreshGridDraw();
                }
            },
            {
                btn: this.btnDestory,
                onEnable: () => {

                },
                onDisable: () => {
                    
                },
                onGrid: (gridX: number, gridY: number) => {
                    if (dataStorage.vo.gridRec[gridY] == null) {
                        return;
                    };
                    if (dataStorage.vo.gridRec[gridY][gridX] == null) {
                        return;
                    };
                    dataStorage.vo.gridRec[gridY][gridX] = null;
                    this.refreshGridDraw();
                }
            }
        ];
        let refresh = () => {
            this.btnList.forEach(( val, index ) => {
                val.btn.active = dataStorage.vo.editTypeIndex != index;
                if (dataStorage.vo.editTypeIndex == index) {
                    val.onEnable();
                }
                else {
                    val.onDisable();
                };
            });
        };
        this.btnList.forEach(( val, index ) => {
            val.btn.on(cc.Node.EventType.TOUCH_START, () => {
                dataStorage.vo.editTypeIndex = index;
                refresh();
            });
        });
        refresh();
    }

    /**
     * 刷新左边栏
     */
    refreshLeftNav () {
        this.blockContainer.removeAllChildren();
        dataStorage.vo.colorPool.forEach(( val, index ) => {
            if (val == null) {
                return;
            };
            var inst = cc.instantiate(this.btnBlockPrefab);
            var com = inst.getComponent(BtnBlock);
            com.init(index);
            this.blockContainer.addChild(inst);
        });
    }

    /**
     * 绘制方块的贴图
     */
    spr = new cc.SpriteFrame();

    /**
     * h方块的纹理
     */
    tex = new cc.Texture2D();

    /**
     * 刷新格子绘制
     */
    refreshGridDraw () {
        // 刷新方块贴图
        this.refreshCurrBlockTextureBytes();
        // 刷新光照贴图
        this.refreshLightPenetration();
        // 刷新光影混合
        this.refreshLightBlend();
        // 上下反转
        utilTexture2D.verReverse(this.drawWidth, this.drawHeigh, this.blockBytes);
        // 绘制
        this.tex.initWithData(new Uint8Array(this.blockBytes), cc.Texture2D.PixelFormat.RGBA8888, this.drawWidth, this.drawHeigh);
        this.spr.setTexture(this.tex);
        this.display.spriteFrame = this.spr;
    }

    /**
     * 渗透纹理的数据
     */
    penetrationBytes: number[] = [];

    /***
     * 刷新方块的纹理数据
     */
    refreshCurrBlockTextureBytes () {
        this.blockBytes.fill(null);
        this.penetrationBytes.fill(null);
        // 初始化默认颜色
        for (var x = 0; x < this.drawWidth; x++) {
            for (var y = 0; y < this.drawHeigh; y++) {
                var i = (y * this.drawWidth + x) * 4;
                this.blockBytes[i] = 255;
                this.blockBytes[i + 1] = 255;
                this.blockBytes[i + 2] = 255;
                this.blockBytes[i + 3] = 0;

                this.penetrationBytes[i] = 0;
                this.penetrationBytes[i + 1] = 0;
                this.penetrationBytes[i + 2] = 0;
                this.penetrationBytes[i + 3] = 0;
            };
        };

        for (let y = 0; y < dataStorage.vo.gridRec.length; y++) {
            var xLine = dataStorage.vo.gridRec[y];
            if (xLine == null) {
                continue;
            };
            for (let x = 0; x < xLine.length; x++) {
                var colorTag = xLine[x];
                if (colorTag == null) {
                    continue;
                };
                var colorRec = dataStorage.vo.colorPool[colorTag];
                if (colorRec == null) {
                    continue;
                };

                var leftColorTag = this.getColorTag(x - 1, y);
                var rightColorTag = this.getColorTag(x + 1, y);
                var bottomColorTag = this.getColorTag(x, y - 1);
                var topColorTag = this.getColorTag(x, y + 1);

                for (let localX = 0; localX < globalConfig.drawPixel; localX++) {
                    for (let localY = 0; localY < globalConfig.drawPixel; localY++) {
                        var index = ((y * globalConfig.drawPixel + localY) * this.drawWidth + x * globalConfig.drawPixel + localX) * 4;
                        var r = colorRec.r;
                        var g = colorRec.g;
                        var b = colorRec.b;
                        var a = colorRec.a;
                        if (
                            (leftColorTag == null && localX == 0)
                            || (rightColorTag == null && localX == globalConfig.drawPixel - 1)
                            || (bottomColorTag == null && localY == 0)
                            || (topColorTag == null && localY == globalConfig.drawPixel - 1)
                        ) {
                            r = globalConfig.outLineColor.r;
                            g = globalConfig.outLineColor.g;
                            b = globalConfig.outLineColor.b;
                            a = globalConfig.outLineColor.a;
                        };
                        this.blockBytes[index] = r;
                        this.blockBytes[index + 1] = g;
                        this.blockBytes[index + 2] = b;
                        this.blockBytes[index + 3] = a;

                        this.penetrationBytes[index] = 0;
                        this.penetrationBytes[index + 1] = 0;
                        this.penetrationBytes[index + 2] = 0;
                        // 每像素拦截多少百分比的光
                        this.penetrationBytes[index + 3] = colorRec.p / 100 / globalConfig.drawPixel;
                    };
                };
            };
        };
    }

    /**
     * 刷新光影
     */
    refreshLightPenetration () {
        // 生成光照贴图
        for (var x = 0; x < this.drawWidth; x++) {
            for (var y = this.drawHeigh - 1; 0 <= y; y--) {
                var i = (y * this.drawWidth + x) * 4;
                var preA = 255;
                if (0 < x && y < this.drawHeigh - 1) {
                    preA = this.penetrationBytes[((y + 1) * this.drawWidth + (x - 1)) * 4 + 3];
                };
                this.penetrationBytes[i + 3] = preA - 255 * this.penetrationBytes[i + 3];
                this.penetrationBytes[i + 3] = Math.max(0, this.penetrationBytes[i + 3]);
            };
        };
        // 生成阴影贴图
        for (var x = 0; x < this.drawWidth; x++) {
            for (var y = 0; y < this.drawHeigh; y++) {
                var i = (y * this.drawWidth + x) * 4;
                this.penetrationBytes[i + 3] = Math.min( 255 - this.penetrationBytes[i + 3], globalConfig.shadowAlphaMax);
            };
        };
    }

    /**
     * 刷新光照混合
     */
    refreshLightBlend () {
        // 生成光照贴图
        for (var x = 0; x < this.drawWidth; x++) {
            for (var y = 0; y < this.drawHeigh; y++) {
                var i = (y * this.drawWidth + x) * 4;
                this.blockBytes[i] = this.penetrationBytes[i] * this.penetrationBytes[i + 3] / 255 + (255 - this.penetrationBytes[i + 3]) / 255 * this.blockBytes[i];
                this.blockBytes[i + 1] = this.penetrationBytes[i + 1] * this.penetrationBytes[i + 3] / 255 + (255 - this.penetrationBytes[i + 3]) / 255 * this.blockBytes[i + 1] ;
                this.blockBytes[i + 2] = this.penetrationBytes[i + 2] * this.penetrationBytes[i + 3] / 255 + (255 - this.penetrationBytes[i + 3]) / 255 * this.blockBytes[i + 2] ;
                this.blockBytes[i + 3] = this.penetrationBytes[i + 3] * this.penetrationBytes[i + 3] / 255 + (255 - this.penetrationBytes[i + 3]) / 255 * this.blockBytes[i + 3] ;
            };
        };
    }

    /**
     * 获取某格子的颜色标记
     * @param gridX 
     * @param gridY 
     * @returns 
     */
    getColorTag (gridX: number, gridY: number): number {
        var xLine = dataStorage.vo.gridRec[gridY]
        if (xLine == null) {
            return null;
        };
        if (xLine[gridX] == null) {
            return null;
        };
        if (dataStorage.vo.colorPool[xLine[gridX]] == null) {
            return null;
        };
        return xLine[gridX];
    }
}
