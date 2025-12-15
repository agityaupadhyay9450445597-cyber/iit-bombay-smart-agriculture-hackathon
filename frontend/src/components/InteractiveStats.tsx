import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Droplets, 
  Zap, 
  Globe, 
  Award,
  Target,
  Clock,
  Sparkles
} from 'lucide-react';

const InteractiveStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    farmers: 0,
    accuracy: 0,
    waterSaved: 0,
    revenue: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    const targets = { farmers: 600, accuracy: 95, waterSaved: 40, revenue: 50 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedNumbers({
        farmers: Math.floor(targets.farmers * easeOut),
        accuracy: Math.floor(targets.accuracy * easeOut),
        waterSaved: Math.floor(targets.waterSaved * easeOut),
        revenue: Math.floor(targets.revenue * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedNumbers(targets);
      }
    }, stepTime);
  };

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: `${animatedNumbers.farmers}M+`,
      label: "Farmers Empowered",
      description: "Target Indian farmers across rural areas",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      number: `${animatedNumbers.accuracy}%`,
      label: "AI Accuracy",
      description: "Crop disease detection precision",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      number: `${animatedNumbers.waterSaved}%`,
      label: "Water Conservation",
      description: "Smart irrigation recommendations",
      gradient: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      number: `$${animatedNumbers.revenue}B`,
      label: "Market Opportunity",
      description: "Indian agriculture market size",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "IIT Bombay Winner",
      description: "AWS X Impact Challenge 2025"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "12 Hour Build",
      description: "Complete platform in hackathon"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Multi-Language",
      description: "Hindi & English support"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Pan-India Ready",
      description: "Scalable cloud architecture"
    }
  ];

  return (
    <section id="stats-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white border-0 shadow-lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Impact Metrics
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Transforming Agriculture
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform is making a real difference in the lives of farmers across the country
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  
                  {/* Number */}
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-lg font-semibold text-gray-200 mb-3">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-gray-900/90 rounded-3xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              🏆 Hackathon Achievements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-400 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {achievement.title}
                  </h4>
                  
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-2xl text-gray-300 font-light">
            Building the future of <span className="text-green-400 font-semibold">Smart Agriculture</span> in India
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;