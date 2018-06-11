import {Edge, Graph, Vertex} from "../../../data_structures/graph/Graph";

export class Floyd extends Graph {
    constructor() {super();}

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

    search() {
        const arr = [];
        // 행렬 초기화
        for (let i = 0; i < this.vertices.length; i++) {
            arr[i] = [];
            for (let j = 0; j < this.vertices.length; j++) {
                if (i === j) {
                    arr[i][j] = 0;
                } else {
                    arr[i][j] = Infinity;
                }
            }
        }
        // 인접 행렬 값 추가
        this.edges.forEach((edges, i) => {
            edges.forEach(edge => {
                const j = this.findVertexIndex(edge.dest);
                arr[i][j] = edge.weight;
            })
        });

        for (let k = 0; k < this.vertices.length; k++) {
            for (let i = 0; i < this.vertices.length; i++) {
                for (let j = 0; j < this.vertices.length; j++) {
                    if (arr[i][j] > arr[i][k] + arr[k][j]) {
                        arr[i][j] = arr[i][k] + arr[k][j];
                    }
                }
            }
        }
        console.log(arr);
    }
}