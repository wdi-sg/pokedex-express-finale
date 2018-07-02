const React = require('react')

class EditSong extends React.Component {
  render() {
    var formPath = '/songs/' + this.props.song.id + '/edit?_method=PUT'
    var deletePath = '/songs/' + this.props.song.id + '/delete?_method=DELETE'
    var title = this.props.song.title
    var duration = this.props.song.duration

    return(
      <div className="container">
        <h4 className="text-center">New Song</h4>

        <form method="POST" action={formPath}>

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="title">Song Title</label>
                <input type="text" className="form-control" name="title" placeholder="Enter Song Title" value={title} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="duration">Song Duration</label>
                <input type="text" className="form-control" name="duration" placeholder="Enter Song Duration" value={duration} />
              </div>
            </div>
          </div>

          <input type="hidden" name="user_id" value={this.props.userId} />

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        <br />

        <form method="POST" action={deletePath}>
          <div className="text-center">
            <button type="submit" className="btn btn-danger btn-sm">Delete This Song</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = EditSong;
