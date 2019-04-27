import React from 'react';
import { TextInput, StyleSheet, Text, View, Picker } from 'react-native';
import _ from 'lodash';
import { Field } from 'redux-form';
import {
  bodyText,
  marginBottom,
} from '../Styles';
import colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  inputContainer: {
    // alignSelf: 'stretch',
    // flex: 1,
  },
  input: {
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 1,
    height: 47,

    padding: 10,
    borderRadius: 2,
  },
  label: {
    marginBottom: 7,
  },
  warningText: {
    marginTop: 2,
    color: colors.colorWarning,
  },
  errorText: {
    marginTop: 2,
    color: colors.colorDanger
  }
});

const SelectComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  options
}) => {
  let pickerOptions = _.map(options, (option, i ) => {
    return <Picker.Item key={option.id} value={option.id} label={option.name} />
  });

  return (
    <View style={StyleSheet.flatten([marginBottom, styles.inputContainer])}>
      {/*<TextInput*/}
        {/*style={StyleSheet.flatten([bodyText, styles.input])}*/}
        {/*onChangeText={onChange}*/}
        {/*{...restInput}*/}
        {/*value={restInput.value.toString()}*/}
        {/*underlineColorAndroid="rgba(0,0,0,.2)"*/}
      {/*/>*/}
      <Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>
        {pickerOptions}
      </Picker>
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const Select = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} options={props.options} component={SelectComponent} />
    </View>
  );
};

// export default Button;
export { Select };