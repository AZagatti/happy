import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Marker } from "react-native-maps";

import mapMarkerImg from "../../images/map-marker.png";

import * as S from "./styles";

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate("OrphanageData");
  }

  return (
    <S.Container>
      <S.Map
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </S.Map>

      <S.NextButton onPress={handleNextStep}>
        <S.NextButtonText>Próximo</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
}
