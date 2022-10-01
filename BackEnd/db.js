async function connect() {
    const mysql = require("mysql2/promise"); //pegando biblioteca mysql2
    let user = "root"
    let password = "12345"
    let host = "localhost"
    let port = "3306"
    let db = "aviator"

    const connection = await mysql.createConnection(`mysql://${user}:${password}@${host}:${port}/${db}`) //criando conexão com o banco de dados
    //mysql://usuario:senha@host:porta/bancodedados
    console.log("Conectou no banco de dados")
    return connection //retornando a conexão                                                
}

async function salvaAviao(infosAviao, callback) {
    const conn = await connect()
    const sql = 'INSERT INTO aviao(nome,velocidade,hr_pneu,hr_asa,hr_motor,hr_freio,hr_turbina,hr_oleo,hr_fuselagem,hr_parabrisa) VALUES(?,?,?,?,?,?,?,?,?,?);'
    const values = [
        infosAviao.nome,
        parseInt(infosAviao.velocidade), //parseInt = convertendo informação para inteiro
        parseInt(infosAviao.hr_pneu),
        parseInt(infosAviao.hr_asa),
        parseInt(infosAviao.hr_motor),
        parseInt(infosAviao.hr_freio),
        parseInt(infosAviao.hr_turbina),
        parseInt(infosAviao.hr_oleo),
        parseInt(infosAviao.hr_fuselagem),
        parseInt(infosAviao.hr_parabrisa)
    ]
    await conn.query(sql, values, callback)
}

async function receberInfosAviao(){
    const conn = await connect()
    const sql = 'SELECT * FROM aviao;'
    const values = []
    return await conn.query(sql, values)
}

async function receberInfosAviaoUnico(id){
    const conn = await connect()
    const sql = 'SELECT * FROM aviao WHERE id = ?;'
    const values = [id]
    return await conn.query(sql, values)
}


module.exports = {
    salvaAviao,
    receberInfosAviao,
    receberInfosAviaoUnico
}