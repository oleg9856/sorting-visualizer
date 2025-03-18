import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './Navbar';

function App() {

  const generateRandomArray = (len) => {
    setCompleted(false)
    setSorting(false)
    setSortedIndex([])

    const randomArray = Array.from(Array(len + 1).keys()).slice(1)

    for (let i = randomArray.length - 1; i > 0; i--){
      const randomIndex = Math.floor(Math.random() * (i - 1))
      const temp = randomArray[i]
      
      randomArray[i] = randomArray[randomIndex]
      randomArray[randomIndex] = temp
      
    }

    setBlocks(randomArray)
  }
  const [length, setLength] = useState(50);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(true);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [blocks, setBlocks] = useState([])


  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  return (
    <div className="App">
      <Navbar handleLength={handleLengthChange} sorting={sorting} len={length} />
      {/* Other components and content */}
    </div>
  );
}

export default App;