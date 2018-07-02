const React = require('react')

class IndividualArtists extends React.Component {
  render() {
    let artistName = this.props.artistsName

    return(
      <li>{artistName}</li>
    )
  }
}

module.exports = IndividualArtists;
