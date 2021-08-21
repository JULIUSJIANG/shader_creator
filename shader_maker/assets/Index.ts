
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Index')
export class Index extends Component {
    _nodeA: Node = null;

    @property(Node)
    nodeB: Node = null;

    start () {
        setTimeout(() => {
            this.nodeB.active = true;
        }, 1500 );
    }
}
