var React = require("react");
var LayoutContainer = require('./layouts/main.jsx');


const titleStyle = {
  textAlign: 'center',
  color: '#ffb623',
  fontFamily: "'Pacifico', cursive",
  fontSize: '60px',
  display: 'block'
}

const formStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const info = {
  listStyleType: 'none',
  display: 'inline-block',
  background: 'cover',
  padding: '10px 10px 10px'
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

const mybutton = {
  background: 'white',
  height: '20px',
  width: '100px',
  textAlign: 'center',
  borderRadius: '7px',
  display: 'flex',
  justifyContent: 'center'
}

const imgStyle = {
  display: 'block',
  margin: '0 auto'
}

const divStyle = {
  marginTop: '5px',
}

const inlineStyle = {
  display: 'inline-block',

}
const ulStyle = {
  marginTop: '150px',
  padding: '20px 20px 20px 20px',
  textAlign: 'center'

}
class Home extends React.Component {
  render() {
    return (
      <LayoutContainer>
        <div>
        <h1 style={titleStyle}>Welcome to Pokedex</h1>
        </div>
        <div>
          <form style={formStyle}
          method="GET"
          action={"/mypokelist"}>
          <button style={mybutton}>My Pokemons</button>
        </form>
        </div>
        <div>    
          <ul style={ulStyle}>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id} style={info}>
                <div style={centerinfo}>
                  <img style={imgStyle} src={pokemon.img}/>
                  <p style={text}>{pokemon.name}</p>
                  <p style={text}>{pokemon.num}</p>
                  
                  <div>
                    <form
                    style={inlineStyle}
                    method="GET"
                    action={"/pokemon/"+ pokemon.id + "/edit"}>
                      <button style={button}>Edit</button>
                    </form>
                    <form
                    style={inlineStyle}
                    method="POST"
                    action={"/pokemon/"+ pokemon.id + "?_method=DELETE"}>
                      <button style={button}>Delete</button>
                    </form>
                    <form
                    style={inlineStyle}
                    method="POST"
                    action={"/pokemon/add/"+ pokemon.id}>
                      <button style={button}>Add</button>
                    </form>  
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </LayoutContainer>
    );
  }
}

module.exports = Home;
