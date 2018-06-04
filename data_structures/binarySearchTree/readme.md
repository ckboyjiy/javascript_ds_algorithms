# 이진트리와 이진검색트리 - Binary Tree & Binary Search Tree
트리는 컴퓨터 과학에서 자주 등장하는 자료구조 중 하나입니다.
트리는 데이터를 계층적으로 저장하는 비연속 형식의 자료구조로, 파일시스템에 파일을 저장하거나 정렬된 데이터 리스트 등 계층적인 데이터를 저장할 때 사용됩니다.

## 트리 - Tree
### 트리란?
트리는 엣지와 노드로 연결된 집합입니다. OS의 폴더 구조, 회사의 조직도 등이 트리입니다.

### 트리 용어
* 노드 <code>node</code> : 데이터의 상하위 계층을 나타내는 위치의 항목
* 엣지 <code>edge</code> : 노드와 노드를 연결하는 선 또는 통로
* 루트 <code>root</code> : 트리 최상위의 노드
* 부모 노드 <code>parent node</code> : 아래의 한개 이상의 노드가 연결되어 있는 노드
* 자식 노드 <code>child node</code> : 부모 노드 하위에 연결된 노드
* 리프 노드 <code>leaf node</code> : 자식노드가 없는 노드
* 레벨 <code>level</code> : 루트를 0레벨로 하위로 내려갈 수록 1레벨씩 증가하여

## 이진 트리 - Binary Tree
이진 트리는 자식 노드의 수가 두 개 이하인 트리를 의미합니다.
데이터 삽입, 검색, 삭제에 매우 효율적입니다.
하나의 노드는 왼쪽 자식 노드와 오른쪽 자식노드를 가질 수 있습니다.

## 이진 검색 트리 - Binary Search Tree
이진 검색 트리는 자신의 노드값보다 작은 값을 왼쪽 자식 노드에, 큰 값을 오른쪽 자식 노드에 저장을 합니다.
숫자 뿐만 아니라 단어 및 문자열도 저장할 수 있습니다.

### 구현
이진 검색 트리도 연결 리스트와 동일하게 Node라는 객체를 가지고 있습니다.

### 노드
노드는 값을 저장할 <code>data</code>와 자신보다 작은 값을 저장할 <code>left</code>노드와 큰 값을 저장할 <code>right</code>노드가 있습니다.
아래에 노드의 생성자 함수를 구현해보겠습니다.
```javascript
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
```
생성자 함수는 노드의 값을 지정하는 <code>data</code>와 현재 노드보다 작은 값이 저장될 <code>left</code>와 큰 값이 저장될 <code>right</code>를 받아 초기화 합니다.

### 트리
트리의 멤버변수는 루트 노드를 저장하는 한개의 변수가 있습니다.
아래 트리의 생성자 함수를 구현해보겠습니다.
```javascript
class BST {
    constructor() {
        this.root = null;
    }
}
```

### 데이터 삽입
트리와 노드의 생성자 함수를 작성하였고 이제 데이터를 추가하는 기능을 구현하도록 하겠습니다.
데이터의 삽입은 아래와 같이 수행됩니다.
1. 루트를 current 노드로 설정
2. 삽입할 노드의 값이 current 노드의 값보다 작으면 새로운 current 노드를 current 노드의 왼쪽 자식으로, 값이 크면 새로운 current 노드를 current 노드의 오른쪽 자식으로 설정
3. 현재 current값이 null이면 새로운 노드를 current 노드의 값으로 삽입 후 루프를 종료
4. 현재 crruent값이 null이 아니라면 2-3번 항목을 반복해서 수행

위 내용을 참고하여 코드를 구현해보겠습니다.
```javascript
class BST {
    ...
    insert(data) {
        const newNode = new Node(data); // 추가할 데이터의 노드를 생성합니다.
        if (this.root === null) { // 루트노드에 값이 없으면 루트로 지정하고 종료합니다.
            this.root = newNode;
            return;
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
    }
}
```
<code>insert</code> 메서드는 재귀함수로 구현할 수 있고, 반복문으로 구현할 수 있습니다. 위 코드는 반복문으로 구현한 메서드이고, 재귀적으로 구현한 코드는 [BinarySearchTree.js](./BinarySearchTree.js)를 참조하시면 됩니다.

### 트리 탐색
이진 검색 트리는 3가지의 탐색 방법이 존재합니다.
* **중위 탐색**<code>inorder</code> : 왼쪽 노드값, 자신의 노드값, 오른쪽 노드값 순서로 탐색합니다. (가장 왼쪽노드가 먼저 나옵니다)
* **전위 탐색**<code>preorder</code> : 자신의 노드값, 왼쪽 노드값, 오른쪽 노드값 순서로 탐색합니다. (루트가 가장 먼저 나옵니다)
* **후위 탐색**<code>postorder</code> : 왼쪽 노드값, 오른쪽 노드값, 자신의 노드값 순서로 탐색합니다. (가장 왼쪽이 먼저 나오고, 루트가 가장 늦게 나옵니다)

구현은 재귀호출로 깔끔하게 구현할 수 있습니다.

