# 그래프 - Graph
그래프는 정점과 간선으로 이루어져 있는 자료구조입니다.
우리가 흔히 보는 지도 또한 일종의 그래프라고 할 수 있습니다. 목적지가 정점이라면 그 목적지까지 연결된 도로는 간선입니다.
간선은 정점과 정점의 하나의 쌍으로 정의합니다. 정점은 무게 또는 비용을 포함할 수 있습니다.
간선에서 정점의 순서를 따지는 그래프를 방향성 그래프라고 합니다. 방향성 그래프는 화살표로 간선을 표시합니다.
방향성이 없는 그래프느를 무방향성 그래프 또는 그래프라고 합니다.

#### 정점
* 정점, 노드<code>node</code>, 버텍스<code>vertex</code>라고 표현
* 무게 또는 비용을 포함할 수 있음

#### 간선
* 간선, 엣지<code>edge</code>, 아크<code>arc</code>라고 표현
* 정점과 정점의 하나의 쌍으로 표현
* 정점에 순서가 있는 것을 방향성 그래프라고 함
* 정점에 순서가 없는 것을 무방향성 그래프 또는 그래프라고 함

#### 경로
* 모든 정점이 간선으로 연결되어 있는 묶음
* 경로의 길이는 경로의 첫 번째 정점에서 마지막 정점까지의 간선 수

#### 사이클
* 첫 번째 정점에서 마지막 정점으로 도달하는 하나 이상의 간선으로 이루어졌으며 경로가 같은 상황
* 단순 사이클 : 간선이나 정점이 반복되지 않는 경로
* 일반 사이클 : 첫 정점과 마지막 정점을 제외한 다른 정점이 반복되는 경로

#### 강한 연결
* 한 정점이 다른 정점과 연결되어 있고, 다른 정점도 한 정점과 연결되어 있는 경우

## 생활 속 그래프
* 도로 : 정점은 교차로, 간선은 도로
    1. 간선에 가중치를 추가하여 속도 제한 및 도로의 차선 수를 표현할 수 있음
    2. 그래프를 이용해 교통 체증 을 최소화할 수 있는 최적의 경로와 도로를 결정할 수 있음
* 이동수단 시스템(항공사 비행 시스템) : 정점은 공항, 간선은 비행 경로
    1. 간선에 가중치를 추가하여 공항 간의 비행 비용이나 공항간의 거리를 표현
* 근거리 통신망
* 인터넷과 같은 네트워크
* 소비자 시장

> 트리도 그래프의 일종입니다

## 구현
그래프 자체를 객체로 표현하기 보다는 정점과 간선을 객체로 표현하는 방식이 효율성면에서 더 좋습니다.

### 정점
이번에 만들어 볼 그래프에서의 정점은 단순히 식별자의 개념만 가지고 있습니다.
그래서 아래와 같이 간단하게 표현할 수 있습니다.
```javascript
class Vertex {
    constructor(data) {
        this.data = data;
    }
}
```

### 간선
실제 그래프의 구조를 표현하는 것은 간선의 역할입니다.
간선은 인접 행렬과 인접 리스트를 이용하는 두가지 방법이 있습니다.
인접 행렬은 구현은 간단하지만 공간의 효율성이 떨어집니다.
이번에는 인접 행렬이 아닌 인접 리스트를 이용해서 구현하도록 하겠습니다.
인접 리스트의 구성도 어렵진 않습니다.
from, to를 생각하면 좋을 것 같습니다. from을 출발지로 생각한다면 갈 수 있는 곳은 복수일 수 있습니다.
from을 리스트의 키로 생각한다면 to는 리스트의 값으로 배열로 구성됩니다.

먼저 코드부터 확인하겠습니다.
```javascript
class Edge {
    constructor(dest, weight = 0) {
        this.dest = dest;
        this.weight = weight;
    }
}
```
위에 간선을 설명할 때는 분명 출발지와 목적지의 두가지 요소가 있었는데 실제 구현한 코드에는 목적지만 있습니다.
구현하는 방법은 개인마다 조금씩 차이가 있습니다만, 저는 출발지는 정점 배열의 인덱스와 동일하게 관리를 하려고 합니다.

실제 이번 예제에서 사용하진 않지만 가중치를 의미하는 weight 변수도 추가해 보았습니다.

