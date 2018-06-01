import { expect } from 'chai';
import { SimpleLinkedList } from './SimpleLinkedList';

describe('SimpleLinkedList test', () => {

    let list;
    beforeEach( () => {
        list = new SimpleLinkedList();
    });

    it('should be create SimpleLinkedList class', () => {
       expect(list instanceof SimpleLinkedList).to.be.true;
    });

    it('should be find a node by index', () => {
        expect(list.find(0)).to.be.null;
    });

    it('should be add a node', () => {
        list.add(1);
        expect(list.length).to.equal(1);
        list.add(2);
        expect(list.length).to.equal(2);
        expect(list.find(1).element).to.equal(2);
    });

    it('should be remove a node at specified index', () => {
        list.add(1);
        list.add(2);
        list.add(5);
        list.add(3);
        expect(list.find(2).element).to.equal(5);
        list.remove(2);
        expect(list.find(2).element).to.equal(3);
    });
})