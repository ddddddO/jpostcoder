import { readFileSync } from 'node:fs'
import { csv } from './constraints'

export const getJpostcodes = (): string[] => {
  return readFileSync(csv.path, 'utf8').split('\n')
}

export const debugRawJpostcode = (vs: string[]): void => {
  if (vs.length !== csv.header.length) throw new Error('not match column num')
  vs.map((v, i) => console.log(csv.header[i]+':', v))
}
