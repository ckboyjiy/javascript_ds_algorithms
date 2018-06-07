import {expect} from 'chai';
import {Graph} from "./Graph";

describe('Graph class test', () => {
    let graph;
    beforeEach(() => {
        graph = new Graph();
    });
    it('should be create graph', () => {
        expect(graph instanceof Graph).to.be.true;
    });
    it('should be add vertex', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        expect(graph.vertices.length).to.equal(2);
    });
    it('should be get vertex of equal a specified value', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        expect(graph.findVertex('A').data).to.equal('A');
    })
    it('should be get vertex index of equal a specified value', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        expect(graph.findVertexIndex('A')).to.equal(0);
        expect(graph.findVertexIndex('B')).to.equal(1);
    })
    it('should be remove vertex', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.removeVertex('A');
        expect(graph.vertices.length).to.equal(1);
        expect(graph.findVertexIndex('B')).to.equal(0);
    });
    it('should be add edge of A to B', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B');
        expect(graph.findEdge('A')[0].dest.data).to.equal('B');
        expect(graph.findEdge('B')[0].dest.data).to.equal('A');
        expect(graph.findEdge('A', 'B')[0].dest.data).to.equal('B');
    });
    it('should be remove edge of A to B', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B');
        graph.removeEdge('A', 'B');
        expect(graph.findEdge('A').length).to.equal(0);
        expect(graph.findEdge('B').length).to.equal(0);
        graph.addVertex('C');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.removeEdge('A');
        expect(graph.findEdge('A').length).to.equal(0);
        expect(graph.findEdge('B').length).to.equal(0);
        expect(graph.findEdge('C').length).to.equal(0);
    });
    it('should be get string of graph', () => {
        graph.addVertex(0);
        graph.addVertex(1);
        graph.addVertex(2);
        graph.addVertex(3);
        graph.addVertex(4);
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        expect(graph.toString()).to.equal('0 -> 1 2\n1 -> 0 3\n2 -> 0 4\n3 -> 1\n4 -> 2\n');
    });
    it('should be search to dfs', () => {
        graph.addVertex('A');
        graph.addVertex('X');
        graph.addVertex('G');
        graph.addVertex('H');
        graph.addVertex('P');
        graph.addVertex('E');
        graph.addVertex('Y');
        graph.addVertex('M');
        graph.addVertex('J');
        graph.addEdge('A', 'X');
        graph.addEdge('X', 'G');
        graph.addEdge('X', 'H');
        graph.addEdge('G', 'H');
        graph.addEdge('G', 'P');
        graph.addEdge('H', 'E');
        graph.addEdge('H', 'P');
        graph.addEdge('E', 'M');
        graph.addEdge('E', 'Y');
        graph.addEdge('Y', 'M');
        graph.addEdge('M', 'J');
        const result = [];
        graph.dfs('A', (val) => {
           result.push(val.data);
        });
        expect(result.join(',')).to.equal('A,X,G,H,E,M,Y,J,P');
    });
    it('should be search to bfs', () => {
        graph.addVertex('A');
        graph.addVertex('X');
        graph.addVertex('G');
        graph.addVertex('H');
        graph.addVertex('P');
        graph.addVertex('E');
        graph.addVertex('Y');
        graph.addVertex('M');
        graph.addVertex('J');
        graph.addEdge('A', 'X');
        graph.addEdge('X', 'G');
        graph.addEdge('X', 'H');
        graph.addEdge('G', 'H');
        graph.addEdge('G', 'P');
        graph.addEdge('H', 'E');
        graph.addEdge('H', 'P');
        graph.addEdge('E', 'M');
        graph.addEdge('E', 'Y');
        graph.addEdge('Y', 'M');
        graph.addEdge('M', 'J');
        const result = [];
        graph.bfs('A', (val) => {
            result.push(val.data);
        });
        expect(result.join(',')).to.equal('A,X,G,H,P,E,M,Y,J');
    });

    it('should be find the shortest path', () => {
        graph.addVertex('A');
        graph.addVertex('X');
        graph.addVertex('G');
        graph.addVertex('H');
        graph.addVertex('P');
        graph.addVertex('E');
        graph.addVertex('Y');
        graph.addVertex('M');
        graph.addVertex('J');
        graph.addEdge('A', 'X');
        graph.addEdge('X', 'G');
        graph.addEdge('X', 'H');
        graph.addEdge('G', 'H');
        graph.addEdge('G', 'P');
        graph.addEdge('H', 'E');
        graph.addEdge('H', 'P');
        graph.addEdge('E', 'M');
        graph.addEdge('E', 'Y');
        graph.addEdge('Y', 'M');
        graph.addEdge('M', 'J');
        const path = graph.pathFromTo('A', 'J');
        expect(path.join('->')).to.equal('A->X->H->E->M->J');
        graph.addEdge('P', 'J');
        const path2 = graph.pathFromTo('A', 'J');
        expect(path2.join('->')).to.equal('A->X->G->P->J');
    });
    it('should be use to topological sort', () => {
        graph.addVertex('CS1');
        graph.addVertex('CS2');
        graph.addVertex('Data Structures');
        graph.addVertex('Assembly Language');
        graph.addVertex('Operating Systems');
        graph.addVertex('Algorithms');
        graph.addEdge('CS2', 'Data Structures');
        graph.addEdge('Data Structures', 'Algorithms');
        graph.addEdge('CS2', 'Assembly Language');
        graph.addEdge('CS2', 'Operating Systems');
        graph.addEdge('CS1', 'CS2');
        const result = graph.topSort('CS1');
        expect(result.join(',')).to.equal('CS1,CS2,Operating Systems,Assembly Language,Data Structures,Algorithms');
    });
})