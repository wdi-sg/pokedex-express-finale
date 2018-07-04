var React = require("react");
var Layout = require("../layout");

class Edit extends React.Component {

  render() {

    return (
      <Layout>
        <div className="container">
          <h1>Update Song</h1>
          <form
            className="update-song"
            method="POST"
            action={"/songs/" + this.props.song.id + "?_method=PUT"}
          >
            <div className="song-detail">
              title:<input
              name="id"
              type="text"
              defaultValue={this.props.song.id}
              />
            </div>
            <div className="song-detail">
              title:<input
              name="title"
              type="text"
              defaultValue={this.props.song.title}
              />
            </div>
            <div className="song-detail">
              duration:<input
              name="duration"
              type="text"
              defaultValue={this.props.song.duration}
              />
            </div>
            <div className="song-detail">
              img:<input
              name="img"
              type="img"
              defaultValue={this.props.song.img}
              />
            </div>
            <input name="submit" type="submit" value="Edit" />
            <input name="delete" type="submit" value="Delete" formAction={"/songs/"+this.props.song.id+"?_method=DELETE"} />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Edit;