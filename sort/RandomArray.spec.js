import {expect} from 'chai';
import {RandomArray} from "./RandomArray";

describe('RandomArray class test', () => {
    let arr;
    it('should be create RandomArray instance', () => {
        arr = new RandomArray(100);
        expect(arr.getArray().length).to.equal(100);
    });
    it('should be fill random number', () => {
        arr = new RandomArray(100);
        arr.setData();
        expect(arr.getArray().length).to.equal(100);
    });
    it('should be clear array', () => {
        arr = new RandomArray(100);
        arr.clear();
        expect(arr.getArray().length).to.equal(0);
    });
    it('should be add element at last position', () => {
        arr = new RandomArray(100);
        arr.insert(1);
        expect(arr.getArray()[arr.getArray().length-1]).to.equal(1);
    });
    it('should be exchange a value of two index', () => {
        arr = new RandomArray();
        arr.insert(1);
        arr.insert(2);
        arr.swap(0, 1);
        expect(arr.getArray()[0]).to.equal(2);
        expect(arr.getArray()[1]).to.equal(1);
    })
    it('should be get string of array', () => {
        arr = new RandomArray(100);
        expect(typeof arr.toString()).to.equal('string');
    });
    it('should be get array', () => {
        arr = new RandomArray(100);
        expect(arr.getArray() instanceof Array).to.be.true;
    });
    it('should be set array as deep copy',() => {
        const test = [5, 4, 3, 2, 1];
        arr = new RandomArray();
        arr.setArray(test);
        expect(test !== arr.getArray()).to.be.true;
    })
});