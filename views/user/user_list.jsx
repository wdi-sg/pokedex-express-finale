var React = require("react");

class UserList extends React.Component {
  render() {
    console.log(this);
    return (
      <html>
        <head />
        <body>
          <h1>Your Pokedex</h1>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
          <form method= 'POST' action= '/users/logout?_method=DELETE'>
          <input name= 'submit' type= 'submit' value='Logout'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = UserList;
