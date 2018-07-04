var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <title>Pokemon</title>
        <head />
        <body>
          <div>
          <h1>Pokemon : {this.props.pokemon.name}</h1>
          <img src ={this.props.pokemon.img}/>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                num: {this.props.pokemon.num}
              </li>
              <li className="pokemon-attribute">
                name: {this.props.pokemon.name}
              </li>
              <li className="pokemon-attribute">
                img: {this.props.pokemon.img}
              </li>
              <li className="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>
            </ul>
              <form method="POST" action="/pokemons/{this.props.pokemon.id}?_method=DELETE">
              <input type="submit" name="delete" value="Delete" />
              </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;