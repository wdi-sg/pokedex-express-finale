var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h4>Welcome to Home page</h4>
          <form action ="/users/exist" method='POST'>
            <input name="email" type='text' placeholder='email'/>
            <input name="password" type='text' placeholder='password'/>
            <button name="submit" type='submit'>Login</button>
          </form>
          <form action ="/users/create" method='GET'>
            <button name="signup" type='submit'>Create an account</button>
          </form>
        </body>
      </html>
    );
  };
};

module.exports = Home;