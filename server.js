require("dotenv").config();
const express = require('express');
//ejs setting
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
var cors = require('cors');
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({extended:true})); //res.body로 사용
const { MongoClient } = require('mongodb');

let db
const url = `mongodb+srv://jiui4691:dpqbis93om@doyourwork.w8m79rd.mongodb.net/?retryWrites=true&w=majority`
new MongoClient(url).connect().then((client)=>{
  db = client.db('DoYourWork')
  console.log('DB연결성공')

  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
  })

}).catch((err)=>{
  console.log(err)
})

app.use(express.static(__dirname + '/react-project/build'))

app.get('/', async (req,res)=>{
  res.sendFile('index.html')
})

//todoList handle
app.get('/getTodo',async(req,res)=>{
  try{
  const todos = await db.collection('todo_list').find().toArray();
  await res.json(todos) 
  }
  catch(e){
    console.log(e)
  }
})

app.post('/addTodo',(req,res)=>{
  try{
    const {todo} = req.body
    if(todo==''){alert("공백입니다.")}
    else{
      db.collection('todo_list').insertOne({content:todo})
      res.json(todo)
      //console.log("from post_ /addTodo, todo:"+todo)
    }
  }
  catch(error){
    console.log("Error:"+error);
  }
})

app.delete('/deleteTodo/:task', async (req,res)=>{
  const task = req.params.task;
  try{
  await db.collection('todo_list').deleteOne({content:task})
  // console.log("delete task:"+task);
  }
  catch(e){
    console.log("delete error:" + e);
  }
  
})

//schedule handle
app.get('/getCalSchedule',async(req,res)=>{
  try{
    const calTodos = await db.collection('schedule_list').find().toArray();
    await res.json(calTodos)
  }
  catch(e){
    console.log(e)
  }
})

app.post('/addSchedule',(req,res)=>{
  try{
    const {calData} = req.body
    if (calData==''){alert("공백입니다")}
    else{
      console.log(calData)
      db.collection('schedule_list').insertOne({date:calData.date,content:calData.content}) //날짜&할일 db저장
      res.json(calData)
    }
  }
  catch{
    e => console.log(e)
  }
})

app.delete('/deleteSchedule/:targetSchedule', async(req,res)=>{
  const targetS = req.params.targetSchedule;
  try{
    await db.collection('schedule_list').deleteOne({content:targetS})
  }
  catch(e){console.log(e)}
})

app.delete('/deleteScheduleAll', async(req,res)=>{
  try{
    await db.collection('schedule_list').deleteMany({});
  }
  catch(e){console.log(e)}
})

app.get('*', function (req, res) {
  res.sendFile(__dirname, '/react-project/build/index.html');
});


