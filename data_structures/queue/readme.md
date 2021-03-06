# 큐 - Queue
* 큐의 자료 삽입은 뒷 부분에서만 일어납니다.
* 큐의 앞부분에서는 데이터가 삭제됩니다.
* 큐는 일어난 순서대로 데이터를 저장하는 자료구조로 스택과는 반대의 순서로 처리됩니다.
* 운영 체제의 프로세스 처리 순서, 프린트 스풀러 등에서 큐를 사용합니다.

## 큐의 동작
큐는 선입선출(First-In, First-Out) 자료구조입니다.
은행의 또는 식료품점 등의 대기줄을 생각하시면 됩니다. 가장 먼저온 사람부터 처리가 됩니다.

큐에 요소를 삽입하는 동작을 인큐(enqueue),
요소를 삭제하는 동작을 데큐(dequeue)라고 합니다.
인큐는 큐의 끝부분부터 데큐는 큐의 앞부분부터 처리됩니다.

위 내용으로 부터 큐의 기능을 요약해 보겠습니다.
* 요소를 뒤로 밀어 넣다.
* 요소를 앞에서 꺼낸다.
* 가장 앞의 요소가 무엇인지 확인한다.

## 큐의 구현
큐 또한 강력한 자바스크립트의 배열로 모두 구현이 가능합니다.
다만 우리는 큐라는 제약사항을 고려하여 자바스크립트의 배열을 한번 감싸서 큐이라는 클래스로 만들어 볼 것입니다.

### 생성자 함수
우리는 내부적으로 자바스크립트의 배열을 이용해서 큐를 만들려고 합니다.
생성자 함수에 멤버로는 배열 하나만 있으면 될 것 같습니다.
```javascript
class Queue {
    constructor() {
        this.dataStore = [];
    }
}
```

### 요소 밀어 넣기
스택에서 요소 추가는 가장 상단(우측, 끝)에 추가해야 합니다.
배열의 push() 메소드를 사용하여 enqueue 메서드를 만듭니다.
```javascript
class Queue {
    ...
    enqueue(element) {
        this.dataStore.push(element);
```

### 요소 꺼내기
큐에서 요소를 꺼내는 것은 가장 앞부터 하나씩 꺼내야 합니다.
배열의 shift() 메소드를 사용하여 dequeue 메서드를 만듭니다.
```javascript
class Queue {
    ...
    dequeue() {
        return this.dataStore.shift();
    }
}
```

### 맨 앞 요소 확인
스택과 달리 첫번째 요소를 확인하는 것은 간단합니다.
```javascript
class Queue {
    ...
    peek() {
        return this.dataStore[0];
    }
```

이렇게 최소한으로 큐가 가져야하는 기능을 구현해 보았습니다.
그 외의 기능들은 Queue.js 파일을 참고해보길 바랍니다.

## 큐의 이용
큐는 순서대로 줄을 서는 상황에서 순차적으로 처리하기 위해 자주 사용됩니다.

### 은행의 대기순서 처리
은행에 창구직원은 A, B, C로 3명이서 근무를 하고 있습니다.
대기줄 D는 각기 다른 업무를 보는 손님들이 줄 서 있습니다.

이렇게 구현할려고 합니다.
먼저 대기줄 D라는 큐를 만들고 큐에는 업무 소요시간을 뜻하는 정수를 담습니다.
창구직원 A, B, C는 큐에서 한 고객씩 업무를 처리하고 업무가 끝나면 다음 고객을 받습니다.

먼저 고객 대기 큐는 간단하게 고객의 업무 소요 시간만 담도록 하겠습니다.

