import React, {useState, useEffect} from 'react'

export default function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerGo, setTimerGo] = useState(false);
//1.초>분 넘어가게 처리 2.버튼 동작하기
  let timerSecId;
  let timerMinId;

  useEffect(()=>{
    if(timerSecId){clearInterval(timerSecId)}
    if(timerMinId){clearInterval(timerMinId)}
    if(timerGo){
      timerSecId = setInterval(() => {
        setSec(s => s+1)
      }, 1000);
      timerMinId = setInterval(()=>{
        setMin(m => m+1)
      },60000)
    }
  },[timerGo])

  const startTimer = () =>{
    setTimerGo(true)
  }

  const stopTimer = () =>{ //작동 정지.
    setTimerGo(false)
  }

  const resetTimer = () =>{
    setTimerGo(false)
  }

  return (
    //setInterval, setTimeout
    //기능 1.뽀모도로 타이머(25/5)작동. 세션 기억 db활용
    //기능 2.일반 타이머. 0초부터 시간이 stop 누를때까지 늘어남.
  <div style={{'border': '1px solid black'}}>
    
    <div>Timer</div>
    <button type='button' onClick={startTimer}>시작</button>
    <button type='button' onClick={stopTimer}>멈춤</button>
    <button type='button' onClick={resetTimer}>초기화</button>
    <p>{min}:{sec}</p>
  </div>
  )
}
