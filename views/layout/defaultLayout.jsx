var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

module.exports = DefaultLayout;





// class HelloMessage extends React.Component {
//   render() {
//     return (
//       <DefaultLayout title={this.props.name}>

//         <div>Hello {this.props.name}</div>

//       </DefaultLayout>
//     );
//   }
// }
