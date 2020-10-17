import React, { useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Container, Title, Button } from "./styles";
import { View } from "react-native";

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleGoBackToAppHomePage = useCallback(() => {
    navigation.navigate("OrphanagesMap");
  }, []);

  return (
    <Container>
      <Button onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </Button>

      <Title>{title}</Title>

      {showCancel ? (
        <Button onPress={handleGoBackToAppHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </Button>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
