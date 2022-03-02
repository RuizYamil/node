const express = require('express')

let file = require('./main')
const data = new file.Container('./product.txt');

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (request, response) => {
    response.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>')
})

app.get('/products', (request, response) => {
    data.getAll().then(value => {
        return response.send(value)
    });
})

app.get('/productRandom', (request, response) => {
    data.getAll().then(value => {
        let findId
        for(let x of value){
            findId = value.indexOf(x);
        }
        findId++
        
        let rand = Math.floor(Math.random()*findId);
        rand++
        
        data.getById(rand).then(value => {
            return response.send(value)
        });
    });
})