const React = require('react')

class Nav extends React.Component {
  render(){

    const userIsLoggedIn = this.props.userLogin

    return(
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users/new">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users/login">Log In</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users/logout">Log Out</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/artists">Artist Index</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/artists/new">New Artist</a>
        </li>
      </ul>
    )
  }
}

module.exports = Nav;
