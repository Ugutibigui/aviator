async function salvarInfosAviao() {
    let infosAviao = { //pegando informações digitadas no formulário
        nome: document.getElementById("nome").value,
        velocidade: document.getElementById("velocidade").value,
        hr_pneu: document.getElementById("hr_peneu").value,
        hr_asa: document.getElementById("hr_asa").value,
        hr_motor: document.getElementById("hr_motor").value,
        hr_freio: document.getElementById("hr_freio").value,
        hr_turbina: document.getElementById("hr_turbina").value,
        hr_oleo: document.getElementById("hr_oleo").value,
        hr_fuselagem: document.getElementById("hr_fuselagem").value,
        hr_parabrisa: document.getElementById("hr_parabrisa").value,
    }


    let resp = await fetch(`http://localhost:3000/app/salvarInfosAviao`, { //acessando localização da minha api
        method: 'POST', //escolhendo o metodo de requisição
        headers: { //passando parametros para minha requisição
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //passando informações para a api por Json
            infosAviao: infosAviao
        })
    })
    let info = await resp.json() //Recebendo a resposta do BackEnd
    if (info.ok == true) {
        carregarInformacoes()
    }
}

async function carregarInformacoes() {
    console.log("entrou")
    let resp = await fetch(`http://localhost:3000/app/carregarInfosAviao`) //fazendo comunicação com a api
    let info = await resp.json() //recebendo as informações da api

    let localApareceAviao = document.getElementById("airplains-locale") //lugar que aparecera os aviões
    localApareceAviao.innerHTML = "" //resetando aviões para não duplicar a quantidade

    for (let i = 0; i < (info).data.length; i++) { //pegando avião por avião
        localApareceAviao.innerHTML += `
            <div class="box">
                <div class="box-topo">
                    <h1>${(info).data[i].nome}</h1>
                </div>
                <div class="box-informacoes">
                    <p>Pneus: ${(info).data[i].hr_pneu} horas</p>
                    <p>Motor: ${(info).data[i].hr_motor} horas</p>
                    <p>Freios: ${(info).data[i].hr_freio} horas</p>
                    <p>Troca de óleo: ${(info).data[i].hr_oleo} horas</p>
                    <p>Fuselagem: ${(info).data[i].hr_fuselagem} horas</p>
                    <p>Asas: ${(info).data[i].hr_asa} horas</p>
                    <p>Para-brisa: ${(info).data[i].hr_parabrisa} horas</p>
                </div>
            </div>
        `
    }

    console.log("carregando")
}
carregarInformacoes()