#### 중위 탐색
먼저 중위탐색을 구현해보겠습니다.
중위 탐색은 루트를 현재 커서로 설정하고 왼쪽 노드값, 자신의 노드값, 오른쪽 노드값 순서로 탐색합니다.
```javascript
class BST {
    ...
    inOrder(node = this.root) {
        if (node !== null) {
            this.inOrder(node.left); // 왼쪽 노드부터 탐색하여 출력합니다.
            console.log(node.data); // 왼쪽 노드를 다 출력 후 자신의 값을 출력합니다.
            this.inOrder(node.right); // 오른쪽 노드를 출력합니다.
        }
    }
}
```

#### 전위 탐색
그다음 전위 탐색을 구현해보겠습니다.
전위 탐색은 루트를 현재 커서로 설정하고 자신의 노드값, 왼쪽 노드값, 오른쪽 노드값 순서로 탐색합니다.
```javascript
class BST {
    ...
    preOrder(node = this.root) {
        if (node !== null) {
            console.log(node.data); // 자신의 값을 출력합니다.
            this.preOrder(node.left); // 왼쪽 노드부터 탐색하여 출력합니다.
            this.preOrder(node.right); // 오른쪽 노드를 출력합니다.
        }
    }
}
```

#### 후위 탐색
마지막으로 후위 탐색을 구현해보겠습니다.
후위 탐색은 루트를 현재 커서로 설정하고 왼쪽 노드값, 오른쪽 노드값, 자신의 노드값 순서로 탐색합니다.
```javascript
class BST {
    ...
    postOrder(node = this.root) {
        if (node !== null) {
            this.postOrder(node.left); // 왼쪽 노드부터 탐색하여 출력합니다.
            this.postOrder(node.right); // 오른쪽 노드를 출력합니다.
            console.log(node.data); // 자신의 값을 출력합니다.
        }
    }
}
```

### 데이터 검색
앞에서 살펴본 탐색방법은 다양한 용도로 사용할 수 있습니다.
그 중 몇가지에 대해서 알아 보겠습니다.

#### 최소값과 최대값 검색
이진 검색 트리에서는 비교적 간단하게 최소값과 최대값을 검색할 수 있습니다.
최소값은 항상 왼쪽 자식에 있으므로, 왼쪽 자식이 null일 때까지 내려가면 됩니다.
반대로 최대값은 항상 오른쪽 자식에 잇으므로, 오른쪽 자식이 null일 떄까지 내려가면 됩니다.

최소값과 최대값을 구현해보도록 하겠습니다.
#### 최소값 구하기
반복문을 이용해서 left가 null이 나올 때까지 내려가면 됩니다.
메소드의 매개변수 node는 지정된 값이 없다면 루트 노드부터 탐색을 하며 노드를 지정하면 해당 노드 하위로 탐색을 합니다.
```javascript
class BST {
    ...
    getMin(node = this.root) {
        let curr = node;
        while (curr.left !== null) {
            curr = curr.left;
        }
        return curr.data;
    }
}
```

#### 최대값 구하기
반복문을 이용해서 right가 null이 나올 때까지 내려가면 됩니다.
메소드의 매개변수 node는 지정된 값이 없다면 루트 노드부터 탐색을 하며 노드를 지정하면 해당 노드 하위로 탐색을 합니다.
```javascript
class BST {
    ...
    getMax(node = this.root) {
        let curr = node;
        while (curr.right !== null) {
            curr = curr.right;
        }
        return curr.data;
    }
}
```

#### 특정값 검색
위에서 작성한 최소값 최대값을 응용해서 이제는 특정값을 검색하는 기능을 구현해보겠습니다.
현재 커서의 값과 검색할 값이 같이면 해당 값을 출력하고, 크기를 비교해서 왼쪽으로 갈지 오른쪽으로 갈지를 정해주기만 하면 됩니다.
```javascript
class BST {
    ...
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
}
```

### 데이터 삭제
이제 트리에 삽입된 노드를 삭제하는 기능을 구현해보겠습니다.
이것은 삽입이나 검색보다는 조금 복잡합니다.
삭제할 대상 노드와 이 노드의 자식 구성에 따라 방식이 조금씩 차이가 있습니다.
1. 먼저 삭제할 대상 노드을 검색합니다.
2. 대상 노드의 자식이 있는지 확인합니다.
3. 대상 노드의 자식이 없다면 대상 노드의 부모에 참조된 값을 null로 변경합니다.
4. 대상 노드의 자식이 한개라면 대상 노드의 부모에 참조된 값을 대상노드의 자식과 연결합니다.
5. 대상 노드의 자식이 두개 다 있다면 두 가지의 방법이 있습니다.
    * 왼쪽 자식 중 가장 큰 값 또는 오른쪽 자식 중 가장 작은값을 찾아서 대상 노드의 값으로 변경합니다.
    * 왼쪽 자식 중 가장 큰 값으로 검색했다는 가정하에 대상의 왼쪽 노드를 기준으로 가장 큰 값을 삭제합니다.
    * 삭제할 값이 null이 나올 떄까지 반복적으로 삭제합니다.
6. 대상 노드가 루트노드라면 BST에 참조된 루트 정보도 바꿔줍니다.

그렇지만 재귀적 호출을 이용하여 코드를 줄일 수 있습니다.
위 명세를 바탕으로 구현해보겠습니다.
```javascript
class BST {
    ...
    remove(value) { // 루트의 변경을 처리하기 위해 삭제 메서드를 한번 감싼 메서드입니다.
        const node = this._remove(value, this.root);
        if (node) {
            this.root = node;
        }
    }

    _remove(value, node = this.root) { // 실제로 삭제 작업이 처리되는 메서드입니다.
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
```
