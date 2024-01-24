import { getSession } from "next-auth/react";
import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req:any, res:any) => {
    const session:any = await getSession({req});
    if (!session || !session.user.isAdmin){
        return res.status(401).send('admin signin required');

    }
   // const { user } = session;
    if (req.method === 'GET'){
        return getHandler(req, res);
    }else if(req.method === 'POST') {
        return postHandler(req, res);
    }
    else {
        return res.status(400).send({message: 'Method not allowed'})
    }
};
const postHandler = async (req:any, res:any) => {
    await db.connect();
    const newProduct = new Product({
        name:'Insira o o nome do produto',
        slug: 'insira-slug-sem-espaço-minusculas-sem-acentos' + Math.random(),
        image: 'Insira imagem com H:850px X W:700px',
        price: 0,
        category: 'insira a categoria com letras minusculas e sem espaços',
        flavor: 'insira o sabor do produto',
        countInStock: 0,
        description: 'Insira a descrição do produto',
        rating: 0,
        numReviews: 0,
    });
    const product = await newProduct.save();
    await db.disconnect()
    res.send({message: 'Product created successfully', product})
}
const getHandler = async (req:any, res:any) => {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
}

export default handler;

