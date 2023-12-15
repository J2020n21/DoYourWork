import React, {useEffect, useState} from 'react';
import axios, * as others from 'axios';
import dayjs from 'dayjs';
import {Grid, Box, Container, FormControl, FormLabel, Input, InputLabel,
  Select, Typography,Button, 
} from '@mui/material';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import Todolist from './views/Todolist.ejs';
import MyCalendar from './component/MyCalendar';
import Clock from './component/Clock';
import Timer from './component/Timer';

function App() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  
  const [mode,setMode] = useState('calendar')
  const [click,setClick] = useState(0)
  const [showTodo,setShowTodo] = useState(1)
  const [todo,setTodo] = useState(null)
  const [todoList, setTodoList] = useState([])
  const [showTimer, setShowTimer] = useState(0)

  useEffect(()=>{
    setTodoList([])
   axios.get('http://localhost:8080/getTodo')
      .then(async(res)=>{
        let nowContent = res.data.map((ele)=>ele.content)
        await setTodoList([...todoList, ...nowContent])
      })
      .catch(e=>console.log("error:"+e))
  },[])

  const handleAddTodo = ()=>{
    axios.post('http://localhost:8080/addTodo',{todo})
    .then(async (res)=>{
      await console.log(res.data);
      await setTodoList([]);
      await setTodoList([...todoList, res.data])
      await setTodo('');
    })
    .catch((e)=>{console.log(e)})
  }

  const deleteTodo = (task) =>{
    axios.delete(`http://localhost:8080/deleteTodo/${task}`)
    .then(
      setTodoList(prev => {
        return prev.filter(todo => todo !== task);
      })
    )
    .catch(e=>console.log(e))
  }

  const updateTodo = () =>{
    //todo: make function- update the specific task user clicked.
  }

  const handleMode = () =>{
    setClick(prevClick => prevClick+1)
    click%2 === 1? setMode('calendar'):setMode('clock')
  }
  
  const handleTimer = () =>{
    showTimer === 0? setShowTimer(1): setShowTimer(0)
  }



  return (
  <div style={{textAlign:'center', height:'100%'}}>
      {mode === 'calendar'? <MyCalendar/>:<Clock/>}
      {showTimer === 1? <Timer/>:null}
      <Button variant='contained' onClick={handleMode}>{mode}</Button>
      <Button variant='contained' onClick={handleTimer}>Timer</Button>
  
    <form style={{marginTop:'20px'}}>
      <Input type='text' name='todo' value={todo} placeholder='Todo'
        onChange={(e)=>setTodo(e.target.value)}/>
      <Button type='button' onClick={()=>{handleAddTodo()}}>할일 작성</Button>
      <Button type='button' onClick={()=>{showTodo===1? setShowTodo(0):setShowTodo(1)}}>
        {showTodo===1? '접기':'펴기'}
      </Button>
    </form>

    <div style={{height:'300px',overflowY:'scroll',marginTop:'20px'}}>
    {showTodo === 1 && todoList?
      todoList.map((task)=>{return(
        <>
        <p>{task}</p>
        <Button type='button' variant='outlined' size='small' onClick={()=>{deleteTodo(task)}}>삭제</Button>
        <Button type='button' variant='outlined' size='small'>수정</Button>
        </>
      )})
      :null
    }
    </div>
</div>);

}
export default App;
