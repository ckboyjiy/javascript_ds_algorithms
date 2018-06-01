# 연결 리스트 - Linked List
스택과 큐에서 이야기한 것 처럼 자바스크립트의 배열은 많은 기능 함수들을 가지고 있기 때문에 특별히 리스트 자료구조에 대한 포스트는 하지 않았습니다.
하지만 연결 리스트에 대한 학습을 하기 전에 먼저 리스트에 대한 간략한 요점과 일반적인 리스트(배열 리스트)와 연결 리스트의 비교를 먼저 해보도록 하겠습니다.

## 리스트 - List
리스트는 저장할 데이터가 많지 않을 때 유용하게 활용할 수 있습니다.

리스트는 아래와 같은 조건에서 유용합니다.
* 항목을 검색할 필요가 없을 때
* 일정한 순서로 항목을 집어넣을 필요가 없을 때

리스트는 아래와 같은 조건에서는 도움이 안됩니다.
* 시간이 많이 소요되는 검색을 수행할 때 (조건이 복잡할 때)
* 복잡한 정렬이 필요할 때(역시 조건이 복잡할 때)
* 즉, 복잡한 자료구조와는 맞지 않습니다.

일반적으로 말하는 리스트는 내부적으로 순서(index 또는 sequence)가 있는 리스트로 배열 리스트(Array List)라고 합니다.

이 문서에서 살펴 볼 리스트는 연결 리스트로 배열 리스트와는 확실한 차이점이 있습니다.

## 리스트와 연결 리스트
자바스크립트의 배열도 결국 객체입니다. 또한 다른 언어에 비해 풍부한 기능 함수들을 가지고 있습니다.
이말은 결국 다른 언어의 배열에 비해 효율이 떨어진다는 이야기입니다.

배열을 사용하여 성능적인 문제가 발생된다면 대안으로 연결리스트를 사용할 수 있습니다.
그렇다고 무조건 연결 리스트가 좋은 건 아닙니다.

* **리스트** : **빠른 읽기**, 느린 추가/삭제 (순차적 추가/삭제는 빠름)
* **연결 리스트** : 느린 읽기, **빠른 추가/삭제** (데이터가 많을 수록 접근성이 떨어짐)

## 연결 리스트 - Linked List
연결 리스트는 노드(node)라는 객체가 모여 연결 리스트를 구성합니다.
각 노드는 객체 참조를 통해 리스트의 다른 노드와 연결을 유지합니다.

인덱스로 요소를 참조하는 배열 또는 리스트와 달리 연결 리스트는 다른 요소와의 관계를 통해 원하는 요소를 참조할 수 있습니다.

아무리 노드와 노드간의 참조로 구성이 된다고 하여도, 어디서부터 시작할 것인가 하는 문제가 있습니다.
이것은 일반적으로 헤더라고 표현되는 특별한 노드를 이용해서 연결 리스트의 시작점을 관리합니다.

## 구현
연결 리스트의 주요 구성요소는 노드와 연결리스트로 나눌 수 있습니다.
연결 리스트에는 리스트의 시작 노드를 참조하는 헤더와 다양한 기능함수들로 구성되어 있습니다.
노드에는 노드의 객체 또는 값을 저장하는 변수와 다음 노드의 정보를 가지고 있습니다.

### 노드 - Node
먼저 노드를 구현해 보겠습니다.
```javascript
class Node {
    constructor(element) {
        this.element = element; // 저장할 객체 또는 값
        this.next = null; // 다음 연결될 참조 노드
    }
}
```
노드는 실제 값을 저장할 element라는 변수와 다음 노드를 참조할 next라는 변수로 구성되어 있습니다.

### 연결 리스트 - Linked List
다음으로 노드를 관리하는 연결 리스트를 구현해 보겠습니다.
```javascript
class SimpleLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
}
```
연결 리스트의 멤버변수는 노드의 시작점을 뜻하는 head와 삽입된 노드의 갯수를 뜻하는 length가 있습니다.
연결 리스트의 기본적인 메서드로는 노드 삽입, 노드 삭제, 노드 검색 등이 있을 것 입니다.
하나씩 구현해 보겠습니다.

