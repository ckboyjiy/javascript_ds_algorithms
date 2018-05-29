# 스택 - Stack
* 스택은 가장 윗 부분에서만 자료의 추가 및 삭제가 일어납니다.
* 실행속도가 빠르다.
* 구현이 쉽다.
* 수식 평가 및 함수 호출까지 프로그래밍의 다양한 영역에서 스택이 사용됩니다.

## 스택의 동작
스택은 잘 알려진 것처럼 후입선출(LIFO - Last-In, First-Out) 자료구조입니다.

뷔페에 쌓인 접시를 생각하면 쉽습니다.
손님들은 가장 위에 놓인 접시를 꺼내가고, 직원들 또한 새로운 접시를 가장 위에 쌓습니다.

후입선출의 특성으로 스택의 최상단에 있지 않은 요소에는 접근할 수 없습니다.
가장 아래의 요소에 접근하려면 모든 요소를 제거하는 수밖에 없습니다.

이것을 기능적으로 분류해보면 아래와 같습니다.
* 요소를 밀어 넣다.
* 요소를 꺼낸다.
* 가장 위에 요소가 무엇인지 확인한다.

## 스택의 구현
스택 또한 강력한 자바스크립트의 배열로 모두 구현이 가능합니다.
다만 우리는 스택이라는 제약사항을 고려하여 자바스크립트의 배열을 한번 감싸서 스택이라는 클래스로 만들어 볼 것입니다.

### 생성자 함수
우리는 내부적으로 자바스크립트의 배열을 이용해서 스택을 만들려고 합니다.
생성자 함수에 멤버로는 배열 하나만 있으면 될 것 같습니다.
```javascript
class Stack {
    constructor() {
        this.dataStore = [];
    }
}
```


### 요소 밀어 넣기
스택에서 요소 추가는 가장 상단(우측)에 추가해야 합니다.
배열의 push() 메소드를 사용합시다.
```javascript
class Stack {
    ...
    push(element) {
        this.dataStore.push(element);
```

### 요소 꺼내기
스택에서 요소를 꺼내는 것은 가장 상단부터 하나씩 꺼내야 합니다.
배열의 pop() 메소드를 사용합시다.
```javascript
class Stack {
    ...
    pop() {
        return this.dataStore.pop();
    }
}
```

### 상단 요소 확인
스택의 최상단 요소를 확인하는 것은 넣거나 꺼내는 것과 같이 한줄 코드로는 불가능합니다.
우리는 스택 내부에 배열에 값을 저장을 하고 있었고, 그 배열의 현재 길이를 확인한 후 한개라도 요소가 있다면 마지막 인덱스를 지정해서 값을 확인해야 합니다.
```javascript
class Stack {
    ...
    peek() {
        if (this.dataStore.length > 0) {
            return this.dataStore[this.dataStore.length - 1];
        } else {
            return null;
        }
    }
```

이렇게 최소한으로 스택이 가져야하는 기능을 구현해 보았습니다.
그 외의 기능들은 Stack.js 파일을 참고해보길 바랍니다.

## 스택의 이용
스택을 이용하면 다양한 문제를 손쉽게 해결할 수 있습니다.

### 진법 변환
숫자 A를 어떤 진법에서 다른 진법 B로 변환할 때는 어떠한 작업이 필요할까요?

1. A를 B로 나눈다.
1. 그 몫을 B로 나눈 몫이 0일 때까지 반복해서 나눈다.
1. 나누면서 발생한 나머지를 가장 최근에 나온 나머지부터 나열한다.

이것을 알고리즘으로 표현하면 어떻게 되나요?
* A = 진법을 변환할 숫자
* B = 변환할 진법
* C = 나머지를 저장할 스택
1. A / B의 나머지를 C 스택에 추가
2. A / B의 몫을 A로 다시 치환
3. A / B의 몫이 0이 나올 때까지 1,2 반복
4. C의 스택을 하나씩 꺼내어 숫자인 문자열을 생성

코드로 구현하면 아래와 같습니다.
우리가 만든 Stack 클래스를 이용해서 mulBase라는 함수를 만들겠습니다.
mulBase의 매개변수는 변환할 숫자 num과 변환할 진법 base를 받습니다.
```javascript
function mulBase(num, base) {
    let s = new Stack();
    let target = num;
    do {
        s.push(target % base); // 1.
        target = Math.floor(target / base); // 2.
    } while(target > 0); // 3.

    let result = ''; // 4.
    while(s.peek() !== null) {
        result += s.pop();
    }
    return result;
}
```
코드의 주석에 위에서 작성한 알고리즘 번호를 달아 놓았습니다.
우리는 스택을 이용해서 간단한 진법 변환 함수를 만들어 보았습니다.
물론 이 진법 변환은 2~9진법까지만 사용할 수 있습니다.

### 회문
스택을 이용해서 회문인지 판단할 수 있습니다.
회문은 앞으로 읽으나 뒤로 읽으나 같은 단어, 구절, 숫자를 뜻 합니다. '토마토'같이 말이죠.

알고리즘은 간단합니다.
1. 문자열을 앞글자 하나씩 스택에 담습니다.
2. 스택에 담은 문자열을 하나씩 꺼내서 새로운 문자열로 만듭니다.
3. 기존 문자열과 새로운 문자열이 같은지 비교합니다.

우리는 Stack 클래스를 이용해서 isPalindrome함수를 만들어 보겠습니다.
이 함수는 매개변수로 회문여부를 조사할 문자열 word 하나만 받고, 결과값으로 true, false를 반환하도록 하겠습니다.
```javascript
function isPalindrome(word) {
    let s = new Stack();
    for (let c of word) { // 1.
        s.push(c);
    }

    let reverse = '';
    while (s.peek() !== null) { // 2.
        reverse += s.pop();
    }

    if (word === revers) { // 3.
        return true;
    } else {
        return false;
    }
}
```
이렇게 회문 검사 함수도 만들어 보았습니다.

### 재귀
스택은 컴퓨터 프로그래밍에서도 많이 사용됩니다.
그중 재귀를 구현할 때 스택을 사용합니다. 컴퓨터 프로그래밍에서 사용되는 재귀 프로시저를 우리가 만들기는 어렵고, 비슷하게 팩토리얼 함수를 재귀로 구현해보도록 하겠습니다.

5의 팩토리얼은 다음과 같이 습니다.
<pre><code>5! = 5 * 4 * 3 * 2 * 1 = 120</code></pre>

n의 팩토리얼을 구하는 재귀적 함수 호출은 아래와 같습니다.
```javascript
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n-1);
}
```

우리가 만든 Stack 클래스를 이용해서 팩토리얼을 구하는 것을 시뮬레이션 해보도록 하겠습니다.
작업하기 전에 우리의 알고리즘을 표현해봅시다.
1. n부터 n을 1씩 빼가면서 n이 1보다 클 때까지 스택에 담습니다.
2. 스택에서 한개씩 꺼내서 곱합니다.

```javascript
function fact(n) {
    let s = new Stack();
    while (n > 1) {
        s.push(n--);
    }

    let result = 1;
    while (s.peek() !== null) {
        result += s.pop();
    }
    return result;
}
```

이상 자바스크립트의 스택 자료구조에 대해서 살펴보았습니다.