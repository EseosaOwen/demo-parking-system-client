import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { Image, Text, View, useWindowDimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import styled from "styled-components";

type TCustomDrawerItem = {
  pathname: string;
  path: string;
};

function CustomDrawer(props: any) {
  // ! This allows us to get the name of the current path in the drawer and then we can use that to style or items
  const pathname = usePathname();
  // NB eg when home drawer is active(we press the home link) the path name returns "/home/feed", this is because adding () around drawer and tabs removes it from the url. But when it comes to u specifying a particular page using a click event or link, we still need to specify the () paths.

  // * Creating a customScrollView so we can specify the Contents to Display in the Drawer
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: "black", width: "100%" }}
    >
      <UserInfo>
        <UserImage source={require("../../assets/images/prettywoman.jpg")} />
        <UserDetails>
          <UserText>Alexandra Carlsen</UserText>
          <Text style={{ color: "gray" }}>alexsen25@gmail.com</Text>
        </UserDetails>
      </UserInfo>
      <CustomDrawerItem
        icon={({ color, size }) => (
          <MaterialIcons
            name="list"
            color={pathname == "/home/feed" ? "#111" : "#fff"}
            size={size}
          />
        )}
        path="/home/feed" // custom props for styled components
        label="Feed"
        labelStyle={{
          marginLeft: -20,
          fontSize: 18,
          color: pathname === "/home/feed" ? "black" : "white",
        }}
        pathname={pathname} // custom props for styled components
        onPress={() => router.push("/(drawer)/(tabs)/home/feed")}
      />
      <CustomDrawerItem
        icon={({ color, size }) => (
          <AntDesign
            name="bells"
            color={pathname == "/notifications/all" ? "#111" : "#fff"}
            size={size}
          />
        )}
        path="/notifications/all" // custom props for styled components
        pathname={pathname} // custom props for styled components
        labelStyle={{
          marginLeft: -20,
          fontSize: 18,
          color: pathname === "/notifications/all" ? "black" : "white",
        }}
        label="Notifications"
        onPress={() => router.push("/(drawer)/(tabs)/notifications/all")}
      />
    </DrawerContentScrollView>
  );
}

export default function _layout() {
  const windowWidth = useWindowDimensions().width;

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          width:
            windowWidth < 800
              ? windowWidth - 30
              : windowWidth - windowWidth / 2,
          backgroundColor: "black",
        },
        headerShown: false,
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="menu" color={color} size={size} />
        ),
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    />
  );
}

const CustomDrawerItem = styled(DrawerItem)<TCustomDrawerItem>`
  background-color: ${(props) =>
    props.pathname === props.path ? "white" : "rgba(0, 0, 0, 0.7)"};
`;

const UserInfo = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 20px 10px;
`;

const UserImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const UserDetails = styled(View)``;

const UserText = styled(Text)`
  font-size: 18px;
  color: #fff;
`;

// const DrawerIconImage = styled(Image)`
//   width: 30px;
//   height: 30px;
// `;
