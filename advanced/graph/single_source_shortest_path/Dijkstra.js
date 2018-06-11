import {Edge, Graph, Vertex} from "../../../data_structures/graph/Graph";

export class Dijkstra extends Graph {
    constructor() {
        super();
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


    shortest(from) {
        let fromIndex = this.findVertexIndex(from);
        /**
         * 출발점 'from'으로부터 각 정점까지의 최단 경로를 나타내는 배열
         * 출발점과 동일한 정점은 0, 나머지는 Infinity로 지정한다.
         */
        const shortest = this.vertices.map((vertex, index) => {
            return {
                distance: index === fromIndex ? 0 : Infinity, // 최단 경로의 거리
                path: [] // 최단 경로의 배열
            }
        });

        const visitedIndex = [];

        while (fromIndex) {
            visitedIndex[fromIndex] = true;
            // 현재 정점에 연결된 정점에 대한 최단 거리 갱신
            let nextIndex = null;
            this.edges[fromIndex].forEach( edge => {
                const toIndex = this.findVertexIndex(edge.dest);
                if (!visitedIndex[toIndex]) {
                    if (shortest[toIndex].distance > shortest[fromIndex].distance + edge.weight) {
                        shortest[toIndex].distance = shortest[fromIndex].distance + edge.weight;
                        shortest[toIndex].path = shortest[fromIndex].path.concat(toIndex);
                    }
                    /**
                     * nextIndex가 null이면 toIndex
                     * toIndex가 visitedIndex에 있으면
                     */
                    nextIndex = !nextIndex ||  shortest[nextIndex].distance > shortest[toIndex].distance ? toIndex : nextIndex;
                }
            });
            fromIndex = nextIndex;
        }
        return shortest;
    }
}