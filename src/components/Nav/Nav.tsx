import { useRef, useState } from "react";
import styles from "./Nav.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const menuRefs = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const menuList = [
    { name: "차트", location: "/chart" },
    { name: "Whook", location: "/whook" },
    { name: "이벤트", location: "/event" },
    { name: "뉴스", location: "/news" },
    { name: "스토어", location: "/store" },
    { name: "충전소", location: "/charge" },
  ];

  // onMouseDown, onMouseMove, onMouseUp, onMouseLeave 함수를 만들어서 드래그로 메뉴를 이동할 수 있도록 합니다.
  const onMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (menuRefs.current === null) return;
    setIsDown(true);
    setStartX(e.pageX - menuRefs.current.offsetLeft);
    setScrollLeft(menuRefs.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDown || menuRefs.current === null) return;
    e.preventDefault();
    const x = e.pageX - menuRefs.current.offsetLeft;
    const walk = (x - startX) * 1;
    menuRefs.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const navigateToMenu = (location: string) => {
    navigate(location);
  };
  return (
    <nav className={styles.container}>
      <ul
        className={styles.nav_menu_list}
        ref={menuRefs}
        onMouseDown={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
          onMouseDown(e);
        }}
        onMouseMove={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
          onMouseMove(e);
        }}
        onMouseUp={() => {
          onMouseUp();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        {menuList.map((menu, idx) => {
          const isActive = location.pathname === menu.location;
          return (
            <li
              key={`nav-list-${idx}`}
              className={`${styles.nav_menu_item} ${
                isActive ? styles.active : ""
              }`}
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
