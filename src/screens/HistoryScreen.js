import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function HistoryScreen({ navigation }) {
  const { theme, history, removeCity, clearHistory } = useApp();

  const handleCityPress = (city) => {
    navigation.navigate('Buscar', { screen: 'Home', params: { searchCity: city } });
  };

  const confirmClear = () => {
    Alert.alert('Limpar histórico', 'Deseja remover todas as cidades?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearHistory },
    ]);
  };

  if (history.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.bg }]}>
        <Text style={styles.emptyIcon}>🕓</Text>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>Nenhum histórico ainda</Text>
        <Text style={[styles.emptySubtitle, { color: theme.subText }]}>
          As cidades que você buscar aparecerão aqui
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Histórico</Text>
        <TouchableOpacity onPress={confirmClear}>
          <Text style={[styles.clearBtn, { color: '#ef4444' }]}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity style={styles.cityName} onPress={() => handleCityPress(item)}>
              <Text style={styles.cityIcon}>📍</Text>
              <Text style={[styles.cityText, { color: theme.text }]}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeCity(item)}>
              <Text style={styles.removeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '700' },
  clearBtn: { fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  cityName: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cityIcon: { fontSize: 16, marginRight: 10 },
  cityText: { fontSize: 16, fontWeight: '500' },
  removeIcon: { fontSize: 16, color: '#94a3b8', paddingLeft: 12 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center' },
});
