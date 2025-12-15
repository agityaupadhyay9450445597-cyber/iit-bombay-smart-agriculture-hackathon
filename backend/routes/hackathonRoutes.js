const express = require('express');
const router = express.Router();

// GET /api/hackathon/info - Get hackathon project information
router.get('/info', (req, res) => {
  try {
    const projectInfo = {
      hackathon: {
        name: "IIT Bombay AWS X Impact Challenge 2025",
        theme: "Technology for Social Impact",
        duration: "12 hours",
        teamSize: 3,
        category: "Agriculture & Sustainability"
      },
      project: {
        name: "Smart Agriculture Assistant",
        tagline: "Transforming Indian agriculture through AI, IoT, and cloud technologies",
        description: "Complete end-to-end smart agriculture platform empowering 600+ million Indian farmers",
        developmentTime: "12 hours",
        linesOfCode: "5000+",
        filesCreated: "50+"
      },
      team: [
        {
          name: "Pranav Patil",
          role: "Full-Stack Developer & Team Lead",
          email: "pranavpatil25122005@gmail.com",
          phone: "+91 9765577480",
          expertise: ["React", "Node.js", "AI Integration", "Cloud Deployment"]
        },
        {
          name: "Aditya Raj", 
          role: "AI/ML Engineer",
          email: "adityaraj874567@gmail.com",
          phone: "+91 8800318662",
          expertise: ["Machine Learning", "Computer Vision", "Data Analysis", "Python"]
        },
        {
          name: "Aditya Upadhyay",
          role: "IoT Specialist",
          email: "adityaraj874567@gmail.com", 
          phone: "+91 7052140559",
          expertise: ["Raspberry Pi", "Sensor Integration", "Hardware", "Embedded Systems"]
        }
      ],
      timeline: [
        { phase: "Planning & Design", duration: "2 hours", status: "completed" },
        { phase: "Backend Development", duration: "4 hours", status: "completed" },
        { phase: "Frontend Development", duration: "4 hours", status: "completed" },
        { phase: "IoT Integration", duration: "1 hour", status: "completed" },
        { phase: "Testing & Deployment", duration: "1 hour", status: "completed" }
      ]
    };

    res.json({
      success: true,
      data: projectInfo,
      achievements: [
        "Complete full-stack application in 12 hours",
        "AI chatbot with 20+ language support", 
        "IoT integration with Raspberry Pi",
        "Real-time crop prediction and market analysis",
        "Professional UI/UX design",
        "Cloud deployment on multiple platforms"
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch hackathon information"
    });
  }
});

// GET /api/hackathon/demo - Get demo links and resources
router.get('/demo', (req, res) => {
  try {
    const demoResources = {
      liveDemo: {
        frontend: "https://iit-bombay-agriculture-frontend-67363dogz.vercel.app",
        backend: "https://iit-bombay-agriculture-backend-397aqpp9c.vercel.app",
        status: "live"
      },
      presentation: {
        video: "https://youtu.be/hchkXucDuB8",
        slides: "https://drive.google.com/file/d/1E2adk5aaDP6sg4SpFZZNT4iXoBapIVX3/view?usp=sharing",
        duration: "5 minutes"
      },
      codeRepository: {
        gitlab: "https://gitlab.com/pranavpatil25122005/iitbombay-hack2025",
        github: "https://github.com/pranavpatil059/iit-bombay-smart-agriculture",
        documentation: "Complete README with setup instructions"
      },
      features: [
        {
          name: "AI Chatbot (Sarthi)",
          demo: "Click green AI button on homepage",
          testQuery: "What is the best crop for monsoon season?"
        },
        {
          name: "Crop Yield Estimation", 
          demo: "Go to Price Estimation page",
          testInput: "Crop: Wheat, Area: 5 acres"
        },
        {
          name: "Interactive Map",
          demo: "Go to Land Selling → Map View",
          features: "5 sample listings across India"
        },
        {
          name: "Multi-language Support",
          demo: "Click globe icon in chatbot",
          languages: "Hindi, English, Bengali, Tamil, etc."
        }
      ]
    };

    res.json({
      success: true,
      data: demoResources,
      judgeInstructions: [
        "Visit live demo URL for complete experience",
        "Test AI chatbot with farming questions",
        "Try crop estimation with sample data",
        "Explore interactive map with land listings",
        "Check presentation video for technical details"
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch demo information"
    });
  }
});

// POST /api/hackathon/feedback - Submit feedback (for judges)
router.post('/feedback', (req, res) => {
  try {
    const { judgeId, rating, comments, categories } = req.body;
    
    // In a real app, this would save to database
    const feedback = {
      id: Date.now().toString(),
      judgeId: judgeId || 'anonymous',
      rating: rating || 0,
      comments: comments || '',
      categories: categories || {},
      timestamp: new Date().toISOString(),
      project: 'Smart Agriculture Assistant'
    };

    // Simulate saving feedback
    console.log('Feedback received:', feedback);

    res.json({
      success: true,
      message: "Feedback submitted successfully",
      data: {
        feedbackId: feedback.id,
        timestamp: feedback.timestamp
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to submit feedback"
    });
  }
});

module.exports = router;