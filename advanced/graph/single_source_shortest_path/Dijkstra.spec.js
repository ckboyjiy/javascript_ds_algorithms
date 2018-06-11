import { expect } from 'chai';
import { Dijkstra } from './Dijkstra';

describe(`Dijkstra's Algorithm test`, () => {

    it('1', () => {
        const graph = new Dijkstra();
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

        const shortest = graph.shortest('S');
        const result = shortest.filter(val => val.distance > 0).reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
        expect(result.distance).to.equal(7);
    })
})