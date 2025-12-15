import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Scan, 
  Eye, 
  Target,
  Layers,
  Smartphone,
  Zap,
  Info,
  AlertTriangle,
  MapPin
} from 'lucide-react';

const ARWildlifeIdentification = () => {
  const [arActive, setArActive] = useState(false);
  const [detectedAnimals, setDetectedAnimals] = useState([]);
  const [arOverlays, setArOverlays] = useState([]);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Device orientation for AR
  useEffect(() => {
    const handleOrientation = (event) => {
      setDeviceOrientation({
        alpha: event.alpha || 0, // Z axis
        beta: event.beta || 0,   // X axis
        gamma: event.gamma || 0  // Y axis
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Start AR camera
  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setArActive(true);
        startARDetection();
      }
    } catch (error) {
      console.error('AR Camera error:', error);
      // Simulate AR for demo
      setArActive(true);
      startARDetection();
    }
  };

  // Stop AR camera
  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setArActive(false);
    setDetectedAnimals([]);
    setArOverlays([]);
  };

  // AR Wildlife Detection
  const startARDetection = () => {
    const detectWildlife = () => {
      if (!arActive) return;

      // Simulate AR wildlife detection
      const wildlifeData = [
        {
          id: 1,
          species: 'Leopard',
          icon: '🐆',
          confidence: 94.2,
          distance: 45,
          threat: 'HIGH',
          position: { x: 320, y: 180 },
          size: { width: 150, height: 100 },
          behavior: 'Stalking',
          arInfo: {
            scientificName: 'Panthera pardus',
            habitat: 'Forest, grassland',
            diet: 'Carnivore',
            avgWeight: '30-90 kg',
            status: 'Near Threatened'
          }
        },
        {
          id: 2,
          species: 'Sambar Deer',
          icon: '🦌',
          confidence: 87.8,
          distance: 78,
          threat: 'LOW',
          position: { x: 580, y: 220 },
          size: { width: 120, height: 80 },
          behavior: 'Grazing',
          arInfo: {
            scientificName: 'Rusa unicolor',
            habitat: 'Dense forest',
            diet: 'Herbivore',
            avgWeight: '100-350 kg',
            status: 'Vulnerable'
          }
        }
      ];

      setDetectedAnimals(wildlifeData);
      
      // Generate AR overlays
      const overlays = wildlifeData.map(animal => ({
        id: animal.id,
        type: 'ANIMAL_INFO',
        position: animal.position,
        content: {
          name: animal.species,
          icon: animal.icon,
          distance: `${animal.distance}m`,
          threat: animal.threat,
          confidence: `${animal.confidence}%`
        }
      }));

      setArOverlays(overlays);
    };

    const interval = setInterval(detectWildlife, 2000);
    return () => clearInterval(interval);
  };

  // Get threat color
  const getThreatColor = (threat) => {
    switch (threat) {
      case 'HIGH': return 'border-red-500 bg-red-500/20 text-red-800';
      case 'MEDIUM': return 'border-orange-500 bg-orange-500/20 text-orange-800';
      case 'LOW': return 'border-green-500 bg-green-500/20 text-green-800';
      default: return 'border-gray-500 bg-gray-500/20 text-gray-800';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <Layers className="h-4 w-4 mr-2" />
            Augmented Reality Wildlife ID
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🥽 AR Wildlife Identification System
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Point your camera at wildlife to get instant AR overlays with species information and threat assessment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* AR Camera View */}
          <Card className="border-4 border-pink-400">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-pink-600" />
                  AR Camera View
                </div>
                <Badge className={`${arActive ? 'bg-green-600 animate-pulse' : 'bg-gray-600'} text-white`}>
                  {arActive ? '🔴 AR ACTIVE' : '⚫ INACTIVE'}
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
                  style={{ display: arActive ? 'block' : 'none' }}
                />
                
                {!arActive && (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-800">
                    <div className="text-center text-white">
                      <Layers className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">AR Camera Inactive</p>
                      <p className="text-sm opacity-75">Start AR to identify wildlife</p>
                    </div>
                  </div>
                )}

                {/* AR Overlays */}
                {arActive && arOverlays.map((overlay) => (
                  <div
                    key={overlay.id}
                    className={`absolute border-4 rounded-lg p-2 ${getThreatColor(overlay.content.threat)}`}
                    style={{
                      left: `${(overlay.position.x / 640) * 100}%`,
                      top: `${(overlay.position.y / 480) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{overlay.content.icon}</div>
                      <div className="font-bold text-sm">{overlay.content.name}</div>
                      <div className="text-xs">
                        {overlay.content.distance} • {overlay.content.confidence}
                      </div>
                      <Badge className={`mt-1 text-xs ${
                        overlay.content.threat === 'HIGH' ? 'bg-red-600' :
                        overlay.content.threat === 'MEDIUM' ? 'bg-orange-600' : 'bg-green-600'
                      } text-white`}>
                        {overlay.content.threat}
                      </Badge>
                    </div>
                  </div>
                ))}

                {/* AR Crosshair */}
                {arActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-2 border-white rounded-full opacity-50">
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* AR Controls */}
              <div className="flex space-x-2">
                {!arActive ? (
                  <Button onClick={startAR} className="bg-pink-600 hover:bg-pink-700">
                    <Layers className="mr-2 h-4 w-4" />
                    Start AR Mode
                  </Button>
                ) : (
                  <Button onClick={stopAR} className="bg-red-600 hover:bg-red-700">
                    <Eye className="mr-2 h-4 w-4" />
                    Stop AR
                  </Button>
                )}
                
                <Button 
                  disabled={!arActive}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Scan className="mr-2 h-4 w-4" />
                  Scan Area
                </Button>
              </div>

              {/* Device Orientation */}
              {arActive && (
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Device Orientation:</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Alpha: {deviceOrientation.alpha.toFixed(1)}°</div>
                    <div>Beta: {deviceOrientation.beta.toFixed(1)}°</div>
                    <div>Gamma: {deviceOrientation.gamma.toFixed(1)}°</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detected Wildlife Info */}
          <Card className="border-4 border-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-6 w-6 mr-2 text-purple-600" />
                AR Wildlife Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {detectedAnimals.map((animal) => (
                  <div key={animal.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{animal.icon}</span>
                        <div>
                          <div className="font-bold text-lg">{animal.species}</div>
                          <div className="text-sm text-gray-600">{animal.arInfo.scientificName}</div>
                        </div>
                      </div>
                      <Badge className={`${
                        animal.threat === 'HIGH' ? 'bg-red-600' :
                        animal.threat === 'MEDIUM' ? 'bg-orange-600' : 'bg-green-600'
                      } text-white`}>
                        {animal.threat}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Distance:</span>
                          <span className="ml-2">{animal.distance}m</span>
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span>
                          <span className="ml-2 text-green-600">{animal.confidence}%</span>
                        </div>
                        <div>
                          <span className="font-medium">Behavior:</span>
                          <span className="ml-2">{animal.behavior}</span>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <span className="ml-2 text-orange-600">{animal.arInfo.status}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="font-medium mb-1">Species Information:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Habitat: {animal.arInfo.habitat}</div>
                          <div>Diet: {animal.arInfo.diet}</div>
                          <div>Weight: {animal.arInfo.avgWeight}</div>
                          <div>Conservation: {animal.arInfo.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {detectedAnimals.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Wildlife Detected</h3>
                    <p className="text-gray-500">Point camera at wildlife to see AR information</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AR Features */}
        <Card className="mb-12 bg-gradient-to-r from-pink-900 to-purple-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Smartphone className="h-8 w-8 mr-3" />
              🚀 AR Technology Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <Eye className="h-12 w-12 mx-auto mb-3 text-pink-300" />
                <h4 className="font-bold mb-2">Real-Time Recognition</h4>
                <p className="text-sm text-pink-200">Instant species identification via camera</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Layers className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                <h4 className="font-bold mb-2">3D AR Overlays</h4>
                <p className="text-sm text-purple-200">Interactive information layers in real space</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <h4 className="font-bold mb-2">GPS Integration</h4>
                <p className="text-sm text-blue-200">Location-aware wildlife database</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-red-300" />
                <h4 className="font-bold mb-2">Threat Assessment</h4>
                <p className="text-sm text-red-200">Instant danger level evaluation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AR Instructions */}
        <Card className="border-4 border-indigo-400">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-6 w-6 mr-2 text-indigo-600" />
              📱 How to Use AR Wildlife ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-indigo-800 mb-3">Getting Started:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Click "Start AR Mode" to activate camera</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Point camera at wildlife or animals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>AR overlays will appear automatically</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    <span>View detailed species information</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-green-800 mb-3">AR Features:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>Real-time species identification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span>Distance measurement to animals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span>Automatic threat level assessment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-purple-600" />
                    <span>Detailed species information overlay</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ARWildlifeIdentification;