#### 노드 탐색
아래는 노드 탐색을 구현한 코드입니다. 단지 숫자로 전달된 매개변수를 이용해서 해당 순번의 노드를 반환하는 단순한 탐색을 구현해 보겠습니다.
```javascript
class SimpleLinkedList {
    ...
    find(index) {
        if (typeof index === 'number') {
            let currIndex = 0; // 현재 탐색 중인 노드의 인덱스입니다.
            if (index < 0 || index > this.length) { // 찾으려는 인덱스가 삽입된 노드 길이보다 크다면
                return null; // null 반환합니다.
            }
            let target = this.head; // 최초 시작 노드를 설정합니다.
            while (currIndex !== index) { // 찾는 인덱스와 현재 인덱스가 같지 않으면
                target = target.next; // 다음 인덱스의 노드로 변경합니다.
                currIndex++;
            }
            return target; // 탐색한 노드를 반환합니다.
        }
    }
}
```

#### 노드 삽입
노드를 삽입하는 메서드를 만들어 보려고 합니다.
자료의 삽입은 단순히 삽입만 발생하지 않습니다. 삽입 전에 어디에 삽입을 할지 조회하는 작업이 필요합니다.
Java의 LinkedList는 삽입 메서드로 삽입할 자료와 인덱스 번호를 받아 해당 순번의 자료를 찾은 후 그 뒤에 자료를 삽입합니다.
혹, 어떤 경우는 인덱스 대신 검색할 자료를 넘겨 해당 자료를 탐색하기도 합니다.

위에서 이미 만든 탐색 메서드를 이용하여 삽입할 자료의 위치를 탐색 후 자료를 삽입하도록 하겠습니다.

<code>add()</code> 메서드는 다음과 같은 매개변수를 받을 예정입니다.
##### 매개변수
* item : 리스트에 추가할 값입니다.
* index : 선택사항, 해당 인덱스 뒤에 자료를 삽입합니다.
```javascript
class SimpleLinkedList {
    ...
    add(data, index) { // index가 지정되지 않으면 가장 마지막으로 노드를 삽입합니다.
        let target = this.head;
        let newNode = new Node(data); // 삽입할 노드를 생성합니다.
        if (index !== null && index !== undefined) { // 인덱스가 있다면
            target = this.find(index); //삽입할 위치를 탐색합니다.
            if (target !== null) { // 삽인된 노드가 하나라도 있다면
                newNode.next = target.next; // 삽입할 노드의 next에 검색한 노드의 next를 연결합니다.
                target.next = newNode; // 검색한 노드의 next는 삽입할 노드로 연결합니다.
                this.length++; // 삽입된 개수를 증가시킵니다.
            } else { // 해당 인덱스로 검색한 결과가 없으면
                // 아무 작업도 하지 않는다.
            }
        } else { // 인덱스가 없다면
            if (target) { // target이 null이 아니면, 즉, 리스트에 한개라도 삽입된 노드가 있다면
                while (target.next) { // target.next가 null일 때까지 탐색합니다. 즉, 가장 마지막 노드를 찾습니다.
                    target = target.next;
                }
                target.next = newNode; // 마지막 노드의 next에 새로운 노드 newNode를 연결합니다.
            } else { // target이 null이면, 즉, 리스트에 삽입된 노드가 없다면
                this.head = newNode; // head에 newNode를 지정
            }
            this.length++; // 삽입된 개수를 증가시킵니다.
        }
    }
```
코드의 라인수는 좀 있지만 복잡한 로직보다는 단순 분기처리가 많습니다.
결론적으로는 삽입할 위치 탐색 후 삽입이라는 절차에 충실합니다.

#### 노드 삭제
삽입의 경우는 삽입할 위치의 앞 노드를 탐색 후 해당 노드의 next값을 교체하는 방식이었습니다.
삭제의 경우는 삭제할 인덱스의 앞의 노드를 탐색하여 next값을 삭제할 노드의 next로 교체하는 방식으로 동작합니다.
```javascript
class SimpleLinkedList {
    ...
    remove(index) {
        let prevNode = this.find(index - 1);
        if (prevNode) {
            prevNode.next = prevNode.next.next;
            this.length--;
        }
    }
}
```

이렇게 노드의 탐색, 삽입, 삭제의 기능을 가진 단순한 연결 리스트를 만들어 보았습니다.

