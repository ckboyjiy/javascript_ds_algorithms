import {expect} from 'chai';
import {LinearSearch} from "../../search/LinearSearch";

describe('LinearSearch class test', () => {
    it('should be retrieved index number of equal a specified value in array', ()=> {
        let arr = new LinearSearch();
        arr.setData(10000000);
        let start = new Date().getTime();
        expect(arr.search(10000001)).to.equal(arr.getArray().findIndex( val => val === 10000001));
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
    });
    it('should be retrieved "-1" when is no a specified value', () => {
        let arr = new LinearSearch();
        arr.setData(100);
        expect(arr.search(101)).to.equal(-1);
    });
    it('should be retrieved a minimum value of array', () => {
        let arr = new LinearSearch();
        arr.setData(100);
        expect(arr.searchMinValue()).to.equal(arr.getArray().reduce( (prev, curr) => prev < curr ? prev : curr));
    });
    it('should be retrieved a maximum value of array', () => {
        let arr = new LinearSearch();
        arr.setData(100);
        expect(arr.searchMaxValue()).to.equal(arr.getArray().reduce( (prev, curr) => prev > curr ? prev : curr));
    });
    it('should be work to optimized the self-organized data when retrieved a specified value in array', ()=> {
        let arr = new LinearSearch();
        arr.setArray([9, 4, 3, 5, 2, 1, 69, 48, 24, 21 ,56, 33]);
        expect(arr.search(5, true)).to.equal(2);
        expect(arr.search(4, true)).to.equal(0);
    });
})