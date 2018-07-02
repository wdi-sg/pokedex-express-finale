var React = require('react');
var LayoutContainer = require('./layouts/main.jsx');

class NewUserForm extends React.Component {
    render() {
        return (
            <LayoutContainer>
                <div className="newFormContainer">
                    <form method="POST" action="/user">
                        <h1>Please choose your username and password:</h1>
                        <div>
                            <label className="formLabel">Username</label>
                            <input className="formInput" type="text" name="username" />
                        </div>
                        <div>
                            <label className="formLabel">Password</label>
                            <input className="formInput" type="password" name="password" />
                        </div>
                        <div>
                            <input className="submitButton" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </LayoutContainer>
        )
    }
}
module.exports = NewUserForm;