import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import banner1 from "../../assets/img/banner/main_banner_1.png";
import banner2 from "../../assets/img/banner/main_banner_2.png";
import banner3 from "../../assets/img/banner/main_banner_3.png";
import arrow_left from "../../assets/icon/arrow_left.svg";
import arrow_right from "../../assets/icon/arrow_right.svg";

/* 목표: 재활용가능한 carousel만들기. 움직이는 갯수 및 사이즈에 관련없이 작동하도록 구현. */
const Carousel = () => {
  /* 페이지별로 다른 이미지, 이미지 개수를 내려줘야할때는 Props를 활용할수있습니다. 
  과제여구조건은 동일한 페이지를 구현해야하므로 props로 동적이게 내려받을 필요는 없어보였습니다. */
  const sliders = useRef<HTMLUListElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [slidertWidth, setSliderWidth] = useState(350);
  const [marginRight, setMarginRight] = useState(10);
  const [initialTranslateX, setInitialTranslateX] = useState(682.5);
  const [slideList, setSliderList] = useState([
    { idx: 0, img: banner1 },
    { idx: 1, img: banner2 },
    { idx: 2, img: banner3 },
  ]);
  const [isMoving, setisMoving] = useState(false);
  const [currentIdx, setcurrentIdx] = useState(0);

  //복사해줄 요소의 갯수
  const bufferSize = 2;
  //한번에 이동할 요소의 갯수
  const moveFactor = 1;
  const delays = 0.5;
  /* 초기 셋팅을 해주는 함수. 앞뒤로 복사해줄 요소를 복사해줍니다. bufferSize와 moveFactor가 변경하여도 문제없이 작동하도록 합니다.*/
  const setList = (initialList: { idx: number; img: string }[]) => {
    const newList = [
      ...initialList.slice(-bufferSize),
      ...initialList,
      ...initialList.slice(0, bufferSize),
    ];
    setSliderList(newList);

    const newIdx = bufferSize + currentIdx;
    setcurrentIdx(newIdx);
  };

  const moveSlider = (direction: number) => {
    const element = sliders.current;

    if (!element) return;

    if (isMoving) return;
    setisMoving(true);

    element.style.transition = `transform ${delays}s ease-in-out`;
    element.style.transform = `translateX(${-(
      direction * moveFactor * slidertWidth +
      initialTranslateX +
      direction * marginRight
    )}px)`;

    setTimeout(() => {
      reArrangeData(direction);

      element.style.transition = "none";
      element.style.transform = `translateX(-${initialTranslateX}px)`;
      setisMoving(false);
    }, delays * 1000);
  };

  const reArrangeData = (direction: number) => {
    if (direction > 0) {
      const newList = [...slideList];
      const newBufferIdx = 0 + bufferSize * 2;
      const newBuffer = newList.slice(newBufferIdx, newBufferIdx + moveFactor);

      setSliderList([...newList.slice(moveFactor), ...newBuffer]);
    } else {
      const newList = [...slideList];
      const newBufferIdx = newList.length - bufferSize * 2;
      const newBuffer = newList.slice(newBufferIdx - moveFactor, newBufferIdx);

      const newDataStrip = [...newBuffer, ...newList.slice(0, -moveFactor)];
      setSliderList(newDataStrip);
    }
  };

  useEffect(() => {
    /* css를통해서 slider의 width나 gap이 변하더라도, 동적으로 가져와서 변경시켜줄 수 있게 계산을 해줍니다. */
    const sliderWrapper = sliders.current;
    if (container.current === null || sliderWrapper === null) return;
    const containerWidth = container.current.clientWidth;
    const sliderElement = container.current.querySelector(
      `.${styles.slider_item}`
    );
    if (sliderElement === null) return;
    const sliderItemWidth = sliderElement?.clientWidth;
    setSliderWidth(sliderItemWidth);
    const computedStyle = window.getComputedStyle(sliderElement);
    const margin = parseFloat(computedStyle.marginRight);
    setMarginRight(margin);

    /* 요소를 정가운데에 위치하기위해서 계산을 해줍니다. css에서 값을 변경하게되어도 영향을 받지않습니다. */
    const TotalBufferWidth =
      sliderItemWidth * bufferSize + margin * (bufferSize - 1);
    const visibleWidth = (containerWidth - (sliderItemWidth + margin * 2)) / 2;
    sliderWrapper.style.transform = `translateX(-${
      TotalBufferWidth - visibleWidth
    }px)`;
    setInitialTranslateX(TotalBufferWidth - visibleWidth);

    /* list를 복사해주는 값. 무한슬라이더를 위하여 앞뒤로 값들을 복사해야합니다. */
    setList(slideList);
  }, []);

  const intervalCallback = useCallback(() => {
    moveSlider(1);
    console.log("?", slideList);
  }, [slideList]);

  useEffect(() => {
    // setInterval 내부의 함수를 useCallback을 사용하여 만들어서 slideList를 참조할 수 있도록 합니다.
    const interval = setInterval(intervalCallback, 3000);
    return () => clearInterval(interval);
  }, [slideList]);

  return (
    <div className={styles.container} ref={container}>
      <ul className={styles.slider_wrapper} ref={sliders}>
        {slideList.map((slider, idx) => {
          return (
            <li key={`slider-${idx}`} className={styles.slider_item}>
              <img
                className={styles.slider_banner}
                src={slider.img}
                alt={`banner-img-${idx}`}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <div className={styles.button_wrapper}>
          <button
            onClick={() => {
              moveSlider(-1);
            }}
          >
            <img src={arrow_left} alt="arrow_left" />
          </button>

          {Array.from(
            { length: slideList.length - bufferSize * 2 },
            (_, idx) => (
              <div
                key={`button-${idx}`}
                className={`${styles.default_button} ${
                  slideList[currentIdx].idx === idx ? styles.button_color : ""
                }`}
              ></div>
            )
          )}

          <button
            onClick={() => {
              moveSlider(1);
            }}
          >
            <img src={arrow_right} alt="arrow_right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
