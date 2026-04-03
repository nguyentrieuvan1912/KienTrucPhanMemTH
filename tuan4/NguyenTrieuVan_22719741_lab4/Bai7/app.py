import os
env = os.getenv('APP_ENV', 'not set')
print(f"Ứng dụng đang chạy trong môi trường: {env}")