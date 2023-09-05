import { useState, useEffect } from 'react'

function Timer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const gameTimer = setInterval(() => {
      setTimer(timer + 1);
    }, 1000)

    return (()=> {
      clearInterval(gameTimer);
    })
  }, [timer]);

  return (
    <h1 className='timer'>{`${Math.floor(timer / 60)} : ${String(timer % 60).padStart(2, '0')}`}</h1>
  )
}

export default Timer
