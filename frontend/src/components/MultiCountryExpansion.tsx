import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  MapPin, 
  Users, 
  TrendingUp,
  Flag,
  BarChart3,
  Zap,
  Shield,
  Award,
  Target
} from 'lucide-react';

const MultiCountryExpansion = () => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [globalStats, setGlobalStats] = useState({});
  const [expansionPlan, setExpansionPlan] = useState([]);

  // Global wildlife data by country
  const countryData = {
    'India': {
      flag: '🇮🇳',
      population: '1.4B',
      wildlifeSpecies: 45000,
      protectedAreas: 870,
      conflicts: 2847,
      deploymentStatus: 'ACTIVE',
      coverage: '36 states',
      riskLevel: 'HIGH',
      keyAnimals: ['Tiger', 'Leopard', 'Elephant', 'Sloth Bear'],
      majorChallenges: ['Human-wildlife conflict', 'Habitat fragmentation', 'Poaching'],
      successRate: 94.2,
      activeUsers: 125000,
      coordinates: { lat: 20.5937, lng: 78.9629 }
    },
    'Kenya': {
      flag: '🇰🇪',
      population: '54M',
      wildlifeSpecies: 25000,
      protectedAreas: 65,
      conflicts: 1234,
      deploymentStatus: 'PILOT',
      coverage: '8 counties',
      riskLevel: 'HIGH',
      keyAnimals: ['Lion', 'Elephant', 'Rhino', 'Leopard'],
      majorChallenges: ['Poaching', 'Human-wildlife conflict', 'Climate change'],
      successRate: 87.5,
      activeUsers: 45000,
      coordinates: { lat: -0.0236, lng: 37.9062 }
    },
    'Brazil': {
      flag: '🇧🇷',
      population: '215M',
      wildlifeSpecies: 103870,
      protectedAreas: 334,
      conflicts: 1876,
      deploymentStatus: 'PLANNING',
      coverage: '5 states',
      riskLevel: 'CRITICAL',
      keyAnimals: ['Jaguar', 'Puma', 'Tapir', 'Giant Otter'],
      majorChallenges: ['Deforestation', 'Illegal logging', 'Mining'],
      successRate: 0,
      activeUsers: 0,
      coordinates: { lat: -14.2350, lng: -51.9253 }
    },
    'Indonesia': {
      flag: '🇮🇩',
      population: '273M',
      wildlifeSpecies: 47000,
      protectedAreas: 552,
      conflicts: 1567,
      deploymentStatus: 'PILOT',
      coverage: '3 provinces',
      riskLevel: 'HIGH',
      keyAnimals: ['Orangutan', 'Tiger', 'Elephant', 'Rhino'],
      majorChallenges: ['Palm oil expansion', 'Illegal wildlife trade', 'Habitat loss'],
      successRate: 78.3,
      activeUsers: 23000,
      coordinates: { lat: -0.7893, lng: 113.9213 }
    },
    'South Africa': {
      flag: '🇿🇦',
      population: '60M',
      wildlifeSpecies: 29000,
      protectedAreas: 580,
      conflicts: 987,
      deploymentStatus: 'ACTIVE',
      coverage: '9 provinces',
      riskLevel: 'MEDIUM',
      keyAnimals: ['Lion', 'Elephant', 'Rhino', 'Leopard'],
      majorChallenges: ['Poaching', 'Human settlements', 'Water scarcity'],
      successRate: 91.7,
      activeUsers: 67000,
      coordinates: { lat: -30.5595, lng: 22.9375 }
    },
    'Thailand': {
      flag: '🇹🇭',
      population: '70M',
      wildlifeSpecies: 15000,
      protectedAreas: 147,
      conflicts: 756,
      deploymentStatus: 'PILOT',
      coverage: '4 provinces',
      riskLevel: 'MEDIUM',
      keyAnimals: ['Elephant', 'Tiger', 'Sun Bear', 'Clouded Leopard'],
      majorChallenges: ['Tourism impact', 'Illegal wildlife trade', 'Habitat fragmentation'],
      successRate: 82.1,
      activeUsers: 34000,
      coordinates: { lat: 15.8700, lng: 100.9925 }
    }
  };

  // Generate expansion timeline
  useEffect(() => {
    const timeline = [
      {
        phase: 'Phase 1',
        period: 'Q1 2024',
        countries: ['India', 'South Africa'],
        status: 'COMPLETED',
        focus: 'Core system deployment and testing',
        achievements: ['94% success rate', '192K active users', 'Multi-language support']
      },
      {
        phase: 'Phase 2',
        period: 'Q2-Q3 2024',
        countries: ['Kenya', 'Indonesia', 'Thailand'],
        status: 'IN_PROGRESS',
        focus: 'Regional adaptation and pilot programs',
        achievements: ['Local partnerships', 'Cultural adaptation', 'Regional wildlife databases']
      },
      {
        phase: 'Phase 3',
        period: 'Q4 2024',
        countries: ['Brazil', 'Colombia', 'Peru'],
        status: 'PLANNING',
        focus: 'Amazon rainforest expansion',
        achievements: ['Satellite integration', 'Indigenous community engagement', 'Deforestation monitoring']
      },
      {
        phase: 'Phase 4',
        period: 'Q1-Q2 2025',
        countries: ['Nepal', 'Bhutan', 'Myanmar'],
        status: 'FUTURE',
        focus: 'Himalayan region and Southeast Asia',
        achievements: ['High-altitude adaptation', 'Cross-border coordination', 'Climate resilience']
      }
    ];

    setExpansionPlan(timeline);

    // Calculate global statistics
    const stats = {
      totalCountries: Object.keys(countryData).length,
      activeDeployments: Object.values(countryData).filter(c => c.deploymentStatus === 'ACTIVE').length,
      totalUsers: Object.values(countryData).reduce((sum, c) => sum + c.activeUsers, 0),
      avgSuccessRate: Object.values(countryData)
        .filter(c => c.successRate > 0)
        .reduce((sum, c) => sum + c.successRate, 0) / 
        Object.values(countryData).filter(c => c.successRate > 0).length,
      totalSpecies: Object.values(countryData).reduce((sum, c) => sum + c.wildlifeSpecies, 0),
      totalConflicts: Object.values(countryData).reduce((sum, c) => sum + c.conflicts, 0)
    };

    setGlobalStats(stats);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-600';
      case 'PILOT': return 'bg-blue-600';
      case 'PLANNING': return 'bg-yellow-600';
      case 'FUTURE': return 'bg-gray-600';
      case 'COMPLETED': return 'bg-purple-600';
      case 'IN_PROGRESS': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return 'text-red-600';
      case 'HIGH': return 'text-orange-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'LOW': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <Globe className="h-4 w-4 mr-2" />
            Multi-Country Expansion
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🌍 Global Wildlife Protection Network
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Expanding FarmShield Pro across continents to create a worldwide wildlife conservation ecosystem
          </p>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <Globe className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{globalStats.totalCountries}</div>
              <div className="text-blue-100 text-xs">Countries</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <Shield className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{globalStats.activeDeployments}</div>
              <div className="text-green-100 text-xs">Active</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{(globalStats.totalUsers / 1000).toFixed(0)}K</div>
              <div className="text-purple-100 text-xs">Users</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-4">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{globalStats.avgSuccessRate?.toFixed(1)}%</div>
              <div className="text-orange-100 text-xs">Success</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <Target className="h-6 w-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{(globalStats.totalSpecies / 1000).toFixed(0)}K</div>
              <div className="text-teal-100 text-xs">Species</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-pink-500 to-rose-600 text-white">
            <CardContent className="p-4">
              <BarChart3 className="h-6 w-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{(globalStats.totalConflicts / 1000).toFixed(1)}K</div>
              <div className="text-pink-100 text-xs">Conflicts</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Country Selection */}
          <Card className="border-4 border-emerald-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flag className="h-6 w-6 mr-2 text-emerald-600" />
                Global Deployment Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(countryData).map(([country, data]) => (
                  <div
                    key={country}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCountry === country ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{data.flag}</span>
                        <div>
                          <div className="font-bold">{country}</div>
                          <div className="text-sm text-gray-600">{data.population} people</div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(data.deploymentStatus)} text-white`}>
                        {data.deploymentStatus}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Species:</span>
                        <div className="font-medium">{data.wildlifeSpecies.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Users:</span>
                        <div className="font-medium">{data.activeUsers.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Success:</span>
                        <div className="font-medium text-green-600">{data.successRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Country Details */}
          <Card className="border-4 border-teal-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-teal-600" />
                {selectedCountry} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {countryData[selectedCountry] && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">{countryData[selectedCountry].flag}</span>
                    <h3 className="text-2xl font-bold">{selectedCountry}</h3>
                    <Badge className={`mt-2 ${getStatusColor(countryData[selectedCountry].deploymentStatus)} text-white`}>
                      {countryData[selectedCountry].deploymentStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{countryData[selectedCountry].wildlifeSpecies.toLocaleString()}</div>
                      <div className="text-sm text-blue-800">Wildlife Species</div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{countryData[selectedCountry].protectedAreas}</div>
                      <div className="text-sm text-green-800">Protected Areas</div>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{countryData[selectedCountry].conflicts}</div>
                      <div className="text-sm text-orange-800">Annual Conflicts</div>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{countryData[selectedCountry].activeUsers.toLocaleString()}</div>
                      <div className="text-sm text-purple-800">Active Users</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Key Wildlife Species:</h4>
                    <div className="flex flex-wrap gap-2">
                      {countryData[selectedCountry].keyAnimals.map((animal, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {animal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Major Challenges:</h4>
                    <div className="space-y-1">
                      {countryData[selectedCountry].majorChallenges.map((challenge, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Risk Level:</span>
                      <span className={`ml-2 font-bold ${getRiskColor(countryData[selectedCountry].riskLevel)}`}>
                        {countryData[selectedCountry].riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Coverage:</span>
                      <span className="ml-2 font-medium">{countryData[selectedCountry].coverage}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Expansion Timeline */}
        <Card className="mb-12 border-4 border-indigo-400">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-indigo-600" />
              Global Expansion Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {expansionPlan.map((phase, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getStatusColor(phase.status)}`}>
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{phase.phase}</h4>
                      <Badge className={`${getStatusColor(phase.status)} text-white`}>
                        {phase.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">{phase.period}</div>
                    
                    <div className="mb-3">
                      <span className="font-medium">Countries: </span>
                      {phase.countries.map((country, cidx) => (
                        <Badge key={cidx} variant="outline" className="mr-1 text-xs">
                          {countryData[country]?.flag} {country}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mb-3">
                      <span className="font-medium">Focus: </span>
                      <span className="text-gray-700">{phase.focus}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">Key Achievements:</span>
                      <div className="mt-1 space-y-1">
                        {phase.achievements.map((achievement, aidx) => (
                          <div key={aidx} className="flex items-center space-x-2 text-sm">
                            <Award className="h-3 w-3 text-green-600" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Impact */}
        <Card className="mb-12 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="h-8 w-8 mr-3" />
              🌟 Global Impact & Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <Shield className="h-12 w-12 mx-auto mb-3 text-emerald-300" />
                <h4 className="font-bold mb-2">Wildlife Protection</h4>
                <p className="text-sm text-emerald-200">Protecting endangered species across continents</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Users className="h-12 w-12 mx-auto mb-3 text-teal-300" />
                <h4 className="font-bold mb-2">Community Engagement</h4>
                <p className="text-sm text-teal-200">Empowering local communities worldwide</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Zap className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <h4 className="font-bold mb-2">Technology Innovation</h4>
                <p className="text-sm text-blue-200">Cutting-edge AI and IoT solutions</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Target className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                <h4 className="font-bold mb-2">Conservation Goals</h4>
                <p className="text-sm text-purple-200">UN SDG alignment and measurable impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiCountryExpansion;