const React = require('react')

class Nav extends React.Component {
  render(){

    const userIsLoggedIn = this.props.userLogin

    return(
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>

        {userIsLoggedIn == undefined &&
        <li className="nav-item">
          <a className="nav-link" href="/users/new">Register</a>
        </li>}

        {userIsLoggedIn == undefined &&
          <li className="nav-item">
            <a className="nav-link" href="/users/login">Log In</a>
          </li>}

        {userIsLoggedIn != undefined &&
          <li className="nav-item">
            <a className="nav-link" href="/songs/new">New Song</a>
          </li>}

        {userIsLoggedIn != undefined &&
          <li className="nav-item">
            <a className="nav-link" href="/songs">All Songs</a>
          </li>}

        {userIsLoggedIn != undefined &&
          <li className="nav-item">
            <a className="nav-link" href="/users/logout">Log Out</a>
          </li>}
      </ul>
    )
  }
}

module.exports = Nav;
