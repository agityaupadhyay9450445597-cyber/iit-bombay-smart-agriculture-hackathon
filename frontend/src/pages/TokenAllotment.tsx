import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Shield, Users, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TokenData {
  id: string;
  name: string;
  contact: string;
  aadharNumber?: string;
  landArea: string;
  email: string;
  crop?: string;
  address?: string;
  pincode?: string;
  status: string;
  allottedDate?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  createdAt: string;
}

const TokenAllotment: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [phone, setPhone] = useState("");
  const [allottedDate, setAllottedDate] = useState<Date>();
  const [status, setStatus] = useState("Approved");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle admin login
  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "admin") {
      setIsAuthenticated(true);
      toast.success("Admin login successful!");
      fetchAllTokens();
    } else {
      toast.error("Invalid admin credentials!");
      setMessage("❌ Access Denied: Invalid Admin Credentials.");
    }
  };

  // Fetch all tokens
  const fetchAllTokens = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tokens/all`);
      setTokens(response.data);
    } catch (error) {
      toast.error("Error fetching tokens");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating the token status and allotted date
  const handleUpdate = async () => {
    if (!phone) {
      toast.error("Please enter phone number");
      return;
    }
  
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tokens/update`, {
        phone,
        allottedDate: allottedDate ? format(allottedDate, "yyyy-MM-dd") : null,
        status,
      });
  
      toast.success("Token updated successfully!");
      setMessage("✅ Status and Allotted Date Updated Successfully!");
      setPhone("");
      setAllottedDate(undefined);
      fetchAllTokens(); // Refresh the list
    } catch (error) {
      toast.error("Error updating token");
      setMessage("❌ Error updating token. Please try again.");
    }
  };

  // Handle bulk status update
  const handleBulkUpdate = async (newStatus: string) => {
    const selectedTokens = tokens.filter(token => token.status === "Pending");
    if (selectedTokens.length === 0) {
      toast.error("No pending tokens to update");
      return;
    }

    try {
      await Promise.all(
        selectedTokens.map(token =>
          axios.put(`${import.meta.env.VITE_API_URL}/api/tokens/update`, {
            phone: token.contact,
            status: newStatus,
            allottedDate: newStatus === "Approved" && allottedDate ? format(allottedDate, "yyyy-MM-dd") : null,
          })
        )
      );
      toast.success(`${selectedTokens.length} tokens updated to ${newStatus}`);
      fetchAllTokens();
    } catch (error) {
      toast.error("Error in bulk update");
    }
  };
  

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your admin credentials to access token management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Admin Username"
                value={credentials.username}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Admin Password"
                value={credentials.password}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>
            <Button onClick={handleLogin} className="w-full h-12">
              <Shield className="mr-2 h-4 w-4" />
              Login as Admin
            </Button>
            {message && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            📅 <span>Token Management Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage farmer token registrations and allotments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Quick Update
                </CardTitle>
                <CardDescription>
                  Update individual token status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Farmer's Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Allotted Date (if approved)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {allottedDate ? format(allottedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={allottedDate}
                        onSelect={setAllottedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button onClick={handleUpdate} className="w-full h-12">
                  ✅ Update Token
                </Button>

                {message && (
                  <Alert className={`${message.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    {message.includes('✅') ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={message.includes('✅') ? 'text-green-800' : 'text-red-800'}>
                      {message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
                <CardDescription>
                  Perform actions on multiple tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handleBulkUpdate("Approved")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Approve All Pending
                </Button>
                <Button
                  onClick={() => handleBulkUpdate("Rejected")}
                  variant="destructive"
                  className="w-full"
                >
                  Reject All Pending
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tokens List */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    All Token Registrations
                  </CardTitle>
                  <CardDescription>
                    {tokens.length} total registrations
                  </CardDescription>
                </div>
                <Button onClick={fetchAllTokens} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {tokens.map((token) => (
                      <Card key={token.id} className="border-2 hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">{token.name}</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p><strong>Phone:</strong> {token.contact}</p>
                                {token.aadharNumber && (
                                  <p><strong>Aadhar:</strong> {token.aadharNumber}</p>
                                )}
                                <p><strong>Email:</strong> {token.email}</p>
                                <p><strong>Land Area:</strong> {token.landArea} acres</p>
                                {token.crop && <p><strong>Crop:</strong> {token.crop}</p>}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge 
                                  variant={
                                    token.status === "Approved" ? "default" : 
                                    token.status === "Rejected" ? "destructive" : "secondary"
                                  }
                                  className={
                                    token.status === "Approved" ? "bg-green-600" :
                                    token.status === "Pending" ? "bg-yellow-600" : ""
                                  }
                                >
                                  {token.status === "Approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                                  {token.status === "Rejected" && <XCircle className="w-3 h-3 mr-1" />}
                                  {token.status === "Pending" && <Clock className="w-3 h-3 mr-1" />}
                                  {token.status}
                                </Badge>
                              </div>
                              {token.allottedDate && (
                                <p className="text-sm">
                                  <strong>Allotted:</strong> {new Date(token.allottedDate).toLocaleDateString()}
                                </p>
                              )}
                              <p className="text-sm">
                                <strong>Applied:</strong> {new Date(token.createdAt).toLocaleDateString()}
                              </p>
                              {token.location && (
                                <p className="text-sm">
                                  <strong>GPS:</strong> {token.location.latitude.toFixed(4)}, {token.location.longitude.toFixed(4)}
                                </p>
                              )}
                              {token.address && (
                                <p className="text-sm">
                                  <strong>Address:</strong> {token.address}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {tokens.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No token registrations found
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  background: "white",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  width: "90%",
  maxWidth: "400px",
  padding: "20px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "22px",
  color: "black",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "16px",
  color: "black",
  background: "#f8f8f8",
  width: "100%",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "12px",
  background: "#007BFF",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
  width: "100%",
};

const messageStyle = {
  color: "black",
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "10px",
};

const dividerStyle = {
  margin: "20px 0",
  border: "1px solid #ddd",
};

export default TokenAllotment;
