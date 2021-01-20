import React from "react";
import "./SlideShow.css";
// import Swiper JS
import SwiperCore, {
    Pagination,
    Navigation,
    Keyboard,
    Mousewheel,
} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import {VscTriangleLeft, VscTriangleRight} from "react-icons/vsc";
import * as MdIcons from "react-icons/md";
import {Link} from "react-router-dom";

SwiperCore.use([Pagination, Navigation, Keyboard, Mousewheel]);

function SlideShowSwiper(props) {
    const folderToDisplay = props.folderToDisplay;

    const getSwiper = (swiper) => {
        setPagination(swiper.pagination);
    };

    const setSwiperKeyboard = (keyBoard) => {
        // keyBoard.enabled ? keyBoard.disable() : keyBoard.enable();
    };

    const setPagination = (pagination) => {
        if (props.images.length > 48) {
            pagination.el.style.display = "none";
        }
    };

    const params = {
        mousewheel: {
            sensitivity: 10,
            forceToAxis: true,
        },
        pagination: {
            clickable: true,
        },
        spaceBetween: 5,
        loop: true,
        slidesPerView: 1,
        speed: 1,
        navigation: true,
        keyboard: {
            enabled: true,
        }

    };

    return (
        <div className={"swiperWrapper"}>
            {props.images.length > 0 && <div className={"headerSlideShow"}>
                <div className={"titleSlide"}>{folderToDisplay}</div>
                <div className={"totalImagesTText"}>{props.images.length} Total Images</div>
                <div className={"headerIcons"}>
                    <div className={""}>
                        <MdIcons.MdRemoveCircle/>
                    </div>
                </div>
            </div>
            }

            {props.images.length > 0 && (
                <Swiper
                    {...params}
                    onSwiper={(event) => getSwiper(event)}
                    // onSlideChange={(event) => console.log(event)}
                    onClick={(event) => setSwiperKeyboard(event.keyboard)}
                >
                    {props.images.map((image,index) => {
                        return (
                            <SwiperSlide key={image._id}>
                                <div className={'numberSlide'}>{index+1} </div>
                                <img
                                    className="imagesSwiper"
                                    src={`./frames/${folderToDisplay}/${image.name}`}
                                    alt={"..."}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
            {props.images.length === 0 && (
                <Swiper
                    {...params}
                    onSwiper={(event) => getSwiper(event)}
                    onClick={(event) => setSwiperKeyboard(event.keyboard)}
                >
                    <SwiperSlide>
                        <div className={'noCollections'}> Add a collections first.</div>
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}

export default SlideShowSwiper;
