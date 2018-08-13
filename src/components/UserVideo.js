import React, { Component } from 'react';
import { OTSession, OTStreams, OTSubscriber } from 'opentok-react';
import Draggable from 'react-draggable';
import * as posenet from '@tensorflow-models/posenet';

const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

export default class UserVideo extends Component {
    constructor(props) {
      super(props);

      this.userVideoRef = React.createRef();

      this.state = {
        error: null,
        connection: 'Connecting',
        publishVideo: true,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
            x: -400, y: 200
        }
      };

      this.subscriberProperties = {
        preferredFrameRate: 15,
        showControls: false
      };
  
      this.sessionEventHandlers = {
        sessionConnected: () => {
          this.setState({ connection: 'Connected' });
        },
        sessionDisconnected: () => {
          this.setState({ connection: 'Disconnected' });
        },
        sessionReconnected: () => {
          this.setState({ connection: 'Reconnected' });
        },
        sessionReconnecting: () => {
          this.setState({ connection: 'Reconnecting' });
        },
      };
  
      this.subscriberEventHandlers = {
        videoEnabled: () => {
          console.log('Subscriber video enabled');
        },
        videoDisabled: () => {
          console.log('Subscriber video disabled');
        },
      };
    }

    estimatePoseOnImage = async (imageElement) => {
      // load the posenet model from a checkpoint
      const multiplier = 0.75;
      const net = await posenet.load(multiplier);
      const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);
  
      return pose;
    }
  
    onSessionError = error => {
      this.setState({ error });
    };

    onSubscribe = () => {
      console.log('Subscribe Success');
      var userVideo = this.userVideoRef.current.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[2];
      console.log('uservideo', userVideo);
      // const pose = this.estimatePoseOnImage(userVideo);
      // console.log(pose);
      // pose.then(function(value) {
      //     const result = value.keypoints;
      //     console.log(result);
      //     // const nose = result[0].position;
      //     // const leftankle = result[15].position;
      //     // const rightankle = result[16].position;
      //     // console.log(leftankle);
      //     // console.log(rightankle);
      // });
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
    
    };
  
    onSubscribeError = error => {
      this.setState({ error });
    };
  
    toggleVideo = () => {
      this.setState({ publishVideo: !this.state.publishVideo });
    };

    onStart() {
      console.log('drag start');
    }
  
    onStop() {
      console.log('drag stop');
    }

    render() {
      const { apiKey, sessionId, token } = this.props.credentials;
      const { error, connection } = this.state;
      const videoStyle = {
        // display: 'block',
        // background: 'rgba(255,255,255,0.3)',
        position: 'fixed',
        top: '58px',
        left: '0',
        right: '0',
        margin: '0 auto',
        filter: 'opacity(60%)',
        zIndex: '1',
      };
      console.log(connection);
      const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      // const {deltaPosition, controlledPosition} = this.state;

      return (
        <Draggable {...dragHandlers}>
        <div style={videoStyle} ref={this.userVideoRef}>
          {/* <div id="sessionStatus">{connection}</div> */}
          {error ? (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          ) : null}
          <OTSession
            apiKey={apiKey}
            sessionId={sessionId}
            token={token}
            onError={this.onSessionError}
            eventHandlers={this.sessionEventHandlers}
          >
            <OTStreams>
              <OTSubscriber
                properties={{ width: 720, height: 720 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
        </div>
        </Draggable>
      );
    }
}