const React = require('react')

const Nav = require('./components/nav')
const Home = require('./home')

const NewUser = require('./user/new')
const Login = require('./user/login')

const NewSong = require('./song/new')
const SongIndex = require('./song/index')
const EditSong = require('./song/edit')

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
      case 'newSong':
        var currentPage = <NewSong userId={this.props.userId} />
        break;
      case 'songIndex':
        var currentPage = <SongIndex songs={this.props.songs} />
        break;
      case 'editSong':
        var currentPage = <EditSong userId={this.props.userId} song={this.props.song} />
        break;
    }

    return(
      <html>
        <head>
          <title>Spotified!</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous" />
        </head>
        <body>
          <Nav userLogin={this.props.userLogin}/>
          {currentPage}
        </body>
      </html>
    )
  }
}

module.exports = Application;
