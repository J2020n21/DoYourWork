import React, {useEffect, useState} from 'react';
import axios, * as others from 'axios';
import dayjs from 'dayjs';
import {Box, Input,Button, 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function MyCalendar(){
  const [theDay, setTheDay] = useState(null)
  const [schedule, setSchedule] = useState('') 
  let [calData, setCalData] = useState(null)  //for server
  const [calList, setCalList] = useState([]) //html display

  useEffect(()=>{ //read the data from db
    axios.get('http://localhost:8080/getCalSchedule')
      .then(async(res)=>{
        let nowSchedule = res.data.map((ele)=>{
          let d = ele.date;
          let c = ele.content;
          return {date:d,content:c}
        })
        await setCalList([...calList, ...nowSchedule])
      })
      .catch(
        e => console.log(e)
      )
  },[])


  const addSchedule = async() =>{
    let newSchedule = {date:theDay, content:schedule} //형식 만들어서
    await setCalData(calData = newSchedule) //서버로 전송
    await setCalList([...calList, newSchedule])//html뿌리기
    await axios.post('http://localhost:8080/addSchedule',{calData}) //db에 저장
      .then(async(res)=>{
        await setCalData([]) //비우기
      })
      .catch(e =>console.log(e))
  }

  const deleteSchedule = (targetSchedule) =>{
    axios.delete(`http://localhost:8080/deleteSchedule/${targetSchedule}`)
    .then(
      setCalList(prev=>{
        return prev.filter(ele => ele.content !== targetSchedule)
      })
    )
    .catch(e=>console.log(e))
  }

  // const deleteScheduleAll = () =>{
  //   console.log("delete all start")
  //   axios.delete(`http://localhost:8080/deleteScheduleAll`)
  //   .then(async()=>{
  //     setCalList(prev=>[]) //안됨?
  //     // console.log("all schedule removed")
  //     console.log("delete")
  //   }
  //   )
  //   .catch(e=>console.log(e))
  //   console.log("delete all end")
  // }

  const handleDate = (e) =>{
    const year = e.$y;
    const month = (e.$M)+1; 
    const day = e.$D; 
    // console.log(`${year}년${month}월${day}일`)
    setTheDay(year+'-'+month+'-'+day);
  }

    return(
    <Box style={{'marginBottom':'10px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
         showDaysOutsideCurrentMonth fixedWeekNumber={6}
          calendars={2} 
          onChange={(e)=>handleDate(e)}
        />
        
      </LocalizationProvider>
      <Input 
        type='text' name='scheduleInput' value={schedule}
        onChange={e=>setSchedule(e.target.value)}
        style={{
          display:'block', width:'30%',
          marginLeft:'auto', marginRight:'auto'
        }}
       placeholder='schedule'/>

       <Button    
        onClick={e=>addSchedule()}
        variant='outlined'     
        style={{
          display:'block', width:'30%',
          marginLeft:'auto', marginRight:'auto'
        }}>일정 추가</Button>
        {/* <Button    
        onClick={e=>deleteScheduleAll()}
        variant='outlined'     
        style={{
          display:'block', width:'30%',
          marginLeft:'auto', marginRight:'auto'
        }}>일정 전부 삭제</Button> */}

        <div>
          schedule
          {
            calList? calList.map((ele)=>{return(

              <p>
                {ele.date}: {ele.content}
                <Button variant='outlined' size='small'
                  onClick={e => {deleteSchedule(ele.content); console.log(ele.content)}}
                >삭제</Button>
              </p>
            )})
            :null
            
          }
          
        </div>
      </Box>
    );

}

export default MyCalendar