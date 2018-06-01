import {expect} from 'chai';
import {DoublyLinkedList} from "./DoublyLinkedList";

describe('DoublyLinkedList class test', () => {

    let list;
    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    it('should be add node', () => {
        expect(list.add('A')).to.equal(0);
        expect(list.get(0).element).to.equal('A');
        expect(list.get(0).prev).to.be.null;
        expect(list.get(0).next).to.be.null;
        expect(list.add('C')).to.equal(1);
        expect(list.get(1).element).to.equal('C');
        expect(list.get(1).prev.element).to.equal('A');
        expect(list.get(1).next).to.be.null;
        list.add('B', 1);
        expect(list.get(1).element).to.equal('B');
        expect(list.get(1).prev.element).to.equal('A');
        expect(list.get(1).next.element).to.equal('C');
        expect(list.get(0).next.element).to.equal('B');
        expect(list.get(2).prev.element).to.equal('B');
    });
    it('should be remove node by index', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        list.add('E');
        list.add('D');
        const e = list.get(3);
        list.remove(3);
        expect(list.get(2).next.element).to.equal('D');
        expect(list.get(3).prev.element).to.equal('C');
        expect(e.prev).to.be.null;
        expect(e.next).to.be.null;
    });
    it('should be get last node', () => {
        list.add('A');
        expect(list.getLast().element).to.equal('A');
        list.add('B');
        expect(list.getLast().element).to.equal('B');
        list.add('D');
        expect(list.getLast().element).to.equal('D');
        list.add('C', 2);
        expect(list.getLast().element).to.equal('D');
    })
})
