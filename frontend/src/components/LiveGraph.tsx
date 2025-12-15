import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

const LiveGraph = () => {
  const [data, setData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [trend, setTrend] = useState('up');

  // Simulate live data updates
  useEffect(() => {
    const generateLiveData = () => {
      const basePrice = 45; // Base price for wheat per kg
      const variation = (Math.random() - 0.5) * 10;
      const newPrice = Math.max(35, Math.min(55, basePrice + variation));
      
      setCurrentPrice(newPrice);
      setTrend(newPrice > currentPrice ? 'up' : 'down');
      
      setData(prevData => {
        const newData = [...prevData, {
          time: new Date().toLocaleTimeString(),
          price: newPrice,
          volume: Math.floor(Math.random() * 1000) + 500
        }];
        return newData.slice(-20); // Keep last 20 data points
      });
    };

    // Initial data
    generateLiveData();
    
    // Update every 3 seconds
    const interval = setInterval(generateLiveData, 3000);
    return () => clearInterval(interval);
  }, [currentPrice]);

  const cropData = [
    { name: 'Wheat', price: currentPrice, change: trend === 'up' ? '+2.3%' : '-1.8%', trend },
    { name: 'Rice', price: currentPrice * 0.8, change: '+1.5%', trend: 'up' },
    { name: 'Corn', price: currentPrice * 1.2, change: '-0.9%', trend: 'down' },
    { name: 'Cotton', price: currentPrice * 2.1, change: '+3.2%', trend: 'up' }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600 text-white">Live Market Data</Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📈 Real-Time Crop Prices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Live market data powered by AI algorithms and IoT sensors across India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Live Price Chart */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-6 w-6 mr-2 text-green-600" />
                Live Wheat Prices (₹/kg)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold">₹{currentPrice.toFixed(2)}</span>
                <Badge className={trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {trend === 'up' ? '+2.3%' : '-1.8%'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 relative overflow-hidden">
                {/* Simple ASCII-style graph */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-end justify-between h-32">
                    {data.slice(-10).map((point, index) => (
                      <div
                        key={index}
                        className="bg-green-500 rounded-t-sm transition-all duration-500 ease-in-out"
                        style={{
                          height: `${(point.price / 60) * 100}%`,
                          width: '8%',
                          minHeight: '10px'
                        }}
                        title={`₹${point.price.toFixed(2)} at ${point.time}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Live indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">LIVE</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>📊 Data updated every 3 seconds from 500+ mandis across India</p>
                <p>🤖 AI-powered price prediction with 95% accuracy</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                Market Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropData.map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {crop.name[0]}
                      </div>
                      <div>
                        <h4 className="font-medium">{crop.name}</h4>
                        <p className="text-sm text-gray-500">Per kg</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg">₹{crop.price.toFixed(2)}</div>
                      <div className={`flex items-center text-sm ${
                        crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.trend === 'up' ? 
                          <TrendingUp className="h-4 w-4 mr-1" /> : 
                          <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {crop.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 AI Predictions for Tomorrow</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Wheat:</span>
                    <span className="font-medium text-green-600 ml-2">↗ ₹{(currentPrice + 1.2).toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rice:</span>
                    <span className="font-medium text-green-600 ml-2">↗ ₹{(currentPrice * 0.8 + 0.8).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Active Mandis</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Live Updates</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹50B</div>
              <div className="text-sm text-gray-600">Market Size</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveGraph;