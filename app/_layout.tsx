import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { RootSiblingParent } from "react-native-root-siblings";
import {checkForUpdateAsync} from "expo-updates";

export default function Layout() {
    const {
        currentlyRunning,
        isUpdatePending,
    } = Updates.useUpdates();

    useEffect(() => {
        // Si une mise à jour est reçue, on la recharge automatiquement
        if (isUpdatePending) {
            Updates.reloadAsync();
        }
    }, [isUpdatePending]);

    useEffect(() => {
        async function checkOTA() {
            try {
                if (currentlyRunning.isEmbeddedLaunch) {
                    await checkForUpdateAsync();
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
