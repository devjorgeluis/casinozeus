import { useContext, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from '../../AppContext';
import { Navigation } from 'swiper/modules';
import BigCameCard from '../BigCameCard';

const GameSlideshow = ({ games, name, title, icon, link, onGameClick, slideshowKey, loadMoreContent }) => {
    const { contextData } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

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
                            <img src="https://vivo-360.s3.amazonaws.com/p-rounded/pragmatic.svg" width="25"></img>
                            <span>{title}</span>
                        </div>
                    </div>
                    <h3>{title}</h3>
                    <a className="show-more-games-lobby" onClick={loadMoreContent}>
                        <span>Ver todos</span>
                    </a>
                </div>
                <div className="dw-home-featured-games">
                    <div className="swiper-featured-games">
                        <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-multirow">
                            <div className="swiper-wrapper">
                                {games?.map((game, index) => {
                                    const keyBase = slideshowKey ? `s${slideshowKey}` : `global`;
                                    const itemKey = `${keyBase}-${game.id}-${index}`;
                                    return (
                                        <BigCameCard
                                            key={itemKey}
                                            id={game.id}
                                            provider={'Casino'}
                                            title={game.name}
                                            imageSrc={game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url}
                                            onGameClick={() => handleGameClick(game)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSlideshow;