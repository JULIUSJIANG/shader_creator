// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Index from "../Index";
import ColorRecord from "./ColorRecord";
import dataStorage from "./DataStorage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewBlockEdit extends cc.Component {

    @property(cc.Node)
    public colorPreview: cc.Node = null;

    @property(cc.Slider)
    public sliderRed: cc.Slider = null;
    
    @property(cc.Slider)
    public sliderGreen: cc.Slider = null;

    @property(cc.Slider)
    public sliderBlue: cc.Slider = null;

    @property(cc.Slider)
    public sliderAlpha: cc.Slider = null;

    @property(cc.Slider)
    public sliderPenetration: cc.Slider = null;

    @property(cc.Node)
    public btnCertain: cc.Node = null;

    @property(cc.Node)
    public btnDelete: cc.Node = null;

    editIndex: number;

    editItem: ColorRecord;

    public start () {
        this.sliderRed.node.on("slide", () => {
            this.editItem.r = this.sliderRed.progress * 255;
            this.refresh();
        });
        this.sliderGreen.node.on("slide", () => {
            this.editItem.g = this.sliderGreen.progress * 255;
            this.refresh();
        });
        this.sliderBlue.node.on("slide", () => {
            this.editItem.b = this.sliderBlue.progress * 255;
            this.refresh();
        });
        this.sliderAlpha.node.on("slide", () => {
            this.editItem.a = this.sliderAlpha.progress * 255;
            this.refresh();
        });
        this.sliderPenetration.node.on("slide", () => {
            this.editItem.p = this.sliderPenetration.progress * 255;
            this.refresh();
        });
        this.btnCertain.on(cc.Node.EventType.TOUCH_START, () => {
            this.node.active = false;
            Index.inst.refreshLeftNav();
            Index.inst.refreshGridDraw();
        });
        this.btnDelete.on(cc.Node.EventType.TOUCH_START, () => {
            this.node.active = false;
            dataStorage.vo.colorPool[this.editIndex] = null;
            dataStorage.certainRecord();
            Index.inst.refreshLeftNav();
            Index.inst.refreshGridDraw();
        });
    }

    public init (editIndex: number) {
        this.editIndex = editIndex;
        this.editItem = dataStorage.vo.colorPool[editIndex];
        this.refresh();
    }

    refresh () {
        this.colorPreview.color = new cc.Color(this.editItem.r, this.editItem.g, this.editItem.b);
        this.colorPreview.opacity = this.editItem.a;
        this.sliderRed.progress = this.editItem.r / 255;
        this.sliderGreen.progress = this.editItem.g / 255;
        this.sliderBlue.progress = this.editItem.b / 255;
        this.sliderAlpha.progress = this.editItem.a / 255;
        this.sliderPenetration.progress = this.editItem.p / 255;
    }
}
