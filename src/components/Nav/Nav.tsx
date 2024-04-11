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

  // onMouseDown 함수: 마우스 버튼이 눌렸을 때 호출되는 함수입니다.
  const onMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (menuRefs.current === null) return;
    setIsDown(true);
    // 마우스가 눌린 지점의 x좌표를 startX에 저장합니다.
    setStartX(e.pageX - menuRefs.current.offsetLeft);
    // 드래그가 시작될 때의 스크롤 위치를 scrollLeft에 저장합니다.
    setScrollLeft(menuRefs.current.scrollLeft);
  };
  // onMouseMove 함수: 마우스를 움직일 때 호출되는 함수입니다.
  const onMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDown || menuRefs.current === null) return;
    e.preventDefault();
    // 현재 마우스의 x좌표를 계산합니다.
    const x = e.pageX - menuRefs.current.offsetLeft;
    // 이동 거리를 계산합니다.
    const walk = (x - startX) * 1;
    // 스크롤 위치를 조정하여 메뉴를 드래그한 만큼 이동합니다.
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
