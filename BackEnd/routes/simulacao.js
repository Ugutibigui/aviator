const express = require('express')
const router = express.Router()
const db = require("../db")

router.post('/', async (req, res) => {
    let info = req.body.infos;
    console.log(info)

    let result = {
        ok: false,
        message: "",
        data: {
            destino_pneu: "",
            destino_asa: "",
            destino_motor: "",
            destino_freio: "",
            destino_turbina: "",
            destino_oleo: "",
            destino_fuselagem: "",
            destino_parabrisa: "",
        }
    }

    try {
        let [infosAviao] = await db.receberInfosAviaoUnico(parseInt(info.idAviao))

        result.data = {
            destino_pneu: info.localPartida,
            destino_asa: info.localPartida,
            destino_motor: info.localPartida,
            destino_freio: info.localPartida,
            destino_turbina: info.localPartida,
            destino_oleo: info.localPartida,
            destino_fuselagem: info.localPartida,
            destino_parabrisa: info.localPartida,
        }

        function calculoTempo(distanciaDestino) {
            let tempo = distanciaDestino / infosAviao[0].velocidade
            return tempo
        }

        info.destinos.forEach(item => {
            item.distancia = parseInt(item.distancia)
        });

        info.destinos = info.destinos.sort((a, b) => b.distancia - a.distancia);

        for (let i = 0; i < info.destinos.length; i++) {
            let tempo = calculoTempo(info.destinos[i].distancia)

            if (result.data.destino_pneu == info.localPartida) {
                if (infosAviao[0].hr_pneu >= tempo) {
                    result.data.destino_pneu = info.destinos[i].nome
                }
            }

            if (result.data.destino_asa == info.localPartida) {
                if (infosAviao[0].hr_asa >= tempo) {
                    result.data.destino_asa = info.destinos[i].nome
                }
            }

            if (result.data.destino_motor == info.localPartida) {
                if (infosAviao[0].hr_motor >= tempo) {
                    result.data.destino_motor = info.destinos[i].nome
                }
            }

            if (result.data.destino_freio == info.localPartida) {
                if (infosAviao[0].hr_freio >= tempo) {
                    result.data.destino_freio = info.destinos[i].nome
                }
            }

            if (result.data.destino_turbina == info.localPartida) {
                if (infosAviao[0].hr_turbina >= tempo) {
                    result.data.destino_turbina = info.destinos[i].nome
                }
            }

            if (result.data.destino_oleo == info.localPartida) {
                if (infosAviao[0].hr_oleo >= tempo) {
                    result.data.destino_oleo = info.destinos[i].nome
                }
            }

            if (result.data.destino_fuselagem == info.localPartida) {
                if (infosAviao[0].hr_fuselagem >= tempo) {
                    result.data.destino_fuselagem = info.destinos[i].nome
                }
            }

            //console.log(infosAviao[0].hr_parabrisa)
            if (result.data.destino_parabrisa == info.localPartida) {
                if (infosAviao[0].hr_parabrisa >= tempo) {
                    result.data.destino_parabrisa = info.destinos[i].nome
                }
            }
        }

        result.ok = true
        result.message = "Deu tudo certo"
        res.json(result);
        console.log(result)
    } catch (err) {
        console.log(err)
        result.ok = false
        result.message = "Ocorreu um erro interno"
        res.json(result)
    }

})

module.exports = router;