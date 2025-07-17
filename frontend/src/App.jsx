import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Timer from './components/Timer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [cycle, setCycle] = useState(0);
  const [resetAll, setResetAll] = useState(false);

  useEffect(() => {
    if (cycle === 8) {
      setResetAll(true);
      setCycle(0); // reset cycle
    }
  }, [cycle]);

  // After reset, turn off resetAll so children can reset again in the future
  useEffect(() => {
    if (resetAll) {
      setTimeout(() => setResetAll(false), 0);
    }
  }, [resetAll]);

  return (
    <ErrorBoundary>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Timer cycle={cycle} setCycle={setCycle} resetAll={resetAll} />
        <TodoList resetAll={resetAll} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
