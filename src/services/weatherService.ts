import { WeatherData } from "../types";

export async function fetchWeather(): Promise<WeatherData> {
  try {
    // We'll use a default location (Seoul) if geolocation is not available, 
    // or try to get user's location.
    const lat = 37.5665;
    const lon = 126.978;
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();
    
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    
    // Map weather codes to strings
    // 0: Clear, 1-3: Partly Cloudy, 45-48: Fog, 51-67: Rain/Drizzle, 71-86: Snow, 95-99: Thunderstorm
    let condition = "맑음";
    if (code >= 1 && code <= 3) condition = "구름 조금";
    else if (code >= 45 && code <= 48) condition = "안개";
    else if (code >= 51 && code <= 67) condition = "비";
    else if (code >= 71 && code <= 86) condition = "눈";
    else if (code >= 95) condition = "뇌우";

    let advice = "오늘의 날씨는 식물들이 자라기에 아주 좋습니다.";
    if (temp > 30) advice = "날씨가 매우 덥습니다. 물을 더 자주 주시고 직사광선을 피해주세요.";
    if (temp < 5) advice = "날씨가 춥습니다. 실내로 옮기거나 보온에 신경 써주세요.";
    if (condition === "비") advice = "비가 오니 과습에 주의하시고 실외 식물은 배수를 확인해주세요.";

    return {
      temp,
      condition,
      humidity: 0, // Open-Meteo current_weather doesn't give humidity by default in simple call
      advice
    };
  } catch (error) {
    console.error("Weather fetch failed", error);
    return {
      temp: 20,
      condition: "맑음",
      humidity: 50,
      advice: "날씨 정보를 불러올 수 없지만, 식물 관리는 꾸준히 해주세요!"
    };
  }
}