### 그래프
이제 그래프를 구현할 차례입니다.
그래프의 요소는 정점과 간선을 저장할 배열로 구성할 예정입니다.
먼저 생성자 함수를 구성해보겠습니다.
```javascript
class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }
}
```
이제 객체들의 구성은 완료되었습니다. 이제 실제 작동을 위한 기능을 하나씩 구현해보도록 하겠습니다.

### 정점 추가
가장 먼저 구현할 기능은 바로 정점을 추가하는 기능입니다.
정점의 추가는 간단합니다.
1. 그래프 객체의 <code>vertices</code> 배열에 정점 객체를 생성해서 추가합니다.
1. 그래프 객체의 <code>edges</code> 배열에 빈 배열 객체를 추가합니다.
```javascript
class Graph {
    ...
    addVertex(data) {
        this.vertices.push(new Vertex(data)); // 정점 추가
        this.edges.push([]); // 간선의 출발지 추가
    }
}
```
<code>vertices</code>와 <code>edges</code>의 인덱스는 동일한 정점의 인덱스를 가지고 있다고 보면 됩니다.

### 정점 탐색
이번에는 정점을 탐색하는 기능을 추가해보겠습니다.
정점 탐색은 <code>vertices</code>에 추가된 배열을 탐색하여 정점 객체의 <code>data</code>값을 비교해서 반환할 생각합니다.
```javascript
class Graph {
    ...
    findVertex(data) {
        return this.vertices.find( val => val.data === data);
    }
}
```
정점 객체 자체말고 정점의 인덱스를 탐색하는 기능도 한번 추가해보겠습니다.
```javascript
class Graph {
    ...
    findVertexIndex(data) {
        return this.vertices.findIndex( val => val.data === data);
    }
}
```
정점 탐색은 자바스크립트 배열의 강력한 내장 함수를 이용해서 간단하게 구현하였습니다.

### 정점 삭제
이번에는 정점의 삭제를 구현해보겠습니다.
삭제에는 아래와 같은 작업이 필요합니다.
1. 삭제할 정점의 인덱스 조회
1. <code>vertices</code> 배열에서 해당 인덱스를 제거합니다.
1. <code>edges</code> 배열에서 해당 인덱스를 제거합니다.
이미 우리는 정점의 인덱스를 조회하는 메서드를 만들어서 작업이 간단할 것 같습니다.
코드로 구현해보겠습니다.
```javascript
class Graph {
    ...
    removeVertex(data) {
        const idx = this.findVertexIndex(data); // 삭제할 정점의 인덱스를 조회
        this.vertices.splice(idx, 1); //정점 삭제
        this.edges.splice(idx, 1); // 간선 삭제
    }
}
```

### 간선 추가
위에서 우리는 정점의 추가, 조회, 삭제 기능을 구현을 했습니다. 이번에는 간선에 대한 기능을 구현해보겠습니다.
첫번 째로 간선의 추가를 구현해보겠습니다.

간선은 두 개의 정점으로 구성 됩니다.
현재 우리가 만드는 그래프는 무방향 그래프로 간선 A와 B는 <code>edges</code> 배열에 A배열에 B를 추가하고, B배열에 A를 추가합니다.
각 A와 B배열의 인덱스는 <code>vertices</code> 배열의 인덱스와 동일하기 때문에 우리가 이미 구현한 <code>findVertexIndex</code> 메서드를 이용해서 인덱스를 구할 수 있습니다.

저는 2가지의 경우로 구성을 하려고 합니다.
매개변수로 정점의 값을 넘기거나, 정점 객체 자체를 넘길 수도 있었으면 합니다.
코드를 구현해보겠습니다.
```javascript
class Graph {
    ...
    addEdge(data1, data2) {
        // 그래프에 저장된 각 정점의 인덱스를 준비합니다.
        const index1 = data1 instanceof Vertex ? this.findVertexIndex(data1.data) : this.findVertexIndex(data1);
        const index2 = data2 instanceof Vertex ? this.findVertexIndex(data2.data) : this.findVertexIndex(data2);
        // 그래프에 저장된 각 정점의 객체를 준비합니다.
        const obj1 = data1 instanceof Vertex ? data1 : this.findVertex(data1);
        const obj2 = data2 instanceof Vertex ? data2 : this.findVertex(data2);
        // 각 정점의 간선에 정점을 추가합니다.
        this.edges[index1].push(new Edge(obj2));
        this.edges[index2].push(new Edge(obj1));
    }
}
```
코드가 여러줄이긴 하지만 매우 간단하고 직관적인 구성을 가지고 있습니다.

