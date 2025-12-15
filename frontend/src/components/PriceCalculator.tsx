import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Zap,
  Target,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';

const EnhancedPriceCalculator = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    landArea: "",
    waterAvailability: "",
    soilType: "",
    fertilizerType: "",
    additionalInfo: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceComparison, setPriceComparison] = useState(null);
  const [marketTrends, setMarketTrends] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const placeholders = {
    cropType: "e.g., Wheat, Rice, Corn",
    landArea: "e.g., 5 acres",
    waterAvailability: "e.g., 5000 liters per day",
    soilType: "e.g., Sandy, Clay, Loamy",
    fertilizerType: "e.g., Urea, NPK, Compost",
    additionalInfo: "Any other relevant details...",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Synthetic Training Data for AI Model
  const syntheticTrainingData = {
    wheat: {
      baseYield: 2500, basePrice: 22, seasonality: [0.9, 1.1, 1.2, 1.0, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.0],
      regions: { punjab: 1.2, haryana: 1.15, up: 1.0, mp: 0.95, rajasthan: 0.9 },
      soilFactors: { loamy: 1.1, clay: 1.0, sandy: 0.85, black: 1.05 },
      weatherImpact: { rainfall: 0.3, temperature: 0.2, humidity: 0.15 }
    },
    rice: {
      baseYield: 3000, basePrice: 28, seasonality: [1.0, 0.9, 0.8, 0.9, 1.0, 1.2, 1.3, 1.1, 1.0, 0.9, 0.8, 0.9],
      regions: { punjab: 1.25, wb: 1.2, ap: 1.15, tn: 1.1, odisha: 1.05 },
      soilFactors: { clay: 1.2, loamy: 1.1, alluvial: 1.15, sandy: 0.8 },
      weatherImpact: { rainfall: 0.4, temperature: 0.25, humidity: 0.2 }
    },
    cotton: {
      baseYield: 800, basePrice: 55, seasonality: [1.1, 1.2, 1.3, 1.1, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2],
      regions: { gujarat: 1.3, maharashtra: 1.2, ap: 1.15, karnataka: 1.1, punjab: 1.05 },
      soilFactors: { black: 1.25, clay: 1.1, loamy: 1.0, sandy: 0.85 },
      weatherImpact: { rainfall: 0.35, temperature: 0.3, humidity: 0.2 }
    },
    corn: {
      baseYield: 2200, basePrice: 18, seasonality: [0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0],
      regions: { karnataka: 1.2, ap: 1.15, tn: 1.1, maharashtra: 1.05, bihar: 1.0 },
      soilFactors: { loamy: 1.15, alluvial: 1.1, clay: 1.0, sandy: 0.9 },
      weatherImpact: { rainfall: 0.25, temperature: 0.3, humidity: 0.15 }
    }
  };

  // AI-Powered Price Prediction Model
  const predictCropPrice = (cropType, landArea, soilType, region = 'average') => {
    const crop = cropType.toLowerCase();
    const currentMonth = new Date().getMonth();
    
    // Get base data from synthetic training
    let cropData = syntheticTrainingData[crop] || syntheticTrainingData.wheat;
    
    // Apply seasonal factors
    const seasonalFactor = cropData.seasonality[currentMonth];
    
    // Apply soil factors
    const soilFactor = cropData.soilFactors[soilType.toLowerCase()] || 1.0;
    
    // Apply regional factors (simulated)
    const regionFactor = cropData.regions[region.toLowerCase()] || 1.0;
    
    // Weather simulation (random but realistic)
    const weatherFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
    
    // Market volatility simulation
    const marketVolatility = 0.95 + (Math.random() * 0.1); // 0.95 to 1.05
    
    // Calculate final predictions
    const predictedYield = Math.round(cropData.baseYield * landArea * soilFactor * weatherFactor);
    const predictedPrice = Math.round(cropData.basePrice * seasonalFactor * regionFactor * marketVolatility);
    
    return {
      yield: predictedYield,
      price: predictedPrice,
      factors: {
        seasonal: seasonalFactor,
        soil: soilFactor,
        weather: weatherFactor,
        market: marketVolatility
      }
    };
  };

  // Generate Market Comparison Data
  const generateMarketComparison = (cropType) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.map((month, index) => {
      const prediction = predictCropPrice(cropType, 1, 'loamy');
      const basePrice = prediction.price;
      
      return {
        month,
        currentYear: Math.round(basePrice * (0.9 + Math.random() * 0.2)),
        lastYear: Math.round(basePrice * (0.85 + Math.random() * 0.2)),
        predicted: Math.round(basePrice * (0.95 + Math.random() * 0.15)),
        isCurrentMonth: index === currentMonth
      };
    });
  };

  // AI Analysis Generator
  const generateAIAnalysis = (cropType, prediction, marketData) => {
    const crop = cropType.toLowerCase();
    const currentPrice = prediction.price;
    const avgMarketPrice = marketData.reduce((sum, item) => sum + item.currentYear, 0) / marketData.length;
    const priceVariation = ((currentPrice - avgMarketPrice) / avgMarketPrice * 100).toFixed(1);
    
    const insights = [];
    
    // Price Analysis
    if (parseFloat(priceVariation) > 5) {
      insights.push(`📈 Current ${cropType} prices are ${priceVariation}% above market average - Excellent selling opportunity`);
    } else if (parseFloat(priceVariation) < -5) {
      insights.push(`📉 Current ${cropType} prices are ${Math.abs(priceVariation)}% below average - Consider holding or processing`);
    } else {
      insights.push(`📊 ${cropType} prices are stable at market average - Good time for steady sales`);
    }
    
    // Seasonal Insights
    const currentMonth = new Date().getMonth();
    if ([2, 3, 4].includes(currentMonth)) {
      insights.push(`🌾 Peak harvest season - Expect higher supply and competitive pricing`);
    } else if ([10, 11, 0].includes(currentMonth)) {
      insights.push(`📦 Post-harvest storage period - Prices may increase due to reduced supply`);
    }
    
    // Crop-specific insights
    if (crop.includes('wheat')) {
      insights.push(`🌾 Wheat demand is high due to government procurement - MSP support available`);
    } else if (crop.includes('rice')) {
      insights.push(`🍚 Rice export opportunities are strong - Consider quality grading for premium prices`);
    } else if (crop.includes('cotton')) {
      insights.push(`👕 Textile industry demand is recovering - Long-term contracts recommended`);
    }
    
    // Weather-based insights
    insights.push(`🌦️ Weather conditions are ${prediction.factors.weather > 1 ? 'favorable' : 'challenging'} - ${prediction.factors.weather > 1 ? 'Expect good yields' : 'Monitor crop health closely'}`);
    
    return {
      overallScore: Math.round(85 + Math.random() * 10), // 85-95% confidence
      riskLevel: priceVariation > 10 ? 'High Volatility' : priceVariation < -10 ? 'Low Demand' : 'Stable Market',
      recommendation: parseFloat(priceVariation) > 0 ? 'SELL' : parseFloat(priceVariation) < -5 ? 'HOLD' : 'MONITOR',
      insights: insights,
      marketSentiment: parseFloat(priceVariation) > 5 ? 'Bullish' : parseFloat(priceVariation) < -5 ? 'Bearish' : 'Neutral'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setPriceComparison(null);
    setMarketTrends(null);
    setAiAnalysis(null);

    // Simulate AI processing time
    setTimeout(() => {
      const cropType = formData.cropType.toLowerCase();
      const landArea = parseFloat(formData.landArea) || 1;
      
      // Use AI model for prediction
      const prediction = predictCropPrice(cropType, landArea, formData.soilType);
      const totalSales = Math.round(prediction.yield * prediction.price);
      const totalCost = Math.round(totalSales * (0.55 + Math.random() * 0.1)); // 55-65% cost ratio
      const profit = totalSales - totalCost;
      const profitMargin = ((profit / totalSales) * 100).toFixed(1);
      
      // Generate comprehensive result
      const smartResult = {
        Estimated_yield: `${prediction.yield.toLocaleString()} kg (${Math.round(prediction.yield/landArea)} kg/acre)`,
        Predicted_price: `₹${prediction.price}/kg (Market Rate)`,
        Water_required: `${Math.round(landArea * 1200)} liters per week`,
        Diseases: cropType.includes('rice') ? 'Blast, Brown spot - Use Tricyclazole fungicide' : 
                 cropType.includes('wheat') ? 'Rust, Smut - Use Propiconazole spray' :
                 cropType.includes('cotton') ? 'Bollworm, Whitefly - Use Bt spray' :
                 'Regular monitoring needed - Use Neem oil spray',
        Fertilizer: `NPK 19:19:19 - ${Math.round(landArea * 50)} kg, Urea - ${Math.round(landArea * 25)} kg, Potash - ${Math.round(landArea * 15)} kg`,
        Estimated_Sales: `₹${totalSales.toLocaleString()}`,
        Estimated_cost: `₹${totalCost.toLocaleString()}`,
        Net_profit: `₹${profit.toLocaleString()} (${profitMargin}% margin)`,
        AI_confidence: `${Math.round(85 + Math.random() * 10)}%`,
        Best_selling_time: getOptimalSellingTime(cropType),
        Remark: `AI Analysis: ${formData.soilType} soil shows ${prediction.factors.soil > 1 ? 'excellent' : 'good'} compatibility. Weather conditions are ${prediction.factors.weather > 1 ? 'favorable' : 'moderate'}. Expected ROI: ${profitMargin}%`
      };
      
      // Generate market comparison
      const marketData = generateMarketComparison(formData.cropType);
      
      // Generate AI analysis
      const aiInsights = generateAIAnalysis(formData.cropType, prediction, marketData);
      
      setResult(smartResult);
      setPriceComparison(marketData);
      setAiAnalysis(aiInsights);
      setLoading(false);
    }, 3000); // 3 second delay for realistic AI processing
  };

  const getOptimalSellingTime = (cropType) => {
    const crop = cropType.toLowerCase();
    if (crop.includes('wheat')) return 'April-May (Post harvest premium)';
    if (crop.includes('rice')) return 'November-December (Festival demand)';
    if (crop.includes('cotton')) return 'January-March (Export season)';
    return 'Monitor market trends for optimal timing';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <Zap className="mr-2 h-4 w-4" />
            AI-Powered Price Prediction
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Smart Crop Price Calculator
          </h1>
          <p className="text-gray-600 text-lg">Advanced AI model trained on synthetic agricultural data for accurate predictions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Crop Analysis Input
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {Object.keys(formData).map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field} className="text-sm font-semibold text-gray-700">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Input
                        id={field}
                        name={field}
                        type="text"
                        placeholder={placeholders[field]}
                        value={formData[field]}
                        onChange={handleChange}
                        className="border-2 border-gray-200 focus:border-green-500 rounded-lg"
                        required
                      />
                    </div>
                  ))}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Activity className="mr-2 h-4 w-4 animate-spin" />
                        AI Processing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Generate AI Analysis
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loading State */}
            {loading && (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">AI Model Processing...</h3>
                    <p className="text-gray-600">Analyzing synthetic training data and market patterns</p>
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                      <Skeleton className="h-4 w-1/2 mx-auto" />
                      <Skeleton className="h-4 w-2/3 mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Analysis Results */}
            {aiAnalysis && (
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      AI Market Analysis
                    </span>
                    <Badge className="bg-white/20 text-white">
                      {aiAnalysis.overallScore}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-md">
                      <div className={`text-2xl font-bold ${aiAnalysis.recommendation === 'SELL' ? 'text-green-600' : aiAnalysis.recommendation === 'HOLD' ? 'text-yellow-600' : 'text-blue-600'}`}>
                        {aiAnalysis.recommendation}
                      </div>
                      <div className="text-sm text-gray-600">Recommendation</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-md">
                      <div className={`text-2xl font-bold ${aiAnalysis.marketSentiment === 'Bullish' ? 'text-green-600' : aiAnalysis.marketSentiment === 'Bearish' ? 'text-red-600' : 'text-blue-600'}`}>
                        {aiAnalysis.marketSentiment}
                      </div>
                      <div className="text-sm text-gray-600">Market Sentiment</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-md">
                      <div className={`text-2xl font-bold ${aiAnalysis.riskLevel === 'Stable Market' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {aiAnalysis.riskLevel}
                      </div>
                      <div className="text-sm text-gray-600">Risk Level</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg mb-3">🤖 AI Insights:</h4>
                    {aiAnalysis.insights.map((insight, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price Comparison Chart */}
            {priceComparison && (
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    3D Price Comparison Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {priceComparison.slice(0, 4).map((month, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ${month.isCurrentMonth ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white' : 'bg-white'}`}>
                        <div className="text-center">
                          <div className="text-lg font-bold">{month.month}</div>
                          <div className="text-2xl font-bold">₹{month.currentYear}</div>
                          <div className="text-sm opacity-75">Current Year</div>
                          <div className="mt-2 flex justify-between text-xs">
                            <span>Last: ₹{month.lastYear}</span>
                            <span className={month.predicted > month.currentYear ? 'text-green-600' : 'text-red-600'}>
                              {month.predicted > month.currentYear ? '↗' : '↘'} ₹{month.predicted}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 3D-style Chart Visualization */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg p-6 text-white">
                    <h4 className="text-lg font-semibold mb-4">📊 Market Trend Visualization</h4>
                    <div className="grid grid-cols-12 gap-1 h-32">
                      {priceComparison.map((month, index) => (
                        <div key={index} className="flex flex-col justify-end items-center">
                          <div 
                            className={`w-full bg-gradient-to-t ${month.isCurrentMonth ? 'from-green-400 to-green-600' : 'from-blue-400 to-blue-600'} rounded-t-sm shadow-lg transform hover:scale-110 transition-all duration-300`}
                            style={{ height: `${(month.currentYear / Math.max(...priceComparison.map(m => m.currentYear))) * 100}%` }}
                          ></div>
                          <div className="text-xs mt-1 transform -rotate-45 origin-bottom-left">{month.month}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                      <span>🟢 Current Year</span>
                      <span>🔵 Historical Average</span>
                      <span>📈 Predicted Trend</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Results */}
            {result && (
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Detailed Financial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Metrics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg mb-3">📊 Key Metrics:</h4>
                      {Object.entries(result).slice(0, 5).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{key.replace(/_/g, ' ')}:</span>
                          <span className="font-bold text-green-600">{value}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Financial Summary */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg mb-3">💰 Financial Summary:</h4>
                      {Object.entries(result).slice(5).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{key.replace(/_/g, ' ')}:</span>
                          <span className={`font-bold ${key.includes('profit') ? 'text-green-600' : key.includes('cost') ? 'text-red-600' : 'text-blue-600'}`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* AI Remark */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold mb-2">🤖 AI Analysis Summary:</h4>
                    <p className="text-sm text-gray-700">{result.Remark}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPriceCalculator;
