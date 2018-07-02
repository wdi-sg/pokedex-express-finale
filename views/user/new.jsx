var React = require('react');

class newForm extends React.Component {
    render(){
        return (
            <html>
                <head></head>
                <body>
                    <form method='POST' action='/users/new'>
                        <input name='username' type='text' placeholder="username"></input>
                        <input name='password' type='password' placeholder="password"></input>
                        <input name='submit' type='submit' />
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = newForm;