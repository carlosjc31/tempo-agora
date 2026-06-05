import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { getWeatherIcon } from '../services/weatherApi';

export default function WeatherCard({ data }) {
  const { theme } = useApp();

  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const description =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.city, { color: theme.text }]}>
        {data.name}, {data.sys.country}
      </Text>

      <View style={styles.mainRow}>
        <Image
          source={{ uri: getWeatherIcon(data.weather[0].icon) }}
          style={styles.icon}
        />
        <Text style={[styles.temp, { color: theme.text }]}>{temp}°C</Text>
      </View>

      <Text style={[styles.description, { color: theme.subText }]}>{description}</Text>

      <View style={styles.detailsRow}>
        <DetailItem label="Sensação" value={`${feels}°C`} theme={theme} />
        <DetailItem label="Umidade" value={`${data.main.humidity}%`} theme={theme} />
        <DetailItem label="Vento" value={`${Math.round(data.wind.speed * 3.6)} km/h`} theme={theme} />
      </View>
    </View>
  );
}

function DetailItem({ label, value, theme }) {
  return (
    <View style={styles.detailItem}>
      <Text style={[styles.detailValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.detailLabel, { color: theme.subText }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  city: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  temp: {
    fontSize: 64,
    fontWeight: '300',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
