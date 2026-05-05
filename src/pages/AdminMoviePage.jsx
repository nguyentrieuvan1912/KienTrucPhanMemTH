// Trong hàm handleSubmit của AuthPage.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        if (isLogin) {
            // LOGIN
            const res = await authAPI.login(form);
            // Cấu trúc res.data thường là: { user: {...}, token: "ey..." }
            setAuth(res.data.user, res.data.token); 
            navigate('/movies');
        } else {
            // REGISTER
            await authAPI.register({
                username: form.username,
                password: form.password,
                // Thêm các trường khác nếu User Service yêu cầu
                role: 'USER', 
                status: 'ACTIVE'
            });
            alert('Đăng ký thành công! Đăng nhập đi Namkayz.');
            setIsLogin(true);
        }
    } catch (err) {
        // Log lỗi chi tiết để debug cho nhanh
        console.error("Auth Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || 'Có lỗi xảy ra, check Console!');
    } finally {
        setLoading(false);
    }
};