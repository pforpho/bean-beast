import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, PickerSelectField } from "../../../common/reduxForm";
import {isDefined, isNumber, required} from "../../../../helpers";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BodyText, Headline } from "../../../common";
import _ from "../../../../screens/recipes/ViewRecipeScreen";
import {connectActionSheet} from "@expo/react-native-action-sheet";
import {connect} from "react-redux";
import {cloneRecipe, deleteRecipe, editRecipe, markRecipeAsFavorite} from "../../../../actions";
import Colors from "../../../../constants/Colors";
import { temperatureInUserPreference } from "../../../../helpers/labels";

class TemperatureField extends Component {
  render() {
    // console.log('this.props.temperatureMeasurement', this.props.temperatureMeasurement);
    // let tempMeasurement = null;
    // if(this.props.temperatureMeasurement){
    //   tempMeasurement = this.props.temperatureMeasurement;
    // }
    // else if(this.props.userPreferences && this.props.userPreferences.global_temperatureMeasurement){
    //   tempMeasurement = this.props.userPreferences.global_temperatureMeasurement;
    // }

    return (
      <View>
        <Headline h4>Temperature</Headline>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {/*<Text>You are currently looking at the temperature field.</Text>*/}
          <View style={{ width: 90 }}>
            <TextField
              name="temperature"
              number
              keyboardType="numeric"
              validate={[isNumber]}
            />

          </View>
          <View style={{ marginLeft: 6 }}>
            <BodyText>Degrees</BodyText>
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <PickerSelectField
              name="temperatureMeasurement"
              options={[
                {
                  key: 'c',
                  value: 'c',
                  label: 'Celsius'
                },
                {
                  key: 'f',
                  value: 'f',
                  label: 'Fahrenheit'
                }
              ]}
              // defaultValue={tempMeasurement}
              fieldLayout={'inline'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userPreferences: state.userPreferences,
  };
};

TemperatureField = connect(mapStateToProps, {})(TemperatureField);

export default TemperatureField;
