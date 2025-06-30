import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdminStackNavigationProp } from './navigationTypes';

const { width } = Dimensions.get("window");

interface Post {
  id: string;
  title: string;
  desc: string;
  images?: string[];
  createdAt: string;
  isAuthorized: boolean;
}

const styles = StyleSheet.create({
  card: {
    width: width - 20, // Restar para dar margen
    height: 250,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    color: "#00b4d8",
  },
  details: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 3,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 10,
    color: "#007bff",
    backgroundColor: "#fff",
    marginTop: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: 70,
    textAlign: "center",
  },
});

interface Props {
  item: Post;
}

export default function PostItem({ item }: Props) {
  const navigation = useNavigation<AdminStackNavigationProp>();

  const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("PostDetailScreen", {
          post: item,
        })
      }
      activeOpacity={0.7} // Añadido para mejorar la experiencia del usuario
    >
      {firstImage && (
        <Image
          source={{ uri: firstImage }}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.details} numberOfLines={3}>
          <Text style={styles.detailLabel}>Descripción:</Text> {item.desc}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.detailLabel}>Fecha:</Text> {item.createdAt}
        </Text>
        <Text style={styles.category}>{item.isAuthorized ? "Autorizado" : "No Autorizado"}</Text>
      </View>
    </TouchableOpacity>
  );
}
