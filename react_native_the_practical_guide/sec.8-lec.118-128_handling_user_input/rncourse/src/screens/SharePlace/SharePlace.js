import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';
import InputView from '../../components/InputView/InputView';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainButton from '../../components/UI/MainButton/MainButton';


class SharePlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  constructor(props) {
    super(props);
    //listener for navigation events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    placeName: '',
    shareButtonDisabled: true
  };

  onNavigatorEvent = event => {
    //To find out event types name, the faster way
    //is to click the event and check the console using devtools
    if (event.type === 'NavBarButtonPress'
        && event.id === 'sideDrawerToggle') {
          //see toggelDrawerMathod in in react native navigation docs
          this.props.navigator.toggleDrawer({
            side: 'left'
          });
    }
  }
  placeAddedHandler = () => {
      this.props.onAddPlace(this.state.placeName.trim());
      this.setState({
        placeName: '',
        shareButtonDisabled: true
      });
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val,
      shareButtonDisabled: val === ''
    });
  }

  render() {
    /*
    Scrollview has infinite height so that by applying "flex: 1" makes no sense
    as it needs a limited size and scrollview has ingfinite height
    contentContainerStyle prop allow to use flex inside scroll View by applying styles
    using contentContainerStyle instead style property the issue is solved for ios but android
    loose the ability to scroll. (TODO = search more information about contentContainerStyle)
    To solve this issue a View component is used inside ScrollView component
    Note The following code is only working for Ios:
    <ScrollView contentContainerStyle={styles.container} >
      {content}
    </ScrollView>
    */
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <InputView
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
            style={styles.input}
          />
          <View style={styles.button}>
            <MainButton
              title="Share the place"
              onPress={this.placeAddedHandler}
              disabled={this.state.shareButtonDisabled}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20
    },
    button: {
      margin: 8
    },
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

//No need mapDispatchToState so is null
export default connect(null, mapDispatchToProps)(SharePlaceScreen);
