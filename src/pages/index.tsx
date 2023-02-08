import { useEffect, useState } from 'react'
import Item from '../types/item'

async function getData() {
  const resp = await fetch('/api', {
    headers: {
      dev: 'true'
    }
  })
  const json = await resp.json()
  return json.data
}

function Item(elem: Item) {
  const [stock, setStock] = useState<number>(elem.stock)
  const [newstock, setNewStock] = useState<number>(0)
  const [requirement] = useState(elem.value)

  const progressBarSize: number = (stock / requirement) * 100

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <div className="flex space-x-4">
          <div>{elem.type}</div>
          <div className="text-green-600">stok: {stock}</div>
          <div className="text-red-600">ihtiyac: {requirement}</div>
        </div>
        <div className="flex">
          <div className="relative w-24">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setStock(stock + newstock)
                setNewStock(0)
              }}
            >
              <input
                type="number"
                className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                defaultValue={newstock}
                value={newstock}
                onChange={(event) => setNewStock(parseInt(event.target.value))}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fillRule="evenodd"
                    d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-6 bg-blue-600 text-xs font-medium text-blue-100 text-center p-1.5 leading-none rounded-full"
          style={{ width: `${100 < progressBarSize ? 100 : progressBarSize}%` }}
        >
          {progressBarSize.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    getData().then((resp) => setDatas(resp))
  }, [])

  return (
    <div className="p-8">
      {datas.map((elem: Item) => (
        <Item key={elem.type} type={elem.type} value={elem.value} stock={elem.stock} />
      ))}
    </div>
  )
}

export default HomePage
