const express = require('express')

let file = require('./main')
const data = new file.Container('./product.txt');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (request, response) => {
    response.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>')
})

app.get('/api/products', (request, response) => {
    data.getAll().then(value => {
        return response.send(value)
    });
})

app.get('/api/products/:id', (request, response) => {
    const id = request.params.id;
    data.getById(parseInt(id)).then(value => {
        return response.send(value)
    });
});

app.post('/api/products', (request, response) => {
    const json = request.body; 
    data.save(json).then(value => {
        return response.send(value)
    })
})

app.put('/api/products/:id', (request, response) => {
    const id = request.params.id;
    const json = request.body;
    
    data.getById(parseInt(id)).then(value => {
        value = json
        return response.send(value)
    });
})

app.delete('/api/products/:id', (request, response) => {
    const id = request.params.id;
    data.deleteById(parseInt(id))
    return response.send("Se elimino correctamente")
})