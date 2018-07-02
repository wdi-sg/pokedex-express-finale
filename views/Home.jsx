var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body style={{ fontFamily: 'sans-serif'}}>
          <h1>Welcome to Pokedex</h1>
          <div>
          {this.props.trainer.map(trainer => (
          <div>
            <p>{trainer.first_name}</p>
            <p>{trainer.email}</p>
          </div>
          ))}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
