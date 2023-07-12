import { Database } from 'better-sqlite3'
import { Command } from 'commander'
import { downloadJpostcodeCSV, getJpostcodes, debugRawJpostcode } from './csv'
import { insertJpostcodes, dropPostcodes, createPostcodes } from './db'
import { jpostcode, toJpostcode } from './jpostcode'

export const command = (db: Database): void => {
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
      downloadJpostcodeCSV(options.dest ? options.dest : './utf_all.csv')
    })

  program.command('create')
    .description('create table')
    .action((str: string, options: any) => {
      console.log('Create postcodes table')
      createPostcodes(db) // TODO: table分割
    })

  program.command('insert')
    .description('insert japan postcodes into table')
    .action((str: string, options: any) => {
      console.log('Insert japan postcodes to database!')

      const jpostcodes: jpostcode[] = getJpostcodes()
        .filter(row => row.length !== 0)
        .map(row => toJpostcode(row.split(',')))

      insertJpostcodes(db, jpostcodes)
    })

  program.command('drop')
    .description('drop table')
    .action((str: string, options: any) => {
      console.log('Drop postcodes table...')
      dropPostcodes(db)
    })
  
  program.command('debug')
    .description('debug for command')
    .action((str: string, options: any) => {
      console.log('Debug...')

      console.log('--- from CSV ---')
      const rows: string[] = getJpostcodes()
      if (rows.length === 0) throw new Error('could not get from csv')
      debugRawJpostcode(rows[0].split(','))

      console.log('--- from DB ---')
      // FIXME: 「1 "0600000" "北海道" "札幌市中央区" "以下に掲載がない場合"」と"0600000"が0でパディングしてしまってる
      const row: any = db.prepare('SELECT * FROM postcodes limit 1').get()
      console.log(row.id, row.postcode, row.ken, row.municipalities, row.area)
    })

  program.parse()
}
