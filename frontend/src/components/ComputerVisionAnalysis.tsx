import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Video, 
  Eye, 
  Brain,
  Zap,
  AlertTriangle,
  Target,
  Scan,
  Play,
  Pause,
  Square
} from 'lucide-react';

const ComputerVisionAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedAnimals, setDetectedAnimals] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera feed
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      // Simulate camera for demo
      setCameraActive(true);
    }
  };

  // Stop camera feed
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  // AI Wildlife Detection Simulation
  const analyzeFrame = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const wildlifeDetections = [
        {
          id: 1,
          species: 'Leopard',
          confidence: 94.7,
          boundingBox: { x: 120, y: 80, width: 200, height: 150 },
          threat: 'HIGH',
          behavior: 'Stalking',
          distance: '15-20 meters',
          icon: '🐆'
        }
      ];
      
      setDetectedAnimals(wildlifeDetections);
      setAnalysisResults({
        totalDetections: wildlifeDetections.length,
        highThreatCount: wildlifeDetections.filter(a => a.threat === 'HIGH').length,
        averageConfidence: wildlifeDetections.reduce((sum, a) => sum + a.confidence, 0) / wildlifeDetections.length,
        processingTime: '0.23 seconds',
        modelVersion: 'WildlifeNet v3.2'
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <Brain className="h-4 w-4 mr-2" />
            Computer Vision Wildlife Analysis
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🎥 AI-Powered Camera Feed Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Real-time wildlife detection using advanced computer vision and deep learning models
          </p>
        </div>
        {/* Camera Feed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-4 border-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-purple-600" />
                  Live Camera Feed
                </div>
                <Badge className={`${cameraActive ? 'bg-green-600' : 'bg-gray-600'} text-white animate-pulse`}>
                  {cameraActive ? '🔴 LIVE' : '⚫ OFFLINE'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-80 object-cover"
                  style={{ display: cameraActive ? 'block' : 'none' }}
                />
                
                {!cameraActive && (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-800">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Camera Feed Inactive</p>
                      <p className="text-sm opacity-75">Click start to begin analysis</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Camera Controls */}
              <div className="flex space-x-2">
                {!cameraActive ? (
                  <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                    <Play className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <Button onClick={stopCamera} className="bg-red-600 hover:bg-red-700">
                    <Square className="mr-2 h-4 w-4" />
                    Stop Camera
                  </Button>
                )}
                
                <Button 
                  onClick={analyzeFrame} 
                  disabled={!cameraActive || isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Scan className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Frame
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detection Results */}
          <Card className="border-4 border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                AI Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analysisResults.totalDetections}</div>
                      <div className="text-sm text-blue-800">Animals Detected</div>
                    </div>
                    <div className="text-center p-3 bg-red-100 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{analysisResults.highThreatCount}</div>
                      <div className="text-sm text-red-800">High Threat</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Detected Wildlife:</h4>
                    {detectedAnimals.map((animal) => (
                      <div key={animal.id} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{animal.icon}</span>
                            <span className="font-medium">{animal.species}</span>
                          </div>
                          <Badge className="bg-red-600 text-white">
                            {animal.threat}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Confidence: {animal.confidence}%</div>
                          <div>Distance: {animal.distance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-500">Start camera and click analyze to detect wildlife</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionAnalysis;