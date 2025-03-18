function binarySearch(arr, item, low, high){
    if (high <= low) {
        return (item > arr[low]) ? (low + 1) : low;
    }

    const mid = Math.floor((low + high) / 2);

    if (item === arr[mid]) {
        return mid + 1;
    }

    if (item > arr[mid]){
        return binarySearch(arr, item, mid + 1, high);
    }

    return binarySearch(arr, item, low, mid - 1);
}

function binaryInsertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        const key = arr[i];
        const j = binarySearch(arr, key, 0, i - 1);

        arr.splice(i, 1);
        arr.splice(j, 0, key);

    }

    return arr;
}

export default binaryInsertionSort