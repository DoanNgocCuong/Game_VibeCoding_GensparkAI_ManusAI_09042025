11-12/04/2025
---
Game hoá như game: trông cây focus, hoặc focus trồng rong biển -> mở rộng hơn thành game ĐẾ CHẾ (XÂY DỰNG 1 SYSTEM)


BẮT NGUỒN TỪ: 
1. MỤC TIÊU ĐO LƯỜNG, KO ĐO LƯỜNG KO CẢI TIẾN ĐƯỢC - của ace X3 Năng suất. Web hiện tại chỉ lưu thói quen. 
2. SYSTEM, XÂY DỰNG MỌI THỨ NHƯ DẠNG SYSTEM, VUN TRỒNG VUN TRỒNG. COI NHƯ GAME THÌ LẤY TIỀN ĐẦU TƯ. + Game trồng cây san hô focus ngày xưa, ... => Idea nhen nhói là: mở rộng Web thói quen thành Web theo dõi cả system như ở version gần đây. 
3. THE COACH CÓ HACKATHON GAME, và trước đó idea AOE ENGLISH GAME CỦA MÌNH ĐÃ NHEN NHÓM => Ý đinh biến HABIT TRACKING-> SYSTEM TRACKING -> GAME HOÁ CÓ LEVEL, EXP, ...

4. TRONG LÚC TÌM CHO MÌNH 1 NGÁCH ĐI KHI AI PHÁT TRIỂN QUÁ NHANH (tối 12/04/2025). 

---
13/04/2025

The calculations follow the new system:
- Base XP requirement: 1000 XP for level 1
- Level multiplier: 1.5x per level
- Streak multipliers:
  - 0-30 days: 1.0x
  - 31-90 days: 1.05x
  - 91-365 days: 1.1x
  - 1-3 years: 1.2x
  - 3-5 years: 1.3x
  - 5-7 years: 1.5x
  - 7-10 years: 1.8x
  - 10-15 years: 2.5x
  - 15+ years: 5.0x


---
13/04/2025

TEMPLATE: https://github.com/brunnoTripovichy/template-react-vite#-react--vite--typescript--swc--tailwind-template


```
src/
├── assets/         # Tài nguyên tĩnh (hình ảnh, fonts, etc.)
│   └── README.md   # Hướng dẫn quản lý tài nguyên
├── components/     # Các component tái sử dụng
│   ├── Charts.tsx          # Component biểu đồ thống kê
│   ├── ExperienceOverview.tsx  # Trang tổng quan kinh nghiệm
│   ├── GameDashboard.jsx   # Dashboard chính của game
│   ├── Notification.tsx    # Component thông báo
│   ├── TagLevels.tsx       # Hiển thị cấp độ của tags
│   ├── TaskForm.tsx        # Form tạo/sửa task
│   ├── TaskList.tsx        # Danh sách tasks
│   └── README.md           # Hướng dẫn sử dụng components
├── features/       # Các tính năng chính của ứng dụng
│   └── README.md   # Mô tả các tính năng
├── hooks/          # Custom React hooks
│   └── README.md   # Hướng dẫn sử dụng hooks
├── layouts/        # Các layout template
│   └── README.md   # Hướng dẫn về layouts
├── pages/          # Các trang chính của ứng dụng
│   └── README.md   # Mô tả các trang
├── routes/         # Cấu hình routing
│   └── README.md   # Hướng dẫn routing
├── services/       # Các service gọi API
│   └── README.md   # Hướng dẫn sử dụng services
├── store/          # State management (Redux)
│   ├── slices/     # Redux slices
│   │   ├── taskSlice.ts  # Quản lý state của tasks
│   │   └── tagSlice.ts   # Quản lý state của tags
│   ├── index.ts    # Store configuration
│   └── README.md   # Hướng dẫn quản lý state
├── utils/          # Các hàm tiện ích
│   └── README.md   # Hướng dẫn sử dụng utils
├── App.tsx         # Component gốc của ứng dụng
├── main.tsx        # Entry point của ứng dụng
└── index.css       # Global styles
```