var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Login extends React.Component {
  render() {

  	var imgUrl = '../wallpaper.jpg';

  	const loginStyle = {
  		textAlign: 'center',
	    position: 'relative',
	    backgroundImage: 'url("' + imgUrl + '")',
	    width: '100%',
	    top: '250px'
  	};

    return (
    	<LayoutContainer>
	    	<div style={loginStyle}>
	    		<div>
		    		<h1>Login to access Pokédex</h1>
		    		<p></p>
		    		<form action="/users/login" method="POST">
		    			<input name="email" type="text" placeholder="email" />
		    			<input name="password" type="text" placeholder="password"/>
		    			<input name="submit" type="submit" />
		    		</form>
	    		</div>
	    		<p></p>
	    		<div>
		    		<form className="createuser" method="GET" action='/users/new'>
	                <input type="hidden" name="createuser" />
	                <div className="buttonDiv">
	                	<input className="createuser" type="submit" value="Create User" />
		            </div>
		            </form>
       		   </div>
	    	</div>
    	</LayoutContainer>
    );

  }
}

module.exports = Login;