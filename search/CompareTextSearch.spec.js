import {expect} from 'chai';
import {BinarySearch} from "./binarySearch/BinarySearch";
import {LinearSearch} from "./linearSearch/LinearSearch";
const fs = require('fs');

describe('The text search test', ()=> {
    it('should be retrieved index number of a text which equal a specified text', ()=> {
        const file = fs.readFileSync('./spec/search/CompareTextSearch.spec.txt', 'utf-8').replace(/\r\n/gi, ' ');
        const words = file.split(' ');
        const linear = new LinearSearch();
        linear.setArray(words);
        const binary = new BinarySearch();
        binary.setArray(words);
        binary.quickSort();

        let start = new Date().getTime();
        expect(linear.search('testable.')).to.equal(63674);
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time of a linear search was ${elapsed} milliseconds`);

        start = new Date().getTime();
        expect(binary.search('testable.')).to.equal(53686);
        stop = new Date().getTime();
        elapsed = stop - start;
        console.log(`The elapsed time of a binary search was ${elapsed} milliseconds`);
    })
});