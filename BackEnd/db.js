async function connect(){
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

module.exports ={
    connect
}