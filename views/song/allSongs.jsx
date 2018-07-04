var React = require("react");
var Layout = require("../layout");

class AllSongs extends React.Component {
  render() {

    let songs = this.props.songs.map(song => {

      return (

        <tr key={song.id.toString()}>
          <td>{song.id}</td>
          <td>
            <a href={"/songs/" + song.id}>{song.title}</a>
          </td>
        </tr>

      )

    });

    return (
      <Layout>
        <div className="container">
          <h1>Songs</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
            {songs}
          </table>
        </div>
      </Layout>
    );
  }
}

module.exports = AllSongs;