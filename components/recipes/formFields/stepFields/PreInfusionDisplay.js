import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { secondsToTimeStringDisplay } from "../../../../helpers/labels";
import {
  recipeStepListItemInnerTextContainer,
  recipeStepListItemSubText,
  recipeStepListItemSubTextNotesText,
  recipeStepListItemSubTextNotesTitle
} from "../../../../constants/styles/RecipeSteps";
import { BodyText } from "../../../common";

class PreInfusionDisplay extends Component {
  _preinfusion(values){
    const { length, pressure, water_amount } = values;
    if(length || pressure){
      return (
        <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}>
          Pre-Infuse
          {water_amount ? ` ${water_amount}g` : ''}
          {pressure ? ` at ${pressure} Bar Pressure` : ''}
          {length ? ` over ${secondsToTimeStringDisplay(length)}` : null}
        </BodyText>
      );
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._preinfusion(values)}
        {values.notes ? <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText> : <View />}
      </View>
    );
  }
}

PreInfusionDisplay.propTypes = {
  values: PropTypes.object,
  style: PropTypes.object,
};

PreInfusionDisplay.defaultProps = {
  values: {
    length: null,
    pressure: null,
    notes: null,
    water_amount: null
  },
  style: {}
};

export default PreInfusionDisplay;
