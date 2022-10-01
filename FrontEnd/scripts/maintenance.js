async function carregaAvioes() {
    let resp = await fetch(`http://localhost:3000/app/carregarInfosAviao`) //fazendo comunicação com a api
    let info = await resp.json() //recebendo as informações da api

    let localSelect = document.getElementById("select")

    for (let i = 0; i < (info).data.length; i++) {
        localSelect.innerHTML += `<option value="${(info).data[i].id}">${(info).data[i].nome}</option>`
    }
}
carregaAvioes()

let infos = {
    localPartida: "",
    idAviao: "",
    destinos: []
}

function adicionarDestino() {

    let infoDestino = {
        nome: document.getElementById("nomeDestino").value,
        distancia: document.getElementById("distanciaDestino").value
    }

    let localDestinos = document.getElementById("local-destinations")
    localDestinos.innerHTML = ""
    infos.destinos.push(infoDestino)
    console.log(infos.destinos)

    for (let i = 0; i < infos.destinos.length; i++) {
        localDestinos.innerHTML += `<div class="cardDestino">${infos.destinos[i].nome}</div>`
    }
}

async function verificar() {
    infos.localPartida = document.getElementById("localPartida").value,
        infos.idAviao = document.getElementById("select").value

    let resp = await fetch(`http://localhost:3000/app/simulacao`, { //acessando localização da minha api
        method: 'POST', //escolhendo o metodo de requisição
        headers: { //passando parametros para minha requisição
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //passando informações para a api por Json
            infos: infos
        })
    })
    let info = await resp.json() //Recebendo a resposta do BackEnd

    console.log(infos)

    carregarInformacoes(info)
}

async function carregarInformacoes(infos) {
    let info = await (infos)
    let localInformacoes = document.getElementById("infos-result")
    localInformacoes.innerHTML = `
        <h1>Locais de manutenção</h1>
        <div>
            <p class="titleP">Pneus: </p>
            <p class="especialP"> ${info.data.destino_pneu}</p>
        </div>
        <div>
            <p class="titleP">Motor: </p>
            <p class="especialP"> ${info.data.destino_motor}</p>
        </div>
        <div>
            <p class="titleP">Freios: </p>
            <p class="especialP"> ${info.data.destino_freio}</p>
        </div>
        <div>
            <p class="titleP">Turbinas: </p>
            <p class="especialP"> ${info.data.destino_turbina}</p>
        </div>
        <div>
            <p class="titleP">Troca de óleo: </p>
            <p class="especialP"> ${info.data.destino_oleo}</p>
        </div>
        <div>
            <p class="titleP">Fuselagem: </p>
            <p class="especialP"> ${info.data.destino_fuselagem}</p>
        </div>
        <div>
            <p class="titleP">Asas: </p>
            <p class="especialP"> ${info.data.destino_asa}</p>
        </div>
        <div>
            <p class="titleP">Para-brisa: </p>
            <p class="especialP"> ${info.data.destino_parabrisa}</p>
        </div> 
    `
}