import { fetchCardData } from "../../assets/data/cardData";
import Card, { ChartData } from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Crousel";
import styles from "./Main.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";

const Main = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const target = useRef<HTMLDivElement | null>(null);

  const [cardList, setCardList] = useState<ChartData[]>([]);

  const addPages = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCardData(page);
        console.log("에?", result);
        if (result.length === 0) console.log("no more data to fetch");
        else setCardList((prevList) => [...prevList, ...result]);
      } catch (error) {
        console.error("Error fetching card data:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태 변경합니다.
      }
    };

    fetchData();
  }, [page]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        addPages();
      }
    },
    [isLoading]
  );

  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [callback, target]);

  return (
    <div className={styles.container}>
      <Carousel />
      {cardList?.map((card, idx) => (
        <Card key={`card-${idx}`} chartData={card} />
      ))}
      <div ref={target}>Loading...</div>
    </div>
  );
};

export default Main;
