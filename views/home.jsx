var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          {this.props.loggedIn != undefined &&
            // show logout 
          <div>
            <p>Welcome Back {this.props.username}</p>
            // show welcome 
              <form method="POST" action="/users/logout?_method=DELETE">
                <input type="submit" name="logout" value="Logout" />
              </form>
          </div>
          }

          {this.props.loggedOut == undefined &&
            // show login
            // show create user
          <div>
            <p>FUCK THIS</p> 
            <form method="GET" action="/users/login">
              <input type="submit" value="Login" />
            </form>
          </div>
          }

         <form action="/" method="get">
         </form>
          <h1>Pokedex YASSSSSS!</h1>

          <a href="/pokemon/new">Create a Pokemon</a>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <div key={pokemon.id}>
              <p><img src={pokemon.img}/></p>
              <a href={'/pokemons/' + pokemon.num}>{pokemon.name}</a>
              <p>Id : {pokemon.id}</p>
              <p>Num : {pokemon.num}</p>
              <p>Height : {pokemon.height}</p>
              <p>Weight : {pokemon.weight}</p>
              </div>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
