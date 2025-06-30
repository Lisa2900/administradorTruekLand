import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from './navigationTypes';

type PostDetailScreenRouteProp = RouteProp<AdminStackParamList, 'PostDetailScreen'>;

interface Props {
  route: PostDetailScreenRouteProp;
}

const PostDetailScreen: React.FC<Props> = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.image} />
      )}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.desc}>{post.desc}</Text>
      <Text style={styles.date}>{moment(post.createdAt).format('D MMM YYYY')}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Cambio:</Text> {post.cambio || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Categoría:</Text> {post.category || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Ubicación:</Text> {post.location || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>ID del Producto:</Text> {post.productId || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Estado:</Text> {post.status || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Teléfono:</Text> {post.telefono || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Correo del Usuario:</Text> {post.userEmail || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Nombre del Usuario:</Text> {post.userName || "N/A"}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Autorizado:</Text> {post.isAuthorized ? "Sí" : "No"}</Text>
      {post.userImage ? <Image source={{ uri: post.userImage }} style={styles.userImage} /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PostDetailScreen;
