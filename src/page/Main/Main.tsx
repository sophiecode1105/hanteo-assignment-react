import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Crousel";
import styles from "./Main.module.scss";

import {
  world1,
  world2,
  world3,
  recent1,
  recent2,
  recent3,
  social1,
  social2,
  social3,
  recommend1,
  recommend2,
  recommend3,
} from "../../assets/img/";

const Main = () => {
  const cardList = [
    {
      title: "주간월드 TOP5",
      list: [
        { img: world1, singer: "투모로우바이투게더" },
        { img: world2, singer: "(여자)아이들" },
        { img: world3, singer: "아이브" },
      ],
    },
    {
      title: "진행중인 초동기록",
      list: [
        { img: recent1, singer: "투모로우바이투게더" },
        { img: recent2, singer: "minisode 3: TOMORROW: 미내앨범 6집" },
        { img: recent3, singer: "HOPE ON THE STREET VOL1" },
      ],
    },
    {
      title: "최근 초동기로 TOP5",
      list: [
        { img: recent1, singer: "DREAM()SCAPE, DREAMini Ver." },
        { img: recent2, singer: "(여자)아이들" },
        { img: recent3, singer: "아이브" },
      ],
    },
    {
      title: "주간 소셜차트 TOP5",
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
  ];

  return (
    <div className={styles.container}>
      <Carousel />
      {cardList.map((card, idx) => (
        <Card key={`card-${idx}`} chartData={card} />
      ))}
    </div>
  );
};

export default Main;
