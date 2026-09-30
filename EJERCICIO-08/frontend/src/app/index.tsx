import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.17.21.76:3000';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
};

export default function App() {
  const [productos, setProductos] =
    useState<Producto[]>([]);

  const cargarProductos = async () => {
    const respuesta = await fetch(
      API_URL + '/productos'
    );
    setProductos(await respuesta.json());
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍴 Food Lab</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              {item.emoji} {item.nombre}
            </Text>
            <Text>{item.precio} €</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
  },
});