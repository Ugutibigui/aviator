async function carregaAvioes(){
    let resp = await fetch(`http://localhost:3000/app/carregarInfosAviao`) //fazendo comunicação com a api
    let info = await resp.json() //recebendo as informações da api

    let localSelect = document.getElementById("select")

    for(let i = 0; i < (info).data.length; i++){
        localSelect.innerHTML += `<option value="${(info).data[i].id}">${(info).data[i].nome}</option>`
    }
}
carregaAvioes()

let infos = {
    localPartida: "",
    idAviao: "",
    destinos: []
}

function adicionarDestino(){

    let infoDestino = {
        nome: document.getElementById("nomeDestino").value,
        distancia: document.getElementById("distanciaDestino").value
    }

    let localDestinos = document.getElementById("local-destinations")
    localDestinos.innerHTML = ""
    infos.destinos.push(infoDestino)
    console.log(infos.destinos)

    for(let i = 0; i < infos.destinos.length; i++){
        localDestinos.innerHTML += `<div class="cardDestino">${infos.destinos[i].nome}</div>`
    }
}

async function verificar(){
    infos.localPartida = document.getElementById("localPartida").value,
    infos.idAviao = document.getElementById("select").value
    console.log(infos)
}