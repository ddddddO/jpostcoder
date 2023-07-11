"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropPostcodes = exports.insertJpostcodes = void 0;
const insertJpostcodes = (db, jpostcodes) => {
    const query = db.prepare('INSERT INTO postcodes (code, postcode_old, postcode, ken_kana, municipalities_kana, area_kana, ken, municipalities, area, flg_a, flg_b, flg_c, flg_d, flg_e, flg_f) VALUES (@code, @postcode_old, @postcode, @ken_kana, @municipalities_kana, @area_kana, @ken, @municipalities, @area, @flg_a, @flg_b, @flg_c, @flg_d, @flg_e, @flg_f)');
    db.transaction((jpostcodes) => {
        jpostcodes.map(postcode => query.run(postcode));
    })(jpostcodes);
};
exports.insertJpostcodes = insertJpostcodes;
const dropPostcodes = (db) => {
    db.prepare('drop table postcodes').run();
};
exports.dropPostcodes = dropPostcodes;
