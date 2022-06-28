export interface IRootState {
  infState: IInfState;
  districts: IDistrictsState;
}

export interface IDistricts {
  today: number;
  diff: number | string;
  gubun: string;
  color: string;
}

export interface IDistrictsState {
  [gubun: string]: IDistricts;
}

export interface IInfState {
  labels: string[];
  infList: number[];
  deathList: number[];
  totalInf: number;
  totalDeath: number;
}

export interface IInfResponse {
  createDt: string;
  decideCnt: number;
  deathCnt: number;
}

export interface IDistrictsResponse {
  gubunEn: string;
  gubun: string;
  incDec: number;
}
