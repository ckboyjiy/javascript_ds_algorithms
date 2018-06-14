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

    tsp() {
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
                this.w[i][j] = temp ? temp.weight : i === j ? 0 : Infinity;
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

        const s = 0;
        this.setup();
        this.solve(s);
        const minCost = this.findMinCost(s);
        const minTour = this.findOptimalTour(s);
        return {minCost, minTour};
    }

    setup() {
        for (let i = 1; i < this.vertices.length; i++) {
            this.dp[i][1 << 0 | 1 << i] = this.w[0][i];
        }
    }
    solve(s) {
        for (let r = 3; r <= this.vertices.length; r++) {
            for (let subset of this.combinations(0, 0 , r)) {
                if (this.notIn(s, subset)) continue;
                for (let next = 0; next < this.vertices.length; next++) {
                    if (next === s || this.notIn(next, subset)) continue;
                    const state = subset ^ ( 1 << next);
                    let minDist = Infinity;
                    for (let e = 0; e < this.vertices.length; e++) {
                        if (e === s || e === next || this.notIn(e, subset)) continue;
                        const newDistance = this.dp[e][state] + this.w[e][next];
                        if (newDistance < minDist) {
                            minDist = newDistance;
                        }
                        this.dp[next][subset] = minDist;
                    }
                }
            }
        }
    }
    notIn(i, subset) {
        return ((1 << i) & subset) === 0;
    }
    combinations(set, at, r, subset = []) {
        if (r === 0) {
            subset.push(set);
        } else {
            for (let i = at; i < this.vertices.length; i++) {
                set = set | (1 << i);
                subset = this.combinations(set, i + 1, r - 1, subset);
                set = set & ~(1 << i);
            }
        }
        return subset;
    }
    findMinCost(s) {
        const END_STATE = (1 << this.vertices.length) - 1;
        let minTourCost = Infinity;
        for (let e = 0; e < this.vertices.length; e++) {
            if (e === s) continue;
            const tourCost = this.dp[e][END_STATE] + this.w[e][s];
            if (tourCost < minTourCost) {
                minTourCost = tourCost;
            }
        }
        return minTourCost;
    }
    findOptimalTour(s) {
        let lastIndex = s;
        let state = (1 << this.vertices.length) - 1;
        const tour = [];
        for (let i = this.vertices.length - 1; i >= 1; i--) {
            let index = -1;
            for (let j = 0; j < this.vertices.length; j++) {
                if (j === s || this.notIn(j, state)) continue;
                if (index === -1) index = j;
                const prevDist = this.dp[index][state] + this.w[index][lastIndex];
                const newDist = this.dp[j][state] + this.w[j][lastIndex];
                if (newDist < prevDist) index = j;
            }
            tour[i] = index;
            state = state ^ (1 << index);
            lastIndex = index;
        }
        tour[0] = tour[this.vertices.length] = s;
        return tour;
    }
}