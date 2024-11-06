/*
Author: Emre EKE
Date: 2023-04-03T07:26:06.514Z
*/
import { StyleSheet, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Modal from "react-native-modal";
import Colors from "resources/Colors";
import CustomText from "./CustomText";
import { responsiveHeight } from "constants/Dimension";

interface Props { }
interface State {
  loading: boolean;
  progress: number;
  text: string;
}
class Loading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0,
      text: "",
    };
  }
  componentDidMount() {
    Loading.Instance = this;
  }
  componentDidUpdate() { }
  componentWillUnmount() { }
  static Instance: Loading;
  static show(progress?: number) {
    Loading?.Instance?.setState({ loading: true, progress: progress || 0, text: "" });
  }
  static hide() {
    Loading?.Instance?.setState({ loading: false, progress: 0, text: "" });
  }
  static showText(text: string) {
    Loading?.Instance?.setState({ loading: true, text: text });
  }
  static progress(progress: number) {
    Loading?.Instance?.setState({ progress });
  }
  render() {
    return (
      <Modal
        isVisible={this.state.loading}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        style={{
          margin: 0,
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          zIndex: 998,
          width: "100%",
          height: "100%",
        }}
        backdropColor="#000"
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "transparent",
          }}>
          {this.state.progress !== 0
            ?
            <Progress.Circle
              showsText={this.state.progress !== 0}
              indeterminate={this.state.progress === 0}
              size={120}
              textStyle={{
                fontSize: 20,
                fontWeight: "700"
              }}
              progress={
                this.state.progress !== 0 ? this.state.progress / 100 : undefined
              }
              color={Colors.Primary}
              thickness={10}
              borderWidth={2}
              unfilledColor="transparent"
              borderColor={Colors.Primary}
              formatText={() =>
                this.state.progress !== 0 ? `${this.state.progress}%` : ""
              }
            />
            :
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}>
              <Progress.Circle
                borderWidth={8}
                indeterminate
                size={100}
                color={Colors.Primary}
                fill="#00000000"
                thickness={10}
              />
              {this.state.text != "" && <CustomText style={styles.text}>{this.state.text}</CustomText>}
            </View>
          }
        </View>
      </Modal>
    );
  }
}
export default Loading;

const styles = StyleSheet.create({
  text: {
    marginTop: responsiveHeight(20),
    fontSize: 20,
    color: Colors.White
  },
});