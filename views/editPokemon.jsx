var React = require('react');
var LayoutContainer = require('./layout.jsx');

class EditPokemon extends React.Component {
  render() {

  	let formAction = '/pokemon/' + this.props.id + '/edit?_method=PUT';

    return (
    	<LayoutContainer>
	      <div className="container">
	        <h1>Edit Pokémon</h1>
		        <form method="POST" action={formAction}>
		        <p>Id: </p>
		        <input type="number" name="id" />
		        <p>Num: </p>
		        <input type="number" name="num" />
		        <p>Name: </p>
		        <input type="text" name="name" />
		        <p>Img: </p>
		        <input type="text" name="img" />
		        <p>Weight: </p>
		        <input type="text" name="weight" />
		        <p>Height: </p>
		        <input type="text" name="height" />
		        <p></p>
		        <input type="submit" value="Submit" />
		        </form>
	      </div>
      </LayoutContainer>
    );
  }
}

module.exports = EditPokemon;