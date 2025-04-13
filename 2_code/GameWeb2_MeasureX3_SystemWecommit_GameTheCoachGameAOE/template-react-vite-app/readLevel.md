# Hệ Thống Tính Điểm Kinh Nghiệm (XP)

## 1. Cách Tính XP

- 1 điểm kinh nghiệm (XP) = 1 điểm giá trị
- Ví dụ:
  - Task có giá trị 1000 điểm = 1000 XP
  - Task có giá trị 5000 điểm = 5000 XP
  - Task có giá trị 100 điểm = 100 XP

## 2. Công Thức Tính Level

- Level 1: Cần 100 XP
- Level 2: Cần 150 XP (100 * 1.5)
- Level 3: Cần 225 XP (150 * 1.5)
- Level 4: Cần 338 XP (225 * 1.5)
- Level 5: Cần 507 XP (338 * 1.5)
- Và cứ tiếp tục như vậy...

## 3. Ví Dụ Cụ Thể

### Task 1:
- Giá trị: 5000 điểm
- XP nhận được: 5000 XP
- Nếu tag đang có 0 XP:
  - XP mới: 5000 XP
  - Level: 4 (đã đạt 338 XP)

### Task 2:
- Giá trị: 20000 điểm
- XP nhận được: 20000 XP
- Nếu tag đang có 5000 XP:
  - XP mới: 25000 XP
  - Level: 6 (đã đạt 1140 XP)

### Task 3:
- Giá trị: 100000 điểm
- XP nhận được: 100000 XP
- Nếu tag đang có 25000 XP:
  - XP mới: 125000 XP
  - Level: 8 (đã đạt 3844 XP)

## 4. Lưu Ý

- Level chỉ tăng khi đạt đủ XP yêu cầu
- XP dư sẽ được tính cho level tiếp theo
- Mỗi tag có XP và level riêng biệt 