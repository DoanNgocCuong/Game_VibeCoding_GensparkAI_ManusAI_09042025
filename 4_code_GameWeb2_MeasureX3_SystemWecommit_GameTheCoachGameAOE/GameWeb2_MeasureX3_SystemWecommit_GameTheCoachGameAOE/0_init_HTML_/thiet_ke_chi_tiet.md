# TÀI LIỆU THIẾT KẾ CHI TIẾT: QUẢN LÝ TASK THEO GIÁ TRỊ

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Mục đích và Phạm vi
- Ứng dụng quản lý task với hệ thống tính điểm kinh nghiệm (XP)
- Chuyển đổi công việc thành giá trị có thể đo lường
- Theo dõi sự phát triển kỹ năng qua hệ thống level
- Phân tích hiệu suất làm việc qua thống kê trực quan

### 1.2 Đối tượng sử dụng
- Cá nhân muốn quản lý công việc hàng ngày
- Người muốn theo dõi sự phát triển kỹ năng
- Người cần phân tích hiệu suất làm việc

## 2. CẤU TRÚC DỮ LIỆU

### 2.1 Task (Công việc)
- ID: Mã duy nhất cho mỗi task
- Tên: Tên công việc (2-100 ký tự)
- Tags: Các nhãn phân loại
- Giá trị: Điểm kinh nghiệm (-1000 đến 1000)
- Ngày thực hiện: Thời gian hoàn thành
- Thời gian tạo: Thời điểm thêm task

### 2.2 Tag (Nhãn)
- Tên: Tên nhãn
- XP: Tổng kinh nghiệm tích lũy
- Level: Cấp độ hiện tại
- Màu sắc: Màu đại diện
- Số task: Số lượng task đã hoàn thành

## 3. GIAO DIỆN NGƯỜI DÙNG

### 3.1 Trang chủ
#### 3.1.1 Header
- Tiêu đề ứng dụng
- Mô tả ngắn gọn
- Màu sắc chủ đạo: Indigo

#### 3.1.2 Layout chính
- Grid 3 cột responsive
- Cột 1: Form thêm task
- Cột 2-3: Hiển thị level tag
- Phần dưới: Danh sách task và thống kê

### 3.2 Form thêm Task
#### 3.2.1 Input tên Task
- Giới hạn: 2-100 ký tự
- Validation: Kiểm tra độ dài
- Placeholder: Hướng dẫn nhập

#### 3.2.2 Hệ thống Tag
- Input thêm tag mới
- Danh sách tag đã chọn
- Gợi ý tag phổ biến
- Màu sắc tự động cho tag mới
- Nút thêm tag (+)

#### 3.2.3 Giá trị Task
- Input số: -1000 đến 1000
- Giải thích: Kinh nghiệm tích lũy/tiêu hao
- Validation: Kiểm tra khoảng giá trị

#### 3.2.4 Ngày thực hiện
- Date picker
- Mặc định: Ngày hiện tại
- Validation: Không cho phép ngày tương lai

### 3.3 Hiển thị Level Tag
#### 3.3.1 Card Tag
- Tên tag với màu sắc riêng
- Level hiện tại
- Thanh tiến trình XP
- Số task đã hoàn thành

#### 3.3.2 Sắp xếp
- Theo level cao nhất
- Theo XP nhiều nhất
- Theo số task nhiều nhất

### 3.4 Danh sách Task
#### 3.4.1 Điều hướng ngày
- Nút trước/sau
- Nút hôm nay
- Hiển thị ngày hiện tại

#### 3.4.2 Thống kê ngày
- Tổng giá trị
- Số lượng task
- Màu sắc theo giá trị dương/âm

#### 3.4.3 Task Item
- Tên task
- Các tag với màu sắc
- Giá trị kinh nghiệm
- Thời gian tạo
- Nút xóa

### 3.5 Biểu đồ Thống kê
#### 3.5.1 Biểu đồ Thu nhập
- Dạng cột
- 7 ngày gần nhất
- Màu sắc theo giá trị dương/âm
- Tooltip hiển thị giá trị

