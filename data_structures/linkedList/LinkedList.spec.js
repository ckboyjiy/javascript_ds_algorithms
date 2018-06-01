import {expect} from 'chai';
import {LinkedList} from "./LinkedList";

describe('LinkedList class test', () => {

    let list;
    beforeEach( () => {
        list = new LinkedList();
    })

    it('should be create LinkedList class', () => {
        expect(list instanceof LinkedList).to.be.true;
    });
    it('should be get node by index', () => {
        expect(list.get(0)).to.be.null;
    });
    it('should be add node', () => {
        expect(list.add('A')).to.equal(0);
        expect(list.add('B')).to.equal(1);
        expect(list.get(0).element).to.equal('A');
        expect(list.get(1).element).to.equal('B');
    });
    it('should be add node at specified index', () => {
        list.add('A');
        list.add('C');
        expect(list.add('B', 1)).to.equal(1);
        expect(list.get(2).element).to.equal('C');
    });
    it('should be remove node of specified index', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        expect(list.remove(1)).to.be.true;
        expect(list.get(1).element).to.equal('C');
    });
    it('should be get first node', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        expect(list.getFirst().element).to.equal('A');
    })
    it('should be get node size', () => {
        list.add('A');
        expect(list.size()).to.equal(1);
        list.add('B');
        expect(list.size()).to.equal(2);
        list.add('C');
        expect(list.size()).to.equal(3);
        list.remove(2);
        expect(list.size()).to.equal(2);
        list.remove(1);
        expect(list.size()).to.equal(1);
        list.remove(0);
        expect(list.size()).to.equal(0);
    });
    it('should be get index of node it equal specified item', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        expect(list.indexOf('A')).to.equal(0);
        expect(list.indexOf('B')).to.equal(1);
        expect(list.indexOf('C')).to.equal(2);
    });
    it('should be get node which equal specified item', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        expect(list.find('B').element).to.be.equal('B');
        expect(list.find('B').next.element).to.be.equal('C')
    })
    it('should be get string of LinkedList', () => {
        list.add('A');
        list.add('B');
        list.add('C');
        expect(list.toString()).to.equal('A, B, C');
    })
})