import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    // existence check for errorMessage
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    // pull off properties from the 'props' object
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Email:</label>
              <input {...email} className="form-control" />
            </fieldset>
            <fieldset className="form-group">
              <label>Password:</label>
              <input {...password} type="password" className="form-control" />
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign In</button>
          </form>
    );
  }
}

// function to pull off piece of state for error message
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// form helper: for setting up the form and fields
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
