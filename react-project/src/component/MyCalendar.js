import React, {useEffect, useState} from 'react';
import axios, * as others from 'axios';
import dayjs from 'dayjs';
import {Grid, Box, Container, FormControl, FormLabel, Input, InputLabel,
  Select, Typography,Button, 
} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

//input에 입력-> db에 저장, 달력에 표시하기

function MyCalendar(){
  //date:yyyy-mm-dd, content:schedule
  const [theDay, setTheDay] = useState(null)//일정과 연동할 날짜
  const [schedule, setSchedule] = useState(null) //todo같은 일정
//일정과 날짜를 합치기
  const addSchedule = (e) =>{
    console.log(schedule+theDay)
  }

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
        type='text' name='schedule' value={schedule}
        onChange={e=>setSchedule(e.target.value)}
        style={{
          display:'block', width:'30%',
          marginLeft:'auto', marginRight:'auto'
        }}
       placeholder='schedule'/>

       <Button    
        onClick={e=>addSchedule(e)}
        variant='outlined'     
        style={{
          display:'block', width:'30%',
          marginLeft:'auto', marginRight:'auto'
        }}>일정 추가</Button>
      </Box>
    );

}

export default MyCalendar