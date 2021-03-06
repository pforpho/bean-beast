import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import _ from 'lodash';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import { PickerSelectField } from "./PickerSelectField";

const SelectComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  options,
  placeholderText
}) => {
  let pickerOptions = _.map(options, (option, i ) => {
    return <Picker.Item key={option.id} value={option.id} label={option.name} />
  });

  return (
    <View style={styles.inputContainer}>
      <Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>
        <Picker.Item key='default' value='' label={placeholderText} />
        {pickerOptions}
      </Picker>
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const PickerField = (props) => {
  let label = props.label;
  if(typeof(props.label) === 'string'){
    label = <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>;
  }
  return (
    <View style={{ alignItems: 'stretch' }}>
      {label}
      <Field
        name={props.name}
        validate={props.validate}
        component={SelectComponent}
        options={props.options}
        placeholderText={props.placeholderText}
      />
    </View>
  );
};

// const PickerField = (props) => {
//   let options = [];
//   if(_.size(props.options)){
//     options = _.map(props.options, (option) => {
//       let key = option.key ? option.key : option.id;
//       let label = option.label ? option.label : option.name ? option.name : 'Unnamed Option';
//       return {
//         id: option.id,
//         name: option.name,
//         key,
//         label
//       };
//     });
//   }
//
//   console.log('opts', options);
//   console.log('props', props);
//   return (
//     <PickerSelectField
//       name={props.name}
//       validate={props.validate}
//       options={options}
//       placeholderText={props.placeholderText}
//       defaultValue="hi"
//       // defaultValue={this.props.userPreferences && this.props.userPreferences.global_temperatureMeasurement ? this.props.userPreferences.global_temperatureMeasurement : null}
//       containerStyle={{ marginBottom: 0 }}
//     />
//   )
// }

export { PickerField };

PickerField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string
};

PickerField.defaultProps = {
  placeholderText: '–  Select an Option  –',
};

