const React = require('react')

class UserForm extends React.Component {
  render() {

    let formPath = this.props.formPath

    return(
        <form method="POST" action={formPath}>

          {this.props.formPage === "login" &&
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" className="form-control" placeholder="Username" name="name" />
              </div>
            </div>
          </div>}

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="email">Email address</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" placeholder="Password" name="password" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
    )
  }
}

module.exports = UserForm;
