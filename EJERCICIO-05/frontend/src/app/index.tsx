import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://192.168.1.146:3000';

export default function App() {
  const cargarMensaje = async () => {
    try {
      const respuesta = await fetch(
        API_URL + '/mensaje'
      );

      const datos = await respuesta.json();
      console.log(datos);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Mi primera conexión</Text>

      <Button
        title="Conectar con Nest"
        onPress={cargarMensaje}
      />
    </SafeAreaView>
  );
}
