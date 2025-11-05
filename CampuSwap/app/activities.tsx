import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles/activities/styles_menu";
import { All_activities } from '../functions/Find_Activities';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inscription } from '../functions/Inscription_app';
import Toast from 'react-native-root-toast';
import { read } from '../database/read';
import { Test } from '../functions/Test';


const { width } = Dimensions.get('window'); // 🔹 largeur écran pour le rendu plein écran

interface Activities_Response_Api {
   id: string;
   name: string;
   datdeb: string;
   datfin: string;
   user_created: string;
   description: string;
}

export default function ActivityScreen() {
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
   const [activities, setActivities] = useState<Activities_Response_Api[]>([]);

   const fetchActivities = async () => {
      try {
         const response = await read();
         setActivities(response);
      } catch (error) {
         console.error("Erreur lors du chargement :", error);
      } finally {
         setLoading(false);
      }
   };

   const menu = async () => {
      if (await AsyncStorage.getItem('connected') === 'true'){
         if ( await AsyncStorage.getItem('log') === 'true'){
            router.replace('/menu');
         } else {
            router.replace('/login');
         }
      } else {
         await Test();
         if ((await AsyncStorage.getItem('connected') === 'true')){
            Toast.show(`Veuillez-vous connecter`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: '#28a745',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
            router.replace('/login');
         }
      }
   };

   const user = async () => {

   };



   useEffect(() => {
      fetchActivities();
   }, []);

   if (loading) {
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5b4fb3" />
            <Text>Chargement des activités...</Text>
         </View>
      );
   }

   const filteredActivities = activities.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <View style={[styles.container, { paddingHorizontal: 0 }]}>
         {/* Barre d’onglets */}
         <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('./activities')}>
               <Icon name="star-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>Mes activités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tabItem, styles.activeTab]} onPress={menu}>
               <Icon name="time-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>Activités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={user}>
               <Icon name="person-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>User</Text>
            </TouchableOpacity>
         </View>

         {/* Carrousel horizontal */}
         <FlatList
            data={filteredActivities}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled // 🔹 rend le scroll par “page”
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <View style={[styles.card, { width: width - 30, marginHorizontal: 15 }]}>
                  <Text style={styles.title}>{item.name}</Text>

                  <Image
                     source={{ uri: 'https://picsum.photos/400/200?random=' + item.id }}
                     style={styles.image}
                  />

                  <View style={styles.info}>
                     <Text style={styles.infoText}>
                        <Icon name="calendar-outline" size={14} />  Date :{' '}
                        {new Date(item.datdeb).toLocaleDateString()}
                     </Text>
                     <Text style={styles.infoText}>
                        <Icon name="time-outline" size={14} />  Heure :{' '}
                        {new Date(item.datdeb).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                        {new Date(item.datfin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </Text>
                  </View>

                  <Text style={styles.description}>
                     <Text style={styles.bold}>Description : </Text>
                     {item.description}
                  </Text>

                  <Text style={styles.description}>
                     <Text style={styles.bold}>Auteur : </Text>
                     {item.user_created}
                  </Text>
               </View>
            )}
         />
      </View>
   );
}
