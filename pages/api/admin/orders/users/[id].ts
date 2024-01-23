import { getSession } from "next-auth/react";
import User from "@/models/User";
import db from "@/utils/db";


const handler = async (req:any, res:any) => {
    const session:any = await getSession({req});
    if (!session || !session.user.isAdmin) {
         return res.status(401).send('admin signin required');

    }
    if(req.method === 'DELETE'){
        return deleteHandler(req, res);

    }else{
        return res.status(400).send({message: 'Method not allowed'});
    }
}   

const deleteHandler = async (req:any, res:any) => {
    await db.connect();
    const user:any = await User.findById(req.query.id);
    if(user){
        if(user.email === 'admin@tejdelicias.com' || user.email === 'tatiana@tejdelicias.com' ){
          return res.status(400).send({message: "ATENÇÂO!!! Você não pode deletar esse usuário administrador!."}); 
        }
    await user.deleteOne();
    await db.disconnect();
    res.send({message: 'Usuário deletado com sucesso!'});
}else {
    await db.disconnect();
    res.status(404).send({message: 'Usuário não encontrado!'});
 }

};

export default handler