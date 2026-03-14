import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Navigation } from 'swiper/modules';
import GameCard from '../GameCard';

const GameSlideshow = ({ games, name, title, onGameClick, loadMoreContent }) => {
    const { contextData } = useContext(AppContext);

    const handleGameClick = (game, isDemo = false) => {
        if (onGameClick) {
            onGameClick(game, isDemo);
        }
    };

    return (
        <div className="home-section-module-important home-section-module-4 loaded">
            <div className="home-section-module-container">
                <div className="home-header">
                    <div className="title">
                        <div className="first-title">
                            <span>{title}</span>
                        </div>
                    </div>
                    <a className="show-more-games-lobby" onClick={loadMoreContent}>
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
                                                <GameCard
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
                                            <GameCard
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

export default GameSlideshow;