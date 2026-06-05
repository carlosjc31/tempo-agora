import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { fetchCurrentWeather } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';

export default function HomeScreen({ navigation }) {
  const { theme, addCity } = useApp();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchCity) => {
    const target = searchCity || city;
    if (!target.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const data = await fetchCurrentWeather(target);
      setWeather(data);
      addCity(data.name);
      setCity('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.bg }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>Tempo Agora</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Digite uma cidade para ver o clima
        </Text>

        <View style={styles.searchRow}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border },
            ]}
            placeholder="Ex: São Paulo, Londres..."
            placeholderTextColor={theme.subText}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={() => handleSearch()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator size="large" color={theme.accent} style={styles.loader} />
        )}

        {error !== '' && (
          <View style={[styles.errorBox, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {weather && (
          <>
            <WeatherCard data={weather} />
            <TouchableOpacity
              style={[styles.forecastButton, { borderColor: theme.accent }]}
              onPress={() => navigation.navigate('Forecast', { city: weather.name })}
            >
              <Text style={[styles.forecastButtonText, { color: theme.accent }]}>
                Ver previsão dos próximos 5 dias →
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  button: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  loader: {
    marginTop: 40,
  },
  errorBox: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  errorText: {
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
  },
  forecastButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  forecastButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
});
