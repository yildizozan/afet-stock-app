import { NextApiRequest, NextApiResponse } from 'next'
import app from '../../configs/firestoreConfig'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import Item from '../../types/item'

const db = getFirestore(app)

async function addStock(req, res) {
  try {
    await setDoc(doc(db, 'stocks', 'stocks'), {
      material_name: req.body.material_name,
      stock_number: req.body.stock_number
    })
    res.status(201).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

function getDatas(): Item[] {
  return [
    { type: 'Isitici', value: 100 },
    { type: 'Mont', value: 200 },
    { type: 'Yagmurluk', value: 300 },
    { type: 'Bot', value: 400 }
  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.headers.dev == 'true') {
    res.json({ data: getDatas() })
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
