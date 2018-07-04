import { expect } from 'chai';
import { TSP } from "./TSP";

describe('TSP Algorithm test', () => {
    it('case 1', () => {
        const graph = new TSP();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('S');

        graph.addEdge('A', 'B', 2);
        graph.addEdge('A', 'C', 5);
        graph.addEdge('A', 'D', 1);

        graph.addEdge('B', 'C', 3);
        graph.addEdge('B', 'D', 6);

        graph.addEdge('C', 'D', 4);

        graph.addEdge('S', 'D', 8);
        graph.addEdge('S', 'C', 7);
        graph.addEdge('S', 'B', 2);
        graph.addEdge('S', 'A', 5);

        const result = graph.tsp();
        expect(result.minCost).to.equal(15);
        expect(result.minTour.join(', ')).to.equal('0, 4, 1, 2, 3, 0');
    });
    it('case 2', () => {
        const graph = new TSP();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');

        const a = graph.combinations(0, 0, 4);
        console.log(a[0].toString(2));
    });

    it('case 3', () => {
        let a = 1 << 0;
        console.log('a', a, a.toString(2));
        let b = (1 << 1) + (1 << 2);
        console.log(b, b.toString(2));
        console.log(a & b);
        console.log(a & (b + a));
        console.log(a | b);
        console.log(a | (b + a));
        console.log((b + a).toString(2), a.toString(2), ((b + a) ^ a).toString(2));
    })
})