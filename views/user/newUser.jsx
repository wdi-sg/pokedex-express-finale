var React = require("react");

class Newuser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <div className="container">
          <h2>Register a New User!</h2>
          <form className="user-form" method="POST" action="/users/new">
            <div className="user-attribute">
              <input name="id" type="text" placeholder="New User Name"/>
            </div>
            <div className="user-attribute">
              <input name="email" type="text" placeholder="New User email"/>
            </div>
            <div className="user-attribute">
              <input name="password" type="password" placeholder="Password"/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Newuser;

