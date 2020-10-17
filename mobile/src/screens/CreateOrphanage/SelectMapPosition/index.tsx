import React, { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Marker, PROVIDER_GOOGLE, MapEvent } from "react-native-maps";

import mapMarker from "../../../images/mapMarker.png";

import * as S from "./styles";

export default function SelectMapPosition() {
  const navigation = useNavigation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const handleNextStep = useCallback(() => {
    navigation.navigate("OrphanageData", { position });
  }, [navigation, position]);

  const handleSelectMapPosition = useCallback((e: MapEvent) => {
    setPosition(e.nativeEvent.coordinate);
  }, []);

  return (
    <S.Container>
      <S.Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.3512794,
          longitude: -48.772473,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </S.Map>

      {position.latitude !== 0 && (
        <S.NextButton onPress={handleNextStep}>
          <S.NextButtonText>Próximo</S.NextButtonText>
        </S.NextButton>
      )}
    </S.Container>
  );
}
