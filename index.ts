export class Node {
    value: number;
    left: Node | undefined;
    right: Node | undefined;

    constructor(value: number) {
        this.value = value;
    }

    insert(newValue: number) {
        if (newValue > this.value) {
            if (this.right) {
                this.right.insert(newValue);
            } else {
                this.right = new Node(newValue);
            }
        } else {
            if (this.left) {
                this.left.insert(newValue);
            } else {
                this.left = new Node(newValue);
            }
        }
    }

    double() {
        const allNodes = this.getAllNodes();
        allNodes.map(node => node.value = node.value * 2);
    }

    sum() {
        const allNodes = this.getAllNodes();
        return allNodes.reduce((a: number, b: Node) => { return a + b.value }, 0);
    }

    getAllNodes(): Node[] {

        let result: Node[] = [this];

        const nodesWithUnexploredRightSide: Node[] = [];
        let node: Node = this;
        let navigation: 'left' | 'right' = 'left';

        while (node) {

            navigation = this.getNavigation(node);

            if (navigation === 'left' && node.right) {
                // Add this node to get back to it and explore its right side later
                nodesWithUnexploredRightSide.push(node);
            }

            if (node[navigation]) {
                node = node[navigation];
            } else {
                node = nodesWithUnexploredRightSide[nodesWithUnexploredRightSide.length - 1].right;
                nodesWithUnexploredRightSide.pop();
            }

            result.push(node);

            if (nodesWithUnexploredRightSide.length === 0 && !node.right) {
                break;
            }

        }

        return result;

    }

    flatten(): number[] {

        const result = [];
        let allNodes = this.getAllNodes();
        allNodes.forEach((node) => {
            result.push(node.value);
        });
        return result;

    }

    getNavigation(node: Node): 'right' | 'left' {
        return (!node.left && node.right) ? 'right' : 'left';
    }

}