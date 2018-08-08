import React, { Component } from 'react';


export default class TrainerVideo extends Component {

    render() {
        const { filename } = this.props;
        console.log(filename);
        const videoStyle = {
            background: 'rgba(255,255,255,0.3)',
            // z-index: '500',
            position: 'fixed',
            top: '0',
          };

        return (
            <video style={videoStyle} width="1000" height="800" controls loop>
                <source src={'/video/'+filename+'.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }
}