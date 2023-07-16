import { dirname } from "./deps.ts";
import { csv } from "./constraints.ts";
import { jpostcode, toJpostcode } from "./jpostcode.ts";

const download = async (dest: string, src: string): Promise<boolean> => {
  try {
    const resp = await fetch(src);
    if (resp.body) {
      const file = Deno.openSync(dest, { write: true, create: true });
      await resp.body.pipeTo(file.writable);
    }
    return true;
  } catch (err) {
    throw err;
  }
};

export const downloadJpostcodeCSV = async (dest: string): Promise<boolean> => {
  try {
    await Deno.mkdir(dirname(dest), { recursive: true });
    download(dest, csv.japan_postcode_csv_url);
    return true;
  } catch (err) {
    throw err;
  }
};

export const getRawJpostcodes = (csvpath: string): string[] => {
  const raw = Deno.readTextFileSync(csvpath);
  return raw.split("\n");
};

export const getJpostcodes = (csvpath: string): jpostcode[] => {
  return getRawJpostcodes(csvpath)
    .filter((row) => row.length !== 0)
    .map((row) => toJpostcode(row.split(",")));
};

export const debugRawJpostcode = (row: string): void => {
  const vs = row.split(",");
  if (vs.length !== csv.header.length) throw new Error("not match column num");
  vs.map((v, i) => console.log(csv.header[i] + ":", v));
};
