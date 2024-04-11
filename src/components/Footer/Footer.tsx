import styles from "./Footer.module.scss";
import copyright_img from "../../assets/img/copyright.png";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.alignment}>
        <div className={styles.contents_wrapper}>
          <div className={styles.content1}>
            <div>회사소개</div>
            <div>제휴/제안 문의</div>
          </div>
          <div className={styles.content2}>(주) 한터글로벌</div>
        </div>
        <div>
          <img
            className={styles.copyright}
            src={copyright_img}
            alt="copyright_img"
          />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
