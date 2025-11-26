import { StyleSheet } from "react-native";

export default StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f9ff',
      paddingHorizontal: 15,
      paddingTop: 40,
   },
   tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#f3e8ff',
      borderRadius: 10,
      paddingVertical: 8,
      marginBottom: 15,
   },
   tabItem: {
      alignItems: 'center',
   },
   activeTab: {
      backgroundColor: '#efe3ff',
      borderRadius: 8,
      paddingHorizontal: 10,
   },
   tabText: {
      fontSize: 12,
      color: '#5b4fb3',
      marginTop: 3,
   },
   searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 20,
      elevation: 3,
   },
   searchIcon: {
      marginRight: 5,
   },
   searchInput: {
      flex: 1,
      height: 40,
      color: '#333',
   },
   card: {
      backgroundColor: '#ffeef1',
      borderRadius: 15,
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 4,
      marginBottom: 20,
      height: "75%"
   },
   title: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 10,
      color: '#333',
   },
   image: {
      width: '100%',
      height: 120,
      borderRadius: 10,
      marginBottom: 10,
   },
   info: {
      marginVertical: 8,
   },
   infoText: {
      fontSize: 14,
      color: '#333',
      marginVertical: 2,
   },
   description: {
      fontSize: 14,
      marginTop: 10,
      color: '#333',
   },
   bold: {
      fontWeight: 'bold',
   },
   place: {
      fontSize: 14,
      color: '#b74a00',
      marginTop: 8,
      fontWeight: 'bold',
   },
   boldRed: {
      color: '#ff4500',
      fontWeight: 'bold',
   },
   button: {
      backgroundColor: '#00994d',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 8,
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
   },
   arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
   },
});