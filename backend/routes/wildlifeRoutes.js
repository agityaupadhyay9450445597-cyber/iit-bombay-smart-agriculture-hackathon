const express = require('express');
const router = express.Router();

// Wildlife Risk Assessment API
router.get('/risk-assessment/:district', (req, res) => {
    const { district } = req.params;
    
    // Maharashtra districts wildlife data
    const wildlifeData = {
        'junnar': {
            riskLevel: 95,
            incidents: 47,
            status: 'CRITICAL',
            lastSighting: {
                animal: 'Leopard',
                distance: 2.6,
                time: new Date().toISOString(),
                confidence: 91,
                source: 'Forest Beat Officer'
            },
            alerts: [
                {
                    type: 'SIGHTING',
                    message: 'Leopard spotted near sugarcane field',
                    priority: 'HIGH',
                    timestamp: new Date().toISOString()
                }
            ]
        },
        'mulshi': {
            riskLevel: 88,
            incidents: 32,
            status: 'HIGH',
            lastSighting: {
                animal: 'Leopard',
                distance: 3.1,
                time: new Date().toISOString(),
                confidence: 87,
                source: 'Camera Trap AI'
            }
        },
        'nashik': {
            riskLevel: 82,
            incidents: 28,
            status: 'HIGH',
            lastSighting: {
                animal: 'Wild Boar',
                distance: 1.4,
                time: new Date().toISOString(),
                confidence: 94,
                source: 'Farmer Report'
            }
        }
    };
    
    const data = wildlifeData[district.toLowerCase()] || {
        riskLevel: 45,
        incidents: 5,
        status: 'MEDIUM',
        lastSighting: null
    };
    
    res.json({
        success: true,
        district: district,
        data: data,
        timestamp: new Date().toISOString()
    });
});

// Live Wildlife Alerts API
router.get('/live-alerts', (req, res) => {
    const alerts = [
        {
            id: Date.now(),
            type: 'SIGHTING',
            icon: '🐆',
            message: 'Leopard spotted near Junnar village',
            priority: 'HIGH',
            time: new Date().toLocaleTimeString(),
            distance: (Math.random() * 5 + 0.5).toFixed(1),
            location: 'Junnar, Maharashtra'
        },
        {
            id: Date.now() + 1,
            type: 'MOVEMENT',
            icon: '📍',
            message: 'Animal movement detected in sugarcane field',
            priority: 'MEDIUM',
            time: new Date().toLocaleTimeString(),
            distance: (Math.random() * 3 + 1).toFixed(1),
            location: 'Mulshi, Maharashtra'
        },
        {
            id: Date.now() + 2,
            type: 'CAMERA',
            icon: '📷',
            message: 'Camera trap activated - AI analyzing',
            priority: 'HIGH',
            time: new Date().toLocaleTimeString(),
            distance: (Math.random() * 4 + 0.8).toFixed(1),
            location: 'Nashik Rural, Maharashtra'
        }
    ];
    
    res.json({
        success: true,
        alerts: alerts,
        count: alerts.length,
        timestamp: new Date().toISOString()
    });
});

// Maharashtra Districts Risk Map API
router.get('/maharashtra-districts', (req, res) => {
    const districts = [
        { name: 'Junnar', risk: 95, incidents: 47, status: 'CRITICAL', lat: 19.2084, lng: 73.8745 },
        { name: 'Mulshi', risk: 88, incidents: 32, status: 'HIGH', lat: 18.5204, lng: 73.5093 },
        { name: 'Nashik Rural', risk: 82, incidents: 28, status: 'HIGH', lat: 19.9975, lng: 73.7898 },
        { name: 'Sangli', risk: 76, incidents: 23, status: 'HIGH', lat: 16.8524, lng: 74.5815 },
        { name: 'Kolhapur', risk: 71, incidents: 19, status: 'MEDIUM', lat: 16.7050, lng: 74.2433 },
        { name: 'Ahmednagar', risk: 68, incidents: 16, status: 'MEDIUM', lat: 19.0948, lng: 74.7480 },
        { name: 'Satara', risk: 64, incidents: 14, status: 'MEDIUM', lat: 17.6805, lng: 74.0183 },
        { name: 'Pune Rural', risk: 59, incidents: 12, status: 'MEDIUM', lat: 18.5204, lng: 73.8567 }
    ];
    
    res.json({
        success: true,
        districts: districts,
        totalDistricts: districts.length,
        highRiskCount: districts.filter(d => d.risk >= 70).length,
        timestamp: new Date().toISOString()
    });
});

