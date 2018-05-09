export class LCS {
    constructor(isDebug = false) {
        this.isDebug = isDebug;
    }

    recursion(word1, word2) {
        if (word1.length <= 0 || word2.length <= 0) {
            return 0;
        }
        return this._recursion(word1, word2, word1.length, word2.length);
    }
    _recursion(word1, word2, i, j) {
        if (i === 0 || j === 0) {
            return 0;
        } else if (word1[i-1] === word2[j-1]) {
            return this._recursion(word1, word2, i-1, j-1) + 1;
        } else {
            return Math.max(this._recursion(word1, word2, i, j-1), this._recursion(word1, word2, i-1, j));
        }
    }

    recursionDP(word1, word2) {
        if (word1.length <= 0 || word2.length <= 0) {
            return 0;
        }
        let lcsArr = [];
        for (let x = 0; x <= word1.length; x++) {
            lcsArr[x] = [];
            for (let y = 0; y <= word2.length; y++) {
                lcsArr[x][y] = null;
            }
        }
        const result = this._recursionDP(word1, word2, word1.length, word2.length, lcsArr);
        console.log(lcsArr);
        return result;
    }
    _recursionDP(word1, word2, i, j, lcsArr) {
        if (i === 0 || j === 0) {
            lcsArr[i][j] = 0;
            return lcsArr[i][j];
        } else if (word1[i-1] === word2[j-1]) {
            if (!lcsArr[i][j]) {
                lcsArr[i][j] = this._recursionDP(word1, word2, i-1, j-1, lcsArr) + 1;
            }
            return lcsArr[i][j];
        } else {
            if (!lcsArr[i][j-1]) {
                lcsArr[i][j-1] = this._recursionDP(word1, word2, i, j-1, lcsArr);
            }
            if (!lcsArr[i-1][j]) {
                lcsArr[i-1][j] = this._recursionDP(word1, word2, i-1, j, lcsArr);
            }
            lcsArr[i][j] = Math.max(lcsArr[i][j-1], lcsArr[i-1][j]);
            return lcsArr[i][j];
        }
    }

    iter(word1, word2) {
        if (word1.length <= 0 || word2.length <= 0) {
            return 0;
        }

        let lcsArr = [];
        let max = 0;
        for (let i = 0; i <= word1.length; i++) {
            let str = '';
            lcsArr[i] = [];
            for (let j = 0; j <= word2.length; j++) {
                if (i === 0 || j === 0) {
                    lcsArr[i][j] = 0;
                } else if (word1[i-1] === word2[j-1]) {
                    lcsArr[i][j] = lcsArr[i-1][j-1] + 1;
                    max = lcsArr[i][j];
                } else {
                    lcsArr[i][j] = Math.max(lcsArr[i][j-1], lcsArr[i-1][j]);
                }
                str += lcsArr[i][j] + '\t';
            }
            this.log(str);
        }
        return max;
    }

    log(str) {
        if (this.isDebug) {
            console.log(str);
        }
    }
}