# 자바스크립트 자료구조와 알고리즘
C#, 자바와 같은 일반적인 객체지향 언어에서 사용되는 자료구조와 알고리즘에 대한 자바스크립트식 구현

## 저장소 구조
* advanced : 고급 알고리즘 구현 소스 및 가이드
* data_structures : 자료구소 구현 소스 및 가이드
* search : 검색 알고리즘 구현 소스 및 가이드
* sort : 정렬 알고리즘 구현 소스 및 가이드
* spec : 자료구조 및 알고리즘에 대한 테스트 코드

## 자료구조
* [스택 (Stack)](./data_structures/stack)
* [큐 (Queue)](./data_structures/queue)
* [연결리스트 (Linked List)](./data_structures/linkedList)
* [이진검색트리 (Binary Search Tree)](./data_structures/binarySearchTree)
* [그래프 (Graph)](./data_structures/graph)

##  기본 알고리즘

### 정렬 알고리즘
* [버블정렬 (Bubble Sort)](./sort/bubbleSort)
* [선택정렬 (Selection Sort)](./sort/selectionSort)
* [삽입정렬 (Insertion Sort)](./sort/insertionSort)
* [셀정렬 (Shell Sort)](./shellSort)
* [병합정렬 (Merge Sort)](./mergeSort)
* [퀵정렬 (Quick Sort)](./quickSort)

### 검색 알고리즘
* [순차검색 (Linear Search)]()
* [이진검색 (Binary Search)]()

### 고급 알고리즘
* [동적 프로그래밍 (Dynamic Programming)](./advanced)
* 탐욕 알고리즘 (Greed Algorithm)

#### 그래프 알고리즘
* [다익스트라 알고리즘](./advanced/graph/single_source_shortest_path)
* [플로이드 워셜 알고리즘](./advanced/graph/all_pairs_shortes_path)
* [최소신장 알고리즘](./advanced/graph/minimum_spanning_tree)
* [TSP 알고리즘](./advanced/graph/travelling_salesman_problem)

### 예제들의 실행과 테스트
이 저장소에서 제공하는 예제들은 단위 테스트 코드를 포함하고 있습니다.
해당 코드들은 ES6 모듈 기반으로 작성이 되어 있어 실행을 하기에 앞서 트랜스파일링이 필요합니다.

단위 테스트 코드는 모카<code>Mocha</code>와 차이<code>chai</code>를 통해 구성되어 있습니다.
모카의 옵션으로 <code>--require babel-register</code>를 추가하여 바벨을 통한 트랜스파일링을 하셔야 합니다.