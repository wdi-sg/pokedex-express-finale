const React = require('react')
const UserForm = require('./../components/form')

class UserLogin extends React.Component {
  render() {
    return(
      <div className="container">
        <h1 className="text-center">Login</h1>
        <UserForm formPath="/users/login" />
      </div>
    )
  }
}

module.exports = UserLogin;