### 간선 검색
간선 추가 기능을 구현했으니 간선을 검색할 수 있는 기능도 구현해보겠습니다.
간선 검색의 기능은 아래와 같이 정의하려고 합니다.
1. 하나의 정점과 연결된 모든 간선 검색
2. 두개의 정점이 연결되었는지 검색

검색 메서드의 매개변수는 최대 2개로 첫 번째 매개변수만 있으면 위의 1번 기능으로 검색하고,
두 번째 매개변수도 있다면 위의 2번의 기능으로 검색하고자 합니다.

또한 추가와 동일하게 매개변수로 받는 정점은 값일수도 있고 객체 자체일 수도 있어야 합니다.
코드로 구현해보겠습니다.
```javascript
findEdge(data1, data2) {
    // 그래프에 저장된 data1의 정점의 인덱스를 준비합니다.
    const index1 = data1 instanceof Vertex ? this.findVertexIndex(data1.data) : this.findVertexIndex(data1);

    if (data2) { // data1과 data2가 간선으로 연결되어 있는지 검색합니다.
        // 그래프에 저장된 data2의 정점의 객체를 준비합니다.
        const obj2 = data2 instanceof Vertex ? data2 : this.findVertex(data2);
        return this.edges[index1].filter(edge => edge.dest === obj2);
    } else { // data1에 연결된 간선 모두를 검색합니다.
        return this.edges[index1];
    }
}
```

### 간선 제거
간선에 대한 마지막 기능으로 제거가 남았습니다.

간선 제거는 일반적으로 두개의 정점을 받아서 두 정점에 연결된 간선을 제거합니다.
하지만 저희는 하나의 정점만 받아도 작동하도록 구현해볼까 합니다.
단 정점이 하나인 경우는 해당 정점에 연결된 모든 간선을 제거하도록 합시다.
또한 추가 및 검색과 동일하게 매개변수로 받는 정점은 값일 수도 있고 객체 자체일 수도 있어야 합니다.

조금 복잡하긴 합니다만 구현해보겠습니다.
```javascript
class Graph {
    ...
    removeEdge(data1, data2) {
        // 그래프에 저장된 data1의 정점의 인덱스를 준비합니다.
        const index1 = data1 instanceof Vertex ? this.findVertexIndex(data1.data) : this.findVertexIndex(data1);
        // 그래프에 저장된 data1의 정점의 객체를 준비합니다.
        const obj1 = data1 instanceof Vertex ? data1 : this.findVertex(data1);

        if (data2) { // data2가 있는 경우
            // 그래프에 저장된 data2의 정점의 인덱스를 준비합니다.
            const index2 = data2 instanceof Vertex ? this.findVertexIndex(data2.data) : this.findVertexIndex(data2);
            // 그래프에 저장된 data2의 정점의 객체를 준비합니다.
            const obj2 = data2 instanceof Vertex ? data2 : this.findVertex(data2);
            // data2의 edges 배열에 있는 data1의 인덱스
            const removeIndex1 = this.edges[index2].findIndex(edge => edge.dest === obj1);
            // data1의 edges 배열에 있는 data2의 인덱스
            const removeIndex2 = this.edges[index1].findIndex(edge => edge.dest === obj2);

            // data2의 edges 배열에서 data1의 인덱스 삭제
            this.edges[index1].splice(removeIndex2, 1);
            // data1의 edges 배열에서 data2의 인덱스 삭제
            this.edges[index2].splice(removeIndex1, 1);
        } else { // data2가 없는 경우
             this.edges[index1]
                 .map(edge => edge.dest) // 아래의 재귀 호출로 인해 배열이 순회하는 동안 삭제작업으로 인해 배열이 감소하게 됩니다. 그렇기 때문에 삭제 대상이 누락되기 때문에 삭제 대상을 먼저 배열로 반환합니다.
                 .forEach(dest => { // 반환된 삭제대상 항목을 다시 재귀하여
                     this.removeEdge(dest, obj1); // data1의 엣지 인접리스트에 있는 모든 정점과 data1 정점과의 간선을 제거한다.
                 });
         }
    }
}
```
사실 주석이 많아서 코드가 복잡해 보이지만 그렇게 복잡하진 않은 것 같습니다.

