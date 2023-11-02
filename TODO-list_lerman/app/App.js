import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    const [showAppOptions, setShowAppOptions] = useState(false);
    
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 50}}>To do list!</Text>
      <Link href="/modal">Agregar tarea</Link>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontStyle: 'Times new roman'

  },

  input: {height: 40, borderWidth: 2, padding: 1,},
});
