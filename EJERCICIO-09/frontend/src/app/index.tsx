import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.17.21.76:3000';

type Heroe = {
  id: number;
  nombre: string;
  poder: number;
  universo: string;
};

export default function App() {
  const [id, setId] = useState('1');
  const [heroe, setHeroe] =
    useState<Heroe | null>(null);

  const buscarHeroe = async () => {
    const respuesta = await fetch(
      API_URL + '/heroes/' + id
    );
    setHeroe(await respuesta.json());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        🦸 Busca superhéroe
      </Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscarHeroe} />
      {heroe && (
        <Text style={styles.result}>
          {heroe.nombre} · Poder {heroe.poder}
          {'\n'}Universo {heroe.universo}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: '700' },
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 16,
    borderRadius: 10,
  },
  result: { marginTop: 20, fontSize: 18 },
});