import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { fetchForecast, getWeatherIcon } from '../services/weatherApi';

function groupByDay(list) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days).slice(0, 5);
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' });
}

export default function ForecastScreen({ route }) {
  const { city } = route.params;
  const { theme } = useApp();
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchForecast(city);
        setForecast(groupByDay(data.list));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [city]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={[styles.loadingText, { color: theme.subText }]}>Carregando previsão...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.bg }]}>
        <Text style={[styles.errorText, { color: '#dc2626' }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Previsão — {city}</Text>
      <FlatList
        data={forecast}
        keyExtractor={([date]) => date}
        contentContainerStyle={styles.list}
        renderItem={({ item: [date, items] }) => {
          const noon = items.find((i) => i.dt_txt.includes('12:00')) || items[0];
          const maxTemp = Math.round(Math.max(...items.map((i) => i.main.temp_max)));
          const minTemp = Math.round(Math.min(...items.map((i) => i.main.temp_min)));
          const desc =
            noon.weather[0].description.charAt(0).toUpperCase() +
            noon.weather[0].description.slice(1);

          return (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.dateText, { color: theme.subText }]}>
                {formatDate(date)}
              </Text>
              <View style={styles.row}>
                <Image
                  source={{ uri: getWeatherIcon(noon.weather[0].icon) }}
                  style={styles.icon}
                />
                <View style={styles.info}>
                  <Text style={[styles.desc, { color: theme.text }]}>{desc}</Text>
                  <Text style={[styles.humidity, { color: theme.subText }]}>
                    Umidade: {noon.main.humidity}%
                  </Text>
                </View>
                <View style={styles.temps}>
                  <Text style={[styles.maxTemp, { color: theme.text }]}>{maxTemp}°</Text>
                  <Text style={[styles.minTemp, { color: theme.subText }]}>{minTemp}°</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', paddingHorizontal: 20, marginBottom: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  dateText: { fontSize: 13, fontWeight: '600', marginBottom: 10, textTransform: 'capitalize' },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 52, height: 52 },
  info: { flex: 1, marginLeft: 8 },
  desc: { fontSize: 15, fontWeight: '500' },
  humidity: { fontSize: 13, marginTop: 2 },
  temps: { alignItems: 'flex-end' },
  maxTemp: { fontSize: 22, fontWeight: '700' },
  minTemp: { fontSize: 16 },
  loadingText: { marginTop: 12 },
  errorText: { fontSize: 16, fontWeight: '600' },
});
