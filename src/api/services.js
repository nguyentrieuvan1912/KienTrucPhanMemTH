import axios from 'axios';

const userClient = axios.create({ baseURL: 'http://172.16.56.250:8081' });
const movieClient = axios.create({ baseURL: 'http://172.16.56.62:8082' });

export const authAPI = {
    login: (credentials) => userClient.post('/login', credentials),
    register: (userData) => userClient.post('/register', userData),
};

export const movieAPI = {
    getMovies: () => movieClient.get('/movies'),
};

const bookingClient = axios.create({ 
    baseURL: 'http://172.16.56.250:8083'
});

export const bookingAPI = {
    // Khớp đúng endpoint /api/bookings
    createBooking: (bookingData) => bookingClient.post('/api/bookings', bookingData),
};