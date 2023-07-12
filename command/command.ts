import Database, { Options } from 'better-sqlite3'
import { Command } from 'commander'
import { downloadJpostcodeCSV, getJpostcodes, debugRawJpostcode } from './csv'
import { insertJpostcodes, dropPostcodes, createPostcodes } from './db'
import { jpostcode, toJpostcode } from './jpostcode'

const options: Options = {
  // verbose: console.log // postcodeのinsert時にログが大量に出力されるためコメントアウト
}

export const command = (): void => {
  const program = new Command()

  program
    .name('jpostcoder')
    .description('jpostcoder CLI')
    .version('0.0.0')

  program.command('download')
    .description('download japan postcodes csv (utf_all.csv)')
    .option('-d, --dest <path>', 'downloaded csv destination', './utf_all.csv')
    .action((options: any) => {
      console.log('Download japan postcode csv')
      downloadJpostcodeCSV(options.dest)
    })

  program.command('create')
    .description('create table')
    .option('-d, --database <path>', 'sqlite3 file path', './postcode.db')
    .action((options: any) => {
      console.log('Create postcodes table')
      const db = new Database(options.database, options)
      createPostcodes(db) // TODO: table分割
    })

  program.command('insert')
    .description('insert japan postcodes into table')
    .option('-c, --csv <path>', 'japan postcodes csv path', './utf_all.csv')
    .option('-d, --database <path>', 'sqlite3 file path', './postcode.db')
    .action((options: any) => {
      console.log('Insert japan postcodes to database!')

      const db = new Database(options.database, options)
      const jpostcodes: jpostcode[] = getJpostcodes(options.csv)
        .filter(row => row.length !== 0)
        .map(row => toJpostcode(row.split(',')))

      insertJpostcodes(db, jpostcodes)
    })

  program.command('drop')
    .description('drop table')
    .option('-d, --database <path>', 'sqlite3 file path', './postcode.db')
    .action((options: any) => {
      console.log('Drop postcodes table...')
      const db = new Database(options.database, options)
      dropPostcodes(db)
    })

  program.command('debug')
    .description('debug for command')
    .option('-c, --csv <path>', 'japan postcodes csv path', './utf_all.csv')
    .option('-d, --database <path>', 'sqlite3 file path', './postcode.db')
    .action((options: any) => {
      console.log('Debug...')

      console.log('--- from CSV ---')
      const rows: string[] = getJpostcodes(options.csv)
      if (rows.length === 0) throw new Error('could not get from csv')
      debugRawJpostcode(rows[0].split(','))

      console.log('--- from DB ---')
      // FIXME: 「1 "0600000" "北海道" "札幌市中央区" "以下に掲載がない場合"」と"0600000"が0でパディングしてしまってる
      const db = new Database(options.database, options)
      const row: any = db.prepare('SELECT * FROM postcodes limit 1').get()
      console.log(row.id, row.postcode, row.ken, row.municipalities, row.area)
    })

  program.parse()
}
