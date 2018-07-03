var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
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
              <li className="pokemon-attribute">
                candy: {this.props.pokemon.candy}
              </li>
              <li className="pokemon-attribute">
                candy_count: {this.props.pokemon.candy_count}
              </li>
              <li className="pokemon-attribute">
                egg: {this.props.pokemon.egg}
              </li>
              <li className="pokemon-attribute">
                avg_spawns: {this.props.pokemon.avg_spawns}
              </li>
              <li className="pokemon-attribute">
                spawn_time: {this.props.pokemon.spawn_time}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
