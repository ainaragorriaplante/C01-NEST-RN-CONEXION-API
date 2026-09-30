import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.22.26.116:3000';

export default function App() {
  const [mensaje, setMensaje] =
    useState('Cargando…');

  const cargarMensaje = async () => {
    const respuesta = await fetch(
      API_URL + '/mensaje'
    );
    const datos = await respuesta.json();
    setMensaje('🟢 ' + datos.texto);
  };

  useEffect(() => {
    cargarMensaje();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Full Stack Status
      </Text>
      <Text style={styles.status}>{mensaje}</Text>
      <Button
        title="Recargar"
        onPress={cargarMensaje}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
});