#### 3.5.2 Biểu đồ Phân bố Tag
- Dạng tròn
- Phần trăm theo tag
- Màu sắc tương ứng
- Tooltip hiển thị chi tiết

### 3.6 Dashboard
#### 3.6.1 Tổng quan
- Tổng kinh nghiệm tích lũy
- Tổng kinh nghiệm tiêu hao
- Kinh nghiệm còn lại
- Màu sắc theo giá trị

#### 3.6.2 Top Tag
- Top 3 tag hoạt động nhiều nhất
- Số task đã hoàn thành
- Level hiện tại
- Màu sắc tương ứng

## 4. TÍNH NĂNG CHÍNH

### 4.1 Quản lý Task
#### 4.1.1 Thêm Task
- Validation dữ liệu
- Tự động tạo tag mới
- Tính toán XP cho tag
- Thông báo thành công

#### 4.1.2 Xóa Task
- Xác nhận trước khi xóa
- Cập nhật XP tag
- Cập nhật thống kê
- Thông báo xóa thành công

#### 4.1.3 Hiển thị Task
- Lọc theo ngày
- Sắp xếp theo thời gian
- Animation khi thêm/xóa
- Empty state khi không có task

### 4.2 Hệ thống Level
#### 4.2.1 Tính toán Level
- Công thức dựa trên XP
- Hệ số nhân cho mỗi level
- XP cần cho level tiếp theo
- Hiển thị tiến trình

#### 4.2.2 Thông báo Level Up
- Animation đặc biệt
- Hiển thị level mới
- Màu sắc nổi bật
- Tự động biến mất

### 4.3 Thống kê và Phân tích
#### 4.3.1 Biểu đồ Thu nhập
- Tự động cập nhật
- Responsive với màn hình
- Tooltip chi tiết
- Màu sắc trực quan

#### 4.3.2 Biểu đồ Phân bố
- Cập nhật realtime
- Hiển thị phần trăm
- Màu sắc tương ứng
- Empty state khi không có dữ liệu

### 4.4 Lưu trữ Dữ liệu
- Tự động lưu vào LocalStorage
- Tự động load khi khởi động
- Không giới hạn thời gian lưu trữ
- Không cần đăng nhập

## 5. TÍNH NĂNG MỞ RỘNG

### 5.1 Cải thiện UI/UX
- Dark mode
- Responsive design nâng cao
- Animation phức tạp hơn
- Tùy chỉnh giao diện

### 5.2 Tính năng mới
- Export/Import dữ liệu
- Tùy chỉnh màu sắc tag
- Thống kê chi tiết theo tag
- Đặt mục tiêu XP
- Nhắc nhở task

### 5.3 Cải thiện Performance
- Tối ưu hóa render
- Lazy loading
- Caching dữ liệu
- Xử lý dữ liệu lớn

## 6. HẠN CHẾ HIỆN TẠI

### 6.1 Technical
- Lưu trữ cục bộ
- Giới hạn kích thước dữ liệu
- Không có backup
- Không có API

### 6.2 Functional
- Không có đa người dùng
- Không có đồng bộ hóa
- Không có phân quyền
- Không có báo cáo xuất

## 7. HƯỚNG DẪN SỬ DỤNG

### 7.1 Thêm Task
1. Nhập tên task (2-100 ký tự)
2. Thêm tag (tự tạo hoặc chọn từ gợi ý)
3. Nhập giá trị kinh nghiệm (-1000 đến 1000)
4. Chọn ngày thực hiện
5. Nhấn "Thêm Task"

### 7.2 Quản lý Tag
- Click vào tag trong gợi ý để thêm
- Click X để xóa tag
- Tag mới tự động có màu sắc
- Tag phổ biến được gợi ý

### 7.3 Theo dõi Level
- XP tự động tính từ giá trị task
- Level tăng theo công thức
- Thông báo khi lên level
- Xem tiến trình trong card tag

### 7.4 Xem Thống kê
- Biểu đồ tự động cập nhật
- Xem theo ngày
- Dashboard hiển thị tổng quan
- Top tag hoạt động nhiều nhất 