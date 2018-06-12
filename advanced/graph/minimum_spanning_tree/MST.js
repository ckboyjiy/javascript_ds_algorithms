import {Edge, Graph, Vertex} from "../../../data_structures/graph/Graph";
import {BinaryHeapPriorityQueue} from "../../../data_structures/queue/PriorityQueue/BinaryHeapPriorityQueue";

export class MST extends Graph {
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

    prim() {
        const visited = [];
        const heap = new BinaryHeapPriorityQueue();
        this.vertices.forEach((v, i) => {
            heap.enqueue(i, i === 0 ? 0 : Infinity);
        });

        while(!heap.isEmpty()) {
            const pointer = heap.dequeue();
            // ? 포인터의 우선순위가 무한대이면..? 즉 연결된 간선이 없다면 빼나?
            visited.push(pointer.key);
            this.edges[pointer.key]
                .filter(edge => {
                    const aa = visited.filter(v => {
                        const thisIndex = this.findVertexIndex(edge.dest.data);
                        return v === thisIndex
                    });
                    return aa.length === 0;
                })
                .forEach(edge => {
                    const thisIndex = this.findVertexIndex(edge.dest.data);
                    const temp = heap.getByKey(thisIndex);
                    if (temp.priority > edge.weight) {
                        heap.setPriority(thisIndex, edge.weight);
                    }
                })
        }

        return visited.map(i => this.vertices[i].data);
    }
}