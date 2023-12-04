import React, {useState, useEffect} from 'react'

export default function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [go, setGo] = useState(false);
  const [mode, setMode] = useState("Normal")

  const [session, setSession] = useState(8)//76543210
  const [minP, setMinP] = useState(0);
  const [secP, setSecP] = useState(3);
  const [goP, setGoP] = useState(false);

  var timerId;
  var timerId2;

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

useEffect(()=>{
  if(goP){
    timerId2 = setInterval(() => {
      setSecP(secP-1)

      if(secP === 0){
        setMinP(minP-1)
        setSecP(59)
        if(minP === 0){ 
          setSession(session-1) //ok
          console.log(session%2)
          if(session%2==1)setMinP(5) //?
          else setMinP(24)
        }
        
      }
    }, 1000);
  }
  return()=>{clearInterval(timerId2)}
  
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

  const PomodoroReset = () =>{
    setSecP(0)
    setMinP(25)
    setSession(8)
    clearInterval(timerId2)
  }

  const PomodoroStop = () =>{
    setGoP(false)
  }

  const PomodoroGo = () =>{
    setGoP(true)
  }

  const changeMode = () =>{
    mode==="Normal"?setMode("Pomodoro"):setMode("Normal")
  }

  return (
  <div style={{'border': '1px solid black'}}>
    {mode === "Normal"?    
    <div>
      <div>Noraml Timer</div>
      <button type='button' onClick={timerReset}>초기화</button>
      <button type='button' onClick={timerStop}>멈춤</button>
      <button type='button' onClick={timerGo}>재시작</button>
      <p>{min<10? '0'+min:min}:{sec<10? '0'+sec:sec}</p>
    </div>
    :
    <div>
      <div>Pomodoro</div>
      <button type='button' onClick={PomodoroReset}>초기화</button>
      <button type='button' onClick={PomodoroStop}>멈춤</button>
      <button type='button' onClick={PomodoroGo}>시작</button>
      <p>남은 세션:{parseInt(session/2)}</p>
      <p>{minP<10? '0'+minP:minP}:{secP<10? '0'+secP:secP}</p>
    </div>
    }
  <button onClick={changeMode}>모드변경</button>
  </div>
  )
}
