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