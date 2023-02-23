var bcrypt = require('bcryptjs');
const  data = {
    users: [
        {
            name: 'John',
            email: 'john@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Victor',
            email: 'victor@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,  
        }
    ],

    products:[
        {
            name:'Free Shirt',
            slug:'free-shirt',
            category:'Shirts',
            image:'/images/shirts1.png',
            price: 70,
            brand:  'Nike',
            rating:4.5,
            numReviews: 8,
            countInStock:20,
            description: 'A popular shirt'
        },
        {
            name:'Fit Shirt',
            slug:'fit-shirt',
            category:'Shirts',
            image:'/images/shirts2.jpeg',
            price: 70,
            brand:  'Adidas',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular shirt'
        },
        {
            name:'Slim Shirt',
            slug:'slim-shirt',
            category:'Shirts',
            image:'/images/shirts3.jpeg',
            price: 70,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular shirt'
        },
        {
            name:'Free Pants',
            slug:'free-pants',
            category:'Pants',
            image:'/images/pants1.jpeg',
            price: 100,
            brand:  'Nike',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular pants'
        },   {
            name:'Fit Pants',
            slug:'fit-pants',
            category:'Pants',
            image:'/images/pants2.jpeg',
            price: 800,
            brand:  'Adidas',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular pants'
        },
        {
            name:'Slim Pants',
            slug:'slim-pants',
            category:'Shirts',
            image:'/images/pants3.jpeg',
            price: 120,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular pants'
        },





    ]
}
export default data