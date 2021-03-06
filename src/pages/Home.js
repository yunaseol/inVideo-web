import React, { Component } from 'react';
import * as userActions from 'redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import startImg from 'startImg.jpeg'
import './Home.css';
import { VideoButton1, VideoButton2, VideoButton3, VideoButton4 } from 'components/Main'
import '@opentok/client';
// import './polyfills';

class Home extends Component {

    render() {
        const { user } = this.props;
        // console.log('render Home');

        return (
            <div className="Home">
                { user.get('logged') 
                ? (<div className="Home-buttons blackbg">
                <p><VideoButton1 /></p>
                <p><VideoButton2 /></p>
                <p><VideoButton3 /></p>
                <p><VideoButton4 /></p>

                </div>)
                : (<div>
                    <div className="Home-txt blackbg">InVideo</div>
                    <p className="Home-subtxt">Be in the videos</p>
                </div>)
                }
                <img src={startImg} className="startImg" alt="InVideo"/>
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
)(Home);