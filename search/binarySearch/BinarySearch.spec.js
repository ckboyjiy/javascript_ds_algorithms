import {expect} from 'chai';
import {BinarySearch} from "./BinarySearch";

describe('BinarySearch class test', ()=> {
    it('should be retrieved index number of equal a specified value', ()=> {
        const arr = new BinarySearch();
        arr.setData(1000000);
        arr.quickSort();
        let start = new Date().getTime();
        expect(arr.search(1000001)).to.equal(arr.getArray().findIndex( val => val === 1000001));
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
    });
    it('should be get count of value which equal a specified value', () => {
        const arr = new BinarySearch();
        arr.setData(1000000);
        arr.quickSort();
        let start = new Date().getTime();
        expect(arr.count(500)).to.equal(arr.getArray().filter( val => val === 500).length);
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
    })
})