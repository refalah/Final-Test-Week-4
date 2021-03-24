const array = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21]

function bubbleSort(arr) {
    for (i = 0; i < arr.length - 1; i++){
        for (j = 0; j <arr.length - 1 - i; j++){
            if (arr[j] > arr[j+1]){
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}

console.log(bubbleSort(array))

