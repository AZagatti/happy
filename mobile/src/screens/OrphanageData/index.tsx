import React from "react";
import {
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import * as S from "./styles";

export default function OrphanageData() {
  return (
    <S.Container>
      <S.Title>Dados</S.Title>

      <S.Label>Nome</S.Label>
      <S.Input />

      <S.Label>Sobre</S.Label>
      <S.Input style={{ height: 110 }} multiline />

      <S.Label>Whatsapp</S.Label>
      <S.Input />

      <S.Label>Fotos</S.Label>
      <S.ImagesInput onPress={() => {}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </S.ImagesInput>

      <S.Title>Visitação</S.Title>

      <S.Label>Instruções</S.Label>
      <S.Input style={{ height: 110 }} multiline />

      <S.Label>Horario de visitas</S.Label>
      <S.Input />

      <S.SwitchContainer>
        <S.Label>Atende final de semana?</S.Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
        />
      </S.SwitchContainer>

      <S.NextButton onPress={() => {}}>
        <S.NextButtonText>Cadastrar</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
}
