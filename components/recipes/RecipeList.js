import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RecipeListItem from './RecipeListItem';
import * as navRoutes from '../../constants/NavRoutes';
import PropTypes from "prop-types";
import {Button} from "../common";

class RecipeList extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    this.props.navigation.navigate(navRoutes.VIEW_RECIPE, {
      id
    })
  };

  _renderItem = ({item}) => {
    return (
      <RecipeListItem
        id={item.id}
        onPressItem={this._onPressItem}
        data={item}
        beanPage={this.props.beanPage}
      />
    );
  };

  render() {
    let recipes = this.props.recipes.recipes;
    recipes = _.orderBy(recipes, ['modified'], ['desc']);
    recipes = _.values(recipes);
    return (
      <FlatList
        data={recipes}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

RecipeList.propTypes = {
  beanPage: PropTypes.bool,
};

RecipeList.defaultProps = {
  beanPage: false,
};
