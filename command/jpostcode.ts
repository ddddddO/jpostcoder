export interface jpostcode {
  id?: number;
  code: string;
  postcode_old: string;
  postcode: string;
  ken_kana: string;
  municipalities_kana: string;
  area_kana: string;
  ken: string;
  municipalities: string;
  area: string;
  flg_a: number;
  flg_b: number;
  flg_c: number;
  flg_d: number;
  flg_e: number;
  flg_f: number;
}

export const toJpostcode = (vs: string[]): jpostcode => {
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
    flg_f: parseInt(vs[14]),
  };
};