그리고 창구직원 클래스를 만들겠습니다.
창구직원마다 이름이 있겠죠? 생성자 함수에 이름을 받아 저장합니다.
그리고 고객을 받아서 업무를 처리하는 메서드가 필요합니다.
메서드는 처리할 대기 큐를 받아서 해당 큐에서 고객을 한명씩 처리합니다.
```javascript
class BankTeller {
    constructor(name) { // 창구직원의 이름을 받아 저장합니다
        this.name = name;
    }
    receive(q) { // 처리할 고객대기 큐를 받아 한명씩 처리합니다.
        if (q.peek() !== undefined) { // 대기 고객이 있으면 업무를 처리합니다.
            let guest = q.dequeue(); // 고객을 한명 받습니다.
            console.log(this.name, guest); // 업무 처리 중
            if (typeof guest === 'number') {
                setTimeout(() => { // 업무처리가 완료되면
                    this.receive(q); // 다음 고객을 받습니다.
                }, guest * 1000);
            }
        }
    }
}
```
창구직원 클래스가 완성되었습니다.
이제 은행을 오픈하고 고객을 받아 보겠습니다.
```javascript
// 대기큐와 창구직원을 생성합니다.
const queue = new Queue();
const A = new BankTeller('A');
const B = new BankTeller('B');
const C = new BankTeller('C');

// 고객을 초기화합니다. 큐에 저장되는 값은 고객의 업무 처리 시간입니다.
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(6);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(1);
queue.enqueue(5);
queue.enqueue(2);

// 창구직원이 업무를 시작합니다.
A.receive(queue);
B.receive(queue);
C.receive(queue);
```
이러게 큐를 이용해서 은행 업무를 만들어 보았습니다.

### 큐로 데이터 정렬하기
단순히 시뮬레이션하는 용도 뿐만 아니라 데이터를 정렬할 때도 큐를 사용할 수 있습니다.
큐를 사용해서 정렬을 하는 기수 정렬이라는 간단한 알고리즘이 있습니다.

기수정렬은 0부터 9까지 단위의 수를 담을 큐가 필요합니다.
그리고 정렬할 숫자들의 가장 오른쪽 한 자리 숫자씩 비교해서 0부터 9까지 분류를 합니다.
분류된 숫자를 다시 순서대로 꺼내서 하나의 배열로 합치고 그렇게 한자리씩 올라가면서 재정렬 재정렬 하다보면 나도 모르게 정렬이 되어 있습니다.

글로만 설명하려니 한계가 있습니다.
코드로 표현해 보겠습니다.
```javascript
// 정렬할 숫자 배열을 정의합니다.
const nums = [1, 10, 1001, 5, 55, 5005, 501, 15, 101, 1005, 11, 505, 5001, 51, 105];
// 정렬 숫자들의 최대 자릿수를 지정합니다. 물론 위 배열을 검사해서 동적으로 최대 자릿수를 구하셔도 됩니다.
const maxdigit = 4;

//0~9 단위의 큐를 준비합니다. 각 큐는 다시 배열에 담아서 관리하겠습니다.
const queues = []; // 큐들을 담을 배열
for (let i = 0; i < 10; i++) {
    queues.push(new Queue());
}

let target = nums; // 정렬할 배열을 별도 변수에 저장합니다.
for (let i = 0; i < maxdigit; i++) { // 비교할 최대 자리수 만큼 반복해서 수행합니다.
    target.forEach( v => { // 정렬할 값을 배열에서 하나씩 꺼내서 비교합니다.
        // 1. 비교할 값 v가 현재 검사하는 자리수보다 작으면 무조건 0큐에 넣습니다. 현재 자릿수는 Math.pow(10, i)로 확인합니다.
        // 2. 위 대상이 아닌 경우, 현재 검사 자릿수를 추출하여 해당 큐에 값을 담습니다.
        const idx = v >= Math.pow(10, i) ? Math.floor(v / Math.pow(10, i)) % 10 : 0;
        queues[idx].enqueue(v);
    });

    // 분류한 큐를 다시 하나의 배열로 담습니다.
    target = [];
    queues.forEach(v => {
        while (!v.empty()) {
            target.push(v.dequeue());
        }
    });

    // 반복해서 작업합니다.
}
```

큐에 넣고 빼고를 반복하면서 정렬하는 기수정렬 알고리즘 구현을 완료하였습니다.

이만 자바스크립트로 만든 큐에 대한 이야기를 마치겠습니다.
저장소에 올려진 Queue.js에는 이 가이드 문서와 다른 형태로 개발된 메소드명이 있습니다.
이것은 큐의 앞에 값뿐만 아니라 가장 뒤에 값도 확인하는 메소드를 추가하다 보니 네이밍 규칙을 맞출려고 변경해 놓았음을 알려드립니다.

## 다양한 큐 구현
* [우선순위 큐](./PriorityQueue)