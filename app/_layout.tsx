import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { RootSiblingParent } from "react-native-root-siblings";
import { Alert } from "react-native";

export default function Layout() {
    const {
        currentlyRunning,
        isUpdateAvailable,
        isUpdatePending,
    } = Updates.useUpdates();

    // 🔄 Si le téléchargement est fini → proposer de recharger
    useEffect(() => {
        if (isUpdatePending) {
            Alert.alert(
                "Mise à jour prête",
                "Une nouvelle version est prête à être installée.",
                [
                    { text: "Plus tard", style: "cancel" },
                    { text: "Installer", onPress: () => Updates.reloadAsync() }
                ]
            );
        }
    }, [isUpdatePending]);

    // 📡 Vérifier s'il existe une nouvelle mise à jour
    useEffect(() => {
        async function checkOTA() {
            try {
                if (currentlyRunning?.isEmbeddedLaunch) {
                    const update = await Updates.checkForUpdateAsync();

                    if (update.isAvailable) {
                        Alert.alert(
                            "Mise à jour disponible",
                            "Une nouvelle version est disponible. Voulez-vous l’installer ?",
                            [
                                { text: "Plus tard", style: "cancel" },
                                {
                                    text: "Télécharger",
                                    onPress: async () => {
                                        try {
                                            await Updates.fetchUpdateAsync();
                                            Alert.alert("Téléchargement terminé 🎉", "Installation en cours…");
                                        } catch (e) {
                                            Alert.alert("Erreur", "Impossible de télécharger la mise à jour.");
                                        }
                                    }
                                }
                            ]
                        );
                    }
                }
            } catch (error) {
                console.log("Erreur pendant l'update OTA:", error);
            }
        }
        checkOTA();
    }, []);

    return (
        <RootSiblingParent>
            <Stack screenOptions={{ headerShown: false }} />
        </RootSiblingParent>
    );
}
