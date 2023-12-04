import React, {useState, useEffect} from 'react'

export default function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [go, setGo] = useState(true);
//00:00 
  var timerId;

  useEffect(()=>{
    if(go){
    timerId = setInterval(() => {
      setSec(sec+1)

      if(sec === 59){
        setMin(min+1)
        setSec(0)
      }
    }, 1000);
  }
    return () =>{clearInterval(timerId)}

  })

  const timerReset = () =>{
    setSec(0)
    setMin(0)
    clearInterval(timerId)
  }

  const timerStop = () =>{
    setGo(false)
  }

  const timerGo = () =>{
    setGo(true)
  }

  return (
    //setInterval, setTimeout
    //기능 1.뽀모도로 타이머(25/5)작동. 세션 기억할 필요가 있음. db활용
  <div style={{'border': '1px solid black'}}>
    
    <div>Timer</div>
    <button type='button' onClick={timerReset}>초기화</button>
    <button type='button' onClick={timerStop}>멈춤</button>
    <button type='button' onClick={timerGo}>재시작</button>
    <p>{min<10? '0'+min:min}:{sec<10? '0'+sec:sec}</p>
  </div>
  )
}
