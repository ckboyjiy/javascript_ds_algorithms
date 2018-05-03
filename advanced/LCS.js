export class LCS {
    constructor(isDebug = false) {
        this.isDebug = isDebug;
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