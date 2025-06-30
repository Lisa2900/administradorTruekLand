import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { collection, onSnapshot, updateDoc, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from './firebaseConfig';
import moment from 'moment';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { AdminStackNavigationProp } from './navigationTypes';

interface Post {
  id: string;
  title: string;
  desc: string;
  createdAt: string;
  isAuthorized: boolean;
  images?: string[];
}

export default function AdminPostScreen() {
  const [authorizedPosts, setAuthorizedPosts] = useState<Post[]>([]);
  const [unauthorizedPosts, setUnauthorizedPosts] = useState<Post[]>([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'authorized', title: 'Autorizadas' },
    { key: 'unauthorized', title: 'No Autorizadas' },
  ]);
  const db = getFirestore(app);
  const navigation = useNavigation<AdminStackNavigationProp>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "UserPost"), (querySnapshot) => {
      const posts: Post[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, 'id'>),
      }));

      const authorized = posts.filter(post => post.isAuthorized);
      const unauthorized = posts.filter(post => !post.isAuthorized);

      setAuthorizedPosts(authorized);
      setUnauthorizedPosts(unauthorized);
    }, (error) => {
      Alert.alert("Error", "Error al cargar los datos.");
    });

    return () => unsubscribe();
  }, [db]);

  const authorizePost = async (postId: string) => {
    try {
      await updateDoc(doc(db, "UserPost", postId), { isAuthorized: true });
      Alert.alert("Éxito", "Publicación autorizada");
    } catch (error) {
      Alert.alert("Error", "Error al autorizar la publicación.");
    }
  };

  const rejectPost = async (postId: string) => {
    try {
      await updateDoc(doc(db, "UserPost", postId), { isAuthorized: false });
      Alert.alert("Éxito", "Publicación rechazada");
    } catch (error) {
      Alert.alert("Error", "Error al rechazar la publicación.");
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "UserPost", postId));
      Alert.alert("Éxito", "Publicación eliminada");
    } catch (error) {
      Alert.alert("Error", "Error al eliminar la publicación.");
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("PostDetailScreen", { post: item })}
    >
      {item.images && item.images.length > 0 ? (
        <Image source={{ uri: item.images[0] }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.desc}</Text>
      <Text>{moment(item.createdAt).format("D MMM YYYY")}</Text>
      <View style={styles.buttonContainer}>
        {!item.isAuthorized ? (
          <TouchableOpacity style={styles.button} onPress={() => authorizePost(item.id)}>
            <Text style={styles.buttonText}>Autorizar</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={() => rejectPost(item.id)}>
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deletePost(item.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderAuthorizedPosts = () => (
    <FlatList
      data={authorizedPosts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay publicaciones autorizadas.</Text>}
    />
  );

  const renderUnauthorizedPosts = () => (
    <FlatList
      data={unauthorizedPosts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay publicaciones no autorizadas.</Text>}
    />
  );

  const renderScene = SceneMap({
    authorized: renderAuthorizedPosts,
    unauthorized: renderUnauthorizedPosts,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 360 }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0096c7",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
