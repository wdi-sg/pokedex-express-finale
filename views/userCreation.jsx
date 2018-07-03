var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Create an account.</h4>
          <form className="user-form" method="POST" action={"/users/new"}
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

module.exports = Register;