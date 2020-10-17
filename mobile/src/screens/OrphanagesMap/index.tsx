import React, { useCallback } from "react";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import * as S from "./styles";

import mapMarker from "../../images/mapMarker.png";

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate("OrphanageDetails");
  }, [navigation]);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate("SelectMapPosition");
  }, [navigation]);

  return (
    <S.Container>
      <S.MapContainer
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.346845,
          longitude: -48.7693609,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -22.346845,
            longitude: -48.7693609,
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.9,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <S.CalloutContainer>
              <S.CalloutText>Lar das meninas</S.CalloutText>
            </S.CalloutContainer>
          </Callout>
        </Marker>
      </S.MapContainer>

      <S.Footer>
        <S.FooterText>Dois orfanatos encontrados</S.FooterText>

        <S.CreateOrphanageButton onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </S.CreateOrphanageButton>
      </S.Footer>
    </S.Container>
  );
}
