import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Layout() {
    const router = useRouter();

    useEffect(() => {
        async function checkOTA() {
            try {
                if (Updates.isEmbeddedLaunch) {
                    const update = await Updates.checkForUpdateAsync();

                    if (update.isAvailable) {
                        await Updates.fetchUpdateAsync();
                        await Updates.reloadAsync();
                        return;
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
