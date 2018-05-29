export class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(item) {
        const newNode = new Node(item);
        if (this.root) {
            this._insertNode(newNode, this.root);
        } else {
            this.root = newNode;
        }
    }
    _insertNode(newNode, currNode) {
        if (newNode.data < currNode.data) {
            if (currNode.left === null) {
                currNode.left = newNode;
            } else {
                this._insertNode(newNode, currNode.left);
            }
        } else if (newNode.data > currNode.data) {
            if (currNode.right === null) {
                currNode.right = newNode;
            } else {
                this._insertNode(newNode, currNode.right);
            }
        } else {
            // 같다.
        }
    }
    find(item, includeParent) {
        let parentNode = null;
        let currNode = this.root;
        while (item !== currNode.data) {
            if (item < currNode.data) {
                parentNode = currNode;
                currNode = currNode.left;
            } else if (item > currNode.data) {
                parentNode = currNode;
                currNode = currNode.right;
            }
            if (currNode === null) {
                return null;
            }
        }
        if (includeParent) {
            return {
                parentNode: parentNode,
                thisNode: currNode
            };
        } else {
            return currNode;
        }

    }
    remove(item) {
        // this.root = this._removeNode(item, this.root);
        const findResult = this.find(item, true);
        if (!findResult) {
            return false;
        }
        const direction = findResult.parentNode.data > item ? 'left' : 'right';
        if (!findResult.thisNode.left && !findResult.thisNode.right) {
            findResult.parentNode[direction] = null;
        } else if (!findResult.thisNode.left && findResult.thisNode.right) {
            findResult.parentNode[direction] = findResult.thisNode.right;
        } else if (findResult.thisNode.left && !findResult.thisNode.right) {
            findResult.parentNode[direction] = findResult.thisNode.left;
        } else {
            findResult.parentNode[direction] = this.getMin(findResult.thisNode.right);
        }
    }
    first() {
        return this.root;
    }
    getMin(root) {
        let currNode = root ? root : this.root;
        while (currNode.left !== null) {
            currNode = currNode.left;
        }
        return currNode;
    }
    getMax(root) {
        let currNode = root ? root : this.root;
        while (currNode.right !== null) {
            currNode = currNode.right;
        }
        return currNode;
    }
}

export class Node {
    constructor(data) {
        this.data = data;
        this.left = null
        this.right = null;
    }

}