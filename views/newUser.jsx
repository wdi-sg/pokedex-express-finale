var React = require('react');
var LayoutContainer = require('./layout.jsx');

class NewUser extends React.Component {
  render() {

  	const newUserStyle = {
  		textAlign: 'center',
	    top: '250px',
	    position: 'relative'
  	};

    return (
    	<LayoutContainer>
	    	<div style={newUserStyle}>
	    		<h1>Create New User</h1>
	    		<form action="/users/new" method="POST">
	    			<input name="email" type="text" placeholder="email" />
	    			<input name="password" type="text" placeholder="password"/>
	    			<input name="submit" type="submit" />
	    		</form>
	    	</div>
    	</LayoutContainer>
    );

  }
}

module.exports = NewUser;