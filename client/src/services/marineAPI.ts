// Marine API Service
// This service integrates with the marine conservation API using the MARINE_API key

const MARINE_API_BASE_URL = 'https://api.marinedata.org'; // Replace with actual API URL
const API_KEY = import.meta.env.VITE_MARINE_API || process.env.MARINE_API;

interface MarineDataResponse {
  success: boolean;
  data: any;
  message?: string;
}

class MarineAPIService {
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<MarineDataResponse> {
    try {
      const response = await fetch(`${MARINE_API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Marine API Error:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Get latest ocean pollution statistics
  async getOceanPollutionStats(): Promise<MarineDataResponse> {
    return this.makeRequest('/pollution/statistics');
  }

  // Get marine protected areas data
  async getMarineProtectedAreas(): Promise<MarineDataResponse> {
    return this.makeRequest('/protected-areas');
  }

  // Get conservation project updates
  async getConservationProjects(): Promise<MarineDataResponse> {
    return this.makeRequest('/conservation/projects');
  }

  // Get real-time ocean health metrics
  async getOceanHealthMetrics(): Promise<MarineDataResponse> {
    return this.makeRequest('/health/metrics');
  }

  // Submit conservation event data
  async submitConservationEvent(eventData: any): Promise<MarineDataResponse> {
    return this.makeRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Get species population data
  async getSpeciesData(species?: string): Promise<MarineDataResponse> {
    const endpoint = species ? `/species/${species}` : '/species';
    return this.makeRequest(endpoint);
  }
}

// Export a singleton instance
export const marineAPI = new MarineAPIService();

// Export types for use in components
export type { MarineDataResponse };

// Utility function to check if API is configured
export const isMarineAPIConfigured = (): boolean => {
  return Boolean(API_KEY);
};

// Fallback data structure for when API is not available
export const getFallbackMarineData = () => ({
  pollution: {
    plasticInOceans: '75-199M tonnes',
    annualPlasticInput: '11M tonnes/year',
    marineDeaths: '1M+ annually',
    recyclingRate: '9%'
  },
  conservation: {
    protectedAreas: '15,000+ worldwide',
    cleanupProgress: '10M kg removed',
    treatyProgress: '2025 target',
    successRate: '99% species saved'
  },
  personal: {
    divesCompleted: '200+',
    conservationEvents: '5+',
    speciesDocumented: '150+',
    locationsVisited: '25+'
  }
});
