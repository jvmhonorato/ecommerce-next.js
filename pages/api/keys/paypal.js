import { getSession } from 'next-auth/react';


const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session){
        return res.status(401).send('signin required')
    }

    res.send(process.env.PAY_PAL_CLIENT_ID || 'sb')
}

export default handler