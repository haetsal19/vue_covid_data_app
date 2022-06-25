import axios from "axios";
import moment from "moment";

//infState: 코로나 감염 현황 연관 데이터
//vaccinated: 백신 접종 현황 연관 데이터
//districts: 지역별 감염 현황 연관 데이터

interface IInfstate {
  labels: string[];
  infList: number[];
  deathList: number[];
  totalInf: number;
  totalDeath: number;
}

const url = {
  infState:
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson",
  vaccinated: "https://api.odcloud.kr/api/15077756/v1/vaccine-stat",
  districts:
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson",
};

const key =
  "PUZHJkrBS3J8OgGKm77G4UbNrLjT1ZDwXAGy3CSHTrL/DHxM98WKk3qYeBxOIfEslb+mkyZDtlLws9IZ3EUVog==";

//전국 확진자, 사망자 현황
const fetchInfState = () => {
  const params = {
    ServiceKey: key,
    //전날짜 데이터가 금일 오전 9시에 업데이트됨
    //오늘날짜는 바로전날의 데이터
    //momoent.subtract로 날짜 하루 빼주어 데이터 형식과 맞추기
    startCreateDt: moment().subtract(31, "d").format("YYYYMMDD"), //검색할 생성일 범위의 시작
    endCreateDt: moment().subtract(1, "d").format("YYYYMMDD"), //검색할 생성일 범위의 종료
  };

  //URLSearchParams.toString() : URL에 쓰기 적합한 형태의 쿼리 문자열을 반환
  //원래형식 'ServiceKey=${key}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}'
  return axios
    .get(`${url.infState}?${new URLSearchParams(params).toString()}`)
    .then((res) => res.data.response.body.items.item.reverse())
    .catch(console.log);
};

//백신접종 현황
const fetchVaccinated = () => {
  const params = {
    serviceKey: key,
    page: "1",
    perPage: "10",
    "cond[baseDate::GTE]": moment().subtract(1, "d").format("YYYY-MM-DD"),
    "cond[sido::EQ]": "전국",
  };

  //URLSearchParams.toString() : URL에 쓰기 적합한 형태의 쿼리 문자열을 반환
  //원래형식 'ServiceKey=${key}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}'
  return axios
    .get(`${url.vaccinated}?${new URLSearchParams(params).toString()}`)
    .then((res) => {
      console.log("ㄲ까까까", res);
      return res;
    })
    .then((res) => res.data.data[res.data.data.length - 1].totalFirstCnt)
    .catch(console.log);
};

//지역별 확진자, 사망자 현황
const fetchDistricts = () => {
  const params = {
    ServiceKey: key,
    startCreateDt: moment().subtract(2, "d").format("YYYYMMDD"), //검색할 생성일 범위의 시작
    endCreateDt: moment().subtract(1, "d").format("YYYYMMDD"), //검색할 생성일 범위의 종료
  };

  //URLSearchParams.toString() : URL에 쓰기 적합한 형태의 쿼리 문자열을 반환
  //원래형식 'ServiceKey=${key}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}'
  return axios
    .get(`${url.districts}?${new URLSearchParams(params).toString()}`)
    .then((res) => res.data.response.body.items.item)
    .catch(console.log);
};

export { fetchVaccinated, fetchDistricts, fetchInfState, IInfstate };
