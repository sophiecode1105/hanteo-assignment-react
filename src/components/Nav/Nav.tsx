import styles from "./Nav.module.scss";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const menuList = [
    { name: "차트", location: "/chart" },
    { name: "Whook", location: "/whook" },
    { name: "이벤트", location: "/event" },
    { name: "뉴스", location: "/news" },
    { name: "스토어", location: "/store" },
    { name: "충전소", location: "/charge" },
  ];

  const navigateToMenu = (location: string) => {
    navigate(location);
  };
  return (
    <nav className={styles.container}>
      <ul className={styles.nav_menu_list}>
        {menuList.map((menu, idx) => {
          return (
            <li
              key={`nav-list-${idx}`}
              className={styles.nav_menu_item}
              onClick={() => {
                navigateToMenu(menu.location);
              }}
            >
              {menu.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
