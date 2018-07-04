var React = require("react");
var Layout = require("../layout");

class Login extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>Login</h1>
          <form
            className="login-form"
            method="GET"
            action="/users"
          >
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
        <script src="/hello.js"></script>
      </Layout>
    );
  }
}

module.exports = Login;