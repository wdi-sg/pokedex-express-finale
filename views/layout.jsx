var React = require('react');

class LayoutContainer extends React.Component {
  render() {

    // var imgUrl = 'wallpaper.jpg';

    // const bodyStyle = {
    //   backgroundImage: 'url("' + imgUrl + '")',
    //   minheight: '100%',
    //   minwidth: '1024px',
    //   width: '100%',
    //   height: 'auto',
    //   top: '0',
    //   left: '0'
    // }

  	return ( 
      <html>
  		  <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />
    			<title>Pokedex!</title>   
  		</head>
  		<body>
  			{this.props.children}
  		</body>
  	</html> );

  }
}

module.exports = LayoutContainer;