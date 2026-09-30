import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://192.168.1.146:3000';
type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

export default function App() {
  const [productos, setProductos] =
    useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const cargarProductos = async () => {
    try {
      const r = await fetch(API_URL + '/productos');
      setProductos(await r.json());
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const crearProducto = async () => {
    try {
      await fetch(API_URL + '/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          precio: Number(precio),
        }),
      });

      setNombre('');
      setPrecio('');
      await cargarProductos();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🛒 Mini tienda</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Button
        title="Añadir producto"
        onPress={crearProducto}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nombre}</Text>
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  card: {
    padding: 14,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: '#EEF4FF',
  },
});