import React, { Component } from 'react';
import Header, { LoginButton } from 'components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
import './HeaderContainer.css';

class HeaderContainer extends Component {
    handleLogout = async () => {
        const { UserActions } = this.props;
        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/'; // 홈페이지로 새로고침
    }

    render() {
        const { visible, user } = this.props;
        const usernameStyle = {
            color: '#15aabf'
        }
        if (!visible) return null;
        console.log("render Header");
        
        return (
            <Header>
                { user.get('logged') 
                    ? (<div style={usernameStyle}>
                        <b>Hello, {user.getIn(['loggedInfo', 'username'])}</b>
                        <button id="LogoutButton" onClick={this.handleLogout}>Logout</button>
                    </div> )
                    : <LoginButton/> 
                }
            </Header>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);