var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/"+ this.props.pokemon.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              id:<input name="id" type="text" defaultValue={this.props.pokemon.id} />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.pokemon.num}
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.pokemon.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokemon.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.pokemon.weight}
              />
            </div>
            <div className="pokemon-attribute">
              candy:<input
                name="candy"
                type="text"
                defaultValue={this.props.pokemon.candy}
              />
            </div>
            <div className="pokemon-attribute">
              candy_count:<input
                name="candy_count"
                type="text"
                defaultValue={this.props.pokemon.candy_count}
              />
            </div>
            <div className="pokemon-attribute">
              egg:<input
                name="egg"
                type="text"
                defaultValue={this.props.pokemon.egg}
              />
            </div>
            <div className="pokemon-attribute">
              avg_spawns:<input
                name="avg_spawns"
                type="text"
                defaultValue={this.props.pokemon.avg_spawns}
              />
            </div>
            <div className="pokemon-attribute">
              spawn_time:<input
                name="spawn_time"
                type="text"
                defaultValue={this.props.pokemon.spawn_time}
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