## 그래프 순회
그래프 순회(traversal)란 그래프의 모든 정점들을 체계적으로 방문하는 것입니다. 그래프 순회는 아래의 문제들을 푸는데 유용합니다.
* 주어진 그래프가 연결 그래프인지를 판정
* 연결 성분을 구하는 문제
* 사이클의 존재 여부를 판정하는 문제

그래프를 순회하는 방법으로 깊이 우선 검색(<code>depth first search</code>)과 너비 우선 검색(<code>breadth first search</code>)이 있습니다.

### 깊이 우선 검색 ( DFS - Depth First Search )
먼저 깊이 우선 검색에 대해 알아보겠습니다.
깊이 우선 검색은 정점을 방문할 때 갈 수 있는 데까지 우선 가보다가 더 이상 진행할 수 없으면 길을 거슬러 올라가면서 아직 가보지 않은 길이 있으면 그 길을 따라 또 갈 수 있는 데까지 가 보는 방법입니다.

이제 구현하는 방법을 알아보겠습니다.
1. 탐색을 완료한 정점을 기록할 변수가 필요합니다.
2. 재귀적으로 정점의 인접 리스트에서 방문하지 않았던 다른 정점을 방문합니다.

함수의 재귀적 호출은 결국 자바스크립트의 큐 스택을 이용하여 처리가 됩니다. 즉, 스택 자료구조를 활용해서 처리를 한다고 생각하시면 됩니다.

코드를 구현해보도록 하겠습니다.
```javascript
class Graph {
    ...
    /**
     * 깊이 우선 탐색
     * @param data : 방문 및 인접 리스트를 탐색할 정점의 값 또는 정점 객체입니다.
     * @param fn : 탐색만 하고 아무것도 안 할 것이 아니기에 탐색 시 처리할 작업을 정의할 수 있습니다.
     * @param visited : 이번 탐색을 통해 방문한 정점을 기록하는 배열입니다. 기본값은 빈 객체로 지정합니다.
     */
    dfs(data, fn, visited = {}) {
        const index = this.findVertexIndex(data); // 정점의 인덱스를 얻어옵니다.
        const vertex = this.findVertex(data); // 정점의 객체를 얻어옵니다.
        visited[index] = true; // 방문한 정점을 기록합니다.
        fn(vertex); // 탐색 시 진행할 작업을 처리합니다.
        this.edges[index].forEach( v => { // 정점의 인접 리스트를 재귀적으로 탐색합니다.
            const innerIndex = this.findVertexIndex(v.dest); // 인접한 정점의 인덱스를 얻어옵니다.
            if (!visited[innerIndex]) {  // 방문한 정점이 아니라면
                this.dfs(v.dest.data, fn, visited); // 해당 정점v를 기준으로 인접 리스트 탐색을 시작합니다.
            }
        });
    }
}
```

### 너비 우선 검색 ( BFS - Breadth First Search )
너비 우선 검색은 첫 번째 정점에서 인접한 정점을 모두 탐색 후 각 인접한 정점에 인접한 정점을 탐색하면서 더 이상 탐색할 정점이 없을 때까지 반복합니다.
굳이 비교 하자면 깊이 우선 검색이 스택을 기반한 검색이라면 너비 우선 검색은 큐를 기반으로 검색합니다.

1. 현재 정점을 방문 후 방문하지 않은 인접한 정점을 다음에 방문할 리스트(큐)에 추가합니다.
2. 더이상 방문할 정점이 없을 때까지 방문할 리스트의 맨 앞의 정점을 꺼내서 1번부터 반복합니다.
```javascript
class Graph {
    ...
    /**
     * 너비 우선 탐색
     * @param  data : 방문 및 인접 리스트를 탐색할 정점의 값 또는 정점 객체입니다.
     * @param fn : 탐색만 하고 아무것도 안 할 것이 아니기에 탐색 시 처리할 작업을 정의할 수 있습니다.
     * @param visited : 이번 탐색을 통해 방문한 정점을 기록하는 배열입니다. 기본값은 빈 객체로 지정합니다.
     */
    bfs(data, fn, visited = []) {
        const vertex = this.findVertex(data); // 정점의 객체를 얻어옵니다.
        const queue = []; // 탐색할 정점을 담을 대기 큐
        queue.push(vertex); // 첫 번째 정점을 큐에 담습니다.
        while(queue.length > 0) { // 큐에 더이상 탐색할 정점이 없을 때까지 반복합니다.
            const currVertex = queue.shift(); // 큐에서 탐색할 정점을 하나 꺼냅니다.
            const index = this.findVertexIndex(currVertex); // 정점의 인덱스를 얻어옵니다.
            if (!visited[index]) { // 방문한 정점이 아니면
                visited[index] = true; // 방문 기록을 남깁니다.
                fn(currVertex); // 방문 후 처리할 작업을 호출합니다.
                this.edges[index].forEach( val => { // 정점의 인접한 정점을 큐에 담습니다.
                    queue.push(val.dest);
                })
            }
        }
    }
}
```

