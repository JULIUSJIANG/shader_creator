export default interface BtnBind {
    btn: cc.Node;
    onEnable: () => void;
    onDisable: () => void;
    onGrid: (gridX: number, gridY: number) => void;
}