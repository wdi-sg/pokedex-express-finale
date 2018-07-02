var React = require("react");
var LayoutContainer = require('./layouts/main.jsx');

const h1Style = {
  textAlign: 'center',
  color: '#ffb623',
  fontFamily: "'Pacifico', cursive"
};
const container = {
  display: 'flex',
  justifyContent: 'center',

}
const submitStyle = {
  display: 'block',
  margin: '10px auto',
  width: '100px',
  color: '#ff7664',
  background: '#08ff18',
  borderRadius: '10px'
}

const formWordStyle = {
  fontFamily: "'Comfortaa', cursive",
}

const paddingStyle = {
  padding: '10px',
  textAlign: 'center',
  size: '35'
}
const inputStyle = {
  textAlign:'center',
  opacity: '0.8'
}

class Edit extends React.Component {
  render() {
    return (
      <LayoutContainer>
        <h1 style={h1Style}> Editing : {this.props.pokemon.name}</h1>
            <div style={container}>
            <form
              style={formWordStyle}
              className="pokemon-form"
              method="POST"
              action={"/pokemon/"+ this.props.pokemon.id + "?_method=PUT"}>
              <div className="pokemon-attribute" style={paddingStyle}>
                Id: <br/><input
                style={inputStyle}
                size='35'
                name="id" 
                type="text" 
                defaultValue={this.props.pokemon.id}
                />
              </div>
              <div className="pokemon-attribute" style={paddingStyle}>
                Num: <br/><input
                  style={inputStyle}
                  size='35'
                  name="num"
                  type="text"
                  defaultValue={this.props.pokemon.num}
                />
              </div>
              <div className="pokemon-attribute" style={paddingStyle}>
                Pokemon : <br/><input
                  style={inputStyle}
                  size='35'
                  name="name"
                  type="text"
                  defaultValue={this.props.pokemon.name}
                />
              </div>
              <div className="pokemon-attribute" style={paddingStyle}>
                Image Link: <br/><input
                  style={inputStyle}
                  size='35'
                  name="img"
                  type="text"
                  defaultValue={this.props.pokemon.img}
                />
              </div>
              <div className="pokemon-attribute" style={paddingStyle}>
                Height: <br/><input
                  style={inputStyle}
                  size='35'
                  name="height"
                  type="text"
                  defaultValue={this.props.pokemon.height}
                />
              </div>
              <div className="pokemon-attribute" style={paddingStyle}>
                Weight: <br/><input
                  style={inputStyle}
                  size='35'
                  name="weight"
                  type="text"
                  defaultValue={this.props.pokemon.weight}
                />
              </div>
              <button name="edit" type="submit" style={submitStyle}>Edit</button>
          </form>
          </div>
      </LayoutContainer>  
    );
  }
}

module.exports = Edit;



  // <div className="pokemon-attribute">
  //               candy:<input
  //                 name="candy"
  //                 type="text"
  //                 defaultValue={this.props.pokemon.candy}
  //               />
  //             </div>
              
  //             <div className="pokemon-attribute">
  //             <div>
  //               candy_count:<input
  //                 name="candy_count"
  //                 type="text"
  //                 defaultValue={this.props.pokemon.candy_count}
  //               />
  //             </div>
  //             <div className="pokemon-attribute">
  //               egg:<input
  //                 name="egg"
  //                 type="text"
  //                 defaultValue={this.props.pokemon.egg}
  //               />
  //             </div>
  //             <div className="pokemon-attribute">
  //               avg_spawns:<input
  //                 name="avg_spawns"
  //                 type="text"
  //                 defaultValue={this.props.pokemon.avg_spawns}
  //               />
  //             </div>
  //             <div className="pokemon-attribute">
  //               spawn_time:<input
  //                 name="spawn_time"
  //                 type="text"
  //                 defaultValue={this.props.pokemon.spawn_time}
  //               />
  //             </div>
  //           </div>

