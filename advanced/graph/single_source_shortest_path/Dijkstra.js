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


    shortest(source) {
        const sourceIndex = this.findVertexIndex(source);
        /**
         * 출발점 'from'으로부터 각 정점까지의 최단 경로를 나타내는 배열
         * 출발점과 동일한 정점은 0, 나머지는 Infinity로 지정한다.
         */
        const shortest = this.vertices.map((vertex, index) => {
            return {
                distance: index === sourceIndex ? 0 : Infinity, // 최단 경로의 거리
                path: [] // 최단 경로의 배열
            }
        });

        const visitedIndex = [];
        let currIndex = sourceIndex;
        while (currIndex) { // 방문 시작
            visitedIndex[currIndex] = true; // 현재 정점을 방문 이력에 남깁니다.
            // 현재 정점에 연결된 정점에 대한 최단 거리 갱신
            let nextIndex = null; // 다음에 방문 예정인 인덱스를 임시로 저장할 변수를 준비합니다.
            // 현재 정점으로 부터 갈 수 있는 모든 정점을 탐색합니다.
            this.edges[currIndex].forEach( edge => {
                const toIndex = this.findVertexIndex(edge.dest);
                if (!visitedIndex[toIndex]) { // 이미 방문한 정점이면 무시하고 아직 방문전인 정점만 탐색합니다.
                    /*
                    1. shortest[toIndex].distance = sourceIndex에서 toIndex까지의 현재 저장된 거리
                    2. shortest[currIndex].distance = sourceIndex에서 currIndex까지의 현재 저장된 거리
                    3. shortest[currIndex].distance + edge.weight = currIndex를 경유하여 toIndex까지 가는 거리
                    1번과 3번 항목 중 1번 항목이 더 크다면 3번항목으로  1번 값을 변경한다.
                    */
                    if (shortest[toIndex].distance > shortest[currIndex].distance + edge.weight) {
                        shortest[toIndex].distance = shortest[currIndex].distance + edge.weight; // 거리 갱신
                        shortest[toIndex].path = shortest[currIndex].path.concat(toIndex); // 경로 갱신
                    }
                    /**
                     * 다음에 방문 예정인 인덱스가 아직 지정되지 않았거나
                     * 다음에 방문 예정인 인덱스까지의 거리보다 현재 분석한 정점까지의 거리가 더 짧다면
                     * 다음에 방문 예정인 인덱스를 현재 분석한 정점으로 지정한다.
                     */
                    nextIndex = !nextIndex || shortest[nextIndex].distance > shortest[toIndex].distance ? toIndex : nextIndex;
                }
            });
            currIndex = nextIndex; // 다음에 방문 예정인 인덱스를 확정한다.
        }
        return shortest;
    }
}