class Container{
    constructor(title){
        this.title = title;
    }
    save(file){
        const route = './product.txt';
        let id = 0
        fs.readFile(route, 'utf-8', (err, data) => {
            let yamil = JSON.parse(data);
            id = yamil.id
            if(id === yamil.id){
                id++
            }
            if(err) throw new Error(`No pudimos leer archivo: ${err.message}`);

            const info = {
                title: fs.statSync(route).title = file.title,
                price: fs.statSync(route).price = file.price,
                id: fs.statSync(route).id = id
            }

            fs.appendFile(route, JSON.stringify(info, null, 2), err => {
                if (err) throw new Error(`Todo mal ${err.message}`);
            })
            return id;
        })
    }
    getById(id){
        fs.readFile(route, 'utf-8', (err, data) => {
            let yamil = JSON.parse(data);
            let resultado = 0
            if(id === yamil.id){
                resultado = yamil
                console.log(yamil);
            }else{
                resultado = null
                console.log(null);
            }
            if(err) throw new Error(`No pudimos leer archivo: ${err.message}`);
            return resultado
        })
    }
    getAll(){
        let array = []        
        fs.readFile(route, 'utf-8', (err, data) => {
            array.push(data)
            if(err) throw new Error(`No pudimos leer archivo: ${err.message}`);
            return array
        })
    }
    deleteById(id){   
        fs.readFile(route, 'utf-8', (err, data) => {
            if(err) throw new Error(`No pudimos leer archivo: ${err.message}`);

            fs.writeFileSync(route, '')
            return 0
        })
    }
    deleteAll(){
        fs.writeFileSync(route, '')
    }
}

const fs = require('fs');

const route = './product.txt';
const data = fs.readFileSync(route, 'utf-8');

const data1 = new Container({title: 'Test', price: 1250, id: 1});
// data1.save({title: 'Test', price: 1250});

// data1.getById(1)

data1.getAll()

data1.deleteById(1)

data1.deleteAll()
