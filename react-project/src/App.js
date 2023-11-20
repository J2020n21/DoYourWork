import React, {useEffect, useState} from 'react';
import {Grid, Box, Container, FormControl, FormLabel, Input, InputLabel,
  Select, Typography
   ,Button} from '@mui/material';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Todolist from './views/Todolist.ejs';
import Clock from './component/Clock';

function App() {
  const [mode,setMode] = useState('calendar')
  const [click,setClick] = useState(0)
  const [show,setShow] = useState(0)
  const [todoList, setTodoList] = useState([{}])


  useEffect(()=>{
    //추가 요청을 받으면 재랜더링한다
    fetch("/addTodo").then(res => res.json())
    .then( data =>{
      setTodoList(data)
    })
  },[])

  const handleMode = () =>{
    let copy = click
    setClick(copy+1)
    click%2 === 1? setMode('calendar'):setMode('clock')
  }

  return (
    <>
    {mode === 'calendar'? <Calendar/>:<Clock/>}
    
    <Button variant='contained'
     onClick={handleMode}>{mode}</Button>

  <form action='/addTodo' method='POST'>
    <input type='text' name='todo'/>
    <button type='submit'>전송</button>
  </form>
  {show === 0? null:
    todoList.todo.map((ele,i)=>{
      <p>{ele}</p>
    })
    }
  </>);
}

export default App;
