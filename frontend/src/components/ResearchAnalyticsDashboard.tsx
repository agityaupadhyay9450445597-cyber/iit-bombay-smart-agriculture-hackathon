import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Brain,
  FileText,
  Download,
  Share2,
  Calendar,
  Users,
  Target,
  Award,
  Microscope
} from 'lucide-react';

const ResearchAnalyticsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [researchData, setResearchData] = useState({});
  const [publications, setPublications] = useState([]);
  const [collaborations, setCollaborations] = useState([]);

  // Generate research analytics data
  useEffect(() => {
    const generateResearchData = () => {
      const data = {
        totalDataPoints: 2847392,
        speciesStudied: 247,
        researchPapers: 34,
        collaboratingInstitutions: 18,
        dataAccuracy: 97.8,
        modelPerformance: 94.2,
        conservationImpact: 87.5,
        
        monthlyTrends: [
          { month: 'Jan', sightings: 2340, conflicts: 45, accuracy: 94.2 },
          { month: 'Feb', sightings: 2890, conflicts: 38, accuracy: 95.1 },
          { month: 'Mar', sightings: 3120, conflicts: 52, accuracy: 96.3 },
          { month: 'Apr', sightings: 2750, conflicts: 41, accuracy: 95.8 },
          { month: 'May', sightings: 3450, conflicts: 47, accuracy: 96.7 },
          { month: 'Jun', sightings: 3890, conflicts: 39, accuracy: 97.2 },
          { month: 'Jul', sightings: 4120, conflicts: 43, accuracy: 97.8 },
          { month: 'Aug', sightings: 3780, conflicts: 36, accuracy: 97.5 },
          { month: 'Sep', sightings: 3560, conflicts: 41, accuracy: 97.1 },
          { month: 'Oct', sightings: 3240, conflicts: 48, accuracy: 96.9 },
          { month: 'Nov', sightings: 2980, conflicts: 44, accuracy: 96.4 },
          { month: 'Dec', sightings: 2750, conflicts: 42, accuracy: 96.8 }
        ],
        
        speciesAnalysis: [
          { species: 'Leopard', sightings: 8947, conflicts: 234, riskScore: 8.7, trend: '+12%' },
          { species: 'Tiger', sightings: 3456, conflicts: 89, riskScore: 9.2, trend: '+8%' },
          { species: 'Elephant', sightings: 5678, conflicts: 156, riskScore: 7.8, trend: '-5%' },
          { species: 'Wild Boar', sightings: 12340, conflicts: 345, riskScore: 6.9, trend: '+15%' },
          { species: 'Sloth Bear', sightings: 2890, conflicts: 67, riskScore: 7.2, trend: '+3%' }
        ],
        
        geographicDistribution: [
          { region: 'Western Ghats', coverage: 89, incidents: 456, biodiversity: 9.2 },
          { region: 'Central India', coverage: 76, incidents: 678, biodiversity: 8.7 },
          { region: 'Northeast', coverage: 45, incidents: 234, biodiversity: 9.8 },
          { region: 'Himalayas', coverage: 34, incidents: 123, biodiversity: 8.9 },
          { region: 'Deccan Plateau', coverage: 67, incidents: 345, biodiversity: 7.8 }
        ]
      };

      const papers = [
        {
          id: 1,
          title: 'AI-Driven Wildlife Conflict Prediction in Maharashtra: A Machine Learning Approach',
          authors: ['Dr. Priya Sharma', 'Prof. Rajesh Kumar', 'Dr. Anita Patel'],
          journal: 'Conservation Biology International',
          year: 2024,
          citations: 47,
          impactFactor: 8.2,
          status: 'Published',
          doi: '10.1016/j.biocon.2024.109876'
        },
        {
          id: 2,
          title: 'Blockchain-Based Wildlife Data Verification: Ensuring Authenticity in Conservation Research',
          authors: ['Dr. Michael Chen', 'Prof. Sarah Johnson', 'Dr. Amit Verma'],
          journal: 'Nature Technology',
          year: 2024,
          citations: 23,
          impactFactor: 12.4,
          status: 'Published',
          doi: '10.1038/s41586-024-07123-4'
        },
        {
          id: 3,
          title: 'IoT Sensor Networks for Real-Time Wildlife Monitoring: A Comprehensive Analysis',
          authors: ['Prof. Lisa Wang', 'Dr. Ravi Gupta', 'Dr. Elena Rodriguez'],
          journal: 'IEEE Transactions on Environmental Monitoring',
          year: 2024,
          citations: 31,
          impactFactor: 6.8,
          status: 'Under Review',
          doi: 'Pending'
        }
      ];

      const institutions = [
        {
          name: 'Indian Institute of Technology Bombay',
          country: 'India',
          collaboration: 'Primary Partner',
          projects: 8,
          researchers: 24,
          funding: '$2.3M'
        },
        {
          name: 'Wildlife Conservation Society',
          country: 'USA',
          collaboration: 'Research Partner',
          projects: 5,
          researchers: 12,
          funding: '$1.8M'
        },
        {
          name: 'Max Planck Institute',
          country: 'Germany',
          collaboration: 'Technology Partner',
          projects: 3,
          researchers: 8,
          funding: '$1.2M'
        },
        {
          name: 'University of Oxford',
          country: 'UK',
          collaboration: 'Academic Partner',
          projects: 4,
          researchers: 15,
          funding: '$1.5M'
        }
      ];

      setResearchData(data);
      setPublications(papers);
      setCollaborations(institutions);
    };

    generateResearchData();
    const interval = setInterval(generateResearchData, 30000);
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const timeframes = ['1M', '3M', '6M', '1Y', '2Y'];

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <Microscope className="h-4 w-4 mr-2" />
            Research Analytics Dashboard
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            📊 Research-Grade Wildlife Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Advanced data analytics and research insights for wildlife conservation and academic collaboration
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <Database className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{(researchData.totalDataPoints / 1000000).toFixed(1)}M</div>
              <div className="text-blue-100 text-sm">Data Points</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <Target className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{researchData.speciesStudied}</div>
              <div className="text-green-100 text-sm">Species Studied</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <FileText className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{researchData.researchPapers}</div>
              <div className="text-purple-100 text-sm">Publications</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{researchData.collaboratingInstitutions}</div>
              <div className="text-orange-100 text-sm">Institutions</div>
            </CardContent>
          </Card>
        </div>

        {/* Time Series Analysis */}
        <Card className="mb-12 border-4 border-indigo-400">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
                Wildlife Sightings & Conflict Trends
              </div>
              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <Button
                    key={tf}
                    size="sm"
                    variant={selectedTimeframe === tf ? 'default' : 'outline'}
                    onClick={() => setSelectedTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Interactive Chart: Wildlife Sightings vs Conflicts</p>
                <p className="text-sm text-gray-500">Showing {selectedTimeframe} timeframe data</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{researchData.dataAccuracy}%</div>
                <div className="text-sm text-blue-800">Data Accuracy</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{researchData.modelPerformance}%</div>
                <div className="text-sm text-green-800">Model Performance</div>
              </div>
              <div className="text-center p-4 bg-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{researchData.conservationImpact}%</div>
                <div className="text-sm text-purple-800">Conservation Impact</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Species Analysis */}
          <Card className="border-4 border-purple-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-600" />
                Species-wise Research Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {researchData.speciesAnalysis?.map((species, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-lg">{species.species}</div>
                      <Badge className={`${
                        species.trend.startsWith('+') ? 'bg-red-600' : 'bg-green-600'
                      } text-white`}>
                        {species.trend}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Sightings:</span>
                        <div className="font-bold text-blue-600">{species.sightings.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Conflicts:</span>
                        <div className="font-bold text-orange-600">{species.conflicts}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Risk Score:</span>
                        <div className="font-bold text-red-600">{species.riskScore}/10</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="border-4 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 mr-2 text-green-600" />
                Geographic Research Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {researchData.geographicDistribution?.map((region, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold">{region.region}</div>
                      <div className="text-sm text-gray-600">{region.coverage}% coverage</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Coverage</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${region.coverage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Incidents:</span>
                          <span className="ml-2 font-medium">{region.incidents}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Biodiversity:</span>
                          <span className="ml-2 font-medium text-green-600">{region.biodiversity}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Publications */}
        <Card className="mb-12 border-4 border-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                Research Publications & Impact
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {publications.map((paper) => (
                <div key={paper.id} className="p-6 bg-gray-50 rounded-lg border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">{paper.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        Authors: {paper.authors.join(', ')}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span><strong>Journal:</strong> {paper.journal}</span>
                        <span><strong>Year:</strong> {paper.year}</span>
                        <span><strong>DOI:</strong> {paper.doi}</span>
                      </div>
                    </div>
                    <Badge className={`${
                      paper.status === 'Published' ? 'bg-green-600' : 'bg-yellow-600'
                    } text-white`}>
                      {paper.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{paper.citations}</div>
                      <div className="text-sm text-blue-800">Citations</div>
                    </div>
                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{paper.impactFactor}</div>
                      <div className="text-sm text-green-800">Impact Factor</div>
                    </div>
                    <div className="text-center p-3 bg-purple-100 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Q1</div>
                      <div className="text-sm text-purple-800">Journal Ranking</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Collaborations */}
        <Card className="mb-12 border-4 border-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-orange-600" />
              Global Research Collaborations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collaborations.map((institution, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold">{institution.name}</div>
                      <div className="text-sm text-gray-600">{institution.country}</div>
                    </div>
                    <Badge variant="outline">{institution.collaboration}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Projects:</span>
                      <div className="font-bold text-blue-600">{institution.projects}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Researchers:</span>
                      <div className="font-bold text-green-600">{institution.researchers}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Funding:</span>
                      <div className="font-bold text-purple-600">{institution.funding}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Impact */}
        <Card className="mb-12 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Award className="h-8 w-8 mr-3" />
              🏆 Research Impact & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <Brain className="h-12 w-12 mx-auto mb-3 text-indigo-300" />
                <h4 className="font-bold mb-2">AI Innovation</h4>
                <p className="text-sm text-indigo-200">Breakthrough ML models for wildlife prediction</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Database className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                <h4 className="font-bold mb-2">Open Data</h4>
                <p className="text-sm text-purple-200">Largest wildlife conflict dataset in Asia</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <h4 className="font-bold mb-2">Policy Impact</h4>
                <p className="text-sm text-blue-200">Influencing conservation policies globally</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Award className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <h4 className="font-bold mb-2">Recognition</h4>
                <p className="text-sm text-green-200">Multiple international awards & grants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchAnalyticsDashboard;