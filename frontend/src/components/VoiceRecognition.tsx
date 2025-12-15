import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Languages,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Radio
} from 'lucide-react';

const VoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hi-IN');
  const [transcript, setTranscript] = useState('');
  const [voiceCommands, setVoiceCommands] = useState([]);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = currentLanguage;
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [currentLanguage]);

  // Process voice commands
  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let response = '';
    let action = '';
    let priority = 'MEDIUM';

    // Hindi commands
    if (lowerCommand.includes('खतरा') || lowerCommand.includes('जानवर') || lowerCommand.includes('शेर') || lowerCommand.includes('बाघ')) {
      response = 'तुरंत सुरक्षित स्थान पर जाएं। वन विभाग को सूचित कर रहे हैं।';
      action = 'EMERGENCY_ALERT';
      priority = 'CRITICAL';
    } else if (lowerCommand.includes('मदद') || lowerCommand.includes('सहायता')) {
      response = 'आपातकालीन हेल्पलाइन 1926 पर कॉल करें। स्थानीय वन अधिकारी को सूचना भेजी गई।';
      action = 'HELP_REQUEST';
      priority = 'HIGH';
    } else if (lowerCommand.includes('स्थिति') || lowerCommand.includes('रिपोर्ट')) {
      response = 'वर्तमान में आपके क्षेत्र में मध्यम जोखिम है। सावधान रहें।';
      action = 'STATUS_CHECK';
      priority = 'MEDIUM';
    }
    // English commands
    else if (lowerCommand.includes('danger') || lowerCommand.includes('animal') || lowerCommand.includes('leopard') || lowerCommand.includes('tiger')) {
      response = 'Move to safe location immediately. Alerting forest department.';
      action = 'EMERGENCY_ALERT';
      priority = 'CRITICAL';
    } else if (lowerCommand.includes('help') || lowerCommand.includes('emergency')) {
      response = 'Call emergency helpline 1926. Local forest officer has been notified.';
      action = 'HELP_REQUEST';
      priority = 'HIGH';
    } else if (lowerCommand.includes('status') || lowerCommand.includes('report')) {
      response = 'Current risk level in your area is medium. Stay alert.';
      action = 'STATUS_CHECK';
      priority = 'MEDIUM';
    } else {
      response = currentLanguage === 'hi-IN' ? 
        'समझ नहीं आया। कृपया स्पष्ट रूप से बोलें।' : 
        'Command not recognized. Please speak clearly.';
      action = 'UNKNOWN_COMMAND';
      priority = 'LOW';
    }

    const newCommand = {
      id: Date.now(),
      command: command,
      response: response,
      action: action,
      priority: priority,
      timestamp: new Date().toLocaleTimeString(),
      language: currentLanguage === 'hi-IN' ? 'Hindi' : 'English'
    };

    setVoiceCommands(prev => [newCommand, ...prev.slice(0, 4)]);
    
    // Speak response
    speakResponse(response);
  };

  // Text-to-speech response
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start/stop listening
  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  // Change language
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    if (recognition) {
      recognition.lang = lang;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-600';
      case 'MEDIUM': return 'bg-yellow-600';
      case 'LOW': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <Languages className="h-4 w-4 mr-2" />
            Voice Recognition System
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🎤 Hindi/English Voice Commands
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Emergency voice commands in Hindi and English for instant wildlife alerts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Voice Control Panel */}
          <Card className="border-4 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="h-6 w-6 mr-2 text-green-600" />
                  Voice Control
                </div>
                <Badge className={`${isListening ? 'bg-red-600 animate-pulse' : 'bg-gray-600'} text-white`}>
                  {isListening ? '🎤 LISTENING' : '🔇 INACTIVE'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Language Selection */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Select Language / भाषा चुनें:</h4>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => changeLanguage('hi-IN')}
                    variant={currentLanguage === 'hi-IN' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    🇮🇳 हिंदी
                  </Button>
                  <Button
                    onClick={() => changeLanguage('en-US')}
                    variant={currentLanguage === 'en-US' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    🇺🇸 English
                  </Button>
                </div>
              </div>

              {/* Voice Control Button */}
              <div className="text-center mb-6">
                <Button
                  onClick={toggleListening}
                  size="lg"
                  className={`w-32 h-32 rounded-full ${
                    isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </Button>
                <p className="mt-3 text-sm text-gray-600">
                  {isListening ? 'Click to stop listening' : 'Click to start voice commands'}
                </p>
              </div>

              {/* Current Transcript */}
              {transcript && (
                <div className="p-4 bg-blue-100 rounded-lg border-2 border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-2">Last Command:</h4>
                  <p className="text-blue-700">"{transcript}"</p>
                </div>
              )}

              {/* Sample Commands */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Sample Commands:</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-100 rounded">
                    <strong>Hindi:</strong> "खतरा है", "मदद चाहिए", "स्थिति क्या है"
                  </div>
                  <div className="p-2 bg-gray-100 rounded">
                    <strong>English:</strong> "Danger", "Help needed", "Status report"
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Command History */}
          <Card className="border-4 border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                Command History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {voiceCommands.map((cmd) => (
                  <div key={cmd.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getPriorityColor(cmd.priority)} text-white text-xs`}>
                        {cmd.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{cmd.timestamp}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sm">Command ({cmd.language}):</span>
                        <p className="text-sm text-gray-700">"{cmd.command}"</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-sm">Response:</span>
                        <p className="text-sm text-blue-700">{cmd.response}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">Action:</span>
                        <Badge variant="outline" className="text-xs">
                          {cmd.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                {voiceCommands.length === 0 && (
                  <div className="text-center py-8">
                    <Radio className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Commands Yet</h3>
                    <p className="text-gray-500">Start speaking to see command history</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Actions */}
        <Card className="mb-12 bg-gradient-to-r from-red-900 to-orange-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <AlertTriangle className="h-8 w-8 mr-3" />
              🚨 Emergency Voice Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-red-300" />
                <h4 className="font-bold mb-2">Immediate Danger</h4>
                <p className="text-sm text-red-200">Say "खतरा" or "Danger" for instant alert</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Volume2 className="h-12 w-12 mx-auto mb-3 text-orange-300" />
                <h4 className="font-bold mb-2">Help Request</h4>
                <p className="text-sm text-orange-200">Say "मदद" or "Help" for assistance</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <h4 className="font-bold mb-2">Status Check</h4>
                <p className="text-sm text-green-200">Say "स्थिति" or "Status" for updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceRecognition;