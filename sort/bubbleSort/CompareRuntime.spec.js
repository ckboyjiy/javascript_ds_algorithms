import {expect} from 'chai';
import {BubbleSort} from "./BubbleSort";
import {SelectionSort} from "../selectionSort/SelectionSort";
import {InsertionSort} from "../insertionSort/InsertionSort";

describe('compare runtime each sort class', () => {
    const bubble = new BubbleSort();
    const selection = new SelectionSort();
    const insertion = new InsertionSort();
    it('should be same a value of each array', ()=> {
        bubble.setData(10);
        selection.setArray(bubble.getArray());
        insertion.setArray(bubble.getArray());
        expect(bubble.toString() == selection.toString() && bubble.toString() == insertion.toString()).to.be.true;
    });
    it('should be test', () => {
        let start = new Date().getTime();
        bubble.bubbleSort();
        let stop = new Date().getTime();
        let bubbleSortElapsed = stop - start;
        console.log(`The elapsed time of BubbleSort was ${bubbleSortElapsed} milliseconds`);

        start = new Date().getTime();
        selection.selectionSort();
        stop = new Date().getTime();
        let SelectionSortElapsed = stop - start;
        console.log(`The elapsed time of SelectionSort was ${SelectionSortElapsed} milliseconds`);

        start = new Date().getTime();
        insertion.insertionSort();
        stop = new Date().getTime();
        let InsertionSortElapsed = stop - start;
        console.log(`The elapsed time of InsertionSort was ${InsertionSortElapsed} milliseconds`);

        expect(bubbleSortElapsed >= SelectionSortElapsed && SelectionSortElapsed >=  InsertionSortElapsed).to.be.true;
    })

})