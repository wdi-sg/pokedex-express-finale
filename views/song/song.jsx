var React = require("react");
var Layout = require("../layout");

class Song extends React.Component {
  render() {

    if (this.props.song === undefined) {

      return (

        <Layout>
          <div className="container">
            <h1>Sorry no such title!</h1>
          </div>
        </Layout>

      );

    } else {

      return (

        <Layout>
          <div className="container">
            <h1>{this.props.song.title}</h1>
            <ul>
              <li>ID: {this.props.song.id}</li>
              <li>Duration: {this.props.song.duration}</li>
              <li>Img: {this.props.song.img}</li>
            </ul>
            <ul>
              <li><a href={"/songs/"+this.props.song.id+"/edit"}>Update</a></li>
              <li><a href="/songs">Back</a></li>
            </ul>
          </div>
        </Layout>

      );

    }

    
  }
}

module.exports = Song;