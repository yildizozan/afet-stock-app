import {NextApiRequest, NextApiResponse} from "next";


function getDatas() : Map<string,number >{
    // Get data from another resource
    let map = new Map<string, number>();
    map.set("Isıtıcı", 100);
    map.set("Mont", 200);
    map.set("Yagmurluk", 300);
    map.set("Bot", 200);
    return map;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200)
    res.setHeader("Content-Type", "application/json")
    res.json({"data" : Object.fromEntries(getDatas())});
}

export default handler;
