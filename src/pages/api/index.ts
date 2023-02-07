import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../configs/dbConfig'
function getStocks(req, res): void {
  const queryText = `
    SELECT *
    FROM stock.stock
  `

  pool
    .query(queryText)
    .then((data) => {
      res.status(200).json(data.rows)
    })
    .catch((err) => {
      console.error(err.stack)
    })
}
function addStock(req, res): void {
  const queryText = `
    INSERT INTO stock.stock (material_name, stock_number)
    VALUES ($1, $2)
  `
  const values = [req.body.material_name, req.body.stock_number]

  pool
    .query(queryText, values)
    .then((data) => {
      res.status(201).json({ success: true })
    })
    .catch((err) => {
      console.error(err.stack)
    })
}
function reduceStock(req, res): void {
  const queryText = `
    UPDATE stock.stock
    SET stock_number = stock_number - $2
    WHERE material_name = $1
  `
  const values = [req.body.material_name, req.body.stock_number]

  pool
    .query(queryText, values)
    .then((data) => {
      res.status(200).json({ success: true })
    })
    .catch((err) => {
      console.error(err.stack)
    })
}
function updateStock(req, res): void {
  const queryText = `
    UPDATE stock.stock
    SET stock_number = $2
    WHERE material_name = $1
  `
  const values = [req.body.material_name, req.body.stock_number]

  pool
    .query(queryText, values)
    .then((data) => {
      res.status(200).json({ success: true })
    })
    .catch((err) => {
      console.error(err.stack)
    })
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

  if (req.headers.dev != 'true') {
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
