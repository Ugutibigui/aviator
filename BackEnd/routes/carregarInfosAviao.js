const express = require('express')
const router = express.Router()
const db = require("../db")

router.get('/', async (req, res) => {

    let result = {
        ok: false,
        message: "",
        data: null
    }

    try {
        const [infos] = await db.receberInfosAviao()
        
        result.data = infos
        result.message = "Informações carregadas"
        result.ok = true
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