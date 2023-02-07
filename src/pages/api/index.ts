import {NextApiRequest, NextApiResponse} from "next";
import app from '../../configs/firestoreConfig';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

async function addStock(req, res) {
    try {
        await setDoc(doc(db, "stocks", "stocks"),{
            material_name: req.body.material_name,
            stock_number: req.body.stock_number
        });
        res.status(201).json({"success": true})
    } catch (error) {
        res.status(400).json({"success": false})
    }
}

function getDatas(): Map<string, number> {
  // Get data from another resource
  let map = new Map<string, number>()
  map.set('Isıtıcı', 100)
  map.set('Mont', 200)
  map.set('Yagmurluk', 300)
  map.set('Bot', 200)
  return map
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.headers.dev == 'true') {
    res.json({ data: Object.fromEntries(getDatas()) })
    return
  }

  switch (req.method) {
    case 'GET':
      getStocks(req, res)
      break
    case 'POST':
      addStock(req, res)
      break
    case 'PUT':
      updateStock(req, res)
      break
    case 'DELETE':
      reduceStock(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

export default handler
