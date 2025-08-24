import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 errors for protected routes (not login/signup)
    if (error.response?.status === 401) {
      const isAuthRoute = error.config.url?.includes('/auth/login') || 
                         error.config.url?.includes('/auth/register');
      
      if (!isAuthRoute) {
        // Token expired or invalid for protected routes
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh'),
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profiles/me'),
  createProfile: (profileData) => api.post('/profiles/me', profileData),
  updateProfile: (profileData) => api.put('/profiles/me', profileData),
};

// Period API
export const periodAPI = {
  getPeriods: (params = {}) => api.get('/periods/', { params }),
  createPeriod: (periodData) => api.post('/periods/', periodData),
  updatePeriod: (id, periodData) => api.put(`/periods/${id}`, periodData),
  deletePeriod: (id) => api.delete(`/periods/${id}`),
};

// Mood API
export const moodAPI = {
  getMoods: (params = {}) => api.get('/moods/', { params }),
  createMood: (moodData) => api.post('/moods/', moodData),
  updateMood: (id, moodData) => api.put(`/moods/${id}`, moodData),
  deleteMood: (id) => api.delete(`/moods/${id}`),
};

// Predictions API
export const predictionsAPI = {
  getCurrentPrediction: (date) => api.get('/predictions/current', { params: { target_date: date } }),
  getPredictionHistory: (startDate, endDate) => 
    api.get('/predictions/history', { params: { start_date: startDate, end_date: endDate } }),
  retrainModel: () => api.post('/predictions/retrain'),
  confirmPeriod: (periodDate) => api.post('/predictions/confirm-period', { period_date: periodDate }),
  getModelStatus: () => api.get('/predictions/model-status'),
  getCycleInfo: () => api.get('/predictions/cycle-info'),
};

export default api;
