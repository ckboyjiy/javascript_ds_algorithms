export class SimpleLinkedList {
    constructor() {
        this.head = null; // 최초 삽입된 노드 참조
        this.length = 0; // 현재까지 삽입된 노드의 개수
    }
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
    remove(index) {
        let prevNode = this.find(index - 1);
        if (prevNode) {
            prevNode.next = prevNode.next.next;
            this.length--;
        }
    }
}

export class Node {
    constructor(element) {
        this.element = element; // 저장할 객체 또는 값
        this.next = null; // 다음 연결될 참조 노드
    }
}