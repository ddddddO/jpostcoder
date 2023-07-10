import type { Database, Statement } from 'better-sqlite3'

const debugRawJpostcode = (vs: string[]): void => {
  const header: string[] = ['全国地方公共団体コード', '（旧）郵便番号（5桁）', '郵便番号（7桁）', '都道府県名', '市区町村名', '町域名', '都道府県名', '市区町村名', '町域名', '一町域が二以上の郵便番号で表される場合の表示', '小字毎に番地が起番されている町域の表示', '丁目を有する町域の場合の表示', '一つの郵便番号で二以上の町域を表す場合の表示', '更新の表示', '変更理由']
  if (vs.length !== header.length) throw new Error('not match column num')
  vs.map((v, i) => console.log(header[i]+':', v))
}

const getJpostcodes = (): string[] => {
  const fs = require('fs')
  const src = './../data/raw/utf_all/20230710.csv'
  const rows: string[] = fs.readFileSync(src, {encoding: 'utf-8'}).split('\n')
  // const vs: string[] = rows[0].split(',')
  // debugRawJpostcode(vs)
  return rows
}

interface jpostcode {
  id?: number
  code: string
  postcode_old: string
  postcode: string
  ken_kana: string
  municipalities_kana: string
  area_kana: string
  ken: string
  municipalities: string
  area: string
  flg_a: number
  flg_b: number
  flg_c: number
  flg_d: number
  flg_e: number
  flg_f: number
}

const toJpostcode = (vs: string[]): jpostcode => {
  return {
    code: vs[0]
  , postcode_old: vs[1]
  , postcode: vs[2]
  , ken_kana: vs[3]
  , municipalities_kana: vs[4]
  , area_kana: vs[5]
  , ken: vs[6]
  , municipalities: vs[7]
  , area: vs[8]
  , flg_a: parseInt(vs[9])
  , flg_b: parseInt(vs[10])
  , flg_c: parseInt(vs[11])
  , flg_d: parseInt(vs[12])
  , flg_e: parseInt(vs[13])
  , flg_f: parseInt(vs[14])
  }
}

const insertJpostcodes = (db: Database, jpostcodes: jpostcode[]): void => {
  const query: Statement = db.prepare('INSERT INTO postcodes (code, postcode_old, postcode, ken_kana, municipalities_kana, area_kana, ken, municipalities, area, flg_a, flg_b, flg_c, flg_d, flg_e, flg_f) VALUES (@code, @postcode_old, @postcode, @ken_kana, @municipalities_kana, @area_kana, @ken, @municipalities, @area, @flg_a, @flg_b, @flg_c, @flg_d, @flg_e, @flg_f)')
  db.transaction((jpostcodes: jpostcode[]) => {
    jpostcodes.map(postcode => query.run(postcode))
  })(jpostcodes)  
}

const dropPostcodes = (db: Database): void => {
  db.prepare('drop table postcodes').run()
}

const options = null
const db: Database = require('better-sqlite3')('./../postcode.db', options)

const { Command } = require('commander');
const program = new Command();

program
  .name('jpostcoder')
  .description('jpostcoder CLI')
  .version('0.0.0');

program.command('insert')
  .description('execute insert')
  // .argument('<string>', 'xxx')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action((str: string, options: any) => {
    // const limit = options.first ? 1 : undefined;
    // console.log(str.split(options.separator, limit));
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
    // TODO: create table/table分割
  });

program.parse();


// FIXME: 「1 "0600000" "北海道" "札幌市中央区" "以下に掲載がない場合"」と"0600000"が0でパディングしてしまってる
// const row: jpostcode = db.prepare('SELECT * FROM postcodes').get()
// console.log(row.id, row.postcode, row.ken, row.municipalities, row.area)
