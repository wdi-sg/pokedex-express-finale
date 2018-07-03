var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Logging in.</h4>
          <form className="user-form" method="POST" action={"/users/login"}
          >
            <div className="user-info">
              email:<input name="email" type="text" placeholder="email"/>
            </div>

            <div className="user-info">
              password:<input name="password" type="text" placeholder="password"/>
            </div>

            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;