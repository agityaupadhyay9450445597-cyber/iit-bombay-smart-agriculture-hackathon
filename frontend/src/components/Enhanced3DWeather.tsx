import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Gauge,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Umbrella,
  Sunrise,
  Sunset,
  Navigation,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const Enhanced3DWeather = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock weather data with enhanced details
  const [weatherData, setWeatherData] = useState({
    current: {
      location: "Delhi, India",
      coordinates: "28.6139°N, 77.2090°E",
      temperature: 28,
      feelsLike: 32,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      windDirection: "NW",
      pressure: 1013,
      visibility: 8,
      uvIndex: 6,
      dewPoint: 18,
      cloudCover: 40,
      sunrise: "06:45",
      sunset: "18:30",
      moonPhase: "Waxing Crescent",
      airQuality: "Moderate",
      aqi: 85,
      lastUpdated: "2 mins ago"
    },
    hourly: [
      { time: "12:00", temp: 28, condition: "sunny", humidity: 65, wind: 12, rain: 0 },
      { time: "13:00", temp: 30, condition: "partly-cloudy", humidity: 62, wind: 14, rain: 0 },
      { time: "14:00", temp: 32, condition: "partly-cloudy", humidity: 58, wind: 16, rain: 0 },
      { time: "15:00", temp: 34, condition: "cloudy", humidity: 55, wind: 18, rain: 10 },
      { time: "16:00", temp: 31, condition: "rainy", humidity: 70, wind: 20, rain: 60 },
      { time: "17:00", temp: 29, condition: "rainy", humidity: 75, wind: 15, rain: 40 },
      { time: "18:00", temp: 27, condition: "cloudy", humidity: 68, wind: 12, rain: 20 },
      { time: "19:00", temp: 25, condition: "partly-cloudy", humidity: 65, wind: 10, rain: 0 }
    ],
    weekly: [
      { day: "Today", high: 34, low: 25, condition: "rainy", humidity: 70, wind: 15, rain: 60 },
      { day: "Tomorrow", high: 32, low: 24, condition: "partly-cloudy", humidity: 65, wind: 12, rain: 20 },
      { day: "Sunday", high: 35, low: 26, condition: "sunny", humidity: 55, wind: 10, rain: 0 },
      { day: "Monday", high: 33, low: 25, condition: "cloudy", humidity: 68, wind: 14, rain: 30 },
      { day: "Tuesday", high: 31, low: 23, condition: "rainy", humidity: 75, wind: 18, rain: 80 },
      { day: "Wednesday", high: 29, low: 22, condition: "rainy", humidity: 80, wind: 20, rain: 90 },
      { day: "Thursday", high: 32, low: 24, condition: "partly-cloudy", humidity: 62, wind: 12, rain: 10 }
    ],
    alerts: [
      { type: "warning", message: "Heavy rainfall expected between 3-6 PM", severity: "moderate" },
      { type: "info", message: "UV Index high - Use sun protection", severity: "low" },
      { type: "advisory", message: "Good conditions for irrigation after 6 PM", severity: "low" }
    ],
    farmingAdvice: {
      irrigation: "Recommended after 6 PM when rain stops",
      planting: "Good conditions for monsoon crops",
      harvesting: "Avoid harvesting during rain hours (3-6 PM)",
      spraying: "Not recommended due to wind and rain",
      fieldWork: "Limited field work recommended today"
    }
  });

  // Indian cities with agricultural importance
  const cities = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Ahmedabad", "Ludhiana", "Indore", "Nagpur", "Kanpur",
    "Lucknow", "Patna", "Bhopal", "Jaipur", "Chandigarh", "Coimbatore"
  ];

  // State-wise Rainfall Data (Annual Average in mm)
  const [stateRainfallData, setStateRainfallData] = useState([
    { state: "Andhra Pradesh", rainfall: 940, monsoon: 75, winter: 15, summer: 10, trend: "stable", color: "bg-blue-500" },
    { state: "Arunachal Pradesh", rainfall: 2782, monsoon: 80, winter: 10, summer: 10, trend: "increasing", color: "bg-blue-700" },
    { state: "Assam", rainfall: 2818, monsoon: 85, winter: 8, summer: 7, trend: "increasing", color: "bg-blue-700" },
    { state: "Bihar", rainfall: 1205, monsoon: 85, winter: 5, summer: 10, trend: "decreasing", color: "bg-blue-400" },
    { state: "Chhattisgarh", rainfall: 1292, monsoon: 90, winter: 5, summer: 5, trend: "stable", color: "bg-blue-500" },
    { state: "Goa", rainfall: 3005, monsoon: 95, winter: 2, summer: 3, trend: "stable", color: "bg-blue-800" },
    { state: "Gujarat", rainfall: 803, monsoon: 85, winter: 5, summer: 10, trend: "decreasing", color: "bg-blue-300" },
    { state: "Haryana", rainfall: 617, monsoon: 75, winter: 15, summer: 10, trend: "stable", color: "bg-blue-200" },
    { state: "Himachal Pradesh", rainfall: 1251, monsoon: 70, winter: 20, summer: 10, trend: "increasing", color: "bg-blue-500" },
    { state: "Jharkhand", rainfall: 1341, monsoon: 85, winter: 5, summer: 10, trend: "stable", color: "bg-blue-500" },
    { state: "Karnataka", rainfall: 1139, monsoon: 75, winter: 15, summer: 10, trend: "decreasing", color: "bg-blue-400" },
    { state: "Kerala", rainfall: 3055, monsoon: 85, winter: 10, summer: 5, trend: "stable", color: "bg-blue-800" },
    { state: "Madhya Pradesh", rainfall: 1178, monsoon: 90, winter: 5, summer: 5, trend: "stable", color: "bg-blue-400" },
    { state: "Maharashtra", rainfall: 1181, monsoon: 85, winter: 10, summer: 5, trend: "decreasing", color: "bg-blue-400" },
    { state: "Manipur", rainfall: 1467, monsoon: 80, winter: 10, summer: 10, trend: "stable", color: "bg-blue-500" },
    { state: "Meghalaya", rainfall: 2818, monsoon: 85, winter: 10, summer: 5, trend: "increasing", color: "bg-blue-700" },
    { state: "Mizoram", rainfall: 2390, monsoon: 85, winter: 10, summer: 5, trend: "stable", color: "bg-blue-600" },
    { state: "Nagaland", rainfall: 1814, monsoon: 80, winter: 15, summer: 5, trend: "stable", color: "bg-blue-600" },
    { state: "Odisha", rainfall: 1482, monsoon: 85, winter: 5, summer: 10, trend: "stable", color: "bg-blue-500" },
    { state: "Punjab", rainfall: 649, monsoon: 75, winter: 15, summer: 10, trend: "decreasing", color: "bg-blue-200" },
    { state: "Rajasthan", rainfall: 531, monsoon: 85, winter: 10, summer: 5, trend: "decreasing", color: "bg-blue-100" },
    { state: "Sikkim", rainfall: 3357, monsoon: 85, winter: 10, summer: 5, trend: "increasing", color: "bg-blue-800" },
    { state: "Tamil Nadu", rainfall: 998, monsoon: 60, winter: 30, summer: 10, trend: "stable", color: "bg-blue-400" },
    { state: "Telangana", rainfall: 906, monsoon: 80, winter: 15, summer: 5, trend: "stable", color: "bg-blue-300" },
    { state: "Tripura", rainfall: 2663, monsoon: 85, winter: 10, summer: 5, trend: "stable", color: "bg-blue-700" },
    { state: "Uttar Pradesh", rainfall: 1025, monsoon: 85, winter: 10, summer: 5, trend: "stable", color: "bg-blue-400" },
    { state: "Uttarakhand", rainfall: 1611, monsoon: 75, winter: 15, summer: 10, trend: "increasing", color: "bg-blue-600" },
    { state: "West Bengal", rainfall: 1582, monsoon: 85, winter: 10, summer: 5, trend: "stable", color: "bg-blue-500" },
    { state: "Delhi", rainfall: 611, monsoon: 80, winter: 15, summer: 5, trend: "stable", color: "bg-blue-200" },
    { state: "Jammu & Kashmir", rainfall: 1011, monsoon: 60, winter: 30, summer: 10, trend: "increasing", color: "bg-blue-400" }
  ]);

  // Monthly rainfall pattern for selected state
  const [monthlyRainfall, setMonthlyRainfall] = useState([
    { month: "Jan", rainfall: 15, temp: 20 },
    { month: "Feb", rainfall: 18, temp: 23 },
    { month: "Mar", rainfall: 25, temp: 28 },
    { month: "Apr", rainfall: 35, temp: 33 },
    { month: "May", rainfall: 45, temp: 38 },
    { month: "Jun", rainfall: 180, temp: 35 },
    { month: "Jul", rainfall: 220, temp: 32 },
    { month: "Aug", rainfall: 200, temp: 31 },
    { month: "Sep", rainfall: 150, temp: 32 },
    { month: "Oct", rainfall: 45, temp: 30 },
    { month: "Nov", rainfall: 20, temp: 26 },
    { month: "Dec", rainfall: 12, temp: 22 }
  ]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get weather icon based on condition
  const getWeatherIcon = (condition, size = "h-8 w-8") => {
    switch (condition) {
      case 'sunny': return <Sun className={`${size} text-yellow-500`} />;
      case 'partly-cloudy': return <Cloud className={`${size} text-gray-500`} />;
      case 'cloudy': return <Cloud className={`${size} text-gray-600`} />;
      case 'rainy': return <CloudRain className={`${size} text-blue-500`} />;
      case 'snowy': return <CloudSnow className={`${size} text-blue-300`} />;
      default: return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  // Get temperature color
  const getTempColor = (temp) => {
    if (temp >= 35) return 'text-red-600';
    if (temp >= 25) return 'text-orange-500';
    if (temp >= 15) return 'text-green-600';
    return 'text-blue-600';
  };

  // Get AQI color and status
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { color: 'text-green-600', bg: 'bg-green-100', status: 'Good' };
    if (aqi <= 100) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Moderate' };
    if (aqi <= 150) return { color: 'text-orange-600', bg: 'bg-orange-100', status: 'Unhealthy for Sensitive' };
    if (aqi <= 200) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Unhealthy' };
    return { color: 'text-purple-600', bg: 'bg-purple-100', status: 'Very Unhealthy' };
  };

  const aqiStatus = getAQIStatus(weatherData.current.aqi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
            <Cloud className="mr-2 h-4 w-4" />
            Smart Weather Analytics
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            3D Weather Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Real-time weather insights for smart farming decisions</p>
        </div>

        {/* City Selection */}
        <Card className="mb-8 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 text-lg"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2 h-4 w-4" />
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                {currentTime.toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Weather - 3D Style Card */}
        <Card className="mb-8 shadow-2xl border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <CardContent className="p-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Weather Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span className="text-lg">{weatherData.current.location}</span>
                </div>
                <div className="flex items-center mb-6">
                  {getWeatherIcon(weatherData.current.condition.toLowerCase().replace(' ', '-'), "h-16 w-16")}
                  <div className="ml-6">
                    <div className="text-6xl font-bold">{weatherData.current.temperature}°C</div>
                    <div className="text-xl opacity-90">{weatherData.current.condition}</div>
                    <div className="text-sm opacity-75">Feels like {weatherData.current.feelsLike}°C</div>
                  </div>
                </div>
                
                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center mb-1">
                      <Droplets className="h-4 w-4 mr-2" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <div className="text-xl font-bold">{weatherData.current.humidity}%</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center mb-1">
                      <Wind className="h-4 w-4 mr-2" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <div className="text-xl font-bold">{weatherData.current.windSpeed} km/h</div>
                    <div className="text-xs opacity-75">{weatherData.current.windDirection}</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center mb-1">
                      <Gauge className="h-4 w-4 mr-2" />
                      <span className="text-sm">Pressure</span>
                    </div>
                    <div className="text-xl font-bold">{weatherData.current.pressure}</div>
                    <div className="text-xs opacity-75">hPa</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center mb-1">
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="text-sm">Visibility</span>
                    </div>
                    <div className="text-xl font-bold">{weatherData.current.visibility}</div>
                    <div className="text-xs opacity-75">km</div>
                  </div>
                </div>
              </div>

              {/* Sun & Moon Info */}
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Sunrise className="mr-2 h-4 w-4" />
                    Sun & Moon
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sunrise:</span>
                      <span>{weatherData.current.sunrise}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunset:</span>
                      <span>{weatherData.current.sunset}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UV Index:</span>
                      <span className={weatherData.current.uvIndex > 6 ? 'text-red-300' : 'text-green-300'}>
                        {weatherData.current.uvIndex}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moon:</span>
                      <span>{weatherData.current.moonPhase}</span>
                    </div>
                  </div>
                </div>

                {/* Air Quality */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Air Quality
                  </h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{weatherData.current.aqi}</div>
                    <div className={`text-sm px-2 py-1 rounded ${aqiStatus.bg} ${aqiStatus.color} font-semibold`}>
                      {aqiStatus.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast - 3D Chart Style */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              24-Hour Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                  <div className="mb-2">{getWeatherIcon(hour.condition, "h-6 w-6 mx-auto")}</div>
                  <div className={`font-bold ${getTempColor(hour.temp)}`}>{hour.temp}°</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <div>{hour.humidity}%</div>
                    <div>{hour.wind} km/h</div>
                    {hour.rain > 0 && <div className="text-blue-500">{hour.rain}%</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State-wise Rainfall Analytics */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center">
              <Cloud className="mr-2 h-6 w-6" />
              India State-wise Rainfall Analytics (भारत राज्यवार वर्षा विश्लेषण)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Rainfall Statistics Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3,357mm</div>
                <div className="text-sm text-blue-800">Highest (Sikkim)</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">531mm</div>
                <div className="text-sm text-orange-800">Lowest (Rajasthan)</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1,456mm</div>
                <div className="text-sm text-green-800">National Average</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">29</div>
                <div className="text-sm text-purple-800">States Tracked</div>
              </div>
            </div>

            {/* State-wise Rainfall Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stateRainfallData.map((state, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-300 hover:shadow-lg bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{state.state}</h4>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full ${state.color} mr-2`}></div>
                        <span className="text-xs text-gray-600">{state.rainfall}mm/year</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      state.trend === 'increasing' ? 'bg-green-100 text-green-800' : 
                      state.trend === 'decreasing' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {state.trend === 'increasing' ? '↗️' : state.trend === 'decreasing' ? '↘️' : '→'}
                      {state.trend}
                    </div>
                  </div>
                  
                  {/* Rainfall Distribution */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Monsoon:</span>
                      <span className="font-semibold text-blue-600">{state.monsoon}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${state.monsoon}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-1 text-xs mt-2">
                      <div className="text-center">
                        <div className="text-blue-600 font-semibold">{state.monsoon}%</div>
                        <div className="text-gray-500">Monsoon</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-600 font-semibold">{state.winter}%</div>
                        <div className="text-gray-500">Winter</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-600 font-semibold">{state.summer}%</div>
                        <div className="text-gray-500">Summer</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Rainfall Pattern */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Monthly Rainfall Pattern - Delhi NCR</h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {monthlyRainfall.map((month, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{month.month}</div>
                      <div className="relative">
                        <div 
                          className="bg-blue-500 rounded-t mx-auto" 
                          style={{ 
                            height: `${Math.max(month.rainfall / 4, 10)}px`, 
                            width: '20px' 
                          }}
                        ></div>
                        <div className="text-xs font-semibold text-blue-600 mt-1">{month.rainfall}mm</div>
                        <div className="text-xs text-gray-500">{month.temp}°C</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rainfall Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">🌧️ Heavy Rainfall States</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• Sikkim: 3,357mm (Highest)</div>
                  <div>• Kerala: 3,055mm</div>
                  <div>• Goa: 3,005mm</div>
                  <div>• Assam: 2,818mm</div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">🏜️ Low Rainfall States</h4>
                <div className="text-sm text-orange-700 space-y-1">
                  <div>• Rajasthan: 531mm (Lowest)</div>
                  <div>• Delhi: 611mm</div>
                  <div>• Haryana: 617mm</div>
                  <div>• Punjab: 649mm</div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">📈 Rainfall Trends</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• ↗️ Increasing: 7 states</div>
                  <div>• → Stable: 18 states</div>
                  <div>• ↘️ Decreasing: 5 states</div>
                  <div>• Climate change impact visible</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Forecast & Farming Advice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 7-Day Forecast */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                7-Day Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {weatherData.weekly.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium">{day.day}</div>
                      {getWeatherIcon(day.condition, "h-6 w-6")}
                      <div className="text-sm text-gray-600">
                        <div>💧 {day.humidity}%</div>
                        <div>💨 {day.wind} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {day.rain > 0 && (
                        <div className="text-blue-500 text-sm">
                          <Umbrella className="h-4 w-4 inline mr-1" />
                          {day.rain}%
                        </div>
                      )}
                      <div className="text-right">
                        <div className={`font-bold ${getTempColor(day.high)}`}>{day.high}°</div>
                        <div className="text-gray-500 text-sm">{day.low}°</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Farming Advice */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Smart Farming Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-1">💧 Irrigation</h4>
                  <p className="text-sm text-blue-700">{weatherData.farmingAdvice.irrigation}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-1">🌱 Planting</h4>
                  <p className="text-sm text-green-700">{weatherData.farmingAdvice.planting}</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-1">🌾 Harvesting</h4>
                  <p className="text-sm text-yellow-700">{weatherData.farmingAdvice.harvesting}</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-1">🚜 Field Work</h4>
                  <p className="text-sm text-purple-700">{weatherData.farmingAdvice.fieldWork}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Weather Alerts & Advisories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {weatherData.alerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                    alert.severity === 'moderate' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {alert.severity === 'high' ? <AlertTriangle className="h-5 w-5 text-red-600" /> :
                         alert.severity === 'moderate' ? <Info className="h-5 w-5 text-yellow-600" /> :
                         <CheckCircle className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          alert.severity === 'high' ? 'text-red-800' :
                          alert.severity === 'moderate' ? 'text-yellow-800' :
                          'text-blue-800'
                        }`}>
                          {alert.type.toUpperCase()}
                        </div>
                        <p className={`text-sm ${
                          alert.severity === 'high' ? 'text-red-700' :
                          alert.severity === 'moderate' ? 'text-yellow-700' :
                          'text-blue-700'
                        }`}>
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Enhanced3DWeather;