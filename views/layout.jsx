var React = require("react");

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous"/>
          <link rel="stylesheet" type="text/css" href="/style.css" />
        </head>
        <body>
          <nav>
            <ul>
              <li>
                <a href="/users/new">User Registration</a>
              </li>
              <li>
                <a href="/users/login">User Login</a>
              </li>
              <li>
                <a href="/users/logout">User Logout</a>    
              </li>
            </ul>
            <ul>
              <li>
                <a href="/songs">All Songs</a>
              </li>
              <li>
                <a href="/songs/new">New Song</a>
              </li>
            </ul>
          </nav>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Layout;