## 최단 경로 찾기 (Shortest Path)
그래프를 이용해서 가장 많이 사용하는 동작은 바로 정점 간의 최단 경로를 찾는 것 입니다.
물론 최단 경로를 탐색하는 더 좋은 알고리즘도 있긴 합니다만 위에서 학습한 너비 우선 탐색을 가지고 최단 경로를 찾아보도록 하겠습니다.

## 너비 우선 검색을 통한 최단 경로 찾기
너비 우선 검색을 통한 방법은 2가지의 큰 틀에서 진행됩니다.
1. 시작 지점에서부터 갈 수 있는 모든 정점에 대한 간선 정보를 탐색합니다.
2. 위에 탐색한 간선 정보를 가지고 도작시점을 시작으로 도착지점으로 올 수 있는 임의의 간선을 하나 얻습니다.
3. 2번을 시작 지점이 나올 때까지 반복합니다.

위에서 수행하는 1번의 항목을 너비 우선 검색을 사용하여 해결할 것 입니다.
하지만 최단 경로를 찾기 위해서는 우리가 사용한 너비 우선 탐색을 조금 수정해야 합니다.

우리가 구현한 너비 우선 탐색에서 방문을 했다라고 체크했던 "visited[A]"는 "어딘가에서 이미 A에 왔었다"의 의미입니다.
하지만 우리가 필요한 정보는 위에서 얻은 정보의 어딘가에 대한 구체적인 언급이 필요합니다. 즉, "B에서 A로 왔다" 라는 정확한 어딘가가 필요합니다.

중복 코드가 발생하겠지만 가독성을 위해 우리는 "edgeTo"라는 새로운 메서드를 만들도록 하겠습니다.
```javascript
class Graph {
    ...
    /**
     * 특정 정점을 기준으로 갈 수 있는 정점을 반환한다.
     * @param data : 연결된 간선 정보를 탐색할 시작 정점
     * @returns {Array}
     */
    edgeTo(data) {
        const vertex = this.findVertex(data); // 정점의 객체를 얻어옵니다.
        const edgeTo = []; // 간정 정보를 기록할 배열입니다.
        const queue = []; // 탐색할 정점을 담을 대기 큐
        const visited = []; // 이미 방문한 정점을 기록할 배열입니다.
        queue.push(vertex); // 시작 정점을 큐에 담습니다.
        while(queue.length > 0) { // 더 이상 방문할 정점이 없을 때까지 반복합니다.
            const currVertex = queue.shift(); // 방문할 정점을 하나 꺼냅니다.
            const index = this.findVertexIndex(currVertex); // 정점의 인덱스를 얻어옵니다.
            this.edges[index].forEach( val => { // 정점에서 갈 수 있는 정점을 확인합니다.
                const innerIndex = this.findVertexIndex(val.dest); // 인접한 도착 가능한 정점의 인덱스를 얻어옵니다.
                if (!visited[innerIndex]) { // 아래는 기존 bfs와 다른 방문기록 방식입니다
                    edgeTo[innerIndex] = currVertex; // 이전 정점(currVertex)에서 현재 정점으로 왔다는 정보를 edgeTo 배열에 등록합니다.
                    visited[innerIndex] = true; // 위 정보를 기록 후 방문기록에 추가합니다.
                    queue.push(val.dest); // 방문할 큐에 담습니다.
                }
            })
        }
        return edgeTo;
    }
}
```
bfs 메서드와의 차이점은 방문기록을 연결된 간선정보를 탐색하는 루프 안에서 체크한다는 점 입니다.
이는 반환할 edgeTo 배열을 작성한 후 방문기록을 등록한다는 점이 차이가 있습니다.

이제 우리는 출발지로부터 갈 수 있는 정점에 대한 정보를 수집하였습니다. 이 정보를 가지고 최단거리를 찾는 기능을 구현하도록 하겠습니다.
```javascript
class Graph {
    ...
    /**
     * 너비 우선 탐색을 통해 얻은 간선 정보를 바탕으로 최단 거리를 반환합니다.
     * @param vertexSource : 출발 정점
     * @param vertexDestination : 도착 정점
     * @returns {*}
     */
    pathFromTo(vertexSource, vertexDestination) {
        const edgeTo = this.edgeTo(vertexSource); // 시작 정점에서 갈 수 있는 정점을 반환합니다.
        const path = [];
        /*
         * 도착지점을 시작으로 시작 지점이 나올 때까지 edgeTo 배열을 추적합니다.
         */
        for(let i = vertexDestination; i !== vertexSource; i = edgeTo[this.findVertexIndex(i)].data) {
            path.push(i); // 왔던 경로는 path 배열에 기록합니다.
        }
        path.push(vertexSource); // 마지막으로 시작 지점을 배열에 담습니다.
        return path.reverse(); // 해당 배열을 역으로 정렬합니다.
    }
}
```

## 위상 정렬 (Topological Sort)
위상 정렬은 방향성 그래프의 모든 방향성 간선이 한 방향으로만 향하도록 장점을 나열하는 것입니다.
위상정렬은 대그에 대하여 깊이 우선 탐색 알고리즘을 적용하면 간단히 구할 수 있습니다.
여기서 대그(<code>Dag</code>)란 무사이클 방향성 그래프를 뜻 합니다.

위상 정렬 또한 위에서 구현한 깊이 우선 탐색 메서드와 동작방식에 있어서 약간의 차이가 있습니다.
기존의 dfs는 방문한 정점을 즉시 작업(출력)을 하고 다음 정점을 방문했다면 위상 정렬은 인접한 정점을 모두 방문하고 작업을 진행하는 방식입니다.
```javascript
class Graph {
    ...
    /**
     * 위상 정렬 팩토리 메서드
     * @param data : 위상 정렬을 시작할 정점
     * @returns {*}
     */
    topSort(data) {
        const vertex = this.findVertex(data); // 정점의 객체를 얻어옵니다.
        const stack = []; // 정렬된 정점을 담을 스택용 배열입니다.
        this._topSort(vertex, val => { // 실제 위상 정렬을 수행하는 메서드를 호출하고, 콜백 함수를 정의합니다.
            stack.push(val);
        });
        return stack.reverse(); // 배열을 스택형태로 한번에 꺼내기 위해 역순으로 반환합니다.
    }

    /**
     * 위상 정렬
     * @param vertex : 탐색할 정점
     * @param fn : 콜백 함수
     * @param visited : 방문한 정점의 배열
     */
    _topSort(vertex, fn, visited = []) {
        const index = this.findVertexIndex(vertex); // 정점의 인덱스를 얻어옵니다.
        visited[index] = true; // 방문을 기록합니다.
        this.edges[index].forEach( v => { // 해당 정점에서 갈 수 있는 정점을 순회합니다.
            const innerIndex = this.findVertexIndex(v.dest); // 인접한 정점의 인덱스를 얻어옵니다.
            if (!visited[innerIndex]) { //방문하지 않은 정점이라면 깊이 우선 탐색을 진행합니다.
                this._topSort(v.dest, fn, visited);
            }
        });
        fn(vertex.data); // 콜백 함수를 실행합니다.
    }
}
```

여기까지 그래프의 자료구조와 그래프의 순회에 대한 몇가지 기초적인 알고리즘을 살펴 보았습니다.
사실 매우 기초적인 알고리즘으로 데이터가 많아지면 성능적인 문제가 발생할 가능성이 큽니다.
또한 그래프 클래스에 너무 많은 기능을 넣다보니 구조적으로 비효율적인 형태도 일부 존재합니다.
자신이 필요로하는 최적화된 기능에 맞춰서 좀 더 가벼운 구조로 조정하여 사용하는 것이 바람직 합니다.