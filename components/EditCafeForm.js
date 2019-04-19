import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { saveCafe } from "../actions";
import { TextField } from "./common/reduxForm";
import { Button } from "./common";

class EditCafeForm extends Component {
  componentWillMount(): void {
    this.props.change('type', this.props.type);
  }

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField name="name" />
        <Button
          title="Save Cafe"
          onPress={handleSubmit((values) => this.props.saveCafe(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});
// export default connect(mapStateToProps, mapDispatchToProps)(EditCafeForm);

const mapStateToProps = (state) => {
  // const initialValues = state.beans.bean;
  // const { beans } = state;
  return {
    initialValues: state.cafes.cafe,
    loading: state.cafes.loading,
  }
};

EditCafeForm = reduxForm({
  form: 'EditCafeForm',
  enableReinitialize: true,
})(EditCafeForm);

EditCafeForm = connect(mapStateToProps, { saveCafe })(EditCafeForm);

export default EditCafeForm;
