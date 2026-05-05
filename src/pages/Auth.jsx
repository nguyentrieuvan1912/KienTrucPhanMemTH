import React, { useState } from 'react';
import { authAPI } from '../api/services';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // 1. Chặn load trang - cực kỳ quan trọng
        e.preventDefault(); 
        
        console.log(">>> NÚT ĐÃ NHẤN!"); // Nếu dòng này không hiện => Lỗi ở thẻ form/button
        console.log("Dữ liệu chuẩn bị gửi:", form);

        try {
            if (isLogin) {
                console.log("Đang gọi API Login...");
                const res = await authAPI.login(form);
                console.log("Phản hồi từ Server:", res.data);

                if (res.data && res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    
                    // Lưu thông tin user để Booking
                    const userData = res.data.user || { id: res.data.userId || 1, username: form.username };
                    localStorage.setItem('user', JSON.stringify(userData));

                    alert("Đăng nhập thành công!");
                    navigate('/movies');
                } else {
                    console.error("Server không trả về token!");
                    alert("Lỗi: Server không trả về token xác thực.");
                }
            } else {
                // Logic Đăng ký
                console.log("Đang gọi API Register...");
                await authAPI.register({ ...form, role: "ROLE_USER" });
                alert("Đăng ký thành công!");
                setIsLogin(true);
            }
        } catch (err) {
            console.error("LỖI KHI GỌI API:", err);
            const msg = err.response?.data?.message || "Lỗi kết nối hoặc sai tài khoản";
            alert("Thất bại: " + msg);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            {/* Đảm bảo onSubmit nằm ở thẻ form */}
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-xl shadow-lg w-80 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">
                    {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
                </h2>
                
                <div className="space-y-4">
                    <input 
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-yellow-500 outline-none"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})}
                        required
                    />

                    <input 
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-yellow-500 outline-none"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        required
                    />

                    {/* Nút bấm PHẢI có type="submit" và nằm TRONG form */}
                    <button 
                        type="submit" 
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-all"
                    >
                        {isLogin ? 'VÀO HỆ THỐNG' : 'TẠO TÀI KHOẢN'}
                    </button>
                </div>

                <p 
                    className="mt-6 text-center text-gray-400 cursor-pointer text-sm hover:text-white" 
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Quay lại đăng nhập'}
                </p>
            </form>
        </div>
    );
}