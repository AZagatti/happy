import styled from "styled-components/native";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const MapContainer = styled(MapView)`
  width: ${width}px;
  height: ${height}px;
`;

export const CalloutContainer = styled.View`
  width: 160px;
  height: 46px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  justify-content: center;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-size: 14px;
  font-family: "Nunito_700Bold";
`;

export const Footer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background-color: #fff;
  border-radius: 20px;
  height: 56px;
  padding-left: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
`;

export const FooterText = styled.Text`
  color: #8fa7b3;
  font-family: "Nunito_700Bold";
`;

export const CreateOrphanageButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  background: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
