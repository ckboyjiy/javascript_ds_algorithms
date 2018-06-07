import {expect} from 'chai';
import {QuickSort} from "./QuickSort";
describe('QuickSort class test', () => {
    it('should be sort a array', ()=> {
        const arr = new QuickSort();
        arr.setData(10000000);
        let start = new Date().getTime();
        arr.quickSort();
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
        expect(arr.getArray().filter((val,idx, arr)=> val > arr[idx+1]).length).to.equal(0);
    })
})