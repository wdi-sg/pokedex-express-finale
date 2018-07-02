var React = require('react');
var LayoutContainer = require('./layouts/main.jsx');

class Home extends React.Component {
    render() {
        return (
            <LayoutContainer messages={this.props.messages}>
                <h1>Welcome To Pokedex!</h1>
                <div className="formDiv">
                    <p className="registerMsg">Please register or sign in to continue using Pokedex.</p>

                    <div className="userSection">
                            <form className="sortform" method="GET" action="/user/new">
                                <div className="buttonDiv">
                                    <input className="createUser" type="submit" value="Register" />
                                </div>
                            </form>
                            <form className="sortform" method="GET" action="/signin">
                                <div className="buttonDiv">
                                    <input className="signInButton" type="submit" value="Sign In" />
                                </div>
                            </form>
                    </div>
                </div>
                <div class="welcomeImg"></div>
            </LayoutContainer>
        );
    }
}

module.exports = Home;