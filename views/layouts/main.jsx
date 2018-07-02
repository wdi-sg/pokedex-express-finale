var React = require('react');

class FlashError extends React.Component {
    render() {
        if (this.props.messages) {
            let errorMsgs = this.props.messages.error;

            if (errorMsgs) {
                return <div className="errorFlashMessage">{errorMsgs[0]}</div>
            } else {
                return <div className="errorFlashMessage"></div>
            }
        } else {
            return <div className="errorFlashMessage"></div>
        }
    }
}

class FlashInfo extends React.Component {
    render() {
        if (this.props.messages) {
            let infoMsgs = this.props.messages.info;

            if (infoMsgs) {
                return <div className="infoFlashMessage">{infoMsgs[0]}</div>
            } else {
                return <div className="infoFlashMessage"></div>
            }
        } else {
            return <div className="infoFlashMessage"></div>
        }
    }
}

class FlashSuccess extends React.Component {
    render() {
        if (this.props.messages) {
            let successMsgs = this.props.messages.success;

            if (successMsgs) {
                return <div className="successFlashMessage">{successMsgs[0]}</div>
            } else {
                return <div className="successFlashMessage"></div>
            }
        } else {
            return <div className="successFlashMessage"></div>
        }
    }
}

class LayoutContainer extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Welcome To Pokedex!</title>
                    <link rel="stylesheet" href="/css/styles.css" />
                </head>
                <body>
                    <FlashError messages={this.props.messages}/>
                    <FlashInfo messages={this.props.messages}/>
                    <FlashSuccess messages={this.props.messages}/>
                    {this.props.children}
                </body>
            </html>
        );
    }
}

module.exports = LayoutContainer;