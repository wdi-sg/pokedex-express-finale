var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Login extends React.Component {
	render() {
		return(
			<LayoutContainer>
			  <div>
			   <h4>User Login</h4>
			   <form method= 'POST' action= '/users/login'>
			    <input name= 'email' type= 'text' placeholder= 'enter email'/><br/>
			    <input name= 'password' type= 'password' placeholder= 'enter password' /><br/><br/>
			    <input name= 'submit' type= 'submit' value='Login'/>
			   </form>
			  </div>
			</LayoutContainer>
		);
	};
};

module.exports = Login;