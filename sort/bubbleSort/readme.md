# 버블 정렬
버블 정렬 알고리즘은 가장 느린 정렬 알고리즘 가운데 하나지만 그만큼 구현하기는 가장 쉽습니다.

버블정렬은 데이터을 정렬할 때 배열의 한쪽 끝에서 다른 쪽 끝으로 버블처럼 값이 떠오른다는 의미에서 유래되었습니다.
데이터 집합이 오른차순으로 정렬된다면 큰 값은 배열의 오른쪽으로 작은 값은 배열의 왼쪽으로 이동해야 합니다.
따라서 데이터를 여러번 반복적으로 탐색하면서 인접한 값을 서로 비교해 왼쪽 값이 오른쪽 값보다 크다면 두 값을 서로 바꿔야 합니다.

설명보단 아래의 gif 파일 하나가 더 효과적일 듯 합니다.

![버블정렬](https://upload.wikimedia.org/wikipedia/commons/0/06/Bubble-sort.gif)
[출처 : https://commons.wikimedia.org]

결론적으로 버블정렬은 항목 중 가장 큰 값을 하나씩 배열의 가장 오른쪽으로 위치시키는 작업을 반복합니다.
이제 코드로 구현해보겠습니다.
```javascript
class BubbleSort extends RandomArray {
    ...
    bubbleSort() {
        // 외부 반복문은 배열에서 정렬이 확인되지 않은 배열의 위치를 통제합니다. (배열의 가장 오른쪽 값이 가장 크다고 확인된 인덱스는 제외하는 작업)
        for(let outer = this.dataStore.length-1; outer >= 1; outer--) {
            // 내부 반복문은 배열의 처음부터 정렬 확인이 안된 배열의 위치까지
            for(let inner = 0; inner < outer; inner++) {
                if (this.dataStore[inner] > this.dataStore[inner+1]) { // 인접한 값을 비교하여 왼쪽 값이 오른쪽 값보다 더 크다면
                    this.swap(inner, inner+1); // 두 값을 교환합니다.
                }
            }
        }
    }
}
```
