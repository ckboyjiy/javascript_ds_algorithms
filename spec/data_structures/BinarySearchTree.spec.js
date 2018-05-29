import {expect} from 'chai';
import {BinarySearchTree} from "../../data_structures/binarySearchTree/BinarySearchTree";

describe('BinarySearchTree class test', () => {
    let tree;
    beforeEach(()=> {
        tree = new BinarySearchTree();
    })
    it('should be created BinarySearchTree', () => {
        expect(tree instanceof BinarySearchTree).to.be.true;
    });
    it('should be add node', () => {
        tree.insert(10);
        expect(tree.first().data).to.equal(10);
    });
    it('should be add node at left of parent node when less than parent node value', () => {
        tree.insert(10);
        tree.insert(7);
        expect(tree.first().left.data).to.equal(7);
    });
    it('should be add node at right of parent node when greater than parent node value', () => {
        tree.insert(10);
        tree.insert(7);
        tree.insert(15);
        expect(tree.first().right.data).to.equal(15);
    });
    it('should be get first(root) node', () => {
        tree.insert(10);
        tree.insert(7);
        tree.insert(15);
        expect(tree.first().data).to.equal(10);
    });
    it('should be get node which is a smallest value', () => {
        tree.insert(10);
        tree.insert(7);
        tree.insert(15);
        tree.insert(1);
        tree.insert(11);
        tree.insert(5);
        tree.insert(12);
        tree.insert(4);
        tree.insert(14);
        expect(tree.getMin().data).to.equal(1);
    })
    it('should be get node which is a biggest value', () => {
        tree.insert(10);
        tree.insert(7);
        tree.insert(15);
        tree.insert(1);
        tree.insert(11);
        tree.insert(5);
        tree.insert(12);
        tree.insert(4);
        tree.insert(14);
        expect(tree.getMax().data).to.equal(15);
    });
    it('should be get node which equal a specified value', () => {
        tree.insert(10);
        tree.insert(7);
        tree.insert(15);
        tree.insert(1);
        tree.insert(11);
        tree.insert(5);
        tree.insert(12);
        tree.insert(4);
        tree.insert(14);
        expect(tree.find(5).left.data).to.equal(4);
        expect(tree.find(14).left).to.be.null;
    });
    describe('should be remove node', () => {
        beforeEach(() => {
            tree.insert(10);
            tree.insert(7);
            tree.insert(15);
            tree.insert(1);
            tree.insert(11);
            tree.insert(5);
            tree.insert(12);
            tree.insert(4);
            tree.insert(14);
            tree.insert(8);
            tree.insert(18);
            tree.insert(17);
            tree.insert(19);
        });

        it('when left is null and right is null', () => {
            tree.remove(8);
            expect(tree.find(7, true).thisNode.right).to.be.null;
        });
        it('when left is not null and right is null', () => {
            tree.remove(5);
            expect(tree.find(1, true).thisNode.right.data).to.equal(4);
        });
        it('when left is null and right is not null', () => {
            tree.remove(12);
            expect(tree.find(11, true).thisNode.right.data).to.equal(14);
        });
        it('when left is not null and right is not null', () => {
            tree.remove(15);
            expect(tree.find(10, true).thisNode.right.data).to.equal(17);
        })
    })
})