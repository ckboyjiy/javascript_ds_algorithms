export class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.numberOfEdges = 0;
    }


    addVertex(data) {
        this.vertices.push(new Vertex(data));
        this.edges[data] = [];
        ++this.numberOfEdges;
    }
    findVertex(data) {
        return this.vertices.find( val => val.data === data);
    }
    findVertexIndex(data) {
        return this.vertices.findIndex( val => val.data === data);
    }
    removeVertex(data) {
        this.vertices.splice(this.findVertexIndex(data), 1);
        // TODO. Edge 삭제
    }

    addEdge(data1, data2) {
        this.edges[data1].push(new Edge(data2));
        this.edges[data2].push(new Edge(data1));
    }
    findEdge(from, to) {
        if (to) {
            return this.edges[from].filter( val => val.dest === to);
        } else {
            return this.edges[from];
        }
    }
    removeEdge(data1, data2) {
        const index1 = this.edges[data1] ? this.edges[data1].findIndex( val => val.data === data2) : -1;
        const index2 = this.edges[data2] ? this.edges[data2].findIndex( val => val.data === data1) : -1;
        if (index1) {
            this.edges[data1].splice(index1, 1);
        }
        if (index2) {
            this.edges[data2].splice(index2, 1);
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
    // depth first search => stack
    dfs(data, fn, visited = []) {
        visited[data] = true;
        fn(data);
        this.edges[data].forEach( v => {
            if (!visited[v.dest]) {
                this.dfs(v.dest, fn, visited);
            }
        });
    }
    bfs(data, fn, visited = []) {
        const queue = [];
        queue.push(data);
        while(queue.length > 0) {
            const currVal = queue.shift();
            if (!visited[currVal]) {
                visited[currVal] = true;
                fn(currVal);
                this.edges[currVal].forEach( val => {
                    queue.push(val.dest);
                })
            }
        }
    }
    edgeTo(vertexSource) {
        const edgeTo = [];
        const queue = [];
        const visited = [];
        queue.push(vertexSource);
        while(queue.length > 0) {
            const currVal = queue.shift();
            this.edges[currVal].forEach( val => {
                if (!visited[val.dest]) {
                    visited[val.dest] = true;
                    edgeTo[val.dest] = currVal;
                    queue.push(val.dest);
                }
            })
        }
        return edgeTo;
    }
    pathFromTo(vertexSource, vertexDestination) {
        const edgeTo = this.edgeTo(vertexSource);
        const path = [];
        for(let i = vertexDestination; i !== vertexSource; i = edgeTo[i]) {
            path.push(i);
        }
        path.push(vertexSource);
        return path.reverse();
    }
    topSort(data) {
        const stack = [];
        this._topSort(data, val => {
            stack.push(val);
        });
        return stack.reverse();
    }
    _topSort(data, fn, visited = []) {
        visited[data] = true;
        this.edges[data].forEach( v => {
            if (!visited[v.dest]) {
                this._topSort(v.dest, fn, visited);
            }
        });
        fn(data);
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