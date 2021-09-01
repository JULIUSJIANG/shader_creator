import ColorRecord from "./ColorRecord";


/**
 * 数据的总结构
 */
class DataStruct {
    /**
     * 当前编辑的颜色索引
     */
    colorIndex: number = 0;
    /**
     * 上次选择的索引
     */
    editTypeIndex: number = 0;
    /**
     * 当前颜色池
     */
    colorPool: ColorRecord[] = [];
}

const key = "dataStorage2";

const dataStorage = {
    vo: new DataStruct(),
    save: () => {
        localStorage.setItem(key, JSON.stringify(dataStorage.vo));
    }
}
var val = localStorage.getItem(key);
if (val != null && val != "") {
    dataStorage.vo = JSON.parse(val);
};

cc.game.on(cc.game.EVENT_HIDE, () => {
    dataStorage.save();
});

export default dataStorage;