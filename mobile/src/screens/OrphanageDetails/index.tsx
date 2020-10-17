import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Linking } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useRoute, Route } from "@react-navigation/native";

import mapMarkerImg from "../../images/mapMarker.png";

import * as S from "./styles";
import api from "../../services/api";

interface Params extends Route<"OrphanageDetails"> {
  params: { id: number };
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function OrphanageDetails() {
  const route = useRoute<Params>();

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    (async () => {
      const response = await api.get(`orphanages/${route.params.id}`);
      setOrphanage(response.data);
    })();
  }, [route.params.id]);

  const handleOpenGoogleMaps = useCallback(() => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    );
  }, [orphanage]);

  if (!orphanage) {
    return null;
  }

  return (
    <S.Container>
      <S.ImagesContainer>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {orphanage.images.map((image) => (
            <S.Image
              key={image.id}
              source={{
                uri: image.url,
              }}
            />
          ))}
        </ScrollView>
      </S.ImagesContainer>

      <S.DetailsContainer>
        <S.Title>{orphanage.name}</S.Title>
        <S.Description>{orphanage.about}</S.Description>

        <S.MapContainer>
          <S.Map
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </S.Map>

          <S.RoutesContainer onPress={handleOpenGoogleMaps}>
            <S.RoutesText>Ver rotas no Google Maps</S.RoutesText>
          </S.RoutesContainer>
        </S.MapContainer>

        <S.Separator />

        <S.Title>Instruções para visita</S.Title>
        <S.Description>{orphanage.instructions}</S.Description>

        <S.ScheduleContainer>
          <S.ScheduleItem blue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <S.ScheduleText blue>
              Segunda à Sexta {orphanage.opening_hours}
            </S.ScheduleText>
          </S.ScheduleItem>
          {orphanage.open_on_weekends ? (
            <S.ScheduleItem green>
              <Feather name="info" size={40} color="#39CC83" />
              <S.ScheduleText green>Atendemos fim de semana</S.ScheduleText>
            </S.ScheduleItem>
          ) : (
            <S.ScheduleItem red>
              <Feather name="info" size={40} color="#FF669D" />
              <S.ScheduleText red>Não atendemos fim de semana</S.ScheduleText>
            </S.ScheduleItem>
          )}
        </S.ScheduleContainer>

        {/* <S.ContactButton onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <S.ContactButtonText>Entrar em contato</S.ContactButtonText>
        </S.ContactButton> */}
      </S.DetailsContainer>
    </S.Container>
  );
}
