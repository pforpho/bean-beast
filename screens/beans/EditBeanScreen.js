import React, { Component } from 'react';
import PropTypes from "prop-types";
// import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Container, BodyText, Headline} from "../../components/common";
import EditBeanForm from "../../components/beans/EditBeanForm";

export default class EditBeanScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type', 'create') === 'create' ? 'Add New Bean' : 'Edit Bean',
    }
  };

  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.bean = props.navigation.getParam('bean', null);
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <Container scroll={true}>
          {this._pageTitle()}
          <EditBeanForm type={this.type} navigation={this.props.navigation} />
        </Container>
      </KeyboardAwareScrollView>
    );
  }

  _pageTitle(){
    if(this.type === 'create'){
      return <Headline>Create New Bean</Headline>
    }
    else if(this.type === 'edit'){
      if(this.bean && this.bean.name){
        return <Headline>Edit {this.bean.name}</Headline>
      }
      return <Headline>Edit Bean</Headline>
    }
  }
}

EditBeanScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
