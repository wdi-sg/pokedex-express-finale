var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this);
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
