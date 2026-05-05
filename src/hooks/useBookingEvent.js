import { useState, useCallback } from 'react';
import { bookingAPI } from '../api/services'; // File API ở bước trước

export function useBookingEvent() {
    const [bookingState, setBookingState] = useState('IDLE'); // IDLE | PENDING | COMPLETED | FAILED
    const [logMessage, setLogMessage] = useState('');
    const [bookingId, setBookingId] = useState(null);

    const executeBooking = async (movieId, seats) => {
        setBookingState('PENDING');
        setLogMessage('Đang gửi event BOOKING_CREATED lên Broker...');

        try {
            // 1. Gọi Booking Service (chỉ tạo đơn, chưa thanh toán)
            const res = await bookingAPI.createBooking({ movieId, seats, userId: 1 });
            const newBookingId = res.data.bookingId;
            setBookingId(newBookingId);
            setLogMessage(`Booking #${newBookingId} đã tạo. Đang chờ Payment Service...`);

            // 2. Kích hoạt cơ chế Polling để chờ Event PAYMENT_COMPLETED
            startPolling(newBookingId);

        } catch (error) {
            setBookingState('FAILED');
            setLogMessage('Lỗi kết nối đến Booking Service Gateway.');
        }
    };

    const startPolling = useCallback((id) => {
        let attempts = 0;
        const maxAttempts = 10; // Polling tối đa 10 lần (ví dụ 20s)
        
        const interval = setInterval(async () => {
            attempts++;
            try {
                // Frontend chủ động hỏi Gateway xem đơn hàng đã được Payment Service xử lý chưa
                const statusRes = await bookingAPI.checkBookingStatus(id);
                const currentStatus = statusRes.data.status;

                if (currentStatus === 'COMPLETED') {
                    setBookingState('COMPLETED');
                    setLogMessage(`🎉 THÀNH CÔNG: Event PAYMENT_COMPLETED đã được xử lý cho Booking #${id}!`);
                    clearInterval(interval);
                } else if (currentStatus === 'FAILED') {
                    setBookingState('FAILED');
                    setLogMessage(`❌ THẤT BẠI: Event BOOKING_FAILED cho Booking #${id}.`);
                    clearInterval(interval);
                } else if (attempts >= maxAttempts) {
                    setBookingState('FAILED');
                    setLogMessage('⏳ TIMEOUT: Không nhận được phản hồi từ Payment Service.');
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("Lỗi khi polling trạng thái:", err);
            }
        }, 2000); // Mỗi 2 giây hỏi 1 lần
    }, []);

    return { bookingState, logMessage, bookingId, executeBooking };
}