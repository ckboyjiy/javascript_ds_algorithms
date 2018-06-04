export class BST {
    constructor() {
        this.root = null;
    }
    insert(data) {
        const newNode = new Node(data); // 추가할 데이터의 노드를 생성합니다.
        if (this.root === null) { // 루트노드에 값이 없으면 루트로 지정하고 종료합니다.
            this.root = newNode;
            return newNode;
        }
        let curr = this.root; // 현재 커서를 루트로 지정합니다.
        while (true) { // 반복합니다.
            if (data > curr.data) { // 추가할 데이터가 현재 노드값보다 크면 오른쪽을 탐색합니다.
                if (curr.right === null) { // 커서 오른쪽의 참조값이 null이면
                    curr.right = newNode; // 추가할 노드를 커서의 right에 지정합니다.
                    break; // 루프를 종료합니다.
                } else { // 커서 오른쪽의 참조값이 null이 아니면
                    curr = curr.right; // 커서를 현재 커서의 오른쪽 노드로 지정합니다.
                }
            } else if (data < curr.data) { // 추가할 데이터가 현재 노드값보다 작으면 왼쪽을 탐색합니다.
                if (curr.left === null) { // 커서 왼쪽의 참조값이 null이면
                    curr.left = newNode; // 추가할 노드를 커서의 left에 지정합니다.
                    break; // 루프를 종료합니다.
                } else { // 커서 왼쪽의 참조값이 null이 아니면
                    curr = curr.left; // 커서를 현재 커서의 왼쪽 노드로 지정합니다.
                }
            } else {
                break; // 현재 커서에 동일한 값이 이미 존재하므로 종료합니다.
            }
        }
        return newNode;
    }

    inOrder(node = this.root, queue = []) {
        if (node !== null) {
            this.inOrder(node.left, queue); // 왼쪽 노드부터 탐색하여 출력합니다.
            queue.push(node.data); // 왼쪽 노드를 다 출력 후 자신의 값을 출력합니다.
            this.inOrder(node.right, queue); // 오른쪽 노드를 출력합니다.
        }
        return queue.toString();
    }

    preOrder(node = this.root, queue = []) {
        if (node !== null) {
            queue.push(node.data); // 자신의 값을 출력합니다.
            this.preOrder(node.left, queue); // 왼쪽 노드부터 탐색하여 출력합니다.
            this.preOrder(node.right, queue); // 오른쪽 노드를 출력합니다.
        }
        return queue.toString();
    }

    postOrder(node = this.root, queue = []) {
        if (node !== null) {
            this.postOrder(node.left, queue); // 왼쪽 노드부터 탐색하여 출력합니다.
            this.postOrder(node.right, queue); // 오른쪽 노드를 출력합니다.
            queue.push(node.data); // 자신의 값을 출력합니다.
        }
        return queue.toString();
    }

    getMin(node = this.root) {
        let curr = node;
        while (curr.left !== null) {
            curr = curr.left;
        }
        return curr.data;
    }

    getMax(node = this.root) {
        let curr = node;
        while (curr.right !== null) {
            curr = curr.right;
        }
        return curr.data;
    }

    find(value) {
        let curr = this.root;
        while (curr && curr.data !== value) {
            if (curr.data > value) {
                curr = curr.left;
            } else if (curr.data < value) {
                curr = curr.right;
            }
        }
        return curr;
    }

    remove(value) {
        const node = this._remove(value, this.root);
        if (node) {
            this.root = node;
        }
    }

    _remove(value, node = this.root) {
        if (node === null) {
            return null;
        }
        if (node.data === value) {
            if (node.left === null && node.right === null) {
                // 자식이 둘다 null이면
                return null; //null을 반환한다.
            } else if (node.left === null && node.right !== null) {
                // 왼쪽 자식이 null이면
                return node.right; // 노드의 오른쪽 자식을 반환한다.
            } else if (node.left !== null && node.right === null) {
                // 오른쪽 자식이 null이면
                return node.left; // 노드의 왼쪽 자식을 연결한다.
            }  else if (node.left !== null && node.right !== null) {
                // 두 자식이 모두 있으면
                const temp = this.getMax(node.left); // 왼쪽 자식 중 가장 큰 값을 조회한다.
                node.data = temp; // 노드의 값을 왼쪽 자식 중 가장 큰 값으로 변경한다.
                node.left = this._remove(temp, node.left); // 노드의 왼쪽 트리에서 왼쪽 자식 중 가장 큰 값을 삭제한다.
                return node; // 수정된 노드를 반환한다.
            }
        } else if (node.data < value) {
            node.right = this._remove(value, node.right);
            return node;
        } else if (node.data > value) {
            node.left = this._remove(value, node.left);
            return node;
        }
    }
}

export class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}