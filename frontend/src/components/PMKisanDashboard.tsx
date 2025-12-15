import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Calendar,
  User,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  TrendingUp,
  FileText,
  Download
} from 'lucide-react';

const PMKisanDashboard = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');

  // Mock PM Kisan data for demo
  const mockFarmerData = {
    name: "राम कुमार शर्मा",
    fatherName: "श्याम लाल शर्मा", 
    aadhaar: "****-****-1234",
    mobile: "+91-98765-43210",
    village: "रामपुर",
    district: "मेरठ",
    state: "उत्तर प्रदेश",
    bankAccount: "****-****-5678",
    ifsc: "SBIN0001234",
    landArea: "2.5 एकड़",
    registrationDate: "15-Jan-2019",
    status: "Active",
    installments: [
      { installment: 1, amount: 2000, date: "01-Apr-2024", status: "Credited", utr: "UTR240401001" },
      { installment: 2, amount: 2000, date: "01-Aug-2024", status: "Credited", utr: "UTR240801002" },
      { installment: 3, amount: 2000, date: "01-Dec-2024", status: "Pending", utr: "-" }
    ],
    totalReceived: 4000,
    nextInstallment: "01-Dec-2024",
    eligibilityStatus: "Eligible"
  };

  const handleSearch = () => {
    if (!searchId.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFarmerData(mockFarmerData);
      setLoading(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Credited': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Credited': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="Government of India" 
              className="h-16 w-16 mr-4"
            />
            <div>
              <Badge className="mb-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-green-600 text-white text-lg">
                🇮🇳 भारत सरकार
              </Badge>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                PM-KISAN Status Dashboard
              </h1>
              <p className="text-gray-600 text-lg mt-2">प्रधानमंत्री किसान सम्मान निधि योजना</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-green-600 text-white">
            <CardTitle className="flex items-center text-xl">
              <User className="mr-2 h-6 w-6" />
              किसान स्थिति जांच (Farmer Status Check)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="searchId" className="text-sm font-semibold text-gray-700 mb-2 block">
                  आधार नंबर / मोबाइल नंबर / खाता संख्या दर्ज करें
                </Label>
                <Input
                  id="searchId"
                  type="text"
                  placeholder="e.g., 1234-5678-9012 या 9876543210"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="border-2 border-gray-200 focus:border-orange-500 rounded-lg text-lg p-3"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    खोज रहे हैं...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    स्थिति जांचें
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 डेमो के लिए कोई भी नंबर डालें - यह सैंपल डेटा दिखाएगा
            </p>
          </CardContent>
        </Card>

        {/* Results Section */}
        {farmerData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Farmer Details */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    किसान विवरण
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
                      {farmerData.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{farmerData.name}</h3>
                    <p className="text-gray-600">पिता: {farmerData.fatherName}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">आधार:</span>
                      <span className="font-semibold">{farmerData.aadhaar}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">मोबाइल:</span>
                      <span className="font-semibold">{farmerData.mobile}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">गांव:</span>
                      <span className="font-semibold">{farmerData.village}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">जिला:</span>
                      <span className="font-semibold">{farmerData.district}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">राज्य:</span>
                      <span className="font-semibold">{farmerData.state}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">भूमि:</span>
                      <span className="font-semibold">{farmerData.landArea}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Details */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    बैंक विवरण
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">खाता संख्या:</span>
                    <span className="font-semibold">{farmerData.bankAccount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">IFSC कोड:</span>
                    <span className="font-semibold">{farmerData.ifsc}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <span className="text-gray-600">स्थिति:</span>
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      सत्यापित
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Status */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <CardContent className="p-6 text-center">
                    <Banknote className="h-12 w-12 mx-auto mb-2" />
                    <div className="text-3xl font-bold">₹{farmerData.totalReceived.toLocaleString()}</div>
                    <div className="text-sm opacity-90">कुल प्राप्त राशि</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <div className="text-lg font-bold">{farmerData.nextInstallment}</div>
                    <div className="text-sm opacity-90">अगली किस्त</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <div className="text-lg font-bold">{farmerData.eligibilityStatus}</div>
                    <div className="text-sm opacity-90">पात्रता स्थिति</div>
                  </CardContent>
                </Card>
              </div>

              {/* Installment History */}
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5" />
                      किस्त का इतिहास (Installment History)
                    </span>
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <Download className="mr-2 h-4 w-4" />
                      डाउनलोड
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {farmerData.installments.map((installment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${getStatusColor(installment.status)}`}>
                            {getStatusIcon(installment.status)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              किस्त {installment.installment} - ₹{installment.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              दिनांक: {installment.date}
                            </div>
                            {installment.utr !== '-' && (
                              <div className="text-xs text-gray-500">
                                UTR: {installment.utr}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(installment.status)}>
                          {installment.status === 'Credited' ? 'जमा' : 
                           installment.status === 'Pending' ? 'लंबित' : 'असफल'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold mb-2">📋 महत्वपूर्ण जानकारी:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• PM-KISAN योजना के तहत प्रति वर्ष ₹6,000 की राशि 3 किस्तों में दी जाती है</li>
                      <li>• प्रत्येक किस्त ₹2,000 की होती है</li>
                      <li>• किस्त सीधे आपके बैंक खाते में जमा की जाती है</li>
                      <li>• किसी भी समस्या के लिए हेल्पलाइन: 155261 पर संपर्क करें</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!farmerData && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  🌾 PM-KISAN योजना के बारे में
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  प्रधानमंत्री किसान सम्मान निधि योजना के तहत देश के सभी पात्र किसान परिवारों को 
                  प्रति वर्ष ₹6,000 की आर्थिक सहायता प्रदान की जाती है। यह राशि तीन समान किस्तों में 
                  सीधे किसानों के बैंक खाते में जमा की जाती है।
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹6,000</div>
                    <div className="text-sm text-gray-600">प्रति वर्ष</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">किस्तें</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12 करोड़+</div>
                    <div className="text-sm text-gray-600">लाभार्थी</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PMKisanDashboard;