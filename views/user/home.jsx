var React = require("react");
var Layout = require("../layout");

class Home extends React.Component {
  render() {

    return (
      <Layout>
        <div className="container">
          <h1>Welcome to Actify!</h1>
        </div>
        <script src="home.js"></script>
      </Layout>
    );
    
  }
}

module.exports = Home;