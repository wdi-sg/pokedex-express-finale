const React = require('react')
const Nav = require('./components/nav')
const Home = require('./home')
const NewUser = require('./user/new')
const Login = require('./user/login')
const Artists = require('./artist/artists')
const NewArtist = require('./artist/new')

class Application extends React.Component {
  render() {

    let page = this.props.page;

    switch(page) {
      case 'home':
        var currentPage = <Home/>
        break;
      case 'newUser':
        var currentPage = <NewUser/>
        break;
      case 'login':
        var currentPage = <Login/>
        break;
      case 'artistsIndex':
        var currentPage = <Artists artists={this.props.artists}/>
        break;
      case 'newArtist':
        var currentPage = <NewArtist/>
        break;
    }

    return(
      <html>
        <head>
          <title>Spotified!</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous" />
        </head>
        <body>
          <Nav/>
          {currentPage}
        </body>
      </html>
    )
  }
}

module.exports = Application;
