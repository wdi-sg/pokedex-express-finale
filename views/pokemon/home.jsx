var React = require("react");
var defaultlayout = require('defaultLayout');

const h1Style = {
  color: '#aaa',
  fontSize: '50px',
  textAlign: 'center'
}

class Home extends React.Component {
  render() {
    console.log(this);
    return (
      // <html>
      //   <head >
      //   <body>
      <defaultlayout title={this.props.title}>
         <h1 style={h1Style}>Welcome to Pokedex</h1>
         <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
      </defaultlayout>

      //   </body>
      // </html>
    );
  }
}

module.exports = Home;
