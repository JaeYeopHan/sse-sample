import { Procedure, EVENT } from './../../types/index';

const eventSourceConfig = {
  withCredentials: true,
}
let source: any

export function init(callback: Procedure, entry = '/stream') {
  const stocks = new EventSource(entry, eventSourceConfig)

  stocks.onopen = () => {
    console.log(`Complete to initialize EventSource with : ${entry}`)
    source = stocks

    // stocks.onmessage = ({ data }: any) => console.log((JSON.parse(data)))
    stocks.addEventListener(EVENT.USER_INFO, ({ data }: any) => console.log((JSON.parse(data))))
    callback()
  }
}

export async function call(type: string, param?: any) {
  if (!source) {
    throw Error('Initialize EventSource')
  }
  console.log(`call`)

  return new Promise(async (resolve, reject) => {
    source.addEventListener(type, ({ data }: any) => resolve(JSON.parse(data)))
    // TODO: call native scheme
  })
}
