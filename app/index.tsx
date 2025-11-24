import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Updates from "expo-updates";
import Toast from "react-native-root-toast";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        async function checkOTA() {
            try {
                // Vérifie s'il y a une mise à jour
                const update = await Updates.checkForUpdateAsync();

                if (update.isAvailable) {
                    // Télécharge la mise à jour
                    await Updates.fetchUpdateAsync();
                    // Recharge l'application sur la nouvelle version
                    await Updates.reloadAsync();
                    return;
                }
            } catch (error) {
                console.log("Erreur pendant l'update OTA:", error);
            }

            Toast.show(`Route vers login`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                backgroundColor: 'red', // vert
                textColor: 'white',
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            router.push("/login");
        }

        checkOTA();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#5b4fb3" />
        </View>
    );
}
