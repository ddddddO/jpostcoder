import type { Database, Statement } from 'better-sqlite3'
import { jpostcode } from './jpostcode'

export const insertJpostcodes = (db: Database, jpostcodes: jpostcode[]): void => {
  const query: Statement = db.prepare('INSERT INTO postcodes (code, postcode_old, postcode, ken_kana, municipalities_kana, area_kana, ken, municipalities, area, flg_a, flg_b, flg_c, flg_d, flg_e, flg_f) VALUES (@code, @postcode_old, @postcode, @ken_kana, @municipalities_kana, @area_kana, @ken, @municipalities, @area, @flg_a, @flg_b, @flg_c, @flg_d, @flg_e, @flg_f)')
  db.transaction((jpostcodes: jpostcode[]) => {
    jpostcodes.map(postcode => query.run(postcode))
  })(jpostcodes)  
}

export const dropPostcodes = (db: Database): void => {
  db.prepare('drop table postcodes').run()
}

export const createPostcodes = (db: Database): void => {
  db.prepare(
    `create table postcodes(
        id integer not null primary key autoincrement
      , code text -- 全国地方公共団体コード
      , postcode_old text -- （旧）郵便番号（5桁）
      , postcode text -- 郵便番号（7桁）
      , ken_kana text -- 都道府県名
      , municipalities_kana text -- 市区町村名
      , area_kana text -- 町域名
      , ken text -- 都道府県名
      , municipalities text -- 市区町村名
      , area text -- 町域名
      , flg_a int -- 一町域が二以上の郵便番号で表される場合の表示
      , flg_b int -- 小字毎に番地が起番されている町域の表示
      , flg_c int -- 丁目を有する町域の場合の表示
      , flg_d int -- 一つの郵便番号で二以上の町域を表す場合の表示
      , flg_e int -- 更新の表示
      , flg_f int -- 変更理由
    )`
  ).run()
}