// AI Risk Calculation API
router.post('/calculate-risk', (req, res) => {
    const { location, timeOfDay, cropType, livestockPresent, recentSightings } = req.body;
    
    let riskScore = 30; // Base risk
    
    // Time-based risk (leopards are nocturnal)
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 5) riskScore += 35; // Night high risk
    else if (hour >= 18 && hour <= 23) riskScore += 25; // Evening risk
    else riskScore += 10; // Day time lower risk
    
    // Location-based risk
    const highRiskAreas = ['junnar', 'mulshi', 'nashik'];
    if (highRiskAreas.includes(location.toLowerCase())) {
        riskScore += 20;
    }
    
    // Crop type risk (sugarcane provides cover)
    if (cropType === 'sugarcane') riskScore += 15;
    else if (cropType === 'vineyard') riskScore += 10;
    
    // Livestock presence increases risk
    if (livestockPresent) riskScore += 15;
    
    // Recent sightings
    if (recentSightings > 0) riskScore += (recentSightings * 10);
    
    // Cap at 100
    riskScore = Math.min(100, riskScore);
    
    let riskLevel = 'LOW';
    if (riskScore >= 70) riskLevel = 'HIGH';
    else if (riskScore >= 50) riskLevel = 'MEDIUM';
    
    res.json({
        success: true,
        riskScore: riskScore,
        riskLevel: riskLevel,
        factors: {
            timeOfDay: hour >= 0 && hour <= 5 ? 'High Risk (Night)' : 'Lower Risk (Day)',
            location: highRiskAreas.includes(location.toLowerCase()) ? 'High Risk Area' : 'Medium Risk Area',
            cropType: cropType,
            livestockPresent: livestockPresent
        },
        recommendations: generateSafetyRecommendations(riskScore),
        timestamp: new Date().toISOString()
    });
});

// Emergency Contacts API
router.get('/emergency-contacts', (req, res) => {
    const contacts = {
        wildlife: {
            helpline: '1926',
            description: 'National Wildlife Helpline'
        },
        forest: {
            helpline: '1800-XXX-XXXX',
            description: 'Maharashtra Forest Department'
        },
        police: {
            helpline: '100',
            description: 'Local Police Emergency'
        },
        rescue: {
            helpline: '108',
            description: 'Emergency Medical Services'
        }
    };
    
    res.json({
        success: true,
        contacts: contacts,
        timestamp: new Date().toISOString()
    });
});

// Safety Recommendations Generator
function generateSafetyRecommendations(riskScore) {
    if (riskScore >= 70) {
        return [
            '❌ Avoid night farming activities (00:00-05:00)',
            '🔦 Carry torch, whistle, or noise device',
            '🐄 Secure livestock in illuminated enclosures',
            '👨‍👩‍👧‍👦 Restrict children movement near fields',
            '📞 Keep emergency contacts ready',
            '🚨 Report any sightings immediately'
        ];
    } else if (riskScore >= 50) {
        return [
            '⚠️ Exercise caution during early morning/evening',
            '🔦 Carry noise-making devices',
            '🐄 Monitor livestock closely',
            '👥 Work in groups when possible',
            '📱 Keep mobile phone charged'
        ];
    } else {
        return [
            '✅ Normal farming activities can continue',
            '👀 Stay alert and aware of surroundings',
            '📱 Report any unusual animal behavior',
            '🔦 Carry torch during dawn/dusk hours'
        ];
    }
}

module.exports = router;