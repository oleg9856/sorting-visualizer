import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SortingAlgorithms from './SortingAlgorithms';

function App() {
  const [length, setLength] = useState(50);
  const [speed, setSpeed] = useState(150);
  const [blocks, setBlocks] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('bubbleSort');
  const containerRef = useRef(null);

  // Генерація нового масиву (від 1 до length)
  const generateRandomArray = (len) => {
    setSorting(false);
    const randomArray = Array.from({ length: Number(len) }, (_, i) => i + 1);
    // Перемішування масиву
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    setBlocks(randomArray);
  };

  // Затримка для анімації
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Запуск сортування обраним алгоритмом
  const sortArray = async () => {
    setSorting(true);
    await SortingAlgorithms[selectedAlgo](blocks, setBlocks, sleep, speed);
    setSorting(false);
  };

  // Оновлення масиву при зміні довжини
  useEffect(() => {
    generateRandomArray(length);
  }, [length]);

  // Отримуємо висоту контейнера
  const containerHeight = containerRef.current ? containerRef.current.clientHeight : 500;
  // Знаходимо максимальне значення масиву
  const maxVal = Math.max(...blocks, 1);
  // Обчислення висоти бару (не більше 90% від висоти контейнера)
  const barHeight = (value) => (value / maxVal) * (containerHeight * 0.9);
  // Ширина кожного бару – заповнює рівномірно доступну ширину
  const barWidth = blocks.length ? `${100 / blocks.length}%` : "auto";

  return (
    <div className="App">
      <header className="app-header">
        <h1>Sorting Visualizer</h1>
      </header>
      
      <div className="controls">
        <div className="control-group">
          <label>Довжина масиву:</label>
          <input 
            type="range" 
            min="10" 
            max="150" 
            value={length} 
            onChange={e => setLength(e.target.value)} 
            disabled={sorting}
          />
          <span>{length}</span>
        </div>
        <div className="control-group">
          <label>Швидкість:</label>
          <input 
            type="range" 
            min="50" 
            max="500" 
            step="10" 
            value={speed} 
            onChange={e => setSpeed(Number(e.target.value))} 
            disabled={sorting}
          />
          <span>{speed} ms</span>
        </div>
        <div className="control-group">
          <label>Алгоритм:</label>
          <select 
            value={selectedAlgo} 
            onChange={e => setSelectedAlgo(e.target.value)}
            disabled={sorting}
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="radixSort">Radix Sort</option>
          </select>
        </div>
        <div className="buttons">
          <button onClick={sortArray} disabled={sorting}>
            {sorting ? 'SORTING...' : 'СТАРТ'}
          </button>
          <button onClick={() => generateRandomArray(length)} disabled={sorting}>
            ПЕРЕЗАПУСТИТИ
          </button>
        </div>
      </div>
      
      {/* Контейнер графіку із встановленою висотою та адаптацією елементів */}
      <div className="blocks-container" ref={containerRef}>
        {blocks.map((block, index) => (
          <div key={index} className="block-container" style={{ width: barWidth }}>
            <div 
              className="block" 
              style={{ height: `${barHeight(block)}px` }}
            ></div>
            <span className="block-label">{block}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;