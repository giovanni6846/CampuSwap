import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles/menu/styles_menu";
import { All_activities } from '../functions/Find_Activities';
import { Navigator, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inscription } from '../functions/Inscription_app';
import Toast from 'react-native-root-toast';
import { Sync } from '../functions/Sync';
import { RootSiblingParent } from 'react-native-root-siblings';
import Slot = Navigator.Slot;
import { Test } from '../functions/Test';

const { width } = Dimensions.get('window'); // 🔹 largeur écran pour le rendu plein écran

interface Activities_Response_Api {
   _id: string;
   name: string;
   datdeb: string;
   datfin: string;
   seat: string;
   user_created: string;
   description: string;
}

export default function ActivityScreen() {
   const router = useRouter();
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(true);
   const [activities, setActivities] = useState<Activities_Response_Api[]>([]);

   const inscription = async (id:string) => {
      await Test();
      if (await AsyncStorage.getItem('connected') === 'true') {
         const response = await Inscription(await AsyncStorage.getItem('user_id'), id);
         console.log(response);
         if (response && response.activity) {
            Toast.show('✅ Inscription validée !', {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: '#28a745', // vert
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
            await Sync();
            await fetchActivities();
         } else {
            Toast.show(`❌ Erreur lors de l’inscription: ${response.message}`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: '#e74c3c',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
            });
         }
      } else {
         Toast.show(`Vous aller passer en mode hors-ligne`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: 'orange',
            textColor: 'white',
            shadow: true,
            animation: true,
            hideOnPress: true,
         });
         router.replace('/activities');
      }
   };

   const fetchActivities = async () => {
      try {
         const response = await All_activities();
         setActivities(response);
      } catch (error) {
         console.error("Erreur lors du chargement :", error);
      } finally {
         setLoading(false);
      }
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

            <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
               <Icon name="time-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>Activités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('./user')}>
               <Icon name="person-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>User</Text>
            </TouchableOpacity>
         </View>

         {/* Barre de recherche */}
         <View style={[styles.searchContainer, { marginHorizontal: 15 }]}>
            <Icon name="search-outline" size={20} color="#aaa" style={styles.searchIcon} />
            <TextInput
               style={styles.searchInput}
               placeholder="Recherche Activités ..."
               placeholderTextColor="#999"
               value={search}
               onChangeText={setSearch}
            />
         </View>
         {/* Carrousel horizontal */}
         <FlatList
            data={filteredActivities}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled // 🔹 rend le scroll par “page”
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <View style={[styles.card, { width: width - 30, marginHorizontal: 15 }]}>
                  <Text style={styles.title}>{item.name}</Text>

                  <Image
                     source={{ uri: 'https://picsum.photos/400/200?random=' + item._id }}
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

                  <Text style={styles.place}>
                     <Icon name="alert-circle-outline" size={14} />  Place disponible :{' '}
                     <Text style={parseInt(item.seat, 10) > 0 ? styles.bold : styles.boldRed}>
                        {item.seat}
                     </Text>
                  </Text>

                  <Text style={styles.description}>
                     <Text style={styles.bold}>Auteur : </Text>
                     {item.user_created}
                  </Text>

                  <TouchableOpacity
                     style={[
                        styles.button,
                        { backgroundColor: parseInt(item.seat, 10) > 0 ? '#00994d' : '#ccc' },
                     ]}
                     disabled={parseInt(item.seat, 10) === 0}
                     onPress={() => inscription(item._id)}
                  >
                     <Text style={styles.buttonText}>
                        {parseInt(item.seat, 10) > 0 ? "S'inscrire" : "Complet"}
                     </Text>
                  </TouchableOpacity>
               </View>
            )}
         />
      </View>
   );
}
