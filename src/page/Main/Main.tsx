import { fetchCardData } from "../../assets/data/cardData";
import Card, { ChartData } from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Crousel";
import styles from "./Main.module.scss";
import loading_gif from "../../assets/img/loading.gif";
import { useCallback, useEffect, useRef, useState } from "react";

const Main = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cardList, setCardList] = useState<ChartData[]>([]);
  const target = useRef<HTMLDivElement | null>(null);

  const addPages = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    //실제로 서버에서 들어오는 데이터처럼 구현하기위하여 dummy data를 fetch하는 함수를 만들어서 사용합니다.
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCardData(page);
        if (result.length === 0) {
          //아무것도 없을시에는 target.current를 null로 만들어서 더이상 fetch를 하지 않고, observer가 돌지않도록 합니다.
          target.current = null;
          return;
        } else setCardList((prevList) => [...prevList, ...result]);
      } catch (error) {
        console.error("Error fetching card data:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태 변경합니다.
      }
    };

    fetchData();
  }, [page]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        addPages();
      }
    },
    [isLoading]
  );

  //무한스크롤을 위한 Observer를 사용합니다.
  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(observerCallback);
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [observerCallback, target]);

  return (
    <div className={styles.container}>
      <Carousel />
      {cardList?.map((card, idx) => (
        <Card key={`card-${idx}`} chartData={card} />
      ))}
      <div ref={target}></div>
      {isLoading && (
        <div className={styles.loading}>
          <img src={loading_gif} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default Main;
