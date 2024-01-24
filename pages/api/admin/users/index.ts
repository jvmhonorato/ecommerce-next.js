import User from "@/models/User";
import db from "@/utils/db"



const handler = async (req:any, res:any) => {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
}

export default handler