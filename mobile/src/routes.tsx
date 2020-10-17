import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "./screens/OrphanagesMap";
import OrphanageDetails from "./screens/OrphanageDetails";

import SelectMapPosition from "./screens/CreateOrphanage/SelectMapPosition";
import OrphanageData from "./screens/CreateOrphanage/OrphanageData";
import Header from "./components/Header";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Stack.Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Stack.Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />
        <Stack.Screen
          name="SelectMapPosition"
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
          component={SelectMapPosition}
        />
        <Stack.Screen
          name="OrphanageData"
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
          component={OrphanageData}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
