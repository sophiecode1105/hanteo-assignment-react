import {
  world1,
  world2,
  world3,
  firstweek1,
  firstweek2,
  firstweek3,
  social1,
  social2,
  social3,
  recommend1,
  recommend2,
  recommend3,
  latest1,
  latest2,
  latest3,
  trot1,
  trot2,
  trot3,
  ost1,
  ost2,
  ost3,
  release1,
  release2,
  release3,
} from "../../assets/img/";
import { ChartData } from "../../components/Card/Card";

const cardData = [
  {
    title: "주간월드 TOP 5",
    list: [
      { img: world1, singer: "투모로우바이투게더" },
      { img: world2, singer: "(여자)아이들" },
      { img: world3, singer: "아이브" },
    ],
  },
  {
    title: "최근 초동기록 TOP 5",
    list: [
      { img: firstweek1, singer: "DREAM()SCAPE, DREAMini Ver." },
      { img: firstweek2, singer: "minisode 3: TOMORROW: 미내앨범 6집" },
      { img: firstweek3, singer: "HOPE ON THE STREET VOL1" },
    ],
  },
  {
    title: "주간 소셜차트 TOP 5",
    list: [
      { img: social1, singer: "투모로우바이투게더" },
      { img: social2, singer: "(여자)아이들" },
      { img: social3, singer: "아이브" },
    ],
  },
  {
    title: "추천 아티스트",
    list: [
      { img: recommend1, singer: "tripleS" },
      { img: recommend2, singer: "STAYC" },
      { img: recommend3, singer: "NCT DREAMS" },
    ],
  },
  {
    title: "최신 음반",
    list: [
      { img: latest1, singer: "SRAH MCLACHLAN-FUMBLING TOWARDS" },
      { img: latest2, singer: "MUNA-SAVES THE WORLD.LP" },
      { img: latest3, singer: "도리(dori)-Cinema Pt.2" },
    ],
  },
  {
    title: "최근 초동기록 TOP 5",
    list: [
      { img: firstweek1, singer: "DREAM()SCAPE, DREAMini Ver." },
      { img: firstweek2, singer: "minisode 3: TOMORROW: 미내앨범 6집" },
      { img: firstweek3, singer: "HOPE ON THE STREET VOL1" },
    ],
  },
  {
    title: "주간 소셜차트 TOP 5",
    list: [
      { img: social1, singer: "투모로우바이투게더" },
      { img: social2, singer: "(여자)아이들" },
      { img: social3, singer: "아이브" },
    ],
  },
  {
    title: "추천 아티스트",
    list: [
      { img: recommend1, singer: "tripleS" },
      { img: recommend2, singer: "STAYC" },
      { img: recommend3, singer: "NCT DREAMS" },
    ],
  },
  {
    title: "최신 음반",
    list: [
      { img: latest1, singer: "SRAH MCLACHLAN-FUMBLING TOWARDS" },
      { img: latest2, singer: "MUNA-SAVES THE WORLD.LP" },
      { img: latest3, singer: "도리(dori)-Cinema Pt.2" },
    ],
  },
  {
    title: "주간 트로트차트 Top 5",
    list: [
      { img: trot1, singer: "희로애락,희Ver." },
      { img: trot2, singer: "CHANS TIME&ONE MORE CHANS" },
      { img: trot3, singer: "골든베스트2집" },
    ],
  },
  {
    title: "주간 OST차트 Top 5",
    list: [
      { img: ost1, singer: "THE PLANET:베스티언즈(OST)" },
      { img: ost2, singer: "THE MAN WHO LAUGHS:뮤지컬 우는 남자 박효신" },
      { img: ost3, singer: "구름빵2집 뮤지컬" },
    ],
  },
  {
    title: "발매 예정",
    list: [
      { img: release1, singer: "비브(Viv)-Boomb:미니앨범 1집" },
      { img: release2, singer: "앤시티(NCT)-NCT ZONE COUPON CARD, WHITE ABCD" },
      { img: release3, singer: "닥터슬럼프(ost)" },
    ],
  },
];

export const fetchCardData = (
  page: number,
  count = 4
): Promise<ChartData[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    // 비동기적으로 데이터를 반환합니다.
    const startIndex = (page - 1) * count;
    const endIndex = startIndex + count;
    setTimeout(() => {
      const slicedData = cardData.slice(startIndex, endIndex);
      resolve(slicedData);
    }, 500); // (실제 HTTP 요청 시간을 대체)
  });
};
