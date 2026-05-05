import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI, bookingAPI } from '../api/services';

export default function BookingPage() {
    const { id } = useParams(); // Lấy movieId từ URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [seatCount, setSeatCount] = useState(1);
    const [loading, setLoading] = useState(false);

    // Giả sử sau khi Login, bạn đã lưu userId và username vào localStorage
    const user = JSON.parse(localStorage.getItem('user')) || { id: 1, username: 'Khách' };

    useEffect(() => {
        // Lấy thông tin phim để có Title và Price tính tổng tiền
        movieAPI.getMovies().then(res => {
            const found = res.data.find(m => m.id === parseInt(id));
            setMovie(found);
        });
    }, [id]);

    // Lấy user đã lưu
    const userStored = JSON.parse(localStorage.getItem('user'));

    const handleBooking = async () => {
        if (!movie || !userStored) {
            alert("Lỗi: Không tìm thấy thông tin User. Hãy đăng nhập lại!");
            return;
        }

        const bookingData = {
            userId: Number(userStored.id), // Lấy ID THẬT từ lúc login
            movieId: Number(movie.id),
            movieTitle: movie.title,
            seatCount: Number(seatCount),
            customerName: userStored.username, // Lấy tên THẬT
            amount: Number((movie.price * seatCount).toFixed(2))
        };

        try {
            await bookingAPI.createBooking(bookingData);
            alert("Đặt vé thành công với ID: " + userStored.id);
            navigate('/movies');
        } catch (err) {
            alert("Booking tạch rồi: " + (err.response?.data?.message || "Lỗi kết nối"));
        }
    };

    if (!movie) return <div className="text-white text-center mt-10">Đang tải phim...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
                <h2 className="text-2xl font-bold text-yellow-500 mb-6">XÁC NHẬN ĐẶT VÉ</h2>
                
                <div className="space-y-4 mb-8">
                    <p><span className="text-gray-400">Phim:</span> <span className="font-bold">{movie.title}</span></p>
                    <p><span className="text-gray-400">Giá vé:</span> <span className="text-green-400">${movie.price}</span></p>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Số lượng ghế:</span>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSeatCount(Math.max(1, seatCount - 1))} className="bg-gray-700 px-3 py-1 rounded">-</button>
                            <span className="font-bold text-xl">{seatCount}</span>
                            <button onClick={() => setSeatCount(seatCount + 1)} className="bg-gray-700 px-3 py-1 rounded">+</button>
                        </div>
                    </div>

                    <hr className="border-gray-700" />
                    <div className="flex justify-between text-xl font-bold">
                        <span>TỔNG TIỀN:</span>
                        <span className="text-yellow-500">${(movie.price * seatCount).toFixed(2)}</span>
                    </div>
                </div>

                <button 
                    onClick={handleBooking}
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${loading ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700 shadow-lg'}`}
                >
                    {loading ? 'ĐANG XỬ LÝ...' : 'THANH TOÁN NGAY'}
                </button>
            </div>
        </div>
    );
}

// Hàm hỗ trợ ép kiểu cho giống Long của Java (Thực tế JSON gửi lên là Number)
const Long = (val) => parseInt(val);