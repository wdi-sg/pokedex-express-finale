var React = require('react');

class LayoutContainer extends React.Component {
	render() {
		return(
			<html>
				<head>
					{/*<link rel= 'stylesheet' type= 'text/css' href= './style.css'>*/}
					<title>Welcome to Pokedex</title>
				</head>
				<body>
					{this.props.children}
				</body>
			</html>
		)
	}
}

module.exports = LayoutContainer;