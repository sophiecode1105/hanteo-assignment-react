import styles from "./Card.module.scss";

export type ChartData = {
  title: string;
  list: {
    img: string;
    info: string;
  }[];
};

const Card = ({ chartData }: { chartData: ChartData }) => {
  const { title, list } = chartData;
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.card_wrapper}>
        {list.map((item, idx) => (
          <div key={`card-${title}-${idx}`} className={styles.card_item}>
            <img
              className={styles.card_img}
              src={item.img}
              alt={`card-${idx}`}
            />
            <div className={styles.card_info}>{item.info}</div>
          </div>
        ))}
      </ul>
    </section>
  );
};
export default Card;
