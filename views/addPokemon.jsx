var React = require('react');
var LayoutContainer = require('./layout.jsx');

class AddPokemon extends React.Component {
  render() {
    return (
    	<LayoutContainer>
	      <div className= "container">
	      	<p></p>
			 <h1>Add Pokémon to Pokédex</h1>
				<form method="POST" action="/pokemon/new" >
				  <p>Pokémon Id: </p>
				  <input type="number" name="id" min="152"/>
				  
				  <p>Pokémon Number: </p>
				  <input type="text" name="num"/>
				  
				  <p>Pokémon Name: </p>
				  <input type="text" name="name"/>

				  <p>Pokémon Img: </p>
				  <input type="text" name="img"/>
				  
				  <p>Pokémon Weight: </p>
				  <input type="text" name="weight"/> kg
				  
				  <p>Pokémon Height: </p>
				  <input type="text" name="height"/> m
				  <p></p>
				  <input type="submit" value="Submit"/>
				</form>
	      </div>
      </LayoutContainer>
    );
  }
}

module.exports = AddPokemon;