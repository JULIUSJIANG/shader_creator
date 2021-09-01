import Index from "../Index";
import ColorRecord from "./ColorRecord";
import dataStorage from "./DataStorage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BtnBlock extends cc.Component {

    @property(cc.Node)
    public colorPreview: cc.Node = null;

    @property(cc.Node)
    btnSelect: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    editItem: ColorRecord;

    public init (editIndex: number) {
        this.editItem = dataStorage.vo.colorPool[editIndex];
        this.colorPreview.color = new cc.Color(this.editItem.r, this.editItem.g, this.editItem.b);
        this.colorPreview.opacity = this.editItem.a;
        // 如果当前编辑的不是自己，那么显示该按钮
        this.mask.active = dataStorage.vo.colorIndex == editIndex;
        this.btnSelect.on(cc.Node.EventType.TOUCH_START, () => {
            if (dataStorage.vo.colorIndex != editIndex) {
                dataStorage.vo.colorIndex = editIndex;
                Index.inst.refreshLeftNav();
            }
            else {
                Index.inst.viewBlockEdit.node.active = true;
                Index.inst.viewBlockEdit.init(editIndex);
            };
        });
    }
}