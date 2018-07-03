var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
        <div className="container">
          <h2>ADD A NEWLY DISCOVERED POKEMON!</h2>
          <form className="pokemon-form" method="POST" action="/pokemon">
            <div className="pokemon-attribute">
              <input name="id" type="text" placeholder="NEW POKEMON ID"/>
            </div>
            <div className="pokemon-attribute">
              <input name="num" type="text" placeholder="NEW POKEMON NUMBER"/>
            </div>
            <div className="pokemon-attribute">
              <input name="name" type="text" placeholder="NEW POKEMON NAME"/>
            </div>
            <div className="pokemon-attribute">
              <input name="img" type="text" placeholder="POKEMON IMAGE LINK"/>
            </div>
            <div className="pokemon-attribute">
              <input name="height" type="text" placeholder="NEW POKEMON HEIGHT"/>
            </div>
            <div className="pokemon-attribute">
              <input name="weight" type="text" placeholder="NEW POKEMON WEIGHT"/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = New;

