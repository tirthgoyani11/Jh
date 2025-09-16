// Gemini AI Travel Service for Jharkhand Tourism
// Direct REST API implementation without SDK dependency

export interface TravelPreferences {
  budget: number;
  duration: number;
  travelers: number;
  interests: string[];
  travelStyle: 'budget' | 'moderate' | 'luxury';
  accommodation: 'homestay' | 'hotel' | 'resort' | 'camping';
  transport: 'public' | 'private' | 'mixed';
  season: string;
  accessibility?: boolean;
  dietaryRestrictions?: string[];
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  description: string;
  duration: number;
  estimatedCost: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  highlights: string[];
  days: ItineraryDay[];
  recommendations: {
    bestTimeToVisit: string;
    whatToPack: string[];
    localTips: string[];
    culturalNotes: string[];
  };
  sustainability: {
    ecoScore: number;
    carbonFootprint: string;
    localImpact: string;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
  meals: Meal[];
  accommodation: AccommodationInfo;
  transport: TransportInfo[];
  estimatedCost: number;
  weather?: WeatherInfo;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  location: string;
  duration: string;
  cost: number;
  description: string;
  rating: number;
  images?: string[];
  bookingRequired: boolean;
  accessibility: boolean;
  bestTime: string;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  restaurant: string;
  cuisine: string;
  cost: number;
  speciality: string;
  dietary: string[];
}

export interface AccommodationInfo {
  name: string;
  type: string;
  location: string;
  cost: number;
  rating: number;
  amenities: string[];
  sustainability: boolean;
}

export interface TransportInfo {
  mode: string;
  from: string;
  to: string;
  duration: string;
  cost: number;
  bookingInfo?: string;
}

export interface WeatherInfo {
  temperature: string;
  condition: string;
  humidity: string;
  recommendations: string[];
}

class GeminiTravelService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Get API key from environment variables
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    
    if (!this.apiKey) {
      console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment variables');
      console.warn('📝 Please add your Gemini API key to .env file');
      console.warn('💡 Format: VITE_GEMINI_API_KEY=your_api_key_here');
    } else {
      console.log('🔑 Gemini API key loaded successfully');
      console.log('🚀 Ready to use direct REST API calls');
    }
  }

  /**
   * Generate travel itinerary using Gemini AI REST API
   */
  async generateItinerary(preferences: TravelPreferences): Promise<GeneratedItinerary[]> {
    try {
      const prompt = this.createPrompt(preferences);
      
      // Check if API key is available
      if (!this.apiKey) {
        console.warn('🔑 No API key found - using mock data');
        return this.generateMockItineraries(preferences);
      }

      console.log('🚀 Making direct REST API call to Gemini...');
      console.log('🔗 API Endpoint:', `${this.baseUrl}/models/gemini-2.0-flash:generateContent`);
      console.log('🔑 Using API key:', this.apiKey ? 'Yes (configured)' : 'No (missing)');
      
      const response = await fetch(`${this.baseUrl}/models/gemini-2.0-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API request failed:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Received response from Gemini API');
      console.log('� Response structure:', Object.keys(data));
      
      const parsed = this.parseGeminiResponse(data, preferences);
      console.log(`🎯 Generated ${parsed.length} itinerary(ies) using real Gemini AI`);
      return parsed;
      
    } catch (error) {
      console.error('💥 Error calling Gemini API:', error);
      console.log('🔄 Falling back to mock data');
      return this.generateMockItineraries(preferences);
    }
  }

  /**
   * Create detailed prompt for Gemini AI
   */
  private createPrompt(preferences: TravelPreferences): string {
    return `
You are an expert travel planner specializing in Jharkhand tourism. Create detailed ${preferences.duration}-day travel itineraries for ${preferences.travelers} travelers with a budget of ₹${preferences.budget}.

TRAVELER PREFERENCES:
- Interests: ${preferences.interests.join(', ')}
- Travel Style: ${preferences.travelStyle}
- Accommodation: ${preferences.accommodation}
- Transport: ${preferences.transport}
- Season: ${preferences.season}
${preferences.accessibility ? '- Accessibility requirements needed' : ''}
${preferences.dietaryRestrictions?.length ? `- Dietary restrictions: ${preferences.dietaryRestrictions.join(', ')}` : ''}

JHARKHAND ATTRACTIONS TO CONSIDER:
🏔️ Waterfalls: Hundru Falls (98m), Dassam Falls (44m), Jonha Falls, Hirni Falls
🦌 Wildlife: Betla National Park (tigers, elephants), Hazaribagh Wildlife Sanctuary, Palamau Tiger Reserve
🏛️ Temples: Baidyanath Temple (Deoghar), Jagannath Temple (Ranchi), Chhinnamastika Temple
🏞️ Hill Stations: Netarhat (Queen of Chotanagpur), Parasnath Hill, Dalma Hills
🎭 Tribal Culture: Santhal villages, Oraon communities, tribal handicrafts, Sarhul festival
⛰️ Adventure: Trekking at Parasnath, river rafting in Koel, rock climbing at Ranchi
🏛️ Heritage: Tagore Hill, McCluskieganj, Rajrappa Temple, Jagannath Temple
🌿 Nature: Dalma Wildlife Sanctuary, Kanke Dam, Getalsud Dam

RESPONSE FORMAT:
Generate 2-3 different itinerary options as a JSON array. Each itinerary must follow this exact structure:

{
  "id": "unique_id",
  "title": "Descriptive title",
  "description": "Brief description",
  "duration": ${preferences.duration},
  "estimatedCost": number,
  "difficulty": "easy|moderate|challenging",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "description": "What to expect this day",
      "activities": [
        {
          "id": "activity_id",
          "name": "Activity name",
          "type": "waterfall|temple|wildlife|culture|adventure",
          "description": "Detailed description",
          "duration": "2-3 hours",
          "cost": 500,
          "location": "Specific location",
          "bestTime": "10:00 AM - 12:00 PM",
          "rating": 4.5
        }
      ],
      "meals": [
        {
          "type": "breakfast|lunch|dinner",
          "restaurant": "Restaurant name",
          "speciality": "Local dish",
          "cost": 300
        }
      ],
      "accommodation": {
        "name": "Hotel/homestay name",
        "type": "hotel|homestay|resort",
        "location": "Area",
        "cost": 2000,
        "amenities": ["WiFi", "Parking", "Restaurant"],
        "rating": 4.2,
        "sustainability": true
      },
      "transport": [
        {
          "from": "Starting point",
          "to": "Destination",
          "mode": "car|bus|train",
          "duration": "2 hours",
          "cost": 800
        }
      ],
      "estimatedCost": 5000,
      "weather": {
        "temperature": "18-25°C",
        "condition": "Pleasant"
      }
    }
  ],
  "recommendations": {
    "bestTimeToVisit": "October to March",
    "whatToPack": ["Comfortable shoes", "Light jacket"],
    "localTips": ["Tip 1", "Tip 2"],
    "culturalNotes": ["Cultural insight 1"]
  },
  "sustainability": {
    "ecoScore": 75,
    "carbonFootprint": "Low - 2.5 kg CO2",
    "localImpact": "Supports local communities"
  }
}

CRITICAL INSTRUCTIONS: 
- Return ONLY a valid JSON array - no explanatory text, no markdown formatting, no code blocks
- Start directly with [ and end with ]
- Each itinerary must be a complete JSON object as shown above
- All string values must be properly quoted
- No trailing commas
- Ensure all JSON brackets and braces are properly closed
- Use only valid JSON syntax
- Include realistic costs in Indian Rupees
- Ensure activities match the interests: ${preferences.interests.join(', ')}
- Consider ${preferences.travelStyle} budget levels
- Include authentic Jharkhand experiences
- Add specific location names and addresses where possible

Generate ${Math.min(3, Math.max(1, Math.floor(preferences.duration / 2)))} unique itinerary options.
    `;
  }

  /**
   * Parse Gemini AI response and convert to our format
   */
  private parseGeminiResponse(response: any, preferences: TravelPreferences): GeneratedItinerary[] {
    let content = '';
    try {
      console.log('📝 Parsing Gemini response...');
      
      if (!response.candidates || !response.candidates[0] || !response.candidates[0].content) {
        console.error('❌ Invalid response structure');
        throw new Error('Invalid response structure');
      }

      content = response.candidates[0].content.parts[0].text;
      console.log('📄 Raw response content length:', content.length);
      console.log('📄 First 300 chars:', content.substring(0, 300));

      // Clean up the response - remove markdown formatting if present
      content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      // Remove any explanatory text before and after JSON
      content = content.replace(/^[^[\{]*/, '').replace(/[^\]\}]*$/, '');
      
      // Try to find the main JSON structure
      let jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        jsonMatch = content.match(/\{[\s\S]*\}/);
      }
      
      if (jsonMatch) {
        content = jsonMatch[0];
      }

      console.log('🧹 Cleaned content length:', content.length);
      console.log('🧹 First 200 chars of cleaned:', content.substring(0, 200));
      
      // Try to fix common JSON issues
      content = this.fixCommonJsonIssues(content);
      
      const parsed = JSON.parse(content);
      const itineraries = Array.isArray(parsed) ? parsed : [parsed];
      
      console.log(`✅ Successfully parsed ${itineraries.length} itinerary(ies)`);
      return itineraries;
    } catch (error) {
      console.error('❌ Error parsing Gemini response:', error);
      if (content) {
        console.error('❌ Content that failed to parse:', content.substring(0, 500));
      }
      console.log('🔄 Falling back to mock itineraries');
      return this.generateMockItineraries(preferences);
    }
  }

  /**
   * Fix common JSON formatting issues from AI responses
   */
  private fixCommonJsonIssues(content: string): string {
    try {
      // Remove trailing commas before closing braces/brackets
      content = content.replace(/,(\s*[}\]])/g, '$1');
      
      // Fix missing commas between objects
      content = content.replace(/}(\s*){/g, '},\n{');
      
      // Fix missing commas in arrays
      content = content.replace(/](\s*)\[/g, '],\n[');
      
      // Remove any non-printable characters
      content = content.replace(/[\x00-\x1F\x7F]/g, '');
      
      // Fix quotes around property names
      content = content.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
      
      return content;
    } catch (error) {
      console.warn('⚠️ Error fixing JSON issues:', error);
      return content;
    }
  }

  /**
   * Generate mock itineraries for demo/development
   */
  private generateMockItineraries(preferences: TravelPreferences): GeneratedItinerary[] {
    const baseItineraries = [
      {
        id: 'jharkhand-waterfalls-adventure',
        title: 'Jharkhand Waterfalls & Adventure Trail',
        description: 'Experience the magnificent waterfalls and adventure activities across Jharkhand',
        difficulty: 'moderate' as const,
        highlights: [
          'Hundru Falls - 98m spectacular waterfall',
          'Adventure sports at Betla National Park',
          'Tribal village cultural experience',
          'Local handicraft workshops',
          'Traditional Jharkhandi cuisine'
        ]
      },
      {
        id: 'cultural-heritage-tour',
        title: 'Cultural Heritage & Spiritual Journey',
        description: 'Explore the rich cultural heritage and spiritual sites of Jharkhand',
        difficulty: 'easy' as const,
        highlights: [
          'Baidyanath Jyotirlinga Temple',
          'Tribal museum and cultural centers',
          'Traditional dance performances',
          'Handicraft villages',
          'Religious festivals participation'
        ]
      },
      {
        id: 'eco-wildlife-expedition',
        title: 'Eco-Wildlife & Nature Expedition',
        description: 'Discover Jharkhand\'s biodiversity and natural wonders',
        difficulty: 'challenging' as const,
        highlights: [
          'Betla National Park safari',
          'Bird watching at Hazaribagh',
          'Netarhat hill station sunrise',
          'Eco-lodge experience',
          'Conservation activities participation'
        ]
      }
    ];

    return baseItineraries.map((base, index) => ({
      ...base,
      duration: preferences.duration,
      estimatedCost: this.calculateCost(preferences, base.difficulty),
      days: this.generateDays(preferences.duration, base.id, preferences),
      recommendations: {
        bestTimeToVisit: this.getBestTime(preferences.season),
        whatToPack: this.getPackingList(preferences.season, base.difficulty),
        localTips: this.getLocalTips(),
        culturalNotes: this.getCulturalNotes()
      },
      sustainability: {
        ecoScore: Math.floor(Math.random() * 3) + 7, // 7-9
        carbonFootprint: preferences.transport === 'public' ? 'Low' : preferences.transport === 'mixed' ? 'Medium' : 'High',
        localImpact: 'High - Supports local communities and eco-tourism'
      }
    }));
  }

  private calculateCost(preferences: TravelPreferences, difficulty: string): number {
    const baseMultiplier = {
      budget: 0.7,
      moderate: 1.0,
      luxury: 1.5
    }[preferences.travelStyle];

    const difficultyMultiplier = {
      easy: 0.8,
      moderate: 1.0,
      challenging: 1.2
    }[difficulty as keyof typeof difficultyMap] || 1.0;

    const difficultyMap = {
      easy: 0.8,
      moderate: 1.0,
      challenging: 1.2
    };

    return Math.floor(preferences.budget * baseMultiplier * (difficultyMap[difficulty as keyof typeof difficultyMap] || 1.0));
  }

  private generateDays(duration: number, itineraryId: string, preferences: TravelPreferences): ItineraryDay[] {
    const days: ItineraryDay[] = [];
    
    for (let i = 1; i <= duration; i++) {
      days.push({
        day: i,
        title: `Day ${i}: ${this.getDayTitle(i, itineraryId)}`,
        description: this.getDayDescription(i, itineraryId),
        activities: this.getDayActivities(i, itineraryId, preferences),
        meals: this.getDayMeals(),
        accommodation: this.getAccommodation(preferences.accommodation),
        transport: this.getTransport(i, preferences.transport),
        estimatedCost: Math.floor(preferences.budget / duration),
        weather: {
          temperature: '22-28°C',
          condition: 'Partly cloudy',
          humidity: '65%',
          recommendations: ['Light cotton clothes', 'Sunscreen', 'Water bottle']
        }
      });
    }
    
    return days;
  }

  private getDayTitle(day: number, itineraryId: string): string {
    const titles: Record<string, string[]> = {
      'jharkhand-waterfalls-adventure': [
        'Arrival & Hundru Falls',
        'Betla National Park Adventure',
        'Tribal Village Experience',
        'Dassam Falls & Departure'
      ],
      'cultural-heritage-tour': [
        'Deoghar Temple Visit',
        'Tribal Museums & Culture',
        'Handicraft Villages',
        'Festival Experience'
      ],
      'eco-wildlife-expedition': [
        'Betla Wildlife Safari',
        'Hazaribagh Bird Watching',
        'Netarhat Hill Station',
        'Conservation Activities'
      ]
    };
    
    return titles[itineraryId]?.[day - 1] || `Exploration Day ${day}`;
  }

  private getDayDescription(day: number, itineraryId: string): string {
    return `Experience the best of Jharkhand with carefully curated activities and local experiences.`;
  }

  private getDayActivities(day: number, itineraryId: string, preferences: TravelPreferences): Activity[] {
    const activities = [
      {
        id: `activity-${day}-1`,
        name: 'Morning Temple Visit',
        type: 'Cultural',
        location: 'Deoghar',
        duration: '2 hours',
        cost: 100,
        description: 'Visit the sacred Baidyanath Temple',
        rating: 4.5,
        bookingRequired: false,
        accessibility: true,
        bestTime: 'Early morning'
      },
      {
        id: `activity-${day}-2`,
        name: 'Waterfall Trek',
        type: 'Adventure',
        location: 'Hundru Falls',
        duration: '3 hours',
        cost: 300,
        description: 'Trek to the magnificent Hundru Falls',
        rating: 4.8,
        bookingRequired: true,
        accessibility: false,
        bestTime: 'Morning'
      }
    ];
    
    return activities.slice(0, Math.ceil(Math.random() * 3) + 1);
  }

  private getDayMeals(): Meal[] {
    return [
      {
        type: 'breakfast',
        restaurant: 'Local Dhaba',
        cuisine: 'Jharkhandi',
        cost: 150,
        speciality: 'Litti Chokha',
        dietary: ['vegetarian', 'vegan options']
      },
      {
        type: 'lunch',
        restaurant: 'Tribal Kitchen',
        cuisine: 'Traditional',
        cost: 250,
        speciality: 'Handia with local fish curry',
        dietary: ['non-vegetarian']
      },
      {
        type: 'dinner',
        restaurant: 'Heritage Restaurant',
        cuisine: 'Multi-cuisine',
        cost: 400,
        speciality: 'Thekua dessert',
        dietary: ['vegetarian', 'non-vegetarian', 'jain']
      }
    ];
  }

  private getAccommodation(type: string): AccommodationInfo {
    const accommodations: Record<string, AccommodationInfo> = {
      homestay: {
        name: 'Traditional Village Homestay',
        type: 'Homestay',
        location: 'Local Village',
        cost: 800,
        rating: 4.2,
        amenities: ['Home-cooked meals', 'Cultural activities', 'Local guide'],
        sustainability: true
      },
      hotel: {
        name: 'Jharkhand Heritage Hotel',
        type: 'Hotel',
        location: 'City Center',
        cost: 1500,
        rating: 4.0,
        amenities: ['AC', 'WiFi', 'Restaurant', 'Room service'],
        sustainability: false
      },
      resort: {
        name: 'Eco Forest Resort',
        type: 'Eco Resort',
        location: 'Forest Area',
        cost: 2500,
        rating: 4.6,
        amenities: ['Spa', 'Nature walks', 'Organic meals', 'Adventure activities'],
        sustainability: true
      },
      camping: {
        name: 'Adventure Base Camp',
        type: 'Camping',
        location: 'Riverside',
        cost: 600,
        rating: 4.3,
        amenities: ['Tents', 'Bonfire', 'Guided tours', 'Meals'],
        sustainability: true
      }
    };
    
    return accommodations[type] || accommodations.homestay;
  }

  private getTransport(day: number, type: string): TransportInfo[] {
    return [
      {
        mode: type === 'public' ? 'Bus' : type === 'private' ? 'Private Car' : 'Shared Taxi',
        from: 'Ranchi',
        to: 'Destination',
        duration: '2-3 hours',
        cost: type === 'public' ? 150 : type === 'private' ? 500 : 300,
        bookingInfo: 'Book 24 hours in advance'
      }
    ];
  }

  private getBestTime(season: string): string {
    return 'October to March for pleasant weather, April-June for summer festivals';
  }

  private getPackingList(season: string, difficulty: string): string[] {
    const base = ['Comfortable walking shoes', 'Light cotton clothes', 'Sunscreen', 'Water bottle', 'Camera'];
    
    if (difficulty === 'challenging') {
      base.push('Trekking gear', 'First aid kit', 'Energy bars');
    }
    
    return base;
  }

  private getLocalTips(): string[] {
    return [
      'Learn a few words in Hindi/local language',
      'Respect local customs and traditions',
      'Try local street food but ensure hygiene',
      'Bargain respectfully in local markets',
      'Carry cash as card acceptance may be limited',
      'Book accommodations in advance during festival seasons'
    ];
  }

  private getCulturalNotes(): string[] {
    return [
      'Jharkhand is rich in tribal culture - respect their traditions',
      'Remove shoes before entering temples',
      'Dress modestly, especially in religious places',
      'Photography may be restricted in some tribal areas - ask permission',
      'Local festivals are colorful and welcoming to visitors',
      'Handicrafts make excellent souvenirs and support local artisans'
    ];
  }

  /**
   * Get destination suggestions based on interests
   */
  async getDestinationSuggestions(interests: string[]): Promise<any[]> {
    // Mock implementation - in real app, use Gemini for smart suggestions
    const destinations = [
      { name: 'Hundru Falls', type: 'waterfall', distance: '45 km from Ranchi' },
      { name: 'Betla National Park', type: 'wildlife', distance: '150 km from Ranchi' },
      { name: 'Netarhat Hill Station', type: 'hill station', distance: '155 km from Ranchi' },
      { name: 'Deoghar Temple', type: 'religious', distance: '250 km from Ranchi' },
      { name: 'Tagore Hill', type: 'heritage', distance: '8 km from Ranchi' }
    ];
    
    return destinations;
  }

  /**
   * Get weather forecast for planning
   */
  async getWeatherForecast(days: number): Promise<WeatherInfo[]> {
    // Mock weather data
    return Array.from({ length: days }, (_, i) => ({
      temperature: `${22 + Math.floor(Math.random() * 6)}-${28 + Math.floor(Math.random() * 4)}°C`,
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      humidity: `${60 + Math.floor(Math.random() * 20)}%`,
      recommendations: ['Light clothes', 'Sunscreen', 'Umbrella'].slice(0, Math.floor(Math.random() * 3) + 1)
    }));
  }
}

export const geminiTravelService = new GeminiTravelService();
export default geminiTravelService;