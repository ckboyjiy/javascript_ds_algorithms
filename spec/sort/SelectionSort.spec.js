import {expect} from 'chai';
import {SelectionSort} from "../../sort/SelectionSort";

describe('SelectionSort class test', () => {
    let arr;
    it('should be sort array', ()=> {
        arr = new SelectionSort();
        arr.setData(10);
        arr.selectionSort();
        expect(arr.getArray().filter((val,idx, arr)=> val > arr[idx+1]).length).to.equal(0);
    })
})