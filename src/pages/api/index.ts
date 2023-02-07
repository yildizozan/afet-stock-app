import {NextApiRequest, NextApiResponse} from "next";
import pool from "./dbConfig";


function getStocks(req, res) : void{
    const queryText = `
    SELECT *
    FROM stock.stock
  `;

    pool.query(queryText)
        .then(data => {
            res.status(200).json( data.rows);
        })
        .catch(err => {
            console.error(err.stack);
        });
}
function addStock( req, res) : void{
    const queryText = `
    INSERT INTO stock.stock (material_name, stock_number)
    VALUES ($1, $2)
  `;
    const values = [req.body.material_name, req.body.stock_number];

    pool.query(queryText, values)
        .then(data => {
            res.status(201).json({"success" : true});
        })
        .catch(err => {
            console.error(err.stack);
        });
}
function reduceStock( req, res): void{
    const queryText = `
    UPDATE stock.stock
    SET stock_number = stock_number - $2
    WHERE material_name = $1
  `;
    const values = [req.body.material_name, req.body.stock_number];

    pool.query(queryText, values)
        .then(data => {
            res.status(200).json( {"success": true});
        })
        .catch(err => {
            console.error(err.stack);
        });
}
function updateStock( req, res): void{
    const queryText = `
    UPDATE stock.stock
    SET stock_number = $2
    WHERE material_name = $1
  `;
    const values = [req.body.material_name, req.body.stock_number];

    pool.query(queryText, values)
        .then(data => {
            res.status(200).json( {"success": true});
        })
        .catch(err => {
            console.error(err.stack);
        });
}
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "application/json")

    switch(req.method){
        case "GET":
            getStocks(req, res);
            break;
        case "POST":
            addStock(req, res);
            break;
        case "PUT":
            updateStock(req, res);
            break;
        case "DELETE":
            reduceStock(req , res);
            break;
        default:
            res.status(405).end();
            break;
    }

}

export default handler;
