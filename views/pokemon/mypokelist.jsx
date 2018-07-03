var React = require("react");
var LayoutContainer = require('./layouts/main.jsx');

const titleStyle = {
  textAlign: 'center',
  color: '#ffb623',
  fontFamily: "'Pacifico', cursive",
  fontSize: '60px'
}

const info = {
  listStyleType: 'none',
  display: 'inline-block',
  background: 'cover'
  }

const centerinfo = {
  position: 'relative',
  float: 'left',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display:'inline-block'
}

const text = {
  textAlign: 'center',
  fontFamily: "'Montserrat', sans-serif"
}

const button = {
  background: 'green',
  height: '20px',
  width: '55px',
  textAlign: 'center',
  borderRadius: '7px',
  margin: '2px'
}

const inlineStyle = {
  display: 'inline-block',
  width: '100%',
  height: '100vh',
  textAlign: 'center'

}

class Home extends React.Component {
  render() {
    return (
      <LayoutContainer>
      <h1 style={titleStyle}>Your Pokemons</h1>
      <form style={inlineStyle}> 
      <div>
          <ul>
            {this.props.pokemon.map(pokemon => (
            	<div>
	              	<li key={pokemon.id} style={info}>
	                  <img src={pokemon.img}/>
	                  <p style={text}>{pokemon.name}</p>
	                  <p style={text}>{pokemon.num}</p>
	 				</li>
 				</div>
            ))}
          	</ul>
          </div>
        </form>
      </LayoutContainer>
    );
  }
}

module.exports = Home;