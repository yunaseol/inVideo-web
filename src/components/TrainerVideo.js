import React, { Component } from 'react';
import * as posenet from '@tensorflow-models/posenet';

const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

export default class TrainerVideo extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    estimatePoseOnImage = async (imageElement) => {
        // load the posenet model from a checkpoint
        const multiplier = 0.75;
        const net = await posenet.load(multiplier);
        const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);
    
        return pose;
    }

    componentDidMount() {
        var trainerVideo = this.myRef.current;

        const pose = this.estimatePoseOnImage(trainerVideo);
        pose.then(function(value) {
            const result = value.keypoints;
            console.log(result);
            // const nose = result[0].position;
            // const leftankle = result[15].position;
            // const rightankle = result[16].position;
            // console.log(leftankle);
            // console.log(rightankle);
        });
        // setInterval(() => {
        //     const pose = this.estimatePoseOnImage(trainerVideo);
        //     console.log(pose);
        //     pose.then(function(value) {
        //         const result = value.keypoints;
        //         console.log(result);
        //         // const nose = result[0].position;
        //         // const leftankle = result[15].position;
        //         // const rightankle = result[16].position;
        //         // console.log(leftankle);
        //         // console.log(rightankle);
        //     });
        // }, 1000);
        
    }

    render() {
        const { filename } = this.props;
        const videoStyle = {
            // display: 'block',
            // background: 'rgba(255,255,255,0.3)',
            position: 'fixed',
            top: '58px',
            left: '0',
            right: '0',
            filter: 'opacity(60%)',
            margin: '0 auto'
          };

        return (
            <video ref={this.myRef} style={videoStyle} width="720" height="720" autoPlay loop>
                <source src={'/video/' + filename + '.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }
}