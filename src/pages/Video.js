import React, { Component } from 'react';
import UserVideo from 'components/UserVideo';
import TrainerVideo from 'components/TrainerVideo';

import * as userActions from 'redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '@opentok/client';

class Video extends Component {
    constructor(props) {
        super(props);
        console.log('user', props.user);
        this.credentials = props.user.getIn(['loggedInfo', 'credentials']);
        console.log('credentials', this.credentials);
    }

    render() {
        const { filename } = this.props.match.params;
        console.log('render Video');

        return (
            <div>
                { (this.credentials)
                ? (<div >
                    <TrainerVideo filename={ filename } />
                    <UserVideo credentials={ this.credentials } />
                    </div>)
                : (<div>no credentials</div>)
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
