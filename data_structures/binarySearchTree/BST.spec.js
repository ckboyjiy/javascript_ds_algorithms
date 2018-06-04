import { expect } from 'chai';
import { BST} from "./BST";

describe('BST test', () => {
    let bst;
    beforeEach(()=>{
        bst = new BST();
    })
    it('should be create BST instance',()=> {
        expect(bst instanceof BST).to.be.true;
    })

    it('should be add a node', ()=> {
        expect(bst.insert(6).data).to.equal(6);
    })

    it('should be search by inOrder', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.inOrder()).to.equal('1,2,3,4,5,6,7,8,9');
    })

    it('should be search by preOrder', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.preOrder()).to.equal('6,4,2,1,3,5,7,9,8');
    })

    it('should be search by postOrder', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.postOrder()).to.equal('1,3,2,5,4,8,9,7,6');
    })

    it('should be get a smallest value', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.getMin()).to.equal(1);
    })

    it('should be get a biggest value', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.getMax()).to.equal(9);
    })

    it('should be get a node which equal a specified value', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        expect(bst.find(6).data).to.equal(6);
    })

    it('should be remove a node which equal a specified value', ()=> {
        bst.insert(6);
        bst.insert(4);
        bst.insert(7);
        bst.insert(2);
        bst.insert(5);
        bst.insert(1);
        bst.insert(3);
        bst.insert(9);
        bst.insert(8);
        bst.remove(6)
        expect(bst.find(6)).to.be.null;
    })
})