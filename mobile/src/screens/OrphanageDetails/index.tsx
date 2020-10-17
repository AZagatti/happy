import React from "react";
import { ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";

import mapMarkerImg from "../images/map-marker.png";

import * as S from "./styles";

export default function OrphanageDetails() {
  return (
    <S.Container>
      <S.ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          <S.Image
            source={{
              uri: "https://fmnova.com.br/images/noticias/safe_image.jpg",
            }}
          />
          <S.Image
            source={{
              uri: "https://fmnova.com.br/images/noticias/safe_image.jpg",
            }}
          />
          <S.Image
            source={{
              uri: "https://fmnova.com.br/images/noticias/safe_image.jpg",
            }}
          />
        </ScrollView>
      </S.ImagesContainer>

      <S.DetailsContainer>
        <S.Title>Orf. Esperança</S.Title>
        <S.Description>
          Presta assistência a crianças de 06 a 15 anos que se encontre em
          situação de risco e/ou vulnerabilidade social.
        </S.Description>

        <S.MapContainer>
          <S.Map
            initialRegion={{
              latitude: -27.2092052,
              longitude: -49.6401092,
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
                latitude: -27.2092052,
                longitude: -49.6401092,
              }}
            />
          </S.Map>

          <S.RoutesContainer>
            <S.RoutesText>Ver rotas no Google Maps</S.RoutesText>
          </S.RoutesContainer>
        </S.MapContainer>

        <S.Separator />

        <S.Title>Instruções para visita</S.Title>
        <S.Description>
          Venha como se sentir a vontade e traga muito amor e paciência para
          dar.
        </S.Description>

        <S.ScheduleContainer>
          <S.ScheduleItem blue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <S.ScheduleText blue>Segunda à Sexta 8h às 18h</S.ScheduleText>
          </S.ScheduleItem>
          <S.ScheduleItem green>
            <Feather name="info" size={40} color="#39CC83" />
            <S.ScheduleText green>Atendemos fim de semana</S.ScheduleText>
          </S.ScheduleItem>
        </S.ScheduleContainer>

        <S.ContactButton onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <S.ContactButtonText>Entrar em contato</S.ContactButtonText>
        </S.ContactButton>
      </S.DetailsContainer>
    </S.Container>
  );
}
