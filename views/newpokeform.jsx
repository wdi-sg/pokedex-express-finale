var React = require('react');
var LayoutContainer = require('./layouts/main.jsx');

class NewPokeForm extends React.Component {
    render() {
        return (
            <LayoutContainer>
                <div className="newFormContainer">
                    <form method="POST" action="/pokemon">
                        <h1>What pokemon do you want to create?</h1>
                        <div>
                            <label className="formLabel">Name</label>
                            <input className="formInput" type="text" name="name" />
                        </div>
                        <div>
                            <label className="formLabel">Image</label>
                            <input className="formInput" type="text" name="img" />
                        </div>
                        <div>
                            <label className="formLabel">Height</label>
                            <input className="formInput" type="text" name="height" />
                        </div>
                        <div>
                            <label className="formLabel">Weight</label>
                            <input className="formInput" type="text" name="weight" />
                        </div>
                        <div>
                            <input className="submitButton" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </LayoutContainer>
        )
    }
}
module.exports = NewPokeForm;