import React, { Component } from 'react';
import * as userActions from 'redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '@opentok/client';
import UserVideo from 'components/UserVideo';
import TrainerVideo from 'components/TrainerVideo';
import './Video.css';

import {
  SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from 'config';

class Video extends Component {

    render() {
        const { filename } = this.props.match.params;
        const credentials = {
            apiKey: API_KEY,
            sessionId: SESSION_ID,
            token: TOKEN,
        };
        console.log('render Video');

        return (
            <div className="Home">
                { (API_KEY && TOKEN && SESSION_ID)
                ? (<div>
                    <UserVideo credentials={ credentials } />
                    <TrainerVideo filename={ filename } />
                    </div>)
                : (<div>no API KEY</div>)
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Video);