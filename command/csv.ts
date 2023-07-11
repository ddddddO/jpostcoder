import { csvInfo } from './constraints'

export const getJpostcodes = (): string[] => {
  const fs = require('fs')
  const rows: string[] = fs.readFileSync(csvInfo.path, {encoding: csvInfo.encoding}).split('\n')
  return rows
}

export const debugRawJpostcode = (vs: string[]): void => {
  if (vs.length !== csvInfo.header.length) throw new Error('not match column num')
  vs.map((v, i) => console.log(csvInfo.header[i]+':', v))
}
