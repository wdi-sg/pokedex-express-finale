const React = require('react')

class SongIndex extends React.Component {
  render() {
    return(
      <div className="container">
        <h4 className="text-center">Your Songs</h4>

        <ul>
          {this.props.songs.map(function(s) {
            return(
              <li><a href={"/songs/" + s.id + "/edit"}>{s.title} | {s.duration}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = SongIndex;
