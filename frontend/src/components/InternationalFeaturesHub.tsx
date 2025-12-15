import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Camera, 
  Mic, 
  Shield, 
  Cpu, 
  Eye, 
  BarChart3,
  Zap,
  Award,
  Rocket,
  Star,
  Crown
} from 'lucide-react';

// Import all the international components
import ComputerVisionAnalysis from './ComputerVisionAnalysis';
import VoiceRecognition from './VoiceRecognition';
import BlockchainVerification from './BlockchainVerification';
import IoTIntegration from './IoTIntegration';
import ARWildlifeIdentification from './ARWildlifeIdentification';
import MultiCountryExpansion from './MultiCountryExpansion';
import ResearchAnalyticsDashboard from './ResearchAnalyticsDashboard';

const InternationalFeaturesHub = () => {
  const [activeFeature, setActiveFeature] = useState('overview');

  const features = [
    {
      id: 'computer-vision',
      name: 'Computer Vision AI',
      icon: <Camera className="h-6 w-6" />,
      description: 'Real-time wildlife detection using advanced computer vision',
      status: 'ACTIVE',
      component: <ComputerVisionAnalysis />
    },
    {
      id: 'voice-recognition',
      name: 'Voice Commands',
      icon: <Mic className="h-6 w-6" />,
      description: 'Hindi/English voice recognition for emergency alerts',
      status: 'ACTIVE',
      component: <VoiceRecognition />
    },
    {
      id: 'blockchain',
      name: 'Blockchain Verification',
      icon: <Shield className="h-6 w-6" />,
      description: 'Tamper-proof wildlife data verification system',
      status: 'ACTIVE',
      component: <BlockchainVerification />
    },
    {
      id: 'iot-integration',
      name: 'IoT Raspberry Pi',
      icon: <Cpu className="h-6 w-6" />,
      description: 'Distributed IoT sensor network for wildlife monitoring',
      status: 'ACTIVE',
      component: <IoTIntegration />
    },
    {
      id: 'ar-identification',
      name: 'AR Wildlife ID',
      icon: <Eye className="h-6 w-6" />,
      description: 'Augmented reality wildlife identification system',
      status: 'ACTIVE',
      component: <ARWildlifeIdentification />
    },
    {
      id: 'multi-country',
      name: 'Global Expansion',
      icon: <Globe className="h-6 w-6" />,
      description: 'Multi-country deployment and expansion strategy',
      status: 'ACTIVE',
      component: <MultiCountryExpansion />
    },
    {
      id: 'research-analytics',
      name: 'Research Analytics',
      icon: <BarChart3 className="h-6 w-6" />,
      description: 'Research-grade analytics and academic collaboration',
      status: 'ACTIVE',
      component: <ResearchAnalyticsDashboard />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-600';
      case 'BETA': return 'bg-blue-600';
      case 'COMING_SOON': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  if (activeFeature !== 'overview') {
    const feature = features.find(f => f.id === activeFeature);
    return (
      <div>
        {/* Navigation Bar */}
        <div className="bg-white shadow-lg border-b-4 border-indigo-500 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setActiveFeature('overview')}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Rocket className="h-4 w-4" />
                <span>← Back to Features Hub</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                {feature?.icon}
                <h1 className="text-2xl font-bold text-gray-800">{feature?.name}</h1>
                <Badge className={`${getStatusColor(feature?.status)} text-white`}>
                  {feature?.status}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">International Level</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Component */}
        {feature?.component}
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Crown className="h-12 w-12 text-yellow-500" />
            <Badge className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-lg px-6 py-3">
              <Rocket className="h-5 w-5 mr-2" />
              International-Level Features Hub
            </Badge>
            <Crown className="h-12 w-12 text-yellow-500" />
          </div>
          
          <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            🚀 Advanced Wildlife Technology Suite
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-5xl mx-auto mb-8">
            Cutting-edge international-level features designed to win the <strong>IIT Bombay AWS X Impact Hackathon</strong>
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-lg">
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2">
              <Award className="h-5 w-5 mr-2" />
              Hackathon Ready
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2">
              <Zap className="h-5 w-5 mr-2" />
              Production Grade
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              <Star className="h-5 w-5 mr-2" />
              International Scale
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <Card 
              key={feature.id} 
              className="border-4 border-transparent hover:border-indigo-400 transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-gray-50"
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{feature.name}</div>
                      <div className="text-sm text-gray-500">Feature #{idx + 1}</div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(feature.status)} text-white animate-pulse`}>
                    {feature.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Complexity Level:</span>
                    <Badge className="bg-red-600 text-white">ADVANCED</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Implementation:</span>
                    <Badge className="bg-green-600 text-white">COMPLETE</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Impact Level:</span>
                    <Badge className="bg-purple-600 text-white">INTERNATIONAL</Badge>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Explore Feature
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack Overview */}
        <Card className="mb-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white border-4 border-yellow-400">
          <CardHeader>
            <CardTitle className="flex items-center text-3xl">
              <Zap className="h-10 w-10 mr-4 text-yellow-400" />
              🏆 International-Level Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-white/10 rounded-lg border-2 border-yellow-400/30">
                <Camera className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                <h4 className="font-bold text-xl mb-2">AI & Computer Vision</h4>
                <p className="text-sm text-blue-200">Advanced ML models, real-time processing, 95% accuracy</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg border-2 border-yellow-400/30">
                <Shield className="h-16 w-16 mx-auto mb-4 text-green-300" />
                <h4 className="font-bold text-xl mb-2">Blockchain & Security</h4>
                <p className="text-sm text-green-200">Immutable data, smart contracts, tamper-proof records</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg border-2 border-yellow-400/30">
                <Cpu className="h-16 w-16 mx-auto mb-4 text-purple-300" />
                <h4 className="font-bold text-xl mb-2">IoT & Edge Computing</h4>
                <p className="text-sm text-purple-200">Raspberry Pi network, real-time sensors, edge AI</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg border-2 border-yellow-400/30">
                <Globe className="h-16 w-16 mx-auto mb-4 text-orange-300" />
                <h4 className="font-bold text-xl mb-2">Global Scale & AR</h4>
                <p className="text-sm text-orange-200">Multi-country deployment, AR identification, voice AI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hackathon Winning Features */}
        <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-3xl text-center justify-center">
              <Award className="h-10 w-10 mr-4 text-yellow-600" />
              🥇 Why This Wins IIT Bombay Hackathon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xl text-yellow-800 mb-4">🎯 Technical Excellence</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>7 International-level features implemented</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>AI/ML, Blockchain, IoT, AR integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Real-time processing & edge computing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Multi-language voice recognition</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-xl text-yellow-800 mb-4">🌍 Global Impact</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>6+ countries deployment ready</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Research-grade analytics dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Academic collaboration framework</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Scalable AWS cloud architecture</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white mb-2">🏆 Complete International-Level Solution</h3>
              <p className="text-yellow-100">
                The most comprehensive wildlife protection platform with cutting-edge technology stack
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternationalFeaturesHub;