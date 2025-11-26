import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f9fc",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 25,
        color: "#2c3e50",
    },
    label: {
        fontSize: 15,
        color: "#34495e",
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        height: 45,
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#bdc3c7",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
        paddingTop: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    col: {
        flex: 1,
        marginRight: 8,
    },
    btnSave: {
        backgroundColor: "#27ae60",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    btnCancel: {
        backgroundColor: "#c0392b",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});
