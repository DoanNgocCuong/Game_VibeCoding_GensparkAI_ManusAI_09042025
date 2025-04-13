## 🎮 Game Title:

**"Can I Go Home Now?"**

---

## 1. 🎯 **Learning Objective**

- Luyện kỹ năng nói tiếng Anh theo **cấp độ phát triển ý**:
    - Trả lời từ 1 ý đến nhiều ý (tối đa 4–5 idea units)
- Thực hành phản xạ theo tình huống công sở
- Khuyến khích sự rõ ràng, mạch lạc, logic khi trả lời
- Kết hợp yếu tố **giới hạn thời gian & thử thách áp lực nhẹ**

---

## 2. 🧠 **Core Gameplay Summary**

Bạn là nhân viên công sở đang muốn... **về nhà lúc 6 giờ tối**.

Nhưng mỗi ngày, **sếp sẽ hỏi bạn 5 câu hỏi cuối ngày**.

Trả lời đủ ý – được nối cầu để về nhà.

Thiếu ý – cầu gãy → **ở lại công ty làm thêm** = THUA.

---

## 3. 🕹️ **Game Mechanic**

### Cơ chế chính:

- Một **con đường từ văn phòng → về nhà** gồm 5 đoạn chính, mỗi đoạn bị cắt thành **1–4 khúc**, tương ứng với yêu cầu về độ dài câu trả lời (ý).
    
    ![Screenshot 2025-04-08 at 23.40.11.png](attachment:42b9f810-bc65-4edc-a949-3fe432d07cf7:Screenshot_2025-04-08_at_23.40.11.png)
    
- Mỗi **câu trả lời đúng và đủ ý** sẽ **nối được 1 hoặc nhiều khúc cầu**, cho phép người chơi tiếp tục đi về.
- Trả lời **thiếu ý hoặc sai nội dung yêu cầu** → cầu nối **không hiện ra**, nhân vật bị **kẹt ở văn phòng** → **thua**.
- Có **đồng hồ thời gian**: bắt đầu từ 6:00 p.m., cứ mỗi **giây thực tế = 1 phút trong game**.
    
    → Nếu về nhà sớm = THẮNG TO
    
    → Nếu quá 9:00 p.m. mà chưa về = **overworked ending** 😵‍💫
    

---

## 4. 🧩 **Game Flow / State Machine**

```
plaintext
CopyEdit
Start (6:00 p.m.) →
  [Sếp hỏi Câu 1] →
  [Người chơi trả lời bằng voice] →
  [Phân tích ý + tính số khúc cầu nối được] →
    ├─ Nếu đủ: nối cầu → nhân vật tiến về nhà
    └─ Nếu thiếu: cầu gãy → nhân vật đứng lại → chơi tiếp hoặc thua
  → [Sếp hỏi Câu 2] → … → Câu 5 →
  [Về nhà (win) hoặc ở lại công ty (lose)]

```

---

## 5. 📋 **Sample Question Design**

| Câu hỏi ví dụ | Yêu cầu ý | Gợi ý |
| --- | --- | --- |
| “What did you do today?” | 3 | task – result – blocker |
| “Any update on the client project?” | 2 | progress – deadline |
| “What went wrong in the meeting?” | 3 | issue – cause – next step |
| “What’s your plan for tomorrow?” | 2 | priority – timeline |
| “Any suggestions to improve team work?” | 4 | situation – problem – idea – benefit |

---

## 6. 🎙️ **Input – Output Mechanism**

- **Input:**
    - Người chơi nói bằng tiếng Anh
    - Hệ thống phân tích số **ý trả lời** qua nhận dạng từ khóa hoặc chunk mapping
- **Output:**
    - Hiển thị cầu nối: mỗi ý đúng = 1 đoạn cầu được lắp
    - Nếu thiếu → phần cầu còn lại trống → nhân vật không thể tiếp tục
    - Feedback giọng nói vui:
        - “Hmm, not enough. Stay late today!”
        - “Great! You’re free to go!”
    - Thêm animation nhỏ: sếp gật / sếp cau mày 😅

---

## 7. ⏱️ **Time Pressure Mechanic**

- Bắt đầu từ 6:00 p.m.
- Mỗi giây thực tế = 1 phút in-game
- Tổng thời gian tối đa: 180 giây (3 phút = 9 giờ tối)
- Người chơi càng **trả lời nhanh và đủ ý**, càng về sớm
- Kết thúc:
    - Về trước 8:00 p.m. → “Healthy Work-Life Balance!”
    - Về từ 8–9 p.m. → “At least you made it.”
    - Sau 9:00 p.m. → “Burnout unlocked 😩”

---

## 8. 🎨 **Assets Needed**

- Background office → nhà (với 5 điểm checkpoint)
- Nhân vật (người chơi) di chuyển
- Cầu nối dạng từng đoạn, hiện ra khi trả lời đúng
- Avatar sếp (có 2–3 biểu cảm: neutral, happy, angry)
- Đồng hồ chạy trên góc màn hình
- Hình ảnh kết thúc: nhà – bàn ăn – ghế sofa / hoặc tiếp tục cày task ở văn phòng