import React, { Component } from 'react';
import startImg from 'startImg.jpeg'
import './Home.css';

class Home extends Component {
    render() {
        // const { user } = this.props;

        return (
            <div className="Home">
                <p className="Home-txt">InVideo</p>
                <p className="Home-subtxt">Be in the videos</p>
                <img src={startImg} className="startImg" alt="InVideo"/>
                <div id="videos">
                    <div id="subscriber"></div>
                    <div id="publisher"></div>
                </div>
                {/* { user.get('logged') 
                    ? (<div className="StartPage">
                        logged in
                        </div>)
                    : <div>no</div>
                } */}
            </div>

        );
    }
}

export default Home;