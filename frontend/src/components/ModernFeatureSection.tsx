import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileText, 
  Image, 
  ShoppingBag, 
  Leaf, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ModernFeatureSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "AI Crop Price Prediction",
      description: "Advanced ML algorithms predict crop prices with 95% accuracy using market trends, weather data, and historical patterns.",
      chip: "AI-Powered",
      link: "/price-estimation",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: "95% Accuracy",
      features: ["Real-time market analysis", "Weather integration", "Historical data patterns"]
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "Smart Crop Health Scanner",
      description: "Upload crop images for instant disease detection and treatment recommendations using computer vision AI.",
      chip: "Computer Vision",
      link: "/crop-health",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      stats: "50+ Diseases",
      features: ["Instant disease detection", "Treatment recommendations", "Multi-crop support"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Government Schemes Hub",
      description: "Access latest agricultural subsidies, loans, and government schemes with eligibility checker and application guidance.",
      chip: "Updated Daily",
      link: "/government-schemes",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      stats: "100+ Schemes",
      features: ["Eligibility checker", "Application guidance", "Real-time updates"]
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Direct Market Access",
      description: "Connect directly with buyers, eliminate middlemen, and get better prices for your produce through our marketplace.",
      chip: "Marketplace",
      link: "/direct-market",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      stats: "Zero Commission",
      features: ["Direct buyer connection", "Price negotiation", "Secure payments"]
    }
  ];

  return (
    <section id="features-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            <Sparkles className="mr-2 h-4 w-4" />
            Revolutionary Features
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Smart Agriculture Solutions
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive AI-powered tools designed to revolutionize farming operations and increase profitability for Indian farmers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to={feature.link} className="block">
                <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  hoveredCard === index ? 'scale-105 -translate-y-2' : ''
                }`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <Badge className="bg-white/80 text-gray-700 border-0 shadow-sm">
                        {feature.chip}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white text-sm font-semibold shadow-lg`}>
                        <Zap className="mr-2 h-4 w-4" />
                        {feature.stats}
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3 mb-8">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3 group-hover:scale-125 transition-transform duration-300`}></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg text-white border-0 rounded-xl py-3 font-semibold transition-all duration-300 group-hover:scale-105`}
                    >
                      Explore Feature
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h3>
            <p className="text-xl mb-6 opacity-90">Join thousands of farmers already using our platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.open("https://crop-recommendation-system-16.streamlit.app/", "_blank")}
              >
                <Globe className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link to="/crop-health">
                  <Leaf className="mr-2 h-5 w-5" />
                  Start Analysis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeatureSection;