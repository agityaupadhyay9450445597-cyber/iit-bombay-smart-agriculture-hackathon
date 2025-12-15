import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Heart,
  Share2,
  ExternalLink,
  Mic,
  Video,
  Radio,
  Star,
  TrendingUp,
  Volume2
} from 'lucide-react';

const PMModiTalks = () => {
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // PM Modi's recent talks and speeches related to agriculture
  const modiTalks = [
    {
      id: 1,
      title: "Mann Ki Baat - किसानों के लिए नई तकनीक",
      date: "2024-12-08",
      duration: "30 मिनट",
      type: "Mann Ki Baat",
      category: "Agriculture Technology",
      description: "PM Modi ने किसानों के लिए AI और ड्रोन तकनीक के फायदों पर चर्चा की। नई कृषि नीतियों और डिजिटल इंडिया के तहत स्मार्ट फार्मिंग के बारे में बात की।",
      keyPoints: [
        "ड्रोन तकनीक से फसल की निगरानी",
        "AI से मौसम की भविष्यवाणी",
        "डिजिटल मार्केटिंग प्लेटफॉर्म",
        "PM-KISAN योजना के नए अपडेट"
      ],
      thumbnail: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=250&fit=crop",
      views: "2.5M",
      likes: "150K",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Red Fort Speech - आत्मनिर्भर कृषि",
      date: "2024-08-15",
      duration: "45 मिनट",
      type: "Independence Day",
      category: "Self-Reliant Agriculture",
      description: "स्वतंत्रता दिवस के अवसर पर PM M