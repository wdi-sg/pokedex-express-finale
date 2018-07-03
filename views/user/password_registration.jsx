var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h4>Registration</h4>
    			<form action ="/users/new" method='POST'>
    				<input name="email" type='text' placeholder='email'/>
    				<input name="password" type='text' placeholder='password'/>
    				<input name="submit" type='submit'/>
          </form>
        </body>
      </html>
    );
  };
};

module.exports = Edit;