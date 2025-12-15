import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Zap, Shield, Globe, BarChart3, ExternalLink } from 'lucide-react';

const AWSIntegration = () => {
  const awsServices = [
    {
      icon: <Cloud className="h-8 w-8 text-orange-500" />,
      name: "AWS Lambda",
      description: "Serverless backend functions for crop analysis",
      status: "Ready for deployment",
      color: "bg-orange-100 text-orange-800"
    },
    {
      icon: <Database className="h-8 w-8 text-blue-500" />,
      name: "Amazon RDS",
      description: "Managed database for farmer and crop data",
      status: "Migration ready",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      name: "AWS IoT Core",
      description: "Connect Raspberry Pi sensors to cloud",
      status: "Integration configured",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      name: "AWS Cognito",
      description: "Secure farmer authentication system",
      status: "Security ready",
      color: "bg-green-100 text-green-800"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      name: "CloudFront CDN",
      description: "Global content delivery for fast access",
      status: "Performance optimized",
      color: "bg-purple-100 text-purple-800"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-500" />,
      name: "Amazon SageMaker",
      description: "ML models for crop disease prediction",
      status: "AI/ML ready",
      color: "bg-red-100 text-red-800"
    }
  ];

  const deploymentSteps = [
    {
      step: 1,
      title: "Infrastructure Setup",
      description: "Deploy Lambda functions, RDS database, and S3 buckets",
      time: "15 minutes"
    },
    {
      step: 2,
      title: "IoT Configuration",
      description: "Connect Raspberry Pi sensors to AWS IoT Core",
      time: "10 minutes"
    },
    {
      step: 3,
      title: "AI Model Deployment",
      description: "Deploy crop disease detection models to SageMaker",
      time: "20 minutes"
    },
    {
      step: 4,
      title: "Frontend Migration",
      description: "Deploy React app to S3 with CloudFront CDN",
      time: "5 minutes"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-600 text-white">AWS X Impact Challenge</Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ☁️ AWS Cloud Integration Ready
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Smart Agriculture platform is architected for seamless AWS deployment with enterprise-grade scalability
          </p>
        </div>

        {/* AWS Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {awsServices.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-3 bg-white rounded-full shadow-lg w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                <Badge className={service.color}>{service.status}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Deployment Timeline */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">🚀 AWS Deployment Timeline</CardTitle>
            <p className="text-center text-gray-600">Complete migration to AWS in under 1 hour</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deploymentSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <Badge variant="outline">{step.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AWS Architecture Diagram */}
        <Card className="mb-12 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">🏗️ AWS Architecture Overview</h3>
              <p className="text-orange-100 max-w-3xl mx-auto">
                Scalable, secure, and cost-effective cloud infrastructure designed for 600M+ farmers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-6 mb-4">
                  <Globe className="h-12 w-12 mx-auto mb-3 text-orange-200" />
                  <h4 className="font-semibold mb-2">Frontend Layer</h4>
                  <p className="text-sm text-orange-100">React app on S3 + CloudFront for global delivery</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-6 mb-4">
                  <Zap className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                  <h4 className="font-semibold mb-2">API Layer</h4>
                  <p className="text-sm text-blue-100">Lambda functions with API Gateway for serverless backend</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-6 mb-4">
                  <Database className="h-12 w-12 mx-auto mb-3 text-green-200" />
                  <h4 className="font-semibold mb-2">Data Layer</h4>
                  <p className="text-sm text-green-100">RDS for structured data + S3 for images and analytics</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AWS Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-green-600" />
                Enterprise Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  End-to-end encryption for farmer data
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  AWS Cognito for secure authentication
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  VPC isolation for sensitive operations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Compliance with data protection regulations
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                Scalability & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Auto-scaling for 600M+ concurrent users
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Global CDN for sub-100ms response times
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Serverless architecture for cost optimization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Real-time IoT data processing at scale
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-100 to-blue-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for AWS Migration</h3>
              <p className="text-gray-600 mb-6">
                Our platform is architected with AWS best practices and ready for immediate deployment to serve millions of farmers across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => window.open('https://aws.amazon.com/amplify/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Deploy on AWS Amplify
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://github.com/pranavpatil059/iit-bombay-smart-agriculture', '_blank')}
                >
                  View AWS Configs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AWSIntegration;