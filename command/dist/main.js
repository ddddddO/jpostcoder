"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_1 = require("./csv");
const db_1 = require("./db");
const jpostcode_1 = require("./jpostcode");
const options = null;
const db = require('better-sqlite3')('./../postcode.db', options);
const { Command } = require('commander');
const program = new Command();
program
    .name('jpostcoder')
    .description('jpostcoder CLI')
    .version('0.0.0');
program.command('debug')
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
program.command('insert')
    .description('execute insert')
    // .argument('<string>', 'xxx')
    // .option('--first', 'display just the first substring')
    // .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
    // const limit = options.first ? 1 : undefined;
    // console.log(str.split(options.separator, limit));
    console.log('Insert japan postcodes to database!');
    const rows = (0, csv_1.getJpostcodes)();
    const jpostcodes = rows.map(row => (0, jpostcode_1.toJpostcode)(row.split(',')));
    (0, db_1.insertJpostcodes)(db, jpostcodes);
});
program.command('drop')
    .description('execute drop')
    .action((str, options) => {
    console.log('Drop postcodes table...');
    (0, db_1.dropPostcodes)(db);
});
program.command('create')
    .description('execute create')
    .action((str, options) => {
    console.log('Create postcodes table');
    // TODO: create table/table分割
});
program.parse();
