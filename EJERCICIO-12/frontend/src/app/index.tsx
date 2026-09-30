import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http:// 192.168.1.146:3000';

type Criatura = {
  id: number;
  nombre: string;
  nivel: number;
  poder: number;
  likes: number;
  emoji: string;
};

export default function App() {
  const [criaturas, setCriaturas] =
    useState<Criatura[]>([]);
  const [seleccionada, setSeleccionada] =
    useState<Criatura | null>(null);

  const cargarCriaturas = async () => {
    try {
      const r = await fetch(API_URL + '/criaturas');
      setCriaturas(await r.json());
    } catch (error) {
      console.error('Error al cargar criaturas:', error);
    }
  };

  const seleccionar = async (id: number) => {
    try {
      const r = await fetch(
        API_URL + '/criaturas/' + id
      );
      setSeleccionada(await r.json());
    } catch (error) {
      console.error('Error al seleccionar criatura:', error);
    }
  };

  const darLike = async () => {
    if (!seleccionada) return;

    try {
      const r = await fetch(
        API_URL +
          '/criaturas/' +
          seleccionada.id +
          '/like',
        { method: 'PATCH' }
      );

      const actualizada = await r.json();
      setSeleccionada(actualizada);
      await cargarCriaturas();
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  useEffect(() => {
    cargarCriaturas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        🧪 Creature Lab
      </Text>

      {seleccionada && (
        <View style={styles.hero}>
          <Text style={styles.emoji}>
            {seleccionada.emoji}
          </Text>
          <Text style={styles.name}>
            {seleccionada.nombre}
          </Text>
          <Text style={styles.details}>
            Nivel {seleccionada.nivel}
            {' · '}Poder {seleccionada.poder}
          </Text>
          <Text style={styles.likes}>❤️ {seleccionada.likes}</Text>
          <Button
            title="❤️ Me gusta"
            onPress={darLike}
          />
        </View>
      )}

      <FlatList
        data={criaturas}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => seleccionar(item.id)}
          >
            <Text style={styles.itemEmoji}>
              {item.emoji}
            </Text>
            <Text style={styles.itemName}>{item.nombre}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
  },
  hero: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#EEF4FF',
    marginBottom: 20,
  },
  emoji: { fontSize: 48 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  details: { fontSize: 16, color: '#334155', marginBottom: 6 },
  likes: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  item: {
    width: 110,
    padding: 12,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemEmoji: { fontSize: 30, marginBottom: 4 },
  itemName: { fontWeight: '600', color: '#1E293B' },
});