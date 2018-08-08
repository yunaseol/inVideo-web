import React, { Component } from 'react';
import { OTSession, OTStreams, OTSubscriber } from 'opentok-react';

export default class UserVideo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        error: null,
        connection: 'Connecting',
        publishVideo: true,
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
  
      this.publisherEventHandlers = {
        accessDenied: () => {
          console.log('User denied access to media source');
        },
        streamCreated: () => {
          console.log('Publisher stream created');
        },
        streamDestroyed: ({ reason }) => {
          console.log(`Publisher stream destroyed because: ${reason}`);
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
  
    onSessionError = error => {
      this.setState({ error });
    };
  
    onPublish = () => {
      console.log('Publish Success');
    };
  
    onPublishError = error => {
      this.setState({ error });
    };
  
    onSubscribe = () => {
      console.log('Subscribe Success');
    };
  
    onSubscribeError = error => {
      this.setState({ error });
    };
  
    toggleVideo = () => {
      this.setState({ publishVideo: !this.state.publishVideo });
    };
  
    render() {
      const { apiKey, sessionId, token } = this.props.credentials;
      const { error, connection, publishVideo } = this.state;
      return (
        <div>
          <div id="sessionStatus">Session Status: {connection}</div>
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
            <button id="videoButton" onClick={this.toggleVideo}>
              {publishVideo ? 'Disable' : 'Enable'} Video
            </button>
            <OTStreams>
              <OTSubscriber
                properties={{ width: 800, height: 600 }}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
        </div>
      );
    }
}