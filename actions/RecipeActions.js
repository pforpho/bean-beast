import { showMessage, hideMessage } from "react-native-flash-message";
import _ from 'lodash';
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID, temperatureConvertFtoC, getDaysOffRoast } from "../helpers";
import * as configuredStore from '../configureStore';
const { store } = configuredStore.default();
// import { NavigationActions, StackActions } from "react-navigation";

export const saveRecipe = (values) => {
  if(values.type === 'create'){
    return _createRecipe(values);
  }
  else if(values.type === 'edit'){
    return _updateRecipe(values);
  }
};

const _createRecipe = (values) => {
  const id = generateRandomID('recipe');
  return (dispatch) => {
  // return (dispatch, getState) => {
    // const thisBean = _.size(values) && values.bean_id && _.size(getState().beans) && _.size(getState().beans.beans) && getState().beans.beans[values.bean_id] ? getState().beans.beans[values.bean_id] : null;
    // const daysOffRoast = getDaysOffRoast(thisBean);
    // _creatingRecipe(dispatch, values, id, daysOffRoast)
    _creatingRecipe(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.RECIPE_CREATE_SUCCESS,
          payload: id,
        });
        if(id){
          values.navigation.navigate(navRoutes.VIEW_RECIPE, {
            id
          });
        }
        else {
          values.navigation.goBack();
        }
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', '_createRecipe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

// const _creatingRecipe = (dispatch, values, id, daysOffRoast) => new Promise((resolve, reject) => {
const _creatingRecipe = (dispatch, values, id) => new Promise((resolve, reject) => {
  console.log('creating');
  //* Convert F to C
  // values.temperature = values.temperatureMeasurement === 'f' ? temperatureConvertFtoC(values.temperature) : values.temperature;
  dispatch({
    type: types.RECIPE_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: {
        ...values,
        // days_off_roast: daysOffRoast ? daysOffRoast.diffDays : undefined
      },
    },
  });
  resolve();
});

const _updateRecipe = (values) => {
  return (dispatch) => {
    _updatingRecipe(dispatch, values)
      .then(() => {
        dispatch({
          type: types.RECIPE_UPDATE_SUCCESS,
        });
        if(values.id){
          values.navigation.navigate(navRoutes.VIEW_RECIPE, {
            id: values.id
          });
        }
        else {
          values.navigation.goBack();
        }
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', '_updateRecipe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingRecipe = (dispatch, values) => new Promise((resolve, reject) => {
  // values.temperature = values.temperatureMeasurement === 'f' ? temperatureConvertFtoC(values.temperature) : values.temperature;
  dispatch({
    type: types.RECIPE_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteRecipe function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.RECIPE_LIST }),
//     }),
//   ],
// });

export const deleteRecipe = (id, navigation) => {
  return (dispatch) => {
    _deletingRecipe(dispatch, id)
      .then(() => {
        dispatch({
          type: types.RECIPE_DELETE_SUCCESS,
        });
        if(navigation){
          navigation.navigate({
            routeName: navRoutes.RECIPE_LIST
          });
        }
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', 'deleteRecipe');
        if(navigation) {
          navigation.navigate({
            routeName: navRoutes.RECIPE_LIST
          });
        }
        showMessage({
          message: "Error",
          description: "There was an error deleting the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingRecipe = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.RECIPE_DELETING,
    payload: id
  });
  resolve();
});

export const createRecipe = () => {
  return {
    type: types.RECIPE_CREATE
  };
};

export const editRecipe = (recipeData) => {
  return {
    type: types.RECIPE_EDIT,
    payload: recipeData
  };
};

export const cloneRecipe = (id, cloning_id, navigation) => {
  return (dispatch) => {

    // console.log('navigation', navigation);
  // return (dispatch, getState) => {
    // const thisRecipe = _.size(getState().recipes) && _.size(getState().recipes.recipes) && getState().recipes.recipes[cloning_id] ? getState().recipes.recipes[cloning_id] : null;
    // const thisBean = _.size(thisRecipe) && thisRecipe.bean_id && _.size(getState().beans) && _.size(getState().beans.beans) && getState().beans.beans[thisRecipe.bean_id] ? getState().beans.beans[thisRecipe.bean_id] : null;
    // const daysOffRoast = getDaysOffRoast(thisBean);
    // _cloningRecipe(dispatch, id, cloning_id, daysOffRoast)
    _cloningRecipe(dispatch, id, cloning_id)
      .then(() => {
        dispatch({
          type: types.RECIPE_CLONE_SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_CLONE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', 'cloneRecipe');
        // values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error cloning the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

// const _cloningRecipe = (dispatch, id, cloning_id, daysOffRoast) => new Promise((resolve, reject) => {
const _cloningRecipe = (dispatch, id, cloning_id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.RECIPE_CLONING,
    payload: {
      id,
      cloning_id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      // days_off_roast: daysOffRoast ? daysOffRoast.diffDays : undefined
    }
  });
  resolve();
});

//* Todo could one day consider making this promise style once I have the database situation set up
export const markRecipeAsFavorite = (id) => {
  return (dispatch) => {
    dispatch({
      type: types.RECIPE_TOGGLE_FAVORITE,
      payload: {
        id,
        modified: new Date().getTime(),
      }
    });
  };
};
