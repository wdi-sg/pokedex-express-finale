
var React = require('react');

class loginForm extends React.Component {
    render() {
        return (
                <div className="newFormContainer">
                <title>Login Form</title>
                    <form method="POST" action="/users/login">
                        <h1>Login</h1>
                        <div>
                            <label className="formLabel">Email</label>
                            <input type="text" name="name" placeholder="email"/>
                        </div>
                        <div>
                            <label className="formLabel">Password</label>
                            <input type="password" name="password" placeholder="password" />
                        </div>
                        <div>
                            <input className="submitButton" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
        )
    }
}
module.exports = loginForm;

