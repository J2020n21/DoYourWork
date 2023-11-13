require("dotenv").config();
const express = require('express');
//ejs setting
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
var cors = require('cors');
app.use(cors());

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

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

app.post('/addTodo', async (req,res)=>{
  console.log('addTodo 요청됨');
  if(res.body.todo == ''){
    res.send('비어있습니다.')
  } else{
      try{
        await db.collection('todo').insertOne({content: req.body.todo})
      }
      catch(e){
        console.log(e)
      }
    res.redirect('/')
  }
})

app.get('*', function (req, res) {
  res.sendFile(__dirname, '/react-project/build/index.html');
});
