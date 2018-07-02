var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body style={{ fontFamily: 'sans-serif'}}>
          <h1>New User Registration</h1>
          <form method="POST" action="/newuser">
          Username:<br />
            <input name="username" type="text"/>
            <br />
            Email:<br />
            <input name="email" type="email"/>
            <br />
            Password:<br />
            <input name="password" type="password"/>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