동일 저장소에 조금 다른 기능으로 구성한 <code>LinkedList.js</code>가 있으니 참고바랍니다.

## 양방향 연결 리스트 - DoublyLinkedList
위에서 살펴본 연결 리스트는 노드에 다음 노드를 가르키는 next만 존재했습니다. 그렇기 때문에 첫 번째 노드에서 마지막 노드까지는 쉽게 탐색할 수 있지만, 역방향으로의 탐색은 쉽지 않습니다.
노드에 이전 노드의 링크도 추가하여 관리하는 것이 바로 양방향 연결 리스트입니다.

먼저 노드 클래스에 next 외에 previous 변수를 추가하겠습니다.
```javascript
class Node {
    constructor(element) {
        this.element = element; // 저장할 객체 또는 값
        this.next = null; // 다음 노드 링크
        this.prev = null; // 이전 노드 링크
    }
}
```

### 노드의 삽입
노드의 삽입에서는 이전노드, 추가될 노드, 다음노드에 각각 추가된 prev 값을 설정하도록 수정해야 합니다.
```javascript
class DoublyLinkedList {
    ...
    add(data, index) {
        let prevNode = this.head;
        let newNode = new Node(data);
        if (index !== null && index !== undefined) {
            prevNode = this.find(index);
            if (prevNode !== null) {
                let nextNode = prevNode.next;
                newNode.next = nextNode;
                nextNode.prev = newNode; // 다음 노드의 prev에 추가될 노드를 지정합니다.
                prevNode.next = newNode;
                newNode.prev = prevNode; // 추가될 노드의 prev에 이전 노드를 지정합니다.
                this.length++;
            }
        } else {
            if (prevNode) {
                while (prevNode.next) {
                    prevNode = prevNode.next;
                }
                prevNode.next = newNode;
                newNode.prev = prevNode; // 추가될 노드의 prev에 이전 노드를 지정합니다.
            } else {
                this.head = newNode;
            }
            this.length++;
        }
    }
}
```

### 노드의 삭제
노드의 삭제는 구조적으로는 간단하지만 코드적으로는 좀 길어집니다.
```javascript
class DoublyLinkedList {
    ...
    remove(index) {
        let currNode = this.find(index); // 이번엔 삭제할 인덱스를 바로 탐색합니다.
        if (currNode) {
            if (currNode.prev) { // 이전 노드가 있다면
                currNode.prev.next = currNode.next; // 이전노드의 next를 다음노드로 연결합니다.
            }
            if (currNode.next) { // 다음 노드가 있다면
                currNode.next.prev = currNode.prev; // 다음노드의 prev를 이전노드로 연결합니다.
            }
            if (index === 0) { // 첫번째 노드를 삭제한다면
                this.head = currNode.next; // head값을 재설정합니다.
            }
            currNode.next = null; // 삭제할 노드의 연결정보를 삭제합니다.
            currNode.prev = null; // 삭제할 노드의 연결정보를 삭제합니다.
            this.length--;
        }
    }
}
```

이렇게 양방향 연결 리스트도 만들어 보았습니다.
혹시 이상한 점을 발견하신게 있으신가요?
가독성 있는 설명을 위해 현재 구성으로는 새로 추가할 노드를 연결 리스트의 맨 처음(head)으로 지정할 수 없습니다. 기회가 되시면 개인적으로 한번 코드를 수정해서 변경해보면 좋겠습니다.

## 그 외 연결 리스트

### 순환형 연결 리스트
순환형 연결 리스트는 마지막 노드의 next를 리스트의 head값으로 연결해서 뫼비우스의 띠처럼 끝없이 연결된 구조입니다.
양방향 리스트를 이용해서 역방향으로 탐색할 필요 없이 계속 다음 값을 참조하면 다시 앞쪽 노드를 탐색할 수 있습니다.

### 양방향 순환형 연결 리스트
양방향 순환형 연결 리스트는 예상하시는 것 처럼 양방향 연결 리스트의 첫 번째 노드의 이전 노드를 마지막 노드로, 마지막 노드의 다음 값은 첫 번째 노드로 연결하는 구조입니다.
예를 들면 TV 채널을 생각하시면 될 것 같습니다.