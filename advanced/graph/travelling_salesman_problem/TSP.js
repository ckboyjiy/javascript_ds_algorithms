import {Edge, Graph, Vertex} from "../../../data_structures/graph/Graph";

export class TSP extends Graph {
    constructor() {
        super();
        this.w = [];
        this.dp = [];
    }

    /**
     * 가중치 추가
     * @param data1
     * @param data2
     * @param weight
     */
    addEdge(data1, data2, weight) {
        // 그래프에 저장된 각 정점의 인덱스를 준비합니다.
        const index1 = data1 instanceof Vertex ? this.findVertexIndex(data1.data) : this.findVertexIndex(data1);
        const index2 = data2 instanceof Vertex ? this.findVertexIndex(data2.data) : this.findVertexIndex(data2);
        // 그래프에 저장된 각 정점의 객체를 준비합니다.
        const obj1 = data1 instanceof Vertex ? data1 : this.findVertex(data1);
        const obj2 = data2 instanceof Vertex ? data2 : this.findVertex(data2);
        // 각 정점의 간선에 정점을 추가합니다.
        this.edges[index1].push(new Edge(obj2, weight));
        this.edges[index2].push(new Edge(obj1, weight));
    }

    shortest() {
        /** 정점간의 가중치 (거리)를 담은 이차원 배열 */
        this.w = [];
        for (let i = 0; i < this.vertices.length; i++) {
            this.w[i] = [];
            for (let j = 0; j < this.vertices.length; j++) {
                let temp;
                temp = this.edges[i].find(edge => {
                    const aa = this.findVertexIndex(edge.dest);
                    return this.findVertexIndex(edge.dest) === j
                } );
                this.w[i][j] = temp ? temp.weight : Infinity;
            }
        }

        /** dp[to][visited]
         * 방문한 경로로부터 to까지의 최단 거리를 저장하는 배열
         */
        this.dp = [];
        for (let i = 0; i < this.vertices.length; i++) {
            this.dp[i] = [];
            for (let j = 0; j < (1 << this.vertices.length); j++) {
                this.dp[i][j] = -1;
            }
        }

        return this._shortest(0, 0);
    }

    _shortest(curr, visited) {
        const test1 = ((1 << this.vertices.length-1) - 1).toString(2);
        if (visited === (1 << this.vertices.length-1) - 1) { // 모든 정점을 다 방문했으면
            return this.w[curr][0]; //
        }

        if (this.dp[curr][visited] >= 0) {
            return this.dp[curr][visited];
        }

        let result = Infinity;
        for (let next = 0; next < this.vertices.length; next++) {
            if ((visited & (1 << (next - 1))) !== 0) {
                continue;
            }
            if (this.w[curr][next] === 0) {
                continue;
            }
            if (visited+(1 << (next-1)) < 0) {
                continue;
            }
            const temp = this.w[curr][next] + this._shortest(next, visited+(1 << (next-1)));
            result = Math.min(result, temp);
        }
        return this.dp[curr][visited] = result;
    }

}