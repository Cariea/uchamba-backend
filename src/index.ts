import express, { Application } from 'express';

const app:Application = express();

app.get('/ping',(req,res)=>{
    res.send('todo piola');
})

const server = app.listen(3000, () =>{
    console.log(`server on port ${3000}`);
});