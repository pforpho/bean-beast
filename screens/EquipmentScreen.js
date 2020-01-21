import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { BodyText, Button, Headline } from "../components/common";
import Modal from "../components/common/Modal";
import EditEquipmentForm from "../components/equipment/EditEquipmentForm";
import Icon from 'react-native-vector-icons/FontAwesome';
import { textLink } from "../constants/Styles";
import Colors from "../constants/Colors";
import RecipeListItem from "../components/recipes/RecipeListItem";

const Styles = {
  sideIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: -15,
    marginLeft: 10,
    marginRight: -7,
    padding: 4
  },
  sideIcon: {
    padding: 8,
  }
};

class EquipmentScreen extends Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  constructor(props) {
    super(props);
    this.addEquipmentModal = null;
    this.state = {
      mounted: false
    }
  }

  equipmentOutput(){
    const { equipment, equipmentTypes } = this.props;
    let output = null;

    if(_.size(equipmentTypes)){
      output = _.map(equipmentTypes, (equipmentType) => {
        const heading = equipmentType.name_plural ? equipmentType.name_plural : equipmentType.name ? equipmentType.name : 'Misc Equipment';
        let equipmentOfThisType = _.filter(equipment, ['type', equipmentType.id]);
        equipmentOfThisType = _.orderBy(equipmentOfThisType, ['order'], ['asc']);
        let piecesOfEquipmentOutput = <BodyText>None Yet!</BodyText>;

        if(_.size(equipmentOfThisType)){
          piecesOfEquipmentOutput = _.map(equipmentOfThisType, (equipmentItem) => {
            return (
              <View key={equipmentItem.id}>
                {equipmentItem.name ? <BodyText>{equipmentItem.name}</BodyText> : <View/>}
                <RecipeListItem
                  id={equipmentItem.id}
                  // onPressItem={() => { this._onPressItem(item.id) }}
                  data={equipmentItem}
                  // beanPage={this.props.beanPage}
                  rightSideContent={
                    <View style={Styles.sideIcons}>
                      <TouchableOpacity onPress={() => this._cloneRecipe(item)} style={Styles.sideIcon}>
                        <Icon name="copy" size={16} style={textLink} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._onPressDelete(item.id)} style={Styles.sideIcon}>
                        <Icon name="trash" size={16} style={{ color: Colors.colorDanger }} />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </View>
            );
          });
        }

        return (
          <View key={equipmentType.id}>
            <Headline noMargin>{heading}</Headline>
            <View>
              {piecesOfEquipmentOutput}
            </View>
          </View>
        );
      })
    }

    return output;
  }

  //* Need to force the component to re-render in order for the equipment form to be able to access the modal ref.
  componentDidMount(): void {
    this.setState({ mounted: true });
  }

  render() {
    return (
      <View>
        <ScrollView style={{padding:15}}>
          <View >
            <Button onPress={() => { this.addEquipmentModal.show() }} title="Add new Equipment" />
          </View>

          {this.equipmentOutput()}

        </ScrollView>

        <Modal ref={(ref) => { this.addEquipmentModal = ref; }} headlineText="Add New Equipment">
          <EditEquipmentForm
            type="createModal"
            navigation={this.props.navigation}
            modal={this.addEquipmentModal}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment.equipment,
    equipmentTypes: state.equipment.equipmentTypes
  };
};

export default connect(mapStateToProps, {})(EquipmentScreen);

EquipmentScreen.propTypes = {
  equipment: PropTypes.object,
  equipmentTypes: PropTypes.object
};

EquipmentScreen.defaultProps = {
  equipment: {},
  equipmentTypes: {}
};
