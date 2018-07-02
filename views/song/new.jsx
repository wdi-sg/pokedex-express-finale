const React = require('react')

class NewSong extends React.Component {
  render() {
    return(
      <div className="container">
        <h4 className="text-center">New Song</h4>

        <form method="POST" action="/songs/new">

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="title">Song Title</label>
                <input type="text" className="form-control" name="title" placeholder="Enter Song Title" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="duration">Song Duration</label>
                <input type="text" className="form-control" name="duration" placeholder="Enter Song Duration" />
              </div>
            </div>
          </div>

          <input type="hidden" name="user_id" value={this.props.userId} />

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = NewSong;
