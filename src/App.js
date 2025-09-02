import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [pivot, setPivot] = useState(-1);

  const algorithms = {
    bubbleSort: 'Bubble Sort',
    selectionSort: 'Selection Sort',
    insertionSort: 'Insertion Sort',
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort',
    heapSort: 'Heap Sort'
  };

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 10);
    }
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setPivot(-1);
    setIsPlaying(false);
  }, [arraySize]);

  // Initialize array on mount and size change
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Bubble Sort Algorithm
  const bubbleSort = (arr) => {
    const steps = [];
    const n = arr.length;
    const array = [...arr];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({length: i}, (_, k) => n - 1 - k)
        });

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps.push({
            array: [...array],
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            sorted: Array.from({length: i}, (_, k) => n - 1 - k)
          });
        }
      }
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i + 1}, (_, k) => n - 1 - k)
      });
    }

    return steps;
  };

  // Selection Sort Algorithm
  const selectionSort = (arr) => {
    const steps = [];
    const n = arr.length;
    const array = [...arr];

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...array],
          comparing: [minIdx, j],
          swapping: [],
          sorted: Array.from({length: i}, (_, k) => k)
        });

        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, minIdx],
          sorted: Array.from({length: i}, (_, k) => k)
        });
      }

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i + 1}, (_, k) => k)
      });
    }

    return steps;
  };

  // Insertion Sort Algorithm
  const insertionSort = (arr) => {
    const steps = [];
    const n = arr.length;
    const array = [...arr];

    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;

      steps.push({
        array: [...array],
        comparing: [i],
        swapping: [],
        sorted: Array.from({length: i}, (_, k) => k)
      });

      while (j >= 0 && array[j] > key) {
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({length: i}, (_, k) => k)
        });

        array[j + 1] = array[j];
        j = j - 1;

        steps.push({
          array: [...array],
          comparing: [j + 1, j + 2],
          swapping: [j + 1, j + 2],
          sorted: Array.from({length: i}, (_, k) => k)
        });
      }
      array[j + 1] = key;

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i + 1}, (_, k) => k)
      });
    }

    return steps;
  };

  // Quick Sort Algorithm
  const quickSort = (arr) => {
    const steps = [];
    const array = [...arr];

    const partition = (low, high) => {
      const pivot = array[high];
      let i = low - 1;

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: [],
        pivot: high
      });

      for (let j = low; j <= high - 1; j++) {
        steps.push({
          array: [...array],
          comparing: [j, high],
          swapping: [],
          sorted: [],
          pivot: high
        });

        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            [array[i], array[j]] = [array[j], array[i]];
            steps.push({
              array: [...array],
              comparing: [j, high],
              swapping: [i, j],
              sorted: [],
              pivot: high
            });
          }
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i + 1, high],
        sorted: [],
        pivot: i + 1
      });

      return i + 1;
    };

    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    quickSortHelper(0, array.length - 1);
    return steps;
  };

  // Merge Sort Algorithm
  const mergeSort = (arr) => {
    const steps = [];
    const array = [...arr];

    const merge = (left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const leftArr = new Array(n1);
      const rightArr = new Array(n2);

      for (let i = 0; i < n1; i++) leftArr[i] = array[left + i];
      for (let j = 0; j < n2; j++) rightArr[j] = array[mid + 1 + j];

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        steps.push({
          array: [...array],
          comparing: [left + i, mid + 1 + j],
          swapping: [],
          sorted: []
        });

        if (leftArr[i] <= rightArr[j]) {
          array[k] = leftArr[i];
          i++;
        } else {
          array[k] = rightArr[j];
          j++;
        }

        steps.push({
          array: [...array],
          comparing: [],
          swapping: [k],
          sorted: []
        });
        k++;
      }

      while (i < n1) {
        array[k] = leftArr[i];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [k],
          sorted: []
        });
        i++;
        k++;
      }

      while (j < n2) {
        array[k] = rightArr[j];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [k],
          sorted: []
        });
        j++;
        k++;
      }
    };

    const mergeSortHelper = (left, right) => {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    };

    mergeSortHelper(0, array.length - 1);
    return steps;
  };

  // Heap Sort Algorithm
  const heapSort = (arr) => {
    const steps = [];
    const array = [...arr];
    const n = array.length;

    const heapify = (n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        steps.push({
          array: [...array],
          comparing: [largest, left],
          swapping: [],
          sorted: []
        });

        if (array[left] > array[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        steps.push({
          array: [...array],
          comparing: [largest, right],
          swapping: [],
          sorted: []
        });

        if (array[right] > array[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, largest],
          sorted: []
        });
        heapify(n, largest);
      }
    };

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [0, i],
        sorted: Array.from({length: n - i}, (_, k) => n - 1 - k)
      });
      heapify(i, 0);
    }

    return steps;
  };

  // Get sorting steps based on selected algorithm
  const getSortingSteps = () => {
    switch (algorithm) {
      case 'bubbleSort': return bubbleSort(array);
      case 'selectionSort': return selectionSort(array);
      case 'insertionSort': return insertionSort(array);
      case 'quickSort': return quickSort(array);
      case 'mergeSort': return mergeSort(array);
      case 'heapSort': return heapSort(array);
      default: return [];
    }
  };

  // Start/pause sorting animation
  const toggleSorting = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (steps.length === 0) {
        const newSteps = getSortingSteps();
        setSteps(newSteps);
      }
      setIsPlaying(true);
    }
  };

  // Reset to initial state
  const resetSorting = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSteps([]);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setPivot(-1);
    generateArray();
  };

  // Animation effect
  useEffect(() => {
    let intervalId;

    if (isPlaying && steps.length > 0 && currentStep < steps.length) {
      intervalId = setInterval(() => {
        const step = steps[currentStep];
        setArray(step.array);
        setComparing(step.comparing || []);
        setSwapping(step.swapping || []);
        setSorted(step.sorted || []);
        setPivot(step.pivot !== undefined ? step.pivot : -1);
        setCurrentStep(prev => prev + 1);
      }, 101 - speed);
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
      setSorted(Array.from({length: array.length}, (_, i) => i));
      setComparing([]);
      setSwapping([]);
      setPivot(-1);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, steps, speed, array.length]);

  // Get bar color based on state
  const getBarColor = (index) => {
    if (sorted.includes(index)) return 'bg-green-500';
    if (pivot === index) return 'bg-purple-500';
    if (swapping.includes(index)) return 'bg-red-500';
    if (comparing.includes(index)) return 'bg-yellow-500';
    return 'bg-blue-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-gray-300">Watch different sorting algorithms in action</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Algorithm Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => {
                  setAlgorithm(e.target.value);
                  resetSorting();
                }}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                disabled={isPlaying}
              >
                {Object.entries(algorithms).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* Array Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Array Size: {arraySize}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full"
                disabled={isPlaying}
              />
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Speed: {speed}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={toggleSorting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetSorting}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Pivot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-end justify-center h-96 gap-1">
            {array.map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-100 ${getBarColor(index)}`}
                style={{
                  height: `${(value / 410) * 100}%`,
                  width: `${Math.max(800 / array.length - 1, 2)}px`,
                  minWidth: '2px'
                }}
                title={`Index: ${index}, Value: ${value}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Current Algorithm: {algorithms[algorithm]}</h3>
            <div className="text-sm text-gray-300 space-y-2">
              {algorithm === 'bubbleSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n²)</p>
                  <p><strong>Space Complexity:</strong> O(1)</p>
                  <p><strong>Description:</strong> Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.</p>
                </>
              )}
              {algorithm === 'selectionSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n²)</p>
                  <p><strong>Space Complexity:</strong> O(1)</p>
                  <p><strong>Description:</strong> Finds the minimum element and places it at the beginning, then repeats for the remaining elements.</p>
                </>
              )}
              {algorithm === 'insertionSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n²)</p>
                  <p><strong>Space Complexity:</strong> O(1)</p>
                  <p><strong>Description:</strong> Builds the final sorted array one item at a time by inserting each element into its correct position.</p>
                </>
              )}
              {algorithm === 'mergeSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n log n)</p>
                  <p><strong>Space Complexity:</strong> O(n)</p>
                  <p><strong>Description:</strong> Divides the array into halves, sorts them separately, then merges the sorted halves.</p>
                </>
              )}
              {algorithm === 'quickSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst</p>
                  <p><strong>Space Complexity:</strong> O(log n)</p>
                  <p><strong>Description:</strong> Picks a pivot element and partitions the array around it, then recursively sorts the partitions.</p>
                </>
              )}
              {algorithm === 'heapSort' && (
                <>
                  <p><strong>Time Complexity:</strong> O(n log n)</p>
                  <p><strong>Space Complexity:</strong> O(1)</p>
                  <p><strong>Description:</strong> Builds a max heap from the array, then repeatedly extracts the maximum element.</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">Statistics</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Array Size:</strong> {array.length} elements</p>
              <p><strong>Current Step:</strong> {currentStep} / {steps.length}</p>
              <p><strong>Progress:</strong> {steps.length > 0 ? Math.round((currentStep / steps.length) * 100) : 0}%</p>
              <p><strong>Status:</strong> {isPlaying ? 'Running' : currentStep >= steps.length && steps.length > 0 ? 'Completed' : 'Ready'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;