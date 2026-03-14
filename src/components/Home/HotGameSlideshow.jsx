import { useContext, useCallback, useRef, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";

import "swiper/css";
import 'swiper/css/grid';
import "swiper/css/navigation";
import GameCard from "../GameCard";
import BigCameCard from "../BigCameCard";

const HotGameSlideshow = ({ games, name, title, onGameClick }) => {
    const { contextData } = useContext(AppContext);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const handleGameClick = (game, isDemo = false) => {
        if (onGameClick) {
            onGameClick(game, isDemo);
        }
    };

    const handleNext = useCallback(() => {
        if (!swiperRef.current?.swiper || isNextDisabled) return;
        swiperRef.current.swiper.slideNext();
    }, [isNextDisabled]);

    const handlePrev = useCallback(() => {
        if (!swiperRef.current?.swiper || isPrevDisabled) return;
        swiperRef.current.swiper.slidePrev();
    }, [isPrevDisabled]);

    const updateNavigationState = useCallback(() => {
        if (!swiperRef.current?.swiper) return;

        const swiper = swiperRef.current.swiper;
        setIsPrevDisabled(swiper.isBeginning);
        setIsNextDisabled(swiper.isEnd);
    }, []);

    useEffect(() => {
        if (!swiperRef.current?.swiper) return;

        const swiper = swiperRef.current.swiper;

        updateNavigationState();

        swiper.on("slideChange", updateNavigationState);
        swiper.on("reachBeginning", () => setIsPrevDisabled(true));
        swiper.on("reachEnd", () => setIsNextDisabled(true));
        swiper.on("fromEdge", () => {
            setIsPrevDisabled(false);
            setIsNextDisabled(false);
        });

        return () => {
            swiper.off("slideChange", updateNavigationState);
            swiper.off("reachBeginning", () => setIsPrevDisabled(true));
            swiper.off("reachEnd", () => setIsNextDisabled(true));
            swiper.off("fromEdge", () => {
                setIsPrevDisabled(false);
                setIsNextDisabled(false);
            });
        };
    }, [updateNavigationState]);

    useEffect(() => {
        setTimeout(updateNavigationState, 100);
    }, [games, updateNavigationState]);

    return (
        <div className="home-section-module-important home-section-module-4 loaded">
            <div className="home-section-module-container">
                <div className="home-header">
                    <div className="title">
                        <div className="first-title">
                            <span>{title}</span>
                        </div>
                    </div>
                    <a className="show-more-games-lobby">
                        <span>Ver todos</span>
                    </a>
                </div>
                <div className="dw-home-featured-games">
                    <div className="swiper-featured-games">
                        {games.length > 10 && (
                            <span className="title__slider">
                                <span
                                    className={`title__slider__left ${isPrevDisabled ? "disabled" : ""}`}
                                    onClick={handlePrev}
                                    role="button"
                                    tabIndex={0}
                                    aria-disabled={isPrevDisabled}
                                ></span>
                                <span
                                    className={`title__slider__right ${isNextDisabled ? "disabled" : ""}`}
                                    onClick={handleNext}
                                    role="button"
                                    tabIndex={0}
                                    aria-disabled={isNextDisabled}
                                ></span>
                            </span>
                        )}
                        <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-multirow">
                            {games.length >= 10 ? (
                                <>
                                    <Swiper
                                        ref={swiperRef}
                                        modules={[Grid, Navigation]}
                                        grid={{
                                            rows: 2,
                                            fill: "row",
                                        }}
                                        spaceBetween={10}
                                        slidesPerView={10}
                                        breakpoints={{
                                            320: { slidesPerView: 3 },
                                            600: { slidesPerView: 5 },
                                            768: { slidesPerView: 6 },
                                            1200: { slidesPerView: 10 },
                                            1500: { slidesPerView: 10 },
                                        }}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        className="swiper-wrapper"
                                        onInit={updateNavigationState}
                                    >
                                        {games.slice(0, 20)?.map((game, index) => (
                                            <SwiperSlide
                                                key={`hot-${title}-${name}-${game.id ?? index}-${index}`}
                                            >
                                                <BigCameCard
                                                    id={game.id}
                                                    category="slide"
                                                    provider={title}
                                                    title={game.name}
                                                    imageSrc={
                                                        game.image_local !== null
                                                            ? contextData.cdnUrl + game.image_local
                                                            : game.image_url
                                                    }
                                                    onGameClick={() => {
                                                        handleGameClick(game);
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            ) : (
                                <div className="swiper-wrapper">
                                    {games?.map((game, index) => (
                                        <div
                                            className="swiper-slide"
                                            key={`hot-${title}-${name}-${game.id ?? index}-${index}`}
                                        >
                                            <BigCameCard
                                                id={game.id}
                                                category="slide"
                                                provider={title}
                                                title={game.name}
                                                imageSrc={
                                                    game.image_local !== null
                                                        ? contextData.cdnUrl + game.image_local
                                                        : game.image_url
                                                }
                                                onGameClick={() => {
                                                    handleGameClick(game);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotGameSlideshow;
