import React, {useEffect, useState} from 'react';
import axios, * as others from 'axios';
import {Grid, Box, Container, FormControl, FormLabel, Input, InputLabel,
  Select, Typography
   ,Button} from '@mui/material';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Todolist from './views/Todolist.ejs';
import Clock from './component/Clock';
import Timer from './component/Timer';

function App() {
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
      //문제: 서버 재기동 시 todo가 반복되어서 밑에 한 번 더 나타남
      //단순 브라우저 새로고침은 문제없음
  },[])

  const handleAddTodo = ()=>{
    //post 요청을 data(todo)와 함께 보낸다. 응답을 받아서 설정한다.
    axios.post('http://localhost:8080/addTodo',{todo})
    .then(async (res)=>{
      await console.log(res.data);
      // await setTodoList(res.data.content); //todoList에 추가하기
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
    <>
    {mode === 'calendar'? <Calendar/>:<Clock/>}
    {showTimer === 1? <Timer/>:null}
    <Button variant='contained' onClick={handleMode}>{mode}</Button>
    <Button variant='contained' onClick={handleTimer}>Timer</Button>
 
  <form>
    <input type='text' name='todo' value={todo}
      onChange={(e)=>setTodo(e.target.value)}/>
    <button type='button' onClick={()=>{handleAddTodo()}}>할일 작성</button>
    <button type='button' onClick={()=>{showTodo===1? setShowTodo(0):setShowTodo(1)}}>접기</button>
  </form>

  {showTodo === 1 && todoList?
  //전체 todoList에 스크롤 달기 
    todoList.map((task)=>{return(
    <div>
      <p>{task}</p>
      <button type='button' onClick={()=>{deleteTodo(task)}}>삭제</button>
      <button type='button'>수정</button>
    </div>
    )})
    :null
  }
  {console.log({todoList})}

  </>);

}
export default App;
