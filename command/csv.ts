import { dirname } from "./deps.ts";
import { csv } from "./constraints.ts";

const download = async (dest: string, src: string): Promise<void> => {
  try {
    const resp = await fetch(src);
    if (resp.body) {
      const file = Deno.openSync(dest, { write: true, create: true });
      await resp.body.pipeTo(file.writable);
    }
  } catch (err) {
    console.error(err);
  }
};

export const downloadJpostcodeCSV = async (dest: string): Promise<void> => {
  await Deno.mkdir(dirname(dest), { recursive: true });
  download(dest, csv.japan_postcode_csv_url);
};

export const getJpostcodes = (csvpath: string): string[] => {
  const raw = Deno.readTextFileSync(csvpath);
  return raw.split("\n");
};

export const debugRawJpostcode = (vs: string[]): void => {
  if (vs.length !== csv.header.length) throw new Error("not match column num");
  vs.map((v, i) => console.log(csv.header[i] + ":", v));
};
