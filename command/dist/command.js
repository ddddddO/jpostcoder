"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const commander_1 = require("commander");
const csv_1 = require("./csv");
const db_1 = require("./db");
const jpostcode_1 = require("./jpostcode");
const command = (db) => {
    const program = new commander_1.Command();
    program
        .name('jpostcoder')
        .description('jpostcoder CLI')
        .version('0.0.0');
    program.command('download')
        .description('download japan postcodes csv (utf_all.csv)')
        .option('-d, --dest <path>', 'downloaded csv destination', './utf_all.csv')
        .action((options) => {
        console.log('Download japan postcode csv');
        (0, csv_1.downloadJpostcodeCSV)(options.dest ? options.dest : './utf_all.csv');
    });
    program.command('create')
        .description('create table')
        .action((str, options) => {
        console.log('Create postcodes table');
        (0, db_1.createPostcodes)(db); // TODO: table分割
    });
    program.command('insert')
        .description('insert japan postcodes into table')
        .action((str, options) => {
        console.log('Insert japan postcodes to database!');
        const jpostcodes = (0, csv_1.getJpostcodes)()
            .filter(row => row.length !== 0)
            .map(row => (0, jpostcode_1.toJpostcode)(row.split(',')));
        (0, db_1.insertJpostcodes)(db, jpostcodes);
    });
    program.command('drop')
        .description('drop table')
        .action((str, options) => {
        console.log('Drop postcodes table...');
        (0, db_1.dropPostcodes)(db);
    });
    program.command('debug')
        .description('debug for command')
        .action((str, options) => {
        console.log('Debug...');
        console.log('--- from CSV ---');
        const rows = (0, csv_1.getJpostcodes)();
        if (rows.length === 0)
            throw new Error('could not get from csv');
        (0, csv_1.debugRawJpostcode)(rows[0].split(','));
        console.log('--- from DB ---');
        // FIXME: 「1 "0600000" "北海道" "札幌市中央区" "以下に掲載がない場合"」と"0600000"が0でパディングしてしまってる
        const row = db.prepare('SELECT * FROM postcodes limit 1').get();
        console.log(row.id, row.postcode, row.ken, row.municipalities, row.area);
    });
    program.parse();
};
exports.command = command;
