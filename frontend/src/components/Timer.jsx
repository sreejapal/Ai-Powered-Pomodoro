 import React, { useState, useEffect, useRef } from 'react'

 const WORK_DURATION = 50 * 60;
 const SHORT_BREAK = 10 * 60;
 const LONG_BREAK = 30 * 60;

 const Timer = () => {
    const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [cycle, setCycle] = useState(0);
    const intervalRef = useRef(null);

    const getCurrentPhase = () =>{
        if (cycle == 7) return 'Long Break';
        return cycle%2 ===0?'Work': 'Short Break';

    };

    const getDurationForCycle = (c) => {
        if (c === 7) return LONG_BREAK;
        return c % 2 === 0 ? WORK_DURATION : SHORT_BREAK;
      };

    const startTimer = () =>{
        if (intervalRef.current !== null) return;

        intervalRef.current =  setInterval (() => {
            setSecondsLeft((prev) => {
                if (prev ===0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    const nextCycle = cycle +1 >7 ?0:cycle+1;
                    setCycle(nextCycle);
                    setSecondsLeft(getDurationForCycle(nextCycle));
                    return getDurationForCycle(nextCycle);

                }
                return prev-1;
            });
        },1000);
        setIsRunning(true);
    };
    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
      };
    const resetTimer = () => {
        pauseTimer();
        setCycle(0);
        setSecondsLeft(WORK_DURATION);
      };
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      };

    const isWorkPhase = getCurrentPhase() === 'Work';
    const headline = isWorkPhase ? 'Focus!' : 'Rest!';
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200">
            <div className="text-center p-8 bg-white/80 rounded-3xl shadow-2xl w-96 border-2 border-blue-100 backdrop-blur-md">
                <div className="mb-4">
                  <h2 className={`text-3xl font-extrabold mb-2 drop-shadow-lg ${isWorkPhase ? 'text-cyan-700' : 'text-blue-500 animate-pulse'}`}>{headline}</h2>
                </div>
                <p className="text-6xl font-mono mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 text-transparent bg-clip-text drop-shadow-xl animate-pulse">{formatTime(secondsLeft)}</p>
                <div className="space-x-4 flex justify-center mb-2">
                    {!isRunning ? (
                        <button onClick={startTimer} className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300">Start</button>
                    ) : (
                        <button onClick={pauseTimer} className="bg-blue-400 hover:bg-blue-300 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200">Pause</button>
                    )}
                    <button onClick={resetTimer} className="bg-blue-200 hover:bg-blue-100 text-blue-700 px-6 py-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Timer;