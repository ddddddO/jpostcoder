"use strict";
const debugRawJpostcode = (vs) => {
    const header = ['全国地方公共団体コード', '（旧）郵便番号（5桁）', '郵便番号（7桁）', '都道府県名', '市区町村名', '町域名', '都道府県名', '市区町村名', '町域名', '一町域が二以上の郵便番号で表される場合の表示', '小字毎に番地が起番されている町域の表示', '丁目を有する町域の場合の表示', '一つの郵便番号で二以上の町域を表す場合の表示', '更新の表示', '変更理由'];
    if (vs.length !== header.length)
        throw new Error('not match column num');
    vs.map((v, i) => console.log(header[i] + ':', v));
};
const getJpostcodes = () => {
    const fs = require('fs');
    const src = './../data/raw/utf_all/20230710.csv';
    const rows = fs.readFileSync(src, { encoding: 'utf-8' }).split('\n');
    // const vs: string[] = rows[0].split(',')
    // debugRawJpostcode(vs)
    return rows;
};
const toJpostcode = (vs) => {
    return {
        code: vs[0],
        postcode_old: vs[1],
        postcode: vs[2],
        ken_kana: vs[3],
        municipalities_kana: vs[4],
        area_kana: vs[5],
        ken: vs[6],
        municipalities: vs[7],
        area: vs[8],
        flg_a: parseInt(vs[9]),
        flg_b: parseInt(vs[10]),
        flg_c: parseInt(vs[11]),
        flg_d: parseInt(vs[12]),
        flg_e: parseInt(vs[13]),
        flg_f: parseInt(vs[14])
    };
};
const rows = getJpostcodes();
const jpostcodes = rows.map(row => toJpostcode(row.split(',')));
const options = null;
const db = require('better-sqlite3')('./../postcode.db', options);
const insertQuery = db.prepare('INSERT INTO postcodes (code, postcode_old, postcode, ken_kana, municipalities_kana, area_kana, ken, municipalities, area, flg_a, flg_b, flg_c, flg_d, flg_e, flg_f) VALUES (@code, @postcode_old, @postcode, @ken_kana, @municipalities_kana, @area_kana, @ken, @municipalities, @area, @flg_a, @flg_b, @flg_c, @flg_d, @flg_e, @flg_f)');
const insert = db.transaction((jpostcode) => {
    jpostcodes.map(postcode => insertQuery.run(postcode));
});
// insert(jpostcodes)
const row = db.prepare('SELECT * FROM postcodes').get();
console.log(row.id, row.postcode, row.ken, row.municipalities, row.area);
