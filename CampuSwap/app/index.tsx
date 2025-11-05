import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
   const router = useRouter();

   useEffect(() => {
      setTimeout(() => router.push("/login"), 10);
   }, []);


   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#5b4fb3" />
      </View>
   );
}
