const express = require('express')
const router = express.Router()
const db = require("../db")

router.post('/', async (req, res) => {
    let info = req.body.infosAviao;
    console.log(info)

    let result = {
        ok: false,
        message: "DEU CERTO",
        data: null
    }

    try {

        await db.salvaAviao(info, (error, dbRes) => {
            console.log(error)
            console.log(dbRes)
        })

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