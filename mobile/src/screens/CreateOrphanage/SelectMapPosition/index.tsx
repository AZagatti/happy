import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import mapMarker from "../../../images/mapMarker.png";

import * as S from "./styles";

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate("OrphanageData");
  }

  return (
    <S.Container>
      <S.Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </S.Map>

      <S.NextButton onPress={handleNextStep}>
        <S.NextButtonText>Próximo</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
}
