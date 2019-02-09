// 'use strict';

// import React, {Component} from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';
// // import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons'
// import MaterialCommunityIcons from 'react-native-ionicons'

// import { RNCamera } from 'react-native-camera';


// export default class CameraComponent extends React.Component {

//   takePicture = async function() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   }


//   render() {
//     return (
//       <View style={styles.container}>
//        <RNCamera
//          ref={ref => {
//            this.camera = ref;
//          }}
//          style={styles.preview}
//          type={RNCamera.Constants.Type.back}
//          flashMode={RNCamera.Constants.FlashMode.on}
//          permissionDialogTitle={'Permission to use camera'}
//          permissionDialogMessage={'We need your permission to use your camera phone'}
//          onGoogleVisionBarcodesDetected={({ barcodes }) => {
//            console.log(barcodes);
//          }}
//        />
//        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//          {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}> */}
//             <MaterialCommunityIcons name="radio-button-off" size={60} style={{color: 'white', marginBottom: 20}}/>
//          {/* </TouchableOpacity> */}
//        </View>
//      </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });
