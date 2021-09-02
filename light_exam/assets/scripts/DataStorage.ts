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
    /**
     * 格子的记录
     */
    gridRec: number[][] = [];
}

const key = "dataStorage3";

const dataStorage = {
    vo: new DataStruct(),
    save: () => {
        localStorage.setItem(key, JSON.stringify(dataStorage.vo));
    },
    certainRecord: () => {
        if (dataStorage.vo.colorPool[dataStorage.vo.colorIndex] != null) {
            return;
        };
        dataStorage.vo.colorIndex = 0;
        dataStorage.vo.colorPool.forEach(( val, index ) => {
            if (val != null) {
                dataStorage.vo.colorIndex = index;
            };
        });
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