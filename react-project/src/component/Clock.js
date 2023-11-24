import React,{useState, useEffect} from 'react'

export default function Clock() {
  const [nowTime, setNowTime] = useState(null)
  let intervalId;

  useEffect(()=>{
    if(intervalId) {clearInterval(intervalId)};
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
