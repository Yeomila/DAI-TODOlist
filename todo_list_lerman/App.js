import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, FlatList, StyleSheet, CheckBox } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregar = () => {
    if (tarea.trim() !== '') {
      setTareas([...tareas, { id: Date.now(), text: tarea, completed: false }]);
      setTarea('');
    }
  };

  const eliminar = (id) => {setTareas(tareas.filter((tarea) => tarea.id !== id));};

  const completada = (id) => {setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea));};

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Agregar tarea c:" value={tarea} onChangeText={(text) => setTarea(text)}/>
      <Button title="Agregar tarea" onPress={agregar}/>

      <FlatList
        style={styles.taskList}
        data={tareas}

        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <CheckBox value={item.completed} onValueChange={() => completada(item.id)}/>
            <Text style={item.completed ? styles.completedTask : styles.taskText}> {item.text}</Text>
            <Button title="Eliminar" onPress={() => eliminar(item.id)} color="red" />
          </View>
        )}

        keyExtractor={(item) => item.id.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4d64d6',
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  taskList: {
    marginTop: 20,
  },

  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },

  taskText: {
    flex: 1,
    marginLeft: 10,
  },

  completedTask: {
    flex: 1,
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
});
