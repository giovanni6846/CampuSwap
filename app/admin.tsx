import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles/admin/styles_admin";
import { useRouter } from 'expo-router';
import { All_activities } from '../functions/Find_Activities';
import Toast from 'react-native-root-toast';
import { moderation } from '../functions/Moderer_app';
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

const { width } = Dimensions.get('window');

interface Activities_Response_Api {
   _id: string;
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
   const [motif, setMotif] = useState("");

   const onEntry = async () => {
      try {
         const response = await All_activities();
         setActivities(response);
      } catch (error) {
         console.error("Erreur lors du chargement :", error);
      } finally {
         setLoading(false);
      }
   };

   const moderer = async (id_activities: string) => {
      try {
         if (motif === ""){
            Toast.show(`Veuillez renseigner un motif de modération`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: 'red',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
         } else {
            const id_user = await asyncStorage.getItem("user_id");
            const ctrl = await moderation(id_user, id_activities, motif, false);
            if (ctrl){
               Toast.show(`Modération réussite`, {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.TOP,
                  backgroundColor: 'green',
                  textColor: 'white',
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
               });
               await onEntry()
            } else {
               Toast.show(`Echec de la modération`, {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.TOP,
                  backgroundColor: 'red',
                  textColor: 'white',
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
               });
            }
         }
      } catch (error) {
         console.error("Erreur lors du chargement :", error);
      }
   };

   const bannir = async (id_activities: string) => {
      try {
         if (motif === ""){
            Toast.show(`Veuillez renseigner un motif de modération`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: 'red',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
         } else {
            const id_user = await asyncStorage.getItem("user_id");
            const ctrl = await moderation(id_user, id_activities, motif, true);
            if (ctrl){
               Toast.show(`Modération réussite`, {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.TOP,
                  backgroundColor: 'green',
                  textColor: 'white',
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
               });
               await onEntry()
            } else {
               Toast.show(`Echec de la modération`, {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.TOP,
                  backgroundColor: 'red',
                  textColor: 'white',
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
               });
            }
         }
      } catch (error) {
         console.error("Erreur lors du chargement :", error);
      }
   };

   useEffect(() => {
      onEntry();
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
            <TouchableOpacity style={styles.tabItem}>
               <Icon name="star-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>Utilisateurs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tabItem, styles.activeTab]} onPress={() => onEntry()}>
               <Icon name="time-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>Activités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
               <Icon name="person-outline" size={22} color="#5b4fb3" />
               <Text style={styles.tabText}>User</Text>
            </TouchableOpacity>
         </View>

         {/* Carrousel horizontal */}
         <FlatList
            data={filteredActivities}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
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

                  <Text style={styles.description}>
                     <Text style={styles.bold}>Auteur : </Text>
                     {item.user_created}
                  </Text>

                  <View style={styles.button_moderer}>
                     <TouchableOpacity onPress={() => moderer(item._id)}>
                        <Text style={styles.bold}> Modérer </Text>
                     </TouchableOpacity>
                  </View>

                     <View style={styles.button_bannir}>
                        <TouchableOpacity onPress={() => bannir(item._id)}>
                           <Text style={styles.bold}> Modérer & Bannir </Text>
                        </TouchableOpacity>
                     </View>
                  <View style={[styles.searchContainer, { marginHorizontal: 15 }]}>
                     <TextInput
                        style={styles.searchInput}
                        placeholder="Motif"
                        placeholderTextColor="#999"
                        value={motif}
                        onChangeText={setMotif}
                     />
                  </View>
               </View>
            )}
         />
      </View>
   );
}
