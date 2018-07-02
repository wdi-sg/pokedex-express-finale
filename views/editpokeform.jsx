var React = require('react');
var LayoutContainer = require('./layouts/main.jsx');

class EditPokeForm extends React.Component {
    render() {
        return (
            <LayoutContainer>
                <div className="newFormContainer">
                    <form method="POST" action={"/pokemon/" + this.props.id}>
                        <input type="hidden" name="_method" defaultValue="PUT" />
                        <h1>What information do you want to edit?</h1>
                        <div>
                            <label className="formLabel">Name</label>
                            <input className="formInput" type="text" name="name" defaultValue={this.props.name} />
                        </div>
                        <div>
                            <label className="formLabel">Image</label>
                            <input className="formInput" type="text" name="img" defaultValue={this.props.img} />
                        </div>
                        <div>
                            <label className="formLabel">Height</label>
                            <input className="formInput" type="text" name="height" defaultValue={this.props.height} />
                        </div>
                        <div>
                            <label className="formLabel">Weight</label>
                            <input className="formInput" type="text" name="weight" defaultValue={this.props.weight} />
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
module.exports = EditPokeForm;