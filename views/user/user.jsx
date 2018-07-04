var React = require("react");

class userList extends React.Component {
  render() {
    return (
      <html>
        <title>User Profile</title>
        <head />
        <body>
          <div>
          <h1>User : {this.props.user.name}</h1>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                Id: {this.props.user.id}
              </li>
              <li className="pokemon-attribute">
                Name: {this.props.user.name}
              </li>
              <li className="pokemon-attribute">
                Email: {this.props.user.email}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = userList;