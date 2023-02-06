import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200)
    res.setHeader("Content-Type", "application/json")
    res.end('{ "resp": "true" }')
}

export default handler;
