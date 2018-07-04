var React = require('react');

class newForm extends React.Component {
    render() {
        return (
                <div className="newFormContainer">
                    <form method="POST" action="/users">
                        <h1>Create New Pokemon Account</h1>
                        <div>
                            <label className="formLabel">Username</label>
                            <input type="text" name="name" placeholder="username"/>
                        </div>
                        <div>
                            <label className="formLabel">Email</label>
                            <input type="text" name="email" placeholder="email" />
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
module.exports = newForm;
