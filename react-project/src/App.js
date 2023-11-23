import React, {useEffect, useState} from 'react';
import axios, * as others from 'axios';
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
  const [show,setShow] = useState(1)
  const [todo,setTodo] = useState(null)
  const [todoList, setTodoList] = useState([])//{'content':'청소하기'}
//[{}{}{}]
  useEffect(()=>{
   axios.get('http://localhost:8080/getTodo')
      .then(async(res)=>{
        //todo라는 배열 안에 내용만 밀어넣는다
        await setTodoList(prev=>{})
        console.log("get request happened:"+res.data); //undefined
      })
      .catch(e=>console.log("error:"+e))
  },[])

  const handleGetRequest = () => {
    //DB에 저장된 todo를 가져와서 todoList에 set한다.
    axios.get('http://localhost:8080/getReq.json')
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data);
      })
      .catch((e) => {
        alert("실패: " + e);
      });
    }

  const handleAddTodo = ()=>{
    //post 요청을 data(todo)와 함께 보낸다. 응답을 받아서 설정한다.
    axios.post('http://localhost:8080/addTodo',{todo})
    .then(async (res)=>{
      await console.log(res.data); //나옴
      // await setTodoList(res.data.content); //todoList에 추가하기
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

  <form>
    <input type='text' name='todo' value={todo}
      onChange={(e)=>setTodo(e.target.value)}/>
    <button type='button' onClick={()=>{handleAddTodo()}}>할일 작성</button>
  </form>

  {show === 0 && todoList? null:
    todoList.map((task)=>{return(
    <div>
      <p>{task}</p>
      <button type='button' onClick={()=>{
        deleteTodo(task); 
        console.log("delete todo is:"+task)}}>X</button>
    </div>
    )})
  }
  {console.log({todoList})}

  </>);

}
export default App;
