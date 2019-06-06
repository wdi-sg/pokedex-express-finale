var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Register extends React.Component {
	render() {
		return(
			<LayoutContainer>
			  <div>
			   <h4>Creating New User</h4>
			   <form method= 'POST' action= '/users/new'>
			    <input name= 'email' type= 'text' placeholder= 'enter email'/><br/>
			    <input name= 'password' type= 'password' placeholder= 'enter password' /><br/>
			    <input name= 'submit' type= 'submit' value='Create User'/>
			   </form>
			  </div>
			</LayoutContainer>
		);
	};
};

module.exports = Register;