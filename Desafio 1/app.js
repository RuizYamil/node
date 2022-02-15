class User{
    constructor(firstName, lastName, books, pets){
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName(){
        return `${this.firstName +' '+ this.lastName}`;
    }
    addMascota(petName){
        this.pets.push(petName);
    }
    countMascotas(){
        return this.pets.length;
    }
    addBook(name, author){
        this.books.push({name, author});
        return this.books;
    }
    getBookNames(){
        let authorsArray = [];
        for (const prop in this.books) {
            if(this.books[prop].name != undefined){
                authorsArray.push(this.books[prop].name)
            }
        }
        return authorsArray;
    }
}

const user1 = new User('Elon', 'Musk', ['Libro 1'], ['Yamil']);
console.log('Nombre Completo:', user1.getFullName());

user1.addMascota('Perro', 'Gato');

console.log('Contador de Mascotas', user1.countMascotas());

console.log('Libros:', user1.addBook('El señor de las moscas', 'William Golding'));
console.log(user1.addBook( 'Fundacion', 'Isaac Asimov'))

console.log('Nombre de los autores:', user1.getBookNames());

let user = {
    firstName: 'Alan',
    lastName: 'Ruiz',
    books: ['Libro 1', 'Libro 2'],
    pets: ['Perro', 'Gato']
};

const user2 = new User(user.firstName, user.lastName, user.books, user.pets);
console.log('Usuario 2:', user2.getFullName());

user2.addMascota('Tigre');

console.log('Contador de Mascotas:', user2.countMascotas());

console.log('Libros:', user2.addBook('Libro 1 - Nombre', 'Libro 1 - Autor'));

console.log('Nombre de los autores:', user2.getBookNames());