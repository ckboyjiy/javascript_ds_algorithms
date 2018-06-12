import { expect } from 'chai';
import {BinaryHeapPriorityQueue} from "./BinaryHeapPriorityQueue";

describe('BasicPriorityQueue Test', () => {
    it('case 1 : ascending queue', () => {
        const queue = new BinaryHeapPriorityQueue();
        queue.enqueue('A', 100);
        queue.enqueue('B', 19);
        queue.enqueue('C', 36);
        queue.enqueue('D', 17);
        queue.enqueue('E', 3);
        queue.enqueue('F', 25);
        queue.enqueue('G', 1);
        queue.enqueue('H', 2);
        queue.enqueue('I', 7);

        const result = [];
        while(!queue.isEmpty()) {
            result.push(queue.dequeue().priority);
        }
        expect(result.join(', ')).to.equal('1, 2, 3, 7, 17, 19, 25, 36, 100');
    });

    it('case 1 : change priority', () => {
        const queue = new BinaryHeapPriorityQueue();
        queue.enqueue('A', 100);
        queue.enqueue('B', 19);
        queue.enqueue('C', 36);
        queue.enqueue('D', 17);
        queue.enqueue('E', 3);
        queue.enqueue('F', 25);
        queue.enqueue('G', 1);
        queue.enqueue('H', 2);
        queue.enqueue('I', 7);

        queue.setPriority('G', 101);

        const result = [];
        while(!queue.isEmpty()) {
            result.push(queue.dequeue().priority);
        }
        expect(result.join(', ')).to.equal('2, 3, 7, 17, 19, 25, 36, 100, 101');
    })
})