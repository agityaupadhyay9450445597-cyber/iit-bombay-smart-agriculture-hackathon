import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  IndianRupee,
  Calendar,
  User,
  Phone,
  MapPin,
  AlertCircle,
  Download,
  ExternalLink
} from 'lucide-react';

const PMKisanChecker = () => {
  const [formData, setFormData] = useState({
    aadharNumber: '',
    accountNumber: '',
    mobileNumber: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulate PM Kisan status check
  const checkPMKisanStatus = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Generate realistic PM Kisan data
      const installments = [
        { installment: 13, amount: 2000, date: '2024-12-01', status: 'Credited', utr: 'UTR240001234567' },
        { installment: 12, amount: 2000, date: '2024-08-01', status: 'Credited', utr: 'UTR240001234566' },
        { installment: 11, amount: 2000, date: '2024-04-01', status: 'Credited', utr: 'UTR240001234565' },
        { installment: 10, amount: 2000, date: '2023-12-01', status: 'Credited', utr: 'UTR230001234564' },
        { installment: 9, amount: 2000, date: '2023-08-01', status: 'Credited', utr: 'UTR230001234563' }
      ];

      const mockResult = {
        beneficiaryName: 'राम कुमार शर्मा',
        registrationNumber: 'PM' + Math.random().toString().substr(2, 10),
        aadharNumber: formData.aadharNumber,
        accountNumber: '****' + formData.accountNumber.slice(-4),
        ifscCode: 'SBIN0001234',
        bankName: 'State Bank of India',
        district: 'Meerut',
        state: 'Uttar Pradesh',
        village: 'रामपुर',
        landHolding: '2.5 हेक्टेयर',
        registrationDate: '2019-02-15',
        status: 'Active',
        totalAmount: installments.reduce((sum, inst) => sum + inst.amount, 0),
        installments: installments,
        nextInstallment: {
          dueDate: '2025-04-01',
          expectedAmount: 2000,
          status: 'Pending'
        }
      };

      setResult(mockResult);
      setLoading(false);
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPMKisanStatus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-600 to-green-600 text-white">
            <IndianRupee className="mr-2 h-4 w-4" />
            PM-KISAN Samman Nidhi Yojana
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
            🇮🇳 PM किसान पैसा चेकर
          </h1>
          <p className="text-gray-600 text-lg">Check your PM-KISAN installment status and payment history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                PM-KISAN Status Check
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber" className="text-sm font-semibold text-gray-700">
                    आधार नंबर (Aadhar Number)
                  </Label>
                  <Input
                    id="aadharNumber"
                    name="aadharNumber"
                    type="text"
                    placeholder="1234 5678 9012"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    className="border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                    maxLength="12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-sm font-semibold text-gray-700">
                    बैंक खाता नंबर (Bank Account Number)
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    placeholder="123456789012"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="text-sm font-semibold text-gray-700">
                    मोबाइल नंबर (Mobile Number)
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                    maxLength="10"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Checking Status...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Check PM-KISAN Status
                    </>
                  )}
                </Button>

                {/* Quick Links */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-700">Quick Links:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => window.open('https://pmkisan.gov.in/', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Official PM-KISAN Portal
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => window.open('https://pmkisan.gov.in/Rpt_BeneficiaryStatus_pub.aspx', '_blank')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Beneficiary Status
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => window.open('https://pmkisan.gov.in/UpdateAadharNoByFarmer.aspx', '_blank')}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Update Aadhar Details
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Beneficiary Details */}
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-orange-50">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-orange-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        Beneficiary Details
                      </span>
                      <Badge className={`${result.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {result.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="ml-2 font-semibold">{result.beneficiaryName}</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Registration:</span>
                          <span className="ml-2 font-semibold">{result.registrationNumber}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="ml-2 font-semibold">{result.village}, {result.district}, {result.state}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Account:</span>
                          <span className="ml-2 font-semibold">{result.accountNumber}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Registered:</span>
                          <span className="ml-2 font-semibold">{result.registrationDate}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Land:</span>
                          <span className="ml-2 font-semibold">{result.landHolding}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Summary */}
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <IndianRupee className="mr-2 h-5 w-5" />
                        Payment Summary
                      </span>
                      <Badge className="bg-white/20 text-white">
                        Total: ₹{result.totalAmount.toLocaleString()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-3xl font-bold text-green-600">₹{result.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Received</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600">{result.installments.length}</div>
                        <div className="text-sm text-gray-600">Installments Paid</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="text-3xl font-bold text-orange-600">₹{result.nextInstallment.expectedAmount}</div>
                        <div className="text-sm text-gray-600">Next Expected</div>
                      </div>
                    </div>

                    {/* Next Installment */}
                    <div className="p-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-lg border-l-4 border-orange-500 mb-6">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Next Installment (14th):
                      </h4>
                      <p className="text-sm">
                        <strong>Expected Date:</strong> {result.nextInstallment.dueDate} | 
                        <strong> Amount:</strong> ₹{result.nextInstallment.expectedAmount} | 
                        <strong> Status:</strong> <span className="text-orange-600">{result.nextInstallment.status}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment History */}
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Payment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {result.installments.map((installment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                              {installment.installment}
                            </div>
                            <div>
                              <div className="font-semibold">Installment {installment.installment}</div>
                              <div className="text-sm text-gray-600">{installment.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">₹{installment.amount}</div>
                            <div className="text-xs text-gray-500">UTR: {installment.utr}</div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMKisanChecker;