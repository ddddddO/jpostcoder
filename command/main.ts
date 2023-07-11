import Database, { Options } from 'better-sqlite3'
import { Command } from 'commander'
import { getJpostcodes, debugRawJpostcode } from './csv'
import { insertJpostcodes, dropPostcodes, createPostcodes } from './db'
import { database } from './constraints'
import { jpostcode, toJpostcode } from './jpostcode'

const options: Options = {
  // verbose: console.log // postcodeのinsert時にログが大量に出力されるためコメントアウト
}
const db = new Database(database.path, options);

const program = new Command();

program
  .name('jpostcoder')
  .description('jpostcoder CLI')
  .version('0.0.0');

program.command('debug')
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

program.command('insert')
  .description('execute insert')
  .action((str: string, options: any) => {
    console.log('Insert japan postcodes to database!')

    const rows: string[] = getJpostcodes()
    const jpostcodes: jpostcode[] = rows.map(row => toJpostcode(row.split(',')))
    insertJpostcodes(db, jpostcodes)
  });

program.command('drop')
  .description('execute drop')
  .action((str: string, options: any) => {
    console.log('Drop postcodes table...')
    dropPostcodes(db)
  });

program.command('create')
  .description('execute create')
  .action((str: string, options: any) => {
    console.log('Create postcodes table')
    // TODO: table分割
    createPostcodes(db)
  });

program.parse();
