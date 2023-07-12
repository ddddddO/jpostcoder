import { mkdir, createWriteStream, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { get } from 'node:https'
import { csv } from './constraints'

const download = (dest: string, src: string): void => {
  get(src, res => {
    const fileStream = createWriteStream(dest)
    res.pipe(fileStream)

    fileStream.on('finish', () => {
      fileStream.close()
    })
  })
}

export const downloadJpostcodeCSV = (dest: string): void => {
  mkdir(dirname(dest), { recursive: true }, (err) => {
    if (err) throw err
  })

  download(dest, csv.japan_postcode_csv_url)
}


export const getJpostcodes = (): string[] => {
  return readFileSync(csv.path, 'utf8').split('\n')
}

export const debugRawJpostcode = (vs: string[]): void => {
  if (vs.length !== csv.header.length) throw new Error('not match column num')
  vs.map((v, i) => console.log(csv.header[i]+':', v))
}
