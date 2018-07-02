var React = require('react');

const bodyStyle={
    backgroundColor : '#b5d6ff'
}

class LayoutContainer extends React.Component {
  render() {
    return (
        <html>
            <head>
                <title>Welcome To Pokedex!</title>
                <link href="https://fonts.googleapis.com/css?family=Comfortaa|Montserra|Pacifico" rel="stylesheet"/>
            </head>
            <body style={bodyStyle}>
                {this.props.children}
            </body>
        </html>
   		);
 	}
}
module.exports = LayoutContainer;
