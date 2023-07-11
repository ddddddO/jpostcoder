import Database, { Options } from 'better-sqlite3'
import { database } from './constraints'
import { command } from './command'


const options: Options = {
  // verbose: console.log // postcodeのinsert時にログが大量に出力されるためコメントアウト
}
const db = new Database(database.path, options)

command(db)
