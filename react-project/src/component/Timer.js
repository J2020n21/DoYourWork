import React, {useState, useEffect} from 'react'

export default function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerGo, setTimerGo] = useState(false);
//00:00 
  let timerId;
  let second;

  useEffect(()=>{
    if(timerId){clearInterval(timerId)}
    timerId = setInterval(() => {
      setSec(s => s+1)
    }, 1000);
    if(sec%60 == 0){setSec(0); setMin(m=>m+1)}
  },[timerGo])


  return (
    //setInterval, setTimeout
    //기능 1.뽀모도로 타이머(25/5)작동. 세션 기억할 필요가 있음. db활용
    //기능 2.일반 타이머. 0초부터 시간이 stop 누를때까지 늘어남.
  <div style={{'border': '1px solid black'}}>
    
    <div>Timer</div>
    <button type='button' >시작</button>
    <button type='button'>멈춤</button>
    <button type='button' >초기화</button>
    <p>{min}:{sec}</p>
  </div>
  )
}
