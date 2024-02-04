//Express js palvelin
//otetaan kirjasto käyttöön
const path = require('path')
const express = require ('express')
const fs = require('fs').promises
const app = express()
const herkut = require('./herkut.json')

app.get('/api/herkut', (req, res) => {
    res.json(herkut)
    })

//-------------------------------
//----- Pin koodin luku
app.get('/api/getpin',async (req,res) => {
    try {

        const savedPin = await fs.readFile('./pin.txt','utf-8')
        res.send(savedPin)

    } catch (error) {
        console.error('Error reading file:', error)
        res.status(500).send('Internal Server Error')
    }
})



//path.join metodi(parametrit) = (mihin liitetään , mitä liitetään)
const polku = path.join(__dirname, '/public') //public nimisestä kansiosta löytyy selaimelle lähetettävät tiedostot 
//sanotaan että em. polussa on tiedostosisältö jota palvelin käyttää kun se saa http requestin
//get pyyntö
app.use(express.static(polku)) //parametrina polku muuttujan arvot
//.listen metodi ottaa vastaan 2 kaksiparametria 3000 ja funktio (lambda)
app.listen(3000, () => {
    console.log('Server is up on port 3000.') //ilmoitus konsoliin mihin porttiin serveri on asetettu
})