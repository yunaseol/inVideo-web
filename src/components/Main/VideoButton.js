import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';

const VideoButton = styled(Link)`
    font-weight: 600;
    color: white;
    border: 3px solid white;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    margin: 1rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;

    &:hover {
        background: white;
        color: black;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const VideoButton1 = () => (
    <VideoButton to="/video/basicsquat-crop">
        Basic Squats
    </VideoButton>
);
const VideoButton2 = () => (
    <VideoButton to="/video/pliesquat">
        Plié Squats
    </VideoButton>
);
const VideoButton3 = () => (
    <VideoButton to="/video/squatlegraise">
        Squats + Leg Raises
    </VideoButton>
);
const VideoButton4 = () => (
    <VideoButton to="/video/roundaboutsquat">
        Roundabout Squats
    </VideoButton>
);


export { VideoButton1, VideoButton2, VideoButton3, VideoButton4 };