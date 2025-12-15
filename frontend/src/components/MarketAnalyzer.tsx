import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  MapPin, 
  IndianRupee, 
  Truck, 
  BarChart3, 
  Target,
  AlertCircle,
  CheckCircle,
  Loader2,
  Search,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MarketAnalysis {
  topMarkets: Array<{
    city: string;
    state: string;
    expectedPrice: number;
    profitMargin: string;
    transportCost: number;
    netProfit: number;
    marketScore: number;
    advantages: string[];
    risks: string[];
  }>;
  marketTrends: {
    priceDirection: string;
    seasonalFactor: string;
    demandOutlook: string;
  };
  recommendations: {
    bestTime: string;
    negotiationTips: string[];
    qualityRequirements: string[];
  };
  totalRevenue: number;
  totalCosts: number;
  netIncome: number;
}

const MarketAnalyzer = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    farmerLocation: '',
    qualityGrade: 'A',
    urgency: 'medium',
    transportMode: 'truck'
  });

  const cropOptions = [
    { value: 'wheat', label: 'गेहूं (Wheat)', icon: '🌾' },
    { value: 'rice', label: 'धान (Rice)', icon: '🌾' },
    { value: 'tomato', label: 'टमाटर (Tomato)', icon: '🍅' },
    { value: 'potato', label: 'आलू (Potato)', icon: '🥔' },
    { value: 'onion', label: 'प्याज (Onion)', icon: '🧅' },
    { value: 'cotton', label: 'कपास (Cotton)', icon: '🌿' }
  ];

  const stateOptions = [
    'Uttar Pradesh', 'Maharashtra', 'Punjab', 'Haryana', 'Rajasthan',
    'Madhya Pradesh', 'Gujarat', 'West Bengal', 'Karnataka', 'Tamil Nadu',
    'Andhra Pradesh', 'Telangana', 'Bihar', 'Odisha', 'Assam'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeMarkets = async () => {
    if (!formData.cropType || !formData.quantity || !formData.farmerLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in crop type, quantity, and location",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    toast({
      title: "🔍 Analyzing Markets...",
      description: "AI is comparing prices across India's major markets",
    });

    try {
      const response = await fetch('/api/market/analyze-best-markets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setAnalysis(result.data);
        toast({
          title: "✅ Analysis Complete!",
          description: `Found ${result.data.topMarkets.length} profitable markets for your ${formData.cropType}`,
        });
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Market analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try again or check your internet connection",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriceDirectionIcon = (direction: string) => {
    switch (direction.toLowerCase()) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'falling': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          AI Market Analyzer
        </h1>
        <p className="text-muted-foreground">
          🇮🇳 Compare prices across India's major markets and find the best place to sell your crops
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Crop & Location Details
          </CardTitle>
          <CardDescription>
            Enter your crop details to get AI-powered market recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Crop Type */}
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropOptions.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      <span className="flex items-center gap-2">
                        <span>{crop.icon}</span>
                        {crop.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (Quintals) *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 100"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
              />
            </div>

            {/* Farmer Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Your State *</Label>
              <Select value={formData.farmerLocation} onValueChange={(value) => handleInputChange('farmerLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {stateOptions.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quality Grade */}
            <div className="space-y-2">
              <Label htmlFor="quality">Quality Grade</Label>
              <Select value={formData.qualityGrade} onValueChange={(value) => handleInputChange('qualityGrade', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A (Premium)</SelectItem>
                  <SelectItem value="B">Grade B (Standard)</SelectItem>
                  <SelectItem value="C">Grade C (Basic)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Selling Urgency</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Sell ASAP)</SelectItem>
                  <SelectItem value="medium">Medium (2-4 weeks)</SelectItem>
                  <SelectItem value="low">Low (Can wait)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transport Mode */}
            <div className="space-y-2">
              <Label htmlFor="transport">Transport Mode</Label>
              <Select value={formData.transportMode} onValueChange={(value) => handleInputChange('transportMode', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck">🚛 Truck</SelectItem>
                  <SelectItem value="train">🚂 Train</SelectItem>
                  <SelectItem value="mixed">🚛🚂 Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={analyzeMarkets} 
            className="w-full" 
            disabled={isAnalyzing}
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Markets...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Find Best Markets
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Market Trends Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Trends & Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  {getPriceDirectionIcon(analysis.marketTrends.priceDirection)}
                  <div>
                    <p className="font-medium">Price Trend</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {analysis.marketTrends.priceDirection}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Season Factor</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {analysis.marketTrends.seasonalFactor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium">Demand Outlook</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {analysis.marketTrends.demandOutlook}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{analysis.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-700">Total Revenue</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50">
                  <p className="text-2xl font-bold text-red-600">
                    ₹{analysis.totalCosts.toLocaleString()}
                  </p>
                  <p className="text-sm text-red-700">Total Costs</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{analysis.netIncome.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-700">Net Income</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Markets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top 5 Recommended Markets
              </CardTitle>
              <CardDescription>
                Ranked by profitability and market conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.topMarkets.map((market, index) => (
                  <div key={market.city} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{market.city}</h3>
                          <p className="text-sm text-muted-foreground">{market.state}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ₹{market.expectedPrice}/quintal
                        </p>
                        <Badge className={`${getScoreColor(market.marketScore)}`}>
                          Score: {market.marketScore}/10
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Profit Margin</p>
                        <p className="font-medium text-green-600">{market.profitMargin}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Transport Cost</p>
                        <p className="font-medium">₹{market.transportCost}/quintal</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Profit</p>
                        <p className="font-medium text-blue-600">₹{market.netProfit.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Distance Factor</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-green-700 mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Advantages
                        </p>
                        <ul className="text-sm space-y-1">
                          {market.advantages.map((advantage, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-red-700 mb-2 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          Risks
                        </p>
                        <ul className="text-sm space-y-1">
                          {market.risks.map((risk, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🕒 Best Time to Sell</h4>
                <p className="text-sm bg-blue-50 p-3 rounded-lg">{analysis.recommendations.bestTime}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">💡 Negotiation Tips</h4>
                <ul className="text-sm space-y-1">
                  {analysis.recommendations.negotiationTips.map((tip, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">✅ Quality Requirements</h4>
                <ul className="text-sm space-y-1">
                  {analysis.recommendations.qualityRequirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketAnalyzer;