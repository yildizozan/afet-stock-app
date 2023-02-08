import { NextApiRequest, NextApiResponse } from 'next'

import app from '../../configs/firestoreConfig'
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore'

import Item from '../../types/item'
import Requirement from '../../types/requirement'

const db = getFirestore(app)

async function addStock(req, res) {
  try {
    // TODO: When added stock, only the certain field will be incremented
    await setDoc(doc(db, 'stocks', req.body.material_name), {
      material_name: req.body.material_name,
      stock_number: req.body.stock_number
    })
    res.status(201).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

async function getStocks(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'stocks'))

    // TODO: Create a list and append every item into that list
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
    res.status(201).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

async function updateStock(req, res) {
  try {
    await setDoc(doc(db, 'stocks', req.body.material_name), {
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
    { type: 'Isitici', value: 100, stock: 40 },
    { type: 'Mont', value: 200, stock: 70 },
    { type: 'Yagmurluk', value: 300, stock: 30 },
    { type: 'Bot', value: 400, stock: 150 }
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
