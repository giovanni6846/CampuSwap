import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Updates from "expo-updates";

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
                    return; // On stoppe ici sinon ça continue la navigation
                }
            } catch (error) {
                console.log("Erreur pendant l'update OTA:", error);
            }

            // Si pas de mise à jour => on continue vers /login
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
