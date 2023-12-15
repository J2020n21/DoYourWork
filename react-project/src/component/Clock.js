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
    <div style={{'height':'300px','display':'flex','alignItems':'center','justifyContent':'center'}}>
{      !nowTime? 
      <div  style={{margin:'0'}} >Loading...</div>

      :<div>
        <h2 style={{margin:'0'}}>{nowTime}</h2>
       </div>}
      </div>
  )
}
