import React, { useCallback, useState } from "react";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import * as S from "./styles";

import mapMarker from "../../images/mapMarker.png";
import api from "../../services/api";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    (async () => {
      const response = await api.get("orphanages");
      setOrphanages(response.data);
    })();
  });

  const handleNavigateToOrphanageDetails = useCallback(
    (id: number) => {
      navigation.navigate("OrphanageDetails", { id });
    },
    [navigation]
  );

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate("SelectMapPosition");
  }, [navigation]);

  return (
    <S.Container>
      <S.MapContainer
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.3512794,
          longitude: -48.772473,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.9,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              <S.CalloutContainer>
                <S.CalloutText>{orphanage.name}</S.CalloutText>
              </S.CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </S.MapContainer>

      <S.Footer>
        <S.FooterText>{orphanages.length} orfanatos encontrados</S.FooterText>

        <S.CreateOrphanageButton onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </S.CreateOrphanageButton>
      </S.Footer>
    </S.Container>
  );
}
