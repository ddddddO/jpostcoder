import { Command, Database } from "./deps.ts";
import {
  debugRawJpostcode,
  downloadJpostcodeCSV,
  getJpostcodes,
  getRawJpostcodes,
} from "./csv.ts";
import { createPostcodes, dropPostcodes, insertJpostcodes } from "./db.ts";
import { jpostcode } from "./jpostcode.ts";

export const command = (): void => {
  const program = new Command();

  program
    .name("jpostcoder")
    .description("jpostcoder CLI")
    .version("0.0.1");

  program.command("download")
    .description("download japan postcodes csv (utf_all.csv)")
    .option("-d, --dest <path>", "downloaded csv destination", {
      default: "./utf_all.csv",
    })
    .action((options: { dest: string }) => {
      console.log("Download japan postcode csv");
      downloadJpostcodeCSV(options.dest);
    });

  program.command("create")
    .description("create table")
    .option("-d, --database <path>", "sqlite3 file path", {
      default: "./postcode.db",
    })
    .action((options: { database: string }) => {
      console.log("Create postcodes table");
      const db: Database = new Database(options.database);
      createPostcodes(db); // TODO: table分割
    });

  program.command("insert")
    .description("insert japan postcodes into table")
    .option("-c, --csv <path>", "japan postcodes csv path", {
      default: "./utf_all.csv",
    })
    .option("-d, --database <path>", "sqlite3 file path", {
      default: "./postcode.db",
    })
    .action((options: { csv: string; database: string }) => {
      console.log("Insert japan postcodes to database!");
      const db: Database = new Database(options.database);
      const jpostcodes: jpostcode[] = getJpostcodes(options.csv);
      insertJpostcodes(db, jpostcodes);
    });

  program.command("drop")
    .description("drop table")
    .option("-d, --database <path>", "sqlite3 file path", {
      default: "./postcode.db",
    })
    .action((options: { database: string }) => {
      console.log("Drop postcodes table...");
      const db: Database = new Database(options.database);
      dropPostcodes(db);
    });

  program.command("debug")
    .description("debug for command")
    .option("-c, --csv <path>", "japan postcodes csv path", {
      default: "./utf_all.csv",
    })
    .option("-d, --database <path>", "sqlite3 file path", {
      default: "./postcode.db",
    })
    .action((options: { csv: string; database: string }) => {
      console.log("Debug...");

      console.log("--- from CSV ---");
      const rows: string[] = getRawJpostcodes(options.csv);
      if (rows.length === 0) throw new Error("could not get from csv");
      debugRawJpostcode(rows[0]);

      console.log("--- from DB ---");
      // FIXME: 「1 "0600000" "北海道" "札幌市中央区" "以下に掲載がない場合"」と"0600000"が0でパディングしてしまってる
      const db: Database = new Database(options.database);
      const row: any = db.prepare("SELECT * FROM postcodes limit 1").get();
      console.log(row.id, row.postcode, row.ken, row.municipalities, row.area);
    });

  program.parse();
};
