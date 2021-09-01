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

const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {
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

    public static inst: Index;

    start () {
        Index.inst = this;
        this.viewBlockEdit.node.active = false;

        this.initForEditType();
        this.refreshLeftNav();
        this.btnAddBlock.on(cc.Node.EventType.TOUCH_START, () => {
            dataStorage.vo.colorPool.push(new ColorRecord());
            this.refreshLeftNav();
        });
    }

    /**
     * 初始化当前的编辑类型
     */
    initForEditType () {
        let btnList = [
            {
                btn: this.btnBuild,
                onEnable: () => {
                    this.sideNav.active = true;
                },
                onDisable: () => {
                    this.sideNav.active = false;
                }
            },
            {
                btn: this.btnDestory,
                onEnable: () => {

                },
                onDisable: () => {
                    
                }
            }
        ];
        let refresh = () => {
            btnList.forEach(( val, index ) => {
                val.btn.active = dataStorage.vo.editTypeIndex != index;
                if (dataStorage.vo.editTypeIndex == index) {
                    val.onEnable();
                }
                else {
                    val.onDisable();
                };
            });
        };
        btnList.forEach(( val, index ) => {
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
    public refreshLeftNav () {
        this.blockContainer.removeAllChildren();
        dataStorage.vo.colorPool.forEach(( val, index ) => {
            var inst = cc.instantiate(this.btnBlockPrefab);
            var com = inst.getComponent(BtnBlock);
            com.init(index);
            this.blockContainer.addChild(inst);
        });
    }
}
