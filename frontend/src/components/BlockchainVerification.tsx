import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Link, 
  CheckCircle, 
  Clock,
  Hash,
  Database,
  Lock,
  Zap,
  Globe,
  Award
} from 'lucide-react';

const BlockchainVerification = () => {
  const [verifiedSightings, setVerifiedSightings] = useState([]);
  const [blockchainStats, setBlockchainStats] = useState({
    totalBlocks: 0,
    verifiedSightings: 0,
    networkNodes: 0,
    lastBlockTime: null
  });
  const [isVerifying, setIsVerifying] = useState(false);

  // Generate blockchain data
  useEffect(() => {
    const generateBlockchainData = () => {
      const sightings = [
        {
          id: 1,
          blockHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
          species: 'Leopard',
          icon: '🐆',
          location: 'Junnar, Maharashtra',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          reporter: 'Forest Beat Officer #47',
          confidence: 96.8,
          verificationStatus: 'VERIFIED',
          consensusNodes: 12,
          blockNumber: 15847,
          gasUsed: '0.0023 ETH',
          ipfsHash: 'QmX7Y8Z9A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6',
          smartContractAddress: '0xWildlifeVerification2024'
        },
        {
          id: 2,
          blockHash: '0x9876543210fedcba0987654321fedcba09876543',
          species: 'Tiger',
          icon: '🐅',
          location: 'Tadoba Reserve, Chandrapur',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          reporter: 'Camera Trap AI System',
          confidence: 98.5,
          verificationStatus: 'VERIFIED',
          consensusNodes: 15,
          blockNumber: 15846,
          gasUsed: '0.0019 ETH',
          ipfsHash: 'QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2',
          smartContractAddress: '0xWildlifeVerification2024'
        },
        {
          id: 3,
          blockHash: '0xabcdef1234567890fedcba0987654321abcdef12',
          species: 'Wild Boar',
          icon: '🐗',
          location: 'Mulshi, Pune',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          reporter: 'Local Farmer via Mobile App',
          confidence: 89.2,
          verificationStatus: 'PENDING',
          consensusNodes: 8,
          blockNumber: 15845,
          gasUsed: '0.0015 ETH',
          ipfsHash: 'QmF1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3',
          smartContractAddress: '0xWildlifeVerification2024'
        }
      ];

      setVerifiedSightings(sightings);
      setBlockchainStats({
        totalBlocks: 15847,
        verifiedSightings: sightings.filter(s => s.verificationStatus === 'VERIFIED').length,
        networkNodes: 24,
        lastBlockTime: new Date(Date.now() - 300000).toISOString()
      });
    };

    generateBlockchainData();
    const interval = setInterval(generateBlockchainData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Verify new sighting on blockchain
  const verifyNewSighting = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      const newSighting = {
        id: Date.now(),
        blockHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        species: 'Sloth Bear',
        icon: '🐻',
        location: 'Bhimashankar, Maharashtra',
        timestamp: new Date().toISOString(),
        reporter: 'Drone Survey Team',
        confidence: 93.7,
        verificationStatus: 'VERIFIED',
        consensusNodes: 14,
        blockNumber: blockchainStats.totalBlocks + 1,
        gasUsed: '0.0021 ETH',
        ipfsHash: `Qm${Math.random().toString(36).substr(2, 44)}`,
        smartContractAddress: '0xWildlifeVerification2024'
      };

      setVerifiedSightings(prev => [newSighting, ...prev.slice(0, 4)]);
      setBlockchainStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + 1,
        verifiedSightings: prev.verifiedSightings + 1,
        lastBlockTime: new Date().toISOString()
      }));
      
      setIsVerifying(false);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED': return 'bg-green-600';
      case 'PENDING': return 'bg-yellow-600';
      case 'REJECTED': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <Shield className="h-4 w-4 mr-2" />
            Blockchain Wildlife Verification
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            ⛓️ Tamper-Proof Wildlife Records
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Immutable blockchain verification system ensuring authentic wildlife sighting data
          </p>
        </div>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <Database className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{blockchainStats.totalBlocks.toLocaleString()}</div>
              <div className="text-blue-100 text-sm">Total Blocks</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{blockchainStats.verifiedSightings}</div>
              <div className="text-green-100 text-sm">Verified Sightings</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <Globe className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{blockchainStats.networkNodes}</div>
              <div className="text-purple-100 text-sm">Network Nodes</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">
                {blockchainStats.lastBlockTime ? 
                  new Date(blockchainStats.lastBlockTime).toLocaleTimeString() : 
                  '--:--'
                }
              </div>
              <div className="text-orange-100 text-sm">Last Block</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Verified Sightings */}
          <Card className="border-4 border-indigo-400">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link className="h-6 w-6 mr-2 text-indigo-600" />
                  Blockchain Verified Sightings
                </div>
                <Button 
                  onClick={verifyNewSighting}
                  disabled={isVerifying}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isVerifying ? (
                    <>
                      <Zap className="mr-2 h-4 w-4 animate-spin" />
                      Mining...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Add New Block
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {verifiedSightings.map((sighting) => (
                  <div key={sighting.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{sighting.icon}</span>
                        <div>
                          <div className="font-bold">{sighting.species}</div>
                          <div className="text-sm text-gray-600">{sighting.location}</div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(sighting.verificationStatus)} text-white`}>
                        {sighting.verificationStatus}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Block #:</span>
                          <span className="ml-1 font-mono">{sighting.blockNumber}</span>
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span>
                          <span className="ml-1 text-green-600">{sighting.confidence}%</span>
                        </div>
                        <div>
                          <span className="font-medium">Nodes:</span>
                          <span className="ml-1">{sighting.consensusNodes}/24</span>
                        </div>
                        <div>
                          <span className="font-medium">Gas:</span>
                          <span className="ml-1 text-blue-600">{sighting.gasUsed}</span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Block Hash:</span>
                        <div className="font-mono text-xs bg-gray-200 p-1 rounded mt-1 break-all">
                          {sighting.blockHash}
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium">IPFS Hash:</span>
                        <div className="font-mono text-xs bg-gray-200 p-1 rounded mt-1 break-all">
                          {sighting.ipfsHash}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-gray-500">
                          {new Date(sighting.timestamp).toLocaleString()}
                        </span>
                        <span className="text-blue-600 text-xs">
                          By: {sighting.reporter}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Smart Contract Info */}
          <Card className="border-4 border-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 mr-2 text-purple-600" />
                Smart Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-purple-100 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">Contract Address</h4>
                  <div className="font-mono text-sm bg-white p-2 rounded border">
                    0xWildlifeVerification2024
                  </div>
                </div>
                
                <div className="p-4 bg-blue-100 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Network Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="font-medium">Ethereum Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas Price:</span>
                      <span className="font-medium">20 Gwei</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Block Time:</span>
                      <span className="font-medium">~15 seconds</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-100 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Verification Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Multi-node consensus required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>IPFS storage for images/data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Immutable timestamp records</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Cryptographic proof of authenticity</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-100 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">Trust Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Integrity:</span>
                      <Badge className="bg-green-600 text-white">100%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Uptime:</span>
                      <Badge className="bg-green-600 text-white">99.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consensus Rate:</span>
                      <Badge className="bg-green-600 text-white">98.7%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Benefits */}
        <Card className="mb-12 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Award className="h-8 w-8 mr-3" />
              🏆 Blockchain Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <Shield className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <h4 className="font-bold mb-2">Tamper-Proof</h4>
                <p className="text-sm text-blue-200">Immutable records prevent data manipulation</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <h4 className="font-bold mb-2">Verified Authenticity</h4>
                <p className="text-sm text-green-200">Multi-node consensus ensures accuracy</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Globe className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                <h4 className="font-bold mb-2">Global Trust</h4>
                <p className="text-sm text-purple-200">Decentralized verification network</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Database className="h-12 w-12 mx-auto mb-3 text-orange-300" />
                <h4 className="font-bold mb-2">Permanent Storage</h4>
                <p className="text-sm text-orange-200">IPFS + blockchain for eternal records</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockchainVerification;