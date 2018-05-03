export class Fibonacci {
    constructor() {
        this.val = [];
    }

    recursion(n) {
        if (n < 2) {
            return n;
        } else {
            return this.recursion(n - 1) + this.recursion(n - 2);
        }
    }

    dynamic(n) {
        let val = [];
        val[0] = 0;
        val[1] = 1;
        return this._dynamic(n, val);
    }
    _dynamic(n, val) {
        if (val[n] >= 0) {
            return val[n];
        }
        val[n] = this._dynamic(n-1, val) + this._dynamic(n-2, val);
        return val[n];
    }
    iter(n) {
        /*if (n < 2) {
            return n;
        }
        let result = 0;
        let prevOne = 1; // n-1
        let prevTwo = 0; // n-2
        for (let i = 2; i <= n; i++) {
            let tmp = prevOne + prevTwo;
            prevTwo = prevOne;
            prevOne = result;
            result = tmp;
        }

        return result;*/

        // DP를 이용한 반복
        let val = [];
        val[0] = 0;
        val[1] = 1;
        for (let i = 2; i <= n; i++) {
            val[i] = val[i-1] + val[i-2];
        }

        return val[n];
    }
    lcs(word1, word2) {
        let max = 0;
        let index = 0;
        // 이차원 배열 설정
        let lcsArr = [];
        for (let i = 0; i <= word1.length; i++) {
            lcsArr[i] = [];
        }

        for (let i = 0; i <= word1.length; i++) {
            for (let j = 0; j <= word2.length; j++) {
                if (i === 0 || j === 0) {
                    lcsArr[i][j] = 0;
                } else {
                    if (word1[i-1] === word2[j-1]) {
                        lcsArr[i][j] = lcsArr[i-1][i-1] + 1;
                    } else {
                        lcsArr[i][j] = 0;
                    }
                }
                if (max < lcsArr[i][j]) {
                    max = lcsArr[i][j];
                    index = i;
                }
            }
        }

        let str = '';
        if (max === 0) {
            return '';
        } else {
            for (let i = index-max; i <= max; ++i) {
                str += word2[i];
            }
            return str;
        }
    }
}