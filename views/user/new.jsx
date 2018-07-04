var React = require("react");
var Layout = require("../layout");

class New extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>User Registration</h1>
          <form
            className="user-form"
            method="POST"
            action="/users/create"
          >
            <div className="user-detail">
              name:<input
              name="name"
              type="text"
              />
            </div>
            <div className="user-detail">
              email:<input
              name="email"
              type="text"
              />
            </div>
            <div className="user-detail">
              password:<input
              name="password"
              type="password"
              />
            </div>
          <input name="submit" type="submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = New;