class Container{
    constructor(route){
        this.route = route;
    }
    save(file){
        let readFile;
        try{
            let id = 1;
            readFile = this.getAll().then(async value => {
                let aux = value;
                for(let x of aux){
                    if(id === x.id){
                        id++;
                    }
                }
                await fs.promises.writeFile(this.route, ' ');

                file.id = id;

                value = {...file};
                for(let y of aux){
                    if(y.id === value.id){
                        value.id++;
                    }   
                }
                let array = [].concat(aux, value);
                
                await fs.promises.appendFile(this.route, JSON.stringify(array, null, 2));
                return id;
            })
        }catch(error){
            console.log("Hubo un error al leer el archivo: ", error);
        }
        return readFile;
    }
    getById(id){
        let found;
        try{
            found = this.getAll().then(async value => {
                found = value.find(element => element.id === id);
                if(found === null || found === undefined){
                    return null;
                }else{
                    return found;
                }
            })
        }catch(error){
            console.log("Hubo un error al leer el archivo: ",error);
        }
        return found;
    }
    getAll(){
        async function read(route){
            let readFile;
            try{
                readFile = JSON.parse(await fs.promises.readFile(route, 'utf-8'));
            }catch(error){
                console.log("Hubo un error al leer el archivo: ",error);
            }
            return readFile;
        }
        return read(this.route);
    }
    deleteById(id){
        try{
            this.getAll().then(async value => {
                for(let x of value){
                    if(id === x.id){
                        let findId = value.indexOf(x);
                        value.splice(findId, 1);
                        await fs.promises.writeFile(this.route, JSON.stringify(value, null, 2), error => {
                            console.log("Hubo un error al leer el archivo: ", error);
                        })
                    }
                }
            })
        }catch(error){
            console.log("Hubo un error al leer el archivo: ",error);
        }
    }
    deleteAll(){
        async function deleteItems(route){
            try{
                await fs.promises.writeFile(route, ' ');
            }catch(error){
                console.log("Hubo un error al escribir el archivo: ",error);
            }
        }
        deleteItems(this.route);
    }
}

const fs = require('fs');
// const data = new Container('./product.txt');

// data.save(
//     {
//         title: 'Test', 
//         price: 1250, 
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
//     }).then(value => console.log(value)
// );

// data.getById(2).then(value => console.log(value));

// data.getAll().then(value => console.log(value));
// data.deleteById(1);

// data.deleteAll();

module.exports.Container = Container;