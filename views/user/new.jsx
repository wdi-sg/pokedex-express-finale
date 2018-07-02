const React = require('react')
const UserForm = require('./../components/form')

class NewUser extends React.Component {
  render() {
    return(
      <div className="container">
        <h1 className="text-center">New User</h1>
        <UserForm formPath="/users/new" formPage="login" />
      </div>
    )
  }
}

module.exports = NewUser;
