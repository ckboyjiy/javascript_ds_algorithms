import { expect } from 'chai';
import { MST } from "./MST";

describe('MST for Prim\'s algorithm Test', () => {
    it('case 1', () => {
        const graph = new MST();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('S')

        graph.addEdge('A', 'B', 2);
        graph.addEdge('A', 'C', 5);
        graph.addEdge('A', 'D', 1);

        graph.addEdge('B', 'C', 3);
        graph.addEdge('B', 'D', 6);

        graph.addEdge('C', 'D', 4);

        graph.addEdge('S', 'D', 8);
        graph.addEdge('S', 'C', 7);

        expect(graph.prim().join(', ')).to.equal('A, D, B, C, S');
    })
    it('case 2', () => {

    });
})