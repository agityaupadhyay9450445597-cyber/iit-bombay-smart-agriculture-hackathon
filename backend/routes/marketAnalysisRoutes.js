const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "your-gemini-api-key");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Market data for major Indian agricultural markets
const indianMarketData = {
  "Delhi": {
    "state": "Delhi",
    "region": "North India",
    "population": 32000000,
    "avgTransportCost": 15,
    "marketSize": "Very Large",
    "demandLevel": "Very High",
    "competitionLevel": "High",
    "infrastructure": "Excellent",
    "storageCapacity": "High",
    "processingUnits": 45,
    "exportFacilities": "Yes"
  },
  "Mumbai": {
    "state": "Maharashtra", 
    "region": "West India",
    "population": 25000000,
    "avgTransportCost": 18,
    "marketSize": "Very Large",
    "demandLevel": "Very High", 
    "competitionLevel": "Very High",
    "infrastructure": "Excellent",
    "storageCapacity": "High",
    "processingUnits": 52,
    "exportFacilities": "Yes"
  },
  "Kolkata": {
    "state": "West Bengal",
    "region": "East India", 
    "population": 15000000,
    "avgTransportCost": 12,
    "marketSize": "Large",
    "demandLevel": "High",
    "competitionLevel": "Medium",
    "infrastructure": "Good",
    "storageCapacity": "Medium",
    "processingUnits": 28,
    "exportFacilities": "Limited"
  },
  "Chennai": {
    "state": "Tamil Nadu",
    "region": "South India",
    "population": 12000000, 
    "avgTransportCost": 14,
    "marketSize": "Large",
    "demandLevel": "High",
    "competitionLevel": "Medium",
    "infrastructure": "Good",
    "storageCapacity": "Medium",
    "processingUnits": 35,
    "exportFacilities": "Yes"
  },
  "Bangalore": {
    "state": "Karnataka",
    "region": "South India",
    "population": 13000000,
    "avgTransportCost": 16,
    "marketSize": "Large", 
    "demandLevel": "High",
    "competitionLevel": "Medium",
    "infrastructure": "Excellent",
    "storageCapacity": "Medium",
    "processingUnits": 31,
    "exportFacilities": "Limited"
  },
  "Hyderabad": {
    "state": "Telangana",
    "region": "South India",
    "population": 10000000,
    "avgTransportCost": 13,
    "marketSize": "Large",
    "demandLevel": "High", 
    "competitionLevel": "Medium",
    "infrastructure": "Good",
    "storageCapacity": "Medium",
    "processingUnits": 26,
    "exportFacilities": "Limited"
  },
  "Pune": {
    "state": "Maharashtra",
    "region": "West India",
    "population": 8000000,
    "avgTransportCost": 11,
    "marketSize": "Medium",
    "demandLevel": "Medium",
    "competitionLevel": "Medium",
    "infrastructure": "Good", 
    "storageCapacity": "Medium",
    "processingUnits": 22,
    "exportFacilities": "Limited"
  },
  "Ahmedabad": {
    "state": "Gujarat",
    "region": "West India", 
    "population": 8500000,
    "avgTransportCost": 12,
    "marketSize": "Medium",
    "demandLevel": "Medium",
    "competitionLevel": "Medium",
    "infrastructure": "Good",
    "storageCapacity": "Medium",
    "processingUnits": 24,
    "exportFacilities": "Yes"
  },
  "Jaipur": {
    "state": "Rajasthan",
    "region": "North India",
    "population": 4000000,
    "avgTransportCost": 10,
    "marketSize": "Medium",
    "demandLevel": "Medium",
    "competitionLevel": "Low",
    "infrastructure": "Fair",
    "storageCapacity": "Low",
    "processingUnits": 15,
    "exportFacilities": "No"
  },
  "Lucknow": {
    "state": "Uttar Pradesh", 
    "region": "North India",
    "population": 3500000,
    "avgTransportCost": 9,
    "marketSize": "Medium",
    "demandLevel": "Medium",
    "competitionLevel": "Low",
    "infrastructure": "Fair",
    "storageCapacity": "Low", 
    "processingUnits": 18,
    "exportFacilities": "No"
  }
};

// Crop-specific market prices (₹ per quintal)
const cropMarketPrices = {
  "wheat": {
    "Delhi": 2250, "Mumbai": 2400, "Kolkata": 2100, "Chennai": 2300,
    "Bangalore": 2350, "Hyderabad": 2200, "Pune": 2280, "Ahmedabad": 2320,
    "Jaipur": 2150, "Lucknow": 2080
  },
  "rice": {
    "Delhi": 3200, "Mumbai": 3450, "Kolkata": 2950, "Chennai": 3100,
    "Bangalore": 3250, "Hyderabad": 3050, "Pune": 3180, "Ahmedabad": 3220,
    "Jaipur": 2900, "Lucknow": 2850
  },
  "tomato": {
    "Delhi": 1800, "Mumbai": 2200, "Kolkata": 1500, "Chennai": 1650,
    "Bangalore": 1750, "Hyderabad": 1600, "Pune": 1900, "Ahmedabad": 1850,
    "Jaipur": 1400, "Lucknow": 1350
  },
  "potato": {
    "Delhi": 1200, "Mumbai": 1450, "Kolkata": 1100, "Chennai": 1300,
    "Bangalore": 1350, "Hyderabad": 1250, "Pune": 1320, "Ahmedabad": 1380,
    "Jaipur": 1050, "Lucknow": 1000
  },
  "onion": {
    "Delhi": 2500, "Mumbai": 2800, "Kolkata": 2200, "Chennai": 2400,
    "Bangalore": 2450, "Hyderabad": 2350, "Pune": 2600, "Ahmedabad": 2650,
    "Jaipur": 2100, "Lucknow": 2050
  },
  "cotton": {
    "Delhi": 5800, "Mumbai": 6200, "Kolkata": 5400, "Chennai": 5900,
    "Bangalore": 6000, "Hyderabad": 5750, "Pune": 6100, "Ahmedabad": 6300,
    "Jaipur": 5500, "Lucknow": 5300
  }
};

// POST endpoint for AI-powered market analysis
router.post("/analyze-best-markets", async (req, res) => {
  try {
    const { 
      cropType, 
      quantity, 
      farmerLocation, 
      qualityGrade = "A", 
      urgency = "medium",
      transportMode = "truck" 
    } = req.body;

    if (!cropType || !quantity || !farmerLocation) {
      return res.status(400).json({ 
        error: "Crop type, quantity, and farmer location are required" 
      });
    }

    // Get market analysis from AI
    const analysisPrompt = `
      You are an expert agricultural market analyst for India. Analyze the best markets for selling crops.
      
      Farmer Details:
      - Crop: ${cropType}
      - Quantity: ${quantity} quintals
      - Location: ${farmerLocation}
      - Quality Grade: ${qualityGrade}
      - Urgency: ${urgency}
      - Transport Mode: ${transportMode}
      
      Market Data Available: ${JSON.stringify(indianMarketData)}
      Current Prices: ${JSON.stringify(cropMarketPrices[cropType.toLowerCase()] || {})}
      
      Provide analysis in this EXACT JSON format (no markdown, no explanations):
      {
        "topMarkets": [
          {
            "city": "Market Name",
            "state": "State Name", 
            "expectedPrice": 0000,
            "profitMargin": "XX%",
            "transportCost": 0000,
            "netProfit": 0000,
            "marketScore": 0.0,
            "advantages": ["advantage1", "advantage2"],
            "risks": ["risk1", "risk2"]
          }
        ],
        "marketTrends": {
          "priceDirection": "rising/stable/falling",
          "seasonalFactor": "favorable/neutral/unfavorable", 
          "demandOutlook": "high/medium/low"
        },
        "recommendations": {
          "bestTime": "timing recommendation",
          "negotiationTips": ["tip1", "tip2"],
          "qualityRequirements": ["req1", "req2"]
        },
        "totalRevenue": 0000,
        "totalCosts": 0000,
        "netIncome": 0000
      }
      
      Consider:
      1. Distance from ${farmerLocation}
      2. Current market prices
      3. Transport costs
      4. Market demand
      5. Competition levels
      6. Infrastructure quality
      7. Payment reliability
      8. Storage facilities
      
      Rank top 5 markets by profitability.
    `;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    let analysisResult = response.text();

    // Clean the response
    analysisResult = analysisResult.replace(/```json|```/g, "").trim();

    try {
      analysisResult = JSON.parse(analysisResult);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // Fallback analysis if AI parsing fails
      analysisResult = generateFallbackAnalysis(cropType, quantity, farmerLocation);
    }

    res.json({ 
      success: true, 
      data: analysisResult,
      timestamp: new Date().toISOString(),
      analysisId: `MKT_${Date.now()}`
    });

  } catch (error) {
    console.error("Error in market analysis:", error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze markets",
      details: error.message
    });
  }
});

// Fallback analysis function
function generateFallbackAnalysis(cropType, quantity, farmerLocation) {
  const crop = cropType.toLowerCase();
  const prices = cropMarketPrices[crop] || cropMarketPrices.wheat;
  
  const markets = Object.keys(prices).map(city => {
    const marketInfo = indianMarketData[city];
    const basePrice = prices[city];
    const transportCost = calculateTransportCost(farmerLocation, city);
    const netPrice = basePrice - transportCost;
    
    return {
      city: city,
      state: marketInfo.state,
      expectedPrice: basePrice,
      profitMargin: `${Math.round(((netPrice - 1500) / 1500) * 100)}%`,
      transportCost: transportCost,
      netProfit: Math.round(netPrice * quantity),
      marketScore: calculateMarketScore(marketInfo, netPrice),
      advantages: getMarketAdvantages(marketInfo),
      risks: getMarketRisks(marketInfo)
    };
  }).sort((a, b) => b.netProfit - a.netProfit).slice(0, 5);

  return {
    topMarkets: markets,
    marketTrends: {
      priceDirection: "stable",
      seasonalFactor: "favorable",
      demandOutlook: "medium"
    },
    recommendations: {
      bestTime: "Within 2-3 weeks for optimal prices",
      negotiationTips: ["Highlight quality grade", "Bulk quantity advantage"],
      qualityRequirements: ["Proper cleaning", "Moisture content check"]
    },
    totalRevenue: Math.round(markets[0]?.expectedPrice * quantity || 0),
    totalCosts: Math.round(markets[0]?.transportCost * quantity || 0),
    netIncome: Math.round(markets[0]?.netProfit || 0)
  };
}

function calculateTransportCost(from, to) {
  // Simplified transport cost calculation (₹ per quintal)
  const baseCost = 50;
  const distances = {
    "Delhi": 100, "Mumbai": 150, "Kolkata": 120, "Chennai": 180,
    "Bangalore": 170, "Hyderabad": 140, "Pune": 130, "Ahmedabad": 125,
    "Jaipur": 80, "Lucknow": 90
  };
  return baseCost + (distances[to] || 100);
}

function calculateMarketScore(marketInfo, netPrice) {
  let score = 0;
  score += netPrice / 100; // Price factor
  score += marketInfo.processingUnits / 10; // Infrastructure
  score += marketInfo.population / 1000000; // Market size
  return Math.min(score / 10, 10).toFixed(1);
}

function getMarketAdvantages(marketInfo) {
  const advantages = [];
  if (marketInfo.infrastructure === "Excellent") advantages.push("Excellent infrastructure");
  if (marketInfo.exportFacilities === "Yes") advantages.push("Export opportunities");
  if (marketInfo.storageCapacity === "High") advantages.push("Good storage facilities");
  if (marketInfo.processingUnits > 30) advantages.push("Multiple processing units");
  return advantages.slice(0, 3);
}

function getMarketRisks(marketInfo) {
  const risks = [];
  if (marketInfo.competitionLevel === "Very High") risks.push("High competition");
  if (marketInfo.avgTransportCost > 15) risks.push("Higher transport costs");
  if (marketInfo.storageCapacity === "Low") risks.push("Limited storage");
  return risks.slice(0, 2);
}

// GET endpoint for market prices
router.get("/current-prices/:crop", async (req, res) => {
  try {
    const { crop } = req.params;
    const cropPrices = cropMarketPrices[crop.toLowerCase()];
    
    if (!cropPrices) {
      return res.status(404).json({
        success: false,
        error: "Crop prices not found"
      });
    }

    res.json({
      success: true,
      data: {
        crop: crop,
        prices: cropPrices,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch prices"
    });
  }
});

// GET endpoint for market information
router.get("/market-info", async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        markets: indianMarketData,
        supportedCrops: Object.keys(cropMarketPrices),
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch market information"
    });
  }
});

module.exports = router;