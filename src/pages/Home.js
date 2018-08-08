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
    // renderApp = (credentials) => {
    //     ReactDOM.render(
    //       <App credentials={credentials} />,
    //       document.getElementById('root')
    //     );
    //   }

    render() {
        const { user } = this.props;
        const username = user.getIn(['loggedInfo', 'username']);
        console.log('render Home');
        // console.log("logged: "+ user.get('logged'));
        // console.log(user.getIn(['loggedInfo', 'username']));

        return (
            <div className="Home">
                { user.get('logged') 
                ? (<div id="videos">
                <h1> { username }</h1>
                <VideoButton1 />
                <VideoButton2 />
                <VideoButton3 />
                <VideoButton4 />

                </div>)
                : (<div>
                    <p className="Home-txt">InVideo</p>
                    <p className="Home-subtxt">Be in the videos</p>
                    <img src={startImg} className="startImg" alt="InVideo"/>
                </div>)
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
)(Home);