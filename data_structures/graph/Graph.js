export class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }


    addVertex(data) {
        this.vertices.push(new Vertex(data));
        this.edges.push([]);
    }
    findVertex(data) {
        return this.vertices.find( val => {
            return data instanceof Vertex ? val === data : val.data === data;
        });
    }
    findVertexIndex(data) {
        return this.vertices.findIndex( val => {
            return data instanceof Vertex ? val === data : val.data === data;
        });
    }
    findVertexByIndex(index) {
        return this.vertices[index];
    }
    removeVertex(data) {
        const idx = this.findVertexIndex(data);
        this.vertices.splice(idx, 1);
        this.edges.splice(idx, 1);
        // TODO. Edge 삭제
    }

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
                .map(edge => edge.dest) // 아래의 재귀 호출로 인해 배열이 순회하는 중 삭제작업으로 인해 배열이 감소하게 됩니다. 그렇기 때문에 삭제 대상이 누락될 수 있기 때문에 삭제 대상을 먼저 배열로 반환합니다.
                .forEach(dest => { // 삭제할 정점 정보를 가지고 삭제 메서드를 재귀 호출합니다.
                    this.removeEdge(dest, obj1); // data1의 엣지 인접리스트에 있는 모든 정점과 data1 정점과의 간선을 제거한다.
                });
        }
    }
    toString() {
        let result = '';
        for (let key of Object.keys(this.edges)) {
            let to = key + ' ->';
            this.edges[key].forEach( val => to += ' ' + val.dest);
            result += to + '\n';
        }
        return result;
    }
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
                this.dfs(v.dest.data, fn, visited); // 해당 정점을 기준으로 인접 리스트 탐색을 시작합니다.
            }
        });
    }

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
        while(queue.length > 0) { // 더 이상 방문할 정점이 없을 때까지 반복합니다.
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

export class Vertex {
    constructor(data) {
        this.data = data;
    }
}

export class Edge {
    constructor(dest, weight = 0) {
        this.dest = dest;
        this.weight = weight;
    }
}