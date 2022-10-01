const express = require('express') //declarando biblioteca express
const cors = require('cors') //declarando biblioteca cors
const bodyParser = require('body-parser') //declarando biblioteca body-parser

const app = express(); //recebendo a função do express
const db = require("./db") 

app.use(cors()) //express colocar o cors em uso
app.use(bodyParser.urlencoded({extended: false})) //express coloca o bodyParser em uso não codificando infos
app.use(bodyParser.json()) //express coloca o bodyParser em uso com json



const salvarInfosAviao = require("./routes/salvarInfosAviao");
app.use("/app/salvarInfosAviao",salvarInfosAviao);

const carregarInfosAviao = require("./routes/carregarInfosAviao");
app.use("/app/carregarInfosAviao",carregarInfosAviao)


let port = process.env.PORT || 3000; //escolha de porta ou setando a porta 3000

app.listen(port,(req,res) => { //ouvindo o servidor / ligando
    console.log('Servidor rodando')
})

