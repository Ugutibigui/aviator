const express = require('express') //declarando biblioteca express
const cors = require('cors') //declarando biblioteca cors
const bodyParser = require('body-parser') //declarando biblioteca body-parser

const app = express(); //recebendo a função do express
const db = require("./db") 

app.use(cors()) //express colocar o cors em uso
//app.use(bodyParser.urlenconded({extends: false})) //express coloca o bodyParser em uso não codificando infos
app.use(bodyParser.json()) //express coloca o bodyParser em uso com json


let port = process.env.PORT || 3000; //escolha de porta ou setando a porta 3000

app.listen(port => { //Ouvindo o servidor (ligando o servidor)
    console.log('Servidor ligado')
})


async function insertInfoDestino(){
    const conn = await db.connect()
    const sql = 'INSERT INTO destino(nome,distancia) values(?,?);'
    const values = ["bruno",150]
    await conn.query(sql, values)
}

insertInfoDestino()