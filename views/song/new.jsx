var React = require("react");
var Layout = require("../layout");

class New extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>New Song</h1>
          <form
            className="new-song"
            method="POST"
            action="/songs/all"
          >
            <div className="song-detail">
              title:<input
              name="title"
              type="text"
              />
            </div>
            <div className="song-detail">
              duration:<input
              name="duration"
              type="text"
              />
            </div>
            <div className="song-detail">
              img:<input
              name="img"
              type="img"
              />
            </div>
          <input name="submit" type="submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = New;