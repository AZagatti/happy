import MapView from "react-native-maps";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Map = styled(MapView)`
  width: ${width}px;
  height: ${height}px;
`;

export const NextButton = styled(RectButton)`
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;

  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 40px;
`;

export const NextButtonText = styled.View`
  font-family: "Nunito_800ExtraBold";
  font-size: 16px;
  color: #fff;
`;
