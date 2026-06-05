const API_KEY = process.env.EXPO_PUBLIC_API_KEY_WEATHER;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`
  );
  if (!response.ok) {
    if (response.status === 404) throw new Error('Cidade não encontrada.');
    throw new Error('Erro ao buscar dados. Tente novamente.');
  }
  return response.json();
};

export const fetchForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`
  );
  if (!response.ok) {
    if (response.status === 404) throw new Error('Cidade não encontrada.');
    throw new Error('Erro ao buscar previsão. Tente novamente.');
  }
  return response.json();
};

export const getWeatherIcon = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
