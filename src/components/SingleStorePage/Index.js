/* eslint-disable no-lone-blocks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stories from "react-insta-stories";

import "./style.css";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { storieAction } from "../../store/storieSlice";

const SingleStoriePage = () => {
    const childernData = useSelector((store) => store.storie.storieData || []);
    const from = useSelector((store) => store.storie.from || []);
    const dishes = useSelector((state) => state.bottomBar.dishes)
    const chef = useSelector((state) => state.bottomBar.chef)
    const cart = useSelector((state) => state.bottomBar.cart);

    const dispatch = useDispatch();
    const onStoryBackClick = () => {
        switch (from) {
            case 'dishes':
                dispatch(bottomBarActions.loadTab({ tabName: 'dishes' })); 
                return;
            case 'cart':
                dispatch(bottomBarActions.loadTab({ tabName: 'cart' })); 
                return;
            case 'chef':
                dispatch(bottomBarActions.loadTab({ tabName: 'chef' })); 
                return;
            case 'dishBook':
                dispatch(bottomBarActions.loadTab({ tabName: 'dishBook' }));
                return
            default:
                dispatch(bottomBarActions.loadTab({ tabName: 'chef' }));
                break;
        }
    };

    const stories = childernData?.map(({ img, name }) => ({
        url: img,
        duration: 3000,
        content: () => {
            return (
                <div className="single_stories_main">
                    <div className="swiper_Top">
                        <div className="swiper_Title">
                            <div className="swiper_top_back_btn">
                                <button onClick={onStoryBackClick} type="button" className="btn back-btn">
                                    <img src="images/icon-back.svg" alt="back" loading="lazy" />
                                </button>
                            </div>
                            <div className="swiper_Title_img">
                                <img src={img} className="storyImg" />
                            </div>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className="swipper_main_img"><img src={img} className="storyImg" /></div>
                </div>
            )
        }
    }))

    const onAllStoriesEnd = () => {
        switch (from) {
            case 'dishes':
                dispatch(bottomBarActions.loadTab({ tabName: 'dishes' })); 
                return;
            case 'cart':
                dispatch(bottomBarActions.loadTab({ tabName: 'cart' })); 
                return;
            case 'chef':
                dispatch(bottomBarActions.loadTab({ tabName: 'chef' })); 
                return;
            case 'dishBook':
                dispatch(bottomBarActions.loadTab({ tabName: 'dishBook' }));
                return
            default:
                dispatch(bottomBarActions.loadTab({ tabName: 'chef' }));
                break;
        }
        dispatch(storieAction.setStorieFalse());
    }

    return (
        <div className="stories_wrapper single_stories_wrapper">
            <Stories
                onAllStoriesEnd={onAllStoriesEnd}
                stories={stories}
            />
        </div>
    );
}

export default SingleStoriePage;