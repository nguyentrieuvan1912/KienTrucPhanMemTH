import React, { useEffect, useState } from 'react';
import { movieAPI } from '../api/services';
import { useNavigate } from 'react-router-dom';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await movieAPI.getMovies();
                setMovies(res.data);
            } catch (err) {
                console.error("Lỗi lấy danh sách phim:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div className="text-center mt-20">Đang tải phim...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-yellow-500">IUH CINEMA - PHIM ĐANG CHIẾU</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                        {/* Hình ảnh phim */}
                        <div className="relative h-96 w-full">
                            <img 
                                src={movie.imageUrl} 
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
                            />
                            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                                {movie.genre}
                            </div>
                        </div>

                        {/* Nội dung phim */}
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2 truncate">{movie.title}</h3>
                            <p className="text-gray-400 text-sm h-12 line-clamp-2 mb-4">
                                {movie.description}
                            </p>
                            
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-300">⏱ {movie.duration} phút</span>
                                <span className="text-green-400 font-bold text-xl">${movie.price}</span>
                            </div>

                            <button 
                                onClick={() => navigate(`/book/${movie.id}`)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition-colors"
                            >
                                ĐẶT VÉ NGAY
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}