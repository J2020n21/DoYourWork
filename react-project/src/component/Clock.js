import React,{useState, useEffect} from 'react'

export default function Clock() {
  const [nowTime, setNowTime] = useState(null)
  let intervalId;

  useEffect(()=>{
    //1초마다 다음의 코드를 시행한다.
    intervalId = setInterval(() => {
      let copy = new Date().toLocaleTimeString()
      setNowTime(copy)
    }, 1000);
  },[])

  return (
    !nowTime? 
    <p>Loading...</p>
    :<p>{nowTime}</p>
  )
}
//17:00시738546063