import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [showErrormessage, setShowErrorMessage] = useState(false);

  const handleOnIncrement = () => {
    if (showErrormessage) {
      setShowErrorMessage(false);
    }
    setCount(count + 1);
  }

  const handleOnDecrement = () => {
    if (count <= 0) {
      return setShowErrorMessage(true);
    }

    return setCount(count - 1)
  }

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      {showErrormessage && (
        <h2 data-test="error-message" style={{ textColor: 'red'}}>
          The counter cannot go below 0
        </h2>
      )}
      <button data-test="increment-button" onClick={handleOnIncrement}>
        Increment counter
      </button>
      <button data-test="decrement-button" onClick={handleOnDecrement}>
        Decrement counter
      </button>
    </div>
  );
}

export default App;
