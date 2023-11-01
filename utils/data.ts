var bcrypt = require('bcryptjs');
const  data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@outfitstore.com',
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
            image:'/images/shirts1.jpg',
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
            image:'/images/shirts2.jpg',
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
            image:'/images/shirts3.jpg',
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
            image:'/images/pants1.jpg',
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
            image:'/images/pants2.jpg',
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
            image:'/images/pants3.jpg',
            price: 120,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular pants'
        },
        {
            name:'Slim Shorts',
            slug:'slim-shorts',
            category:'Shorts',
            image:'/images/shorts1.jpg',
            price: 80,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular shorts'
        },
        {
            name:'Free Shorts',
            slug:'free-shorts',
            category:'Shorts',
            image:'/images/shorts2.jpg',
            price: 60,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular shorts'
        },
        {
            name:'Fit Shorts',
            slug:'fit-shorts',
            category:'Shorts',
            image:'/images/shorts2.jpg',
            price: 70,
            brand:  'Oakley',
            rating:3.2,
            numReviews: 10,
            countInStock:20,
            description: 'A popular shorts'
        },





    ]
}
export default data