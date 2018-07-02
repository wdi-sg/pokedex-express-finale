const React = require('react');

class NewArtist extends React.Component {
  render() {
    return(
      <div className="container">

        <h1 className="text-center">New Artist</h1>

        <form action="/artists/new" method="POST">
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <label for="artist-name">Arists Name</label>
              <input type="text" className="form-control" placeholder="Artist Name" name="name" />
            </div>
          </div>

          <br/>

          <div className="text-center">
            <input type="submit" className="btn btn-primary btn-md" />
          </div>
        </form>

      </div>
    )
  }
}


module.exports = NewArtist;
