import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Globe, Leaf, BarChart3, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingElements = [
    { icon: <Leaf className="h-8 w-8" />, delay: 0, color: 'text-green-500' },
    { icon: <BarChart3 className="h-6 w-6" />, delay: 1, color: 'text-blue-500' },
    { icon: <Zap className="h-7 w-7" />, delay: 2, color: 'text-yellow-500' },
    { icon: <Globe className="h-6 w-6" />, delay: 3, color: 'text-purple-500' },
    { icon: <Shield className="h-7 w-7" />, delay: 4, color: 'text-red-500' },
    { icon: <Sparkles className="h-5 w-5" />, delay: 5, color: 'text-pink-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.color} opacity-20`}
          style={{
            left: `${10 + (index * 15)}%`,
            top: `${20 + (index * 10)}%`,
            transform: `translateY(${Math.sin(scrollY * 0.01 + element.delay) * 20}px)`,
            animation: `float ${3 + element.delay}s ease-in-out infinite`,
            animationDelay: `${element.delay * 0.5}s`
          }}
        >
          {element.icon}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Badge className="mb-6 px-6 py-2 text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="mr-2 h-4 w-4" />
            IIT Bombay AWS X Impact Challenge 2025 Winner
          </Badge>
        </div>

        {/* Main Heading */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Smart Agriculture
            <br />
            <span className="text-4xl md:text-6xl">Revolution 🌾</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI-powered farming solutions empowering <span className="font-bold text-green-600">600M+ Indian farmers</span> with 
            crop disease detection, yield prediction, and smart market access
          </p>
        </div>

        {/* Stats */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
            {[
              { number: '95%', label: 'AI Accuracy', icon: <Zap className="h-5 w-5" /> },
              { number: '40%', label: 'Water Saved', icon: <Globe className="h-5 w-5" /> },
              { number: '600M+', label: 'Farmers Target', icon: <Leaf className="h-5 w-5" /> },
              { number: '12hrs', label: 'Built in', icon: <Sparkles className="h-5 w-5" /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="flex items-center justify-center mb-2 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/crop-health">
                <Leaf className="mr-2 h-5 w-5" />
                Start Crop Analysis
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/price-estimation">
                <BarChart3 className="mr-2 h-5 w-5" />
                Price Calculator
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold text-gray-600 hover:text-green-600 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://crop-recommendation-system-16.streamlit.app/", "_blank")}
            >
              <Globe className="mr-2 h-5 w-5" />
              Live Demo
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default EnhancedHeroSection;