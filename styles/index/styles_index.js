import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#14B7C9",
    },

    logo: {
        borderRadius: 20,
        resizeMode: "contain",
        paddingBottom: "5%",
    },

    title: {
        paddingTop: "5%",
        paddingBottom: "5%",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        width: "80%",
        borderWidth: 1,
        padding: "3%",
        marginBottom: "5%",
        borderRadius: 8,
        backgroundColor: "#fff",
        borderColor: "black",
        boxShadow: "none",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    button: {
        width: "80%",
        height: "5%",
        borderRadius: 10,
        backgroundColor: "black",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
    },

   button_create: {
      width: "80%",
      height: "5%",
      borderRadius: 10,
      backgroundColor: "#000",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 15,

   },

    text:{
       paddingTop: "2%",
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },

   text_or:{
      paddingTop: "2%",
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
      marginBottom: "3%"
   }
});
