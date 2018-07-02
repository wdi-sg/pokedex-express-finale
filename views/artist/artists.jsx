const React = require('react');
const IndividualArtists = require('./../components/individual_artists')

class Artists extends React.Component {
  render() {
    return(
      <div className="container">

        <h4 className="text-center">List of Artists</h4>
        <ul>
          {this.props.artists.map(function(a) {
            return(
              <IndividualArtists artistsName={a.name}/>
            )
          })}
        </ul>

      </div>
    )
  }
}

module.exports = Artists;
