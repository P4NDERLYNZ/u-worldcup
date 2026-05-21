# U-WorldCup Prediction Web App 🏆

เว็บแอปพลิเคชันสำหรับกิจกรรมทายผลสกอร์ฟุตบอลโลก ใช้งานง่าย ตอบโจทย์การเล่นร่วมกันในทีม มาพร้อมธีม Dark/Gold สุดพรีเมียม

## Features (ฟีเจอร์หลัก)
- **Dashboard:** ดูสรุปสถิติและคะแนนรวม
- **Matches:** ดูโปรแกรมการแข่งขันและส่งคำทายผล
- **My Predictions:** ดูประวัติการทายผลและแต้มที่ได้รับ
- **Leaderboard:** ตารางจัดอันดับผู้เล่น ใครแม่นสุดมาดูกัน
- **Admin Dashboard:** จัดการสถานะการแข่งขัน ใส่ผลสกอร์จริง และคำนวณคะแนนใหม่

## Scoring Rule (กติกาการให้คะแนน)
- **ทายผลสกอร์ถูกต้องเป๊ะ:** รับ 3 คะแนนเต็ม
- **ทายผลแพ้/ชนะ/เสมอถูกต้อง แต่สกอร์ไม่ตรง:** รับ 1 คะแนน
- **ทายผิด:** 0 คะแนน

## Tech Stack
- React 18
- Vite
- Tailwind CSS v4
- React Router DOM
- Lucide React (Icons)
- Context API (State Management)

## โครงสร้างโฟลเดอร์ (Folder Structure)
- `/src/components`: UI Components ย่อย เช่น Header, MatchCard, PredictionModal
- `/src/pages`: หน้าหลักต่างๆ เช่น Home, Matches, Leaderboard
- `/src/data`: ข้อมูล Mock Data (mockMatches, mockUsers)
- `/src/utils`: ฟังก์ชันเสริม เช่น ระบบคำนวณคะแนน
- `/src/context`: AppContext จัดการ Global State

## การติดตั้งและใช้งาน (Installation)

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. รัน Local Development Server:
```bash
npm run dev
```

ระบบจะเปิดใช้งานที่ `http://localhost:5173`
