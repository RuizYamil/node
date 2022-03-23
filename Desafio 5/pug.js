const express = require('express');
const { Router } = express

const app = express()
app.set('views', './views');
app.set('view engine', 'pug');
const router = Router()

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8081
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

const error = {error: 'producto no encontrado'}

let array = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    }
];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html')
})

router.get('/', (request, response) => {
    let { title, price, thumbnail, id } = request.query;
    for(let y of array){
        title = y.title;
        price = y.price;
        thumbnail = y.thumbnail;
        id = y.id;
    }
    response.render('data', { title, price, thumbnail, id });
})

router.get('/:id', (request, response) => {
    const id = request.params.id;
    const value = array.find(element => element.id == id);
    if(value == undefined){
        return response.send(error)
    }
    return response.send(value);
});

router.post('/', (request, response) => {
    const json = request.body;
    
    for(let y of array){
        if(json.id === undefined){
            json.id = 1;
        }
        if(y.id === json.id){
            json.id++;
        }   
    }
    array.push(json)
    return response.send(array)
})

router.put('/:id', (request, response) => {
    const id = request.params.id;
    const json = request.body;

    const value = array.find(element => element.id == id);
    if(value == undefined){
        return response.send(error)
    }
    
    for(let x of array){
        if(id == x.id){
            let findId = array.indexOf(x);
            array[findId] = json;
        }
    }
    return response.send(array)
})

router.delete('/:id', (request, response) => {
    const id = request.params.id;
    const value = array.find(element => element.id == id);
    if(value == undefined){
        return response.send(error)
    }
    
    for(let x of array){
        if(id == x.id){
            let findId = array.indexOf(x);
            array.splice(findId, 1);
        }
    }
    return response.send(array)
})

app.use('/api/products', router)