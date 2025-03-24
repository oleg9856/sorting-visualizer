class SortingAlgorithms {
  // Bubble sort з підтримкою анімації
  static async bubbleSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          updateCallback([...arr]);
          await sleep(delay);
        }
      }
    }
    return arr;
  }

  // Selection sort з підтримкою анімації
  static async selectionSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        updateCallback([...arr]);
        await sleep(delay);
      }
    }
    return arr;
  }

  // Insertion sort з підтримкою анімації
  static async insertionSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    const len = arr.length;
    for (let i = 1; i < len; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        updateCallback([...arr]);
        await sleep(delay);
      }
      arr[j + 1] = key;
      updateCallback([...arr]);
      await sleep(delay);
    }
    return arr;
  }

  // Merge sort з підтримкою анімації
  static async mergeSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    async function merge(l, m, r) {
      let left = arr.slice(l, m + 1);
      let right = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
        }
        updateCallback([...arr]);
        await sleep(delay);
      }
      while (i < left.length) {
        arr[k++] = left[i++];
        updateCallback([...arr]);
        await sleep(delay);
      }
      while (j < right.length) {
        arr[k++] = right[j++];
        updateCallback([...arr]);
        await sleep(delay);
      }
    }
    async function mergeSortRecursive(l, r) {
      if (l < r) {
        let m = Math.floor((l + r) / 2);
        await mergeSortRecursive(l, m);
        await mergeSortRecursive(m + 1, r);
        await merge(l, m, r);
      }
    }
    await mergeSortRecursive(0, arr.length - 1);
    return arr;
  }

  // Швидке сортування (Quick Sort) з підтримкою анімації
  static async quickSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    async function quickSortRec(low, high) {
      if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSortRec(low, pivotIndex - 1);
        await quickSortRec(pivotIndex + 1, high);
      }
    }
    async function partition(low, high) {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          updateCallback([...arr]);
          await sleep(delay);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      updateCallback([...arr]);
      await sleep(delay);
      return i + 1;
    }
    await quickSortRec(0, arr.length - 1);
    return arr;
  }

  // Heap sort з підтримкою анімації
  static async heapSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    const n = arr.length;
    async function heapify(n, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        updateCallback([...arr]);
        await sleep(delay);
        await heapify(n, largest);
      }
    }
    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      updateCallback([...arr]);
      await sleep(delay);
      await heapify(i, 0);
    }
    return arr;
  }

  // Radix sort з підтримкою анімації
  static async radixSort(array, updateCallback, sleep, delay = 100) {
    let arr = [...array];
    let max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      let output = new Array(arr.length).fill(0);
      let count = new Array(10).fill(0);
      for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }
      arr = output;
      updateCallback([...arr]);
      await sleep(delay);
    }
    return arr;
  }
}

export default SortingAlgorithms;