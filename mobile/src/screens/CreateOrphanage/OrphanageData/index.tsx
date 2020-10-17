import React, { useCallback, useState } from "react";
import { Switch } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, useNavigation, Route } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import * as S from "./styles";
import useForm from "../../../hooks/useForm";
import api from "../../../services/api";

interface Params extends Route<"OrphanageData"> {
  params: { position: { latitude: number; longitude: number } };
}

interface FormInputs {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
}

export default function OrphanageData() {
  const route = useRoute<Params>();
  const navigation = useNavigation();

  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { values, handleChange } = useForm<FormInputs>({
    name: "",
    about: "",
    instructions: "",
    opening_hours: "",
  });

  const handleSelectImages = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Need permissions");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    const { uri } = result;

    setImages((state) => [...state, uri]);
  }, []);

  const handleSubmit = useCallback(async () => {
    const { latitude, longitude } = route.params.position;

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("about", values.about);
    formData.append("instructions", values.instructions);
    formData.append("opening_hours", values.opening_hours);
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));
    formData.append("open_on_weekends", String(open_on_weekends));
    images.forEach((image, index) => {
      formData.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any);
    });

    try {
      await api.post("orphanages", formData);
      navigation.navigate("OrphanagesMap");
    } catch (err) {
      alert("Erro ao cadastrar orfanato");
    }
  }, [values, open_on_weekends, route.params.position]);

  return (
    <S.Container>
      <S.Title>Dados</S.Title>

      <S.Label>Nome</S.Label>
      <S.Input
        value={values.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <S.Label>Sobre</S.Label>
      <S.Input
        value={values.about}
        onChangeText={(text) => handleChange("about", text)}
        style={{ height: 110 }}
        multiline
      />

      {/* <S.Label>Whatsapp</S.Label>
      <S.Input value={values.whatsapp} onChangeText={text => handleChange('whatsapp', text)} /> */}

      <S.Label>Fotos</S.Label>

      <S.UploadedImagesContainer>
        {images.map((image) => (
          <S.UploadedImage key={image} source={{ uri: image }} />
        ))}
      </S.UploadedImagesContainer>

      <S.ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </S.ImagesInput>

      <S.Title>Visitação</S.Title>

      <S.Label>Instruções</S.Label>
      <S.Input
        value={values.instructions}
        onChangeText={(text) => handleChange("instructions", text)}
        style={{ height: 110 }}
        multiline
      />

      <S.Label>Horario de visitas</S.Label>
      <S.Input
        value={values.opening_hours}
        onChangeText={(text) => handleChange("opening_hours", text)}
      />

      <S.SwitchContainer>
        <S.Label>Atende final de semana?</S.Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </S.SwitchContainer>

      <S.NextButton onPress={handleSubmit}>
        <S.NextButtonText>Cadastrar</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
}
