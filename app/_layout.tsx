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
            Updates.reloadAsync()
        }
    }, [isUpdatePending]);

    // 📡 Vérifier s'il existe une nouvelle mise à jour
    useEffect(() => {
        async function checkOTA() {
            try {
                if (currentlyRunning?.isEmbeddedLaunch) {
                    const update = await Updates.checkForUpdateAsync();

                    if (update.isAvailable) {
                        await Updates.fetchUpdateAsync();
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
