# 🦷 Aurora Dental Clinic — Clinic Management System

> ระบบบริหารจัดการคลีนิกทันตกรรมแบบครบวงจร พร้อมระบบจองคิวออนไลน์สำหรับผู้ป่วย

---

## 📋 สารบัญ

- [ภาพรวมโปรเจค](#-ภาพรวมโปรเจค)
- [Tech Stack](#-tech-stack)
- [โครงสร้างระบบ](#-โครงสร้างระบบ)
- [โครงสร้างโฟลเดอร์](#-โครงสร้างโฟลเดอร์)
- [Database Schema](#-database-schema)
- [Roles & Permissions](#-roles--permissions)
- [การติดตั้ง](#-การติดตั้ง)
- [Environment Variables](#-environment-variables)
- [การพัฒนา (Development)](#-การพัฒนา-development)
- [Roadmap](#-roadmap)

---

## 🏥 ภาพรวมโปรเจค

**Aurora Dental Clinic Management System** คือระบบบริหารจัดการคลีนิกทันตกรรมที่พัฒนาขึ้นเพื่อรองรับการทำงานทั้งภายในคลีนิกและฝั่งผู้ป่วย แบ่งออกเป็น 2 ส่วนหลัก ได้แก่

| ส่วน | คำอธิบาย | ผู้ใช้งาน |
|------|-----------|-----------|
| **Admin Dashboard** | ระบบหลังบ้านสำหรับจัดการคลีนิก | Admin, Doctor, Receptionist |
| **Patient Portal** | หน้าเว็บสำหรับผู้ป่วยจองคิวและดูประวัติ | ผู้ป่วย (Patient) |

### ฟีเจอร์หลัก

**Admin Dashboard**
- 📅 จัดการนัดหมายและคิวรายวัน (Queue Management)
- 👤 บันทึกและจัดการข้อมูลผู้ป่วย (Patient Management)
- 🦷 แผนภูมิฟัน Interactive (Dental Chart)
- 📝 บันทึกการรักษา (Treatment Records)
- 🧾 ออกใบเสร็จและจัดการการชำระเงิน (Billing & Invoice)
- 📦 จัดการวัสดุและอุปกรณ์ (Inventory)
- 📊 รายงานและวิเคราะห์ข้อมูล (Reports & Analytics)
- 👥 จัดการบุคลากรและตารางแพทย์ (Staff & Schedule)

**Patient Portal**
- 🌐 Landing Page คลีนิก
- 📱 จองคิวออนไลน์ (เลือกแพทย์ / บริการ / วันเวลา)
- 🔔 รับการแจ้งเตือนนัดหมายทาง Email / SMS
- 📋 ดูประวัติการรักษาของตนเอง
- 🎫 ตรวจสอบสถานะคิว Real-time

---

## 🛠 Tech Stack

### Backend
| เทคโนโลยี | เวอร์ชัน | ใช้ทำอะไร |
|-----------|---------|-----------|
| **PHP** | 8.3+ | ภาษาหลัก |
| **Laravel** | 11.x | Framework หลัก |
| **MySQL** | 8.0+ | ฐานข้อมูลหลัก |
| **Redis** | 7.x | Queue, Cache, Session |
| **Laravel Reverb** | latest | WebSocket (Real-time queue) |
| **Laravel Horizon** | latest | Queue Monitor |
| **Spatie Permission** | latest | Role & Permission |
| **Spatie Media Library** | latest | จัดการไฟล์และรูปภาพ |
| **Laravel DomPDF** | latest | ออกเอกสาร PDF |

### Frontend
| เทคโนโลยี | เวอร์ชัน | ใช้ทำอะไร |
|-----------|---------|-----------|
| **React** | 19.x | UI Framework |
| **Inertia.js** | latest | SPA โดยไม่ต้องทำ API แยก |
| **Tailwind CSS** | 4.x | Styling |
| **FullCalendar** | latest | ตารางนัดหมาย |
| **Recharts** | latest | กราฟ Analytics |
| **Konva / react-konva** | latest | Dental Chart |
| **FilePond** | latest | อัปโหลดไฟล์ X-Ray |

### DevOps & Tools
| เทคโนโลยี | ใช้ทำอะไร |
|-----------|-----------|
| **Laravel Sail** | Docker สำหรับ Local Development |
| **Pest PHP** | Testing (Backend) |
| **Vitest** | Testing (Frontend) |

---

## 🏗 โครงสร้างระบบ

```
┌─────────────────────────────────────────────────────┐
│                   Aurora Dental System               │
├───────────────────────┬─────────────────────────────┤
│    Patient Portal     │       Admin Dashboard        │
│   (Public + Auth)     │     (Staff Only - Auth)      │
├───────────────────────┴─────────────────────────────┤
│                  Inertia.js + React                  │
├─────────────────────────────────────────────────────┤
│              Laravel 11 (Backend API)                │
├───────────────┬─────────────────────────────────────┤
│     MySQL     │   Redis (Queue/Cache/Session)        │
├───────────────┴─────────────────────────────────────┤
│           Laravel Reverb (WebSocket)                 │
└─────────────────────────────────────────────────────┘
```

### URL Structure

| Path | คำอธิบาย | Role |
|------|-----------|------|
| `/` | Landing page | Public |
| `/booking` | จองคิวออนไลน์ | Public / Patient |
| `/portal/*` | Patient dashboard | Patient |
| `/admin/*` | Admin dashboard | Admin, Doctor, Receptionist |
| `/admin/queue` | จัดการคิวรายวัน | Receptionist+ |
| `/admin/patients` | จัดการผู้ป่วย | Receptionist+ |
| `/admin/appointments` | จัดการนัดหมาย | Receptionist+ |
| `/admin/treatments` | บันทึกการรักษา | Doctor+ |
| `/admin/billing` | ออกใบเสร็จ | Receptionist+ |
| `/admin/inventory` | จัดการวัสดุ | Admin |
| `/admin/reports` | รายงาน | Admin |
| `/admin/settings` | ตั้งค่าระบบ | Admin |

---

## 📁 โครงสร้างโฟลเดอร์

```
aurora-dental/
├── app/
│   ├── Events/                  # Real-time Events (Reverb)
│   │   └── QueueUpdated.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/           # Controllers สำหรับ Staff
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── PatientController.php
│   │   │   │   ├── AppointmentController.php
│   │   │   │   ├── QueueController.php
│   │   │   │   ├── TreatmentController.php
│   │   │   │   ├── BillingController.php
│   │   │   │   ├── InventoryController.php
│   │   │   │   └── ReportController.php
│   │   │   └── Portal/          # Controllers สำหรับ Patient
│   │   │       ├── BookingController.php
│   │   │       └── HistoryController.php
│   │   └── Middleware/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Patient.php
│   │   ├── Doctor.php
│   │   ├── Service.php
│   │   ├── Appointment.php
│   │   ├── QueueTicket.php
│   │   ├── Treatment.php
│   │   ├── DentalChart.php
│   │   ├── Invoice.php
│   │   └── InventoryItem.php
│   └── Services/                # Business Logic
│       ├── QueueService.php
│       ├── AppointmentService.php
│       └── InvoiceService.php
│
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── RolePermissionSeeder.php
│       ├── ServiceSeeder.php
│       └── DemoDataSeeder.php
│
├── resources/
│   └── js/
│       ├── Layouts/
│       │   ├── AdminLayout.jsx       # Sidebar + Header (Staff)
│       │   ├── PortalLayout.jsx      # Layout (Patient)
│       │   └── GuestLayout.jsx       # Landing + Booking
│       ├── Pages/
│       │   ├── Admin/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Queue/
│       │   │   ├── Patients/
│       │   │   ├── Appointments/
│       │   │   ├── Treatments/
│       │   │   ├── Billing/
│       │   │   ├── Inventory/
│       │   │   └── Reports/
│       │   └── Portal/
│       │       ├── Booking.jsx
│       │       ├── Dashboard.jsx
│       │       └── History.jsx
│       └── Components/
│           ├── DentalChart/          # Interactive Dental Chart
│           ├── QueueBoard/           # Real-time Queue Display
│           ├── Calendar/             # FullCalendar Wrapper
│           └── UI/                   # Shared Components
│
└── routes/
    ├── web.php
    ├── channels.php              # WebSocket Channels
    └── api.php
```

---

## 🗄 Database Schema

### ตาราง Users & Profiles

```sql
users           → id, name, email, password, role
patients        → id, user_id*, hn (unique), dob, phone, address, blood_type, allergy
doctors         → id, user_id*, specialization, license_no, bio, avatar
```

### ตาราง Appointments & Queue

```sql
services        → id, name, description, price, duration_minutes, category, is_active
appointments    → id, patient_id*, doctor_id*, service_id*, datetime, status*, type*, note
                  status: [pending, confirmed, in_progress, completed, cancelled, no_show]
                  type: [walk_in, online]
queue_tickets   → id, appointment_id*, queue_number, called_at, completed_at, status*
                  status: [waiting, calling, in_room, done, skipped]
```

### ตาราง Clinical

```sql
treatments      → id, appointment_id*, doctor_id*, notes, tooth_numbers (JSON), cost, created_at
dental_charts   → id, patient_id* (unique), tooth_data (JSON), updated_at
                  tooth_data: { "11": { "status": "filling", "surface": ["buccal"] }, ... }
```

### ตาราง Billing

```sql
invoices        → id, treatment_id*, subtotal, discount, total, payment_method, paid_at, note
```

### ตาราง Operations

```sql
inventory_items → id, name, unit, quantity, reorder_level, cost_per_unit, supplier, updated_at
doctor_schedules → id, doctor_id*, day_of_week, start_time, end_time, is_active
doctor_leaves   → id, doctor_id*, date, reason
```

> `*` = foreign key | `hn` = Hospital Number (รหัสผู้ป่วย)

---

## 👥 Roles & Permissions

| Role | สิทธิ์การเข้าถึง |
|------|----------------|
| **admin** | ทุกอย่าง รวมถึงตั้งค่าระบบ, รายงาน, จัดการ staff |
| **doctor** | ดูคิวของตน, บันทึกการรักษา, ดู dental chart |
| **receptionist** | จัดการคิว, นัดหมาย, ออกใบเสร็จ, ดูข้อมูลผู้ป่วย |
| **patient** | จองคิว, ดูประวัติการรักษาของตนเอง |

---

## 🚀 การติดตั้ง

### Requirements
- PHP 8.3+
- Composer 2.x
- Node.js 20+
- Docker (สำหรับ Laravel Sail)

### ขั้นตอนการติดตั้ง

```bash
# 1. Clone โปรเจค
git clone https://github.com/your-org/aurora-dental.git
cd aurora-dental

# 2. ติดตั้ง dependencies
composer install
npm install

# 3. ตั้งค่า environment
cp .env.example .env
php artisan key:generate

# 4. เริ่ม Docker (Sail)
./vendor/bin/sail up -d

# 5. รัน migration และ seeder
./vendor/bin/sail artisan migrate --seed

# 6. Build frontend
npm run dev

# 7. เริ่ม WebSocket server
./vendor/bin/sail artisan reverb:start

# 8. เริ่ม Queue worker
./vendor/bin/sail artisan queue:work
```

---

## 🔧 Environment Variables

```env
# App
APP_NAME="Aurora Dental Clinic"
APP_URL=http://localhost
APP_TIMEZONE=Asia/Bangkok
APP_LOCALE=th

# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=aurora_dental
DB_USERNAME=sail
DB_PASSWORD=password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# WebSocket (Reverb)
REVERB_APP_ID=aurora-dental
REVERB_APP_KEY=your-key
REVERB_APP_SECRET=your-secret
REVERB_HOST=localhost
REVERB_PORT=8080

# Mail (แจ้งเตือนนัดหมาย)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_FROM_ADDRESS=noreply@auroradental.com
MAIL_FROM_NAME="Aurora Dental Clinic"

# SMS (ถ้าใช้)
SMS_PROVIDER=twilio
TWILIO_SID=
TWILIO_TOKEN=
TWILIO_FROM=
```

---

## 💻 การพัฒนา (Development)

```bash
# รัน dev server พร้อมกัน
npm run dev                           # Vite (Frontend)
php artisan reverb:start              # WebSocket
php artisan queue:work --queue=default,notifications  # Queue

# Testing
php artisan test                      # Backend tests (Pest)
npx vitest                            # Frontend tests

# Linting
./vendor/bin/pint                     # PHP code style
npx eslint resources/js               # JS linting
```

### Default Login (Seeder)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@auroradental.com | password |
| Doctor | doctor@auroradental.com | password |
| Receptionist | receptionist@auroradental.com | password |

---

## 🗺 Roadmap

### Phase 1 — Core ✅ (เริ่มพัฒนา)
- [ ] Authentication & Role setup
- [ ] Patient CRUD
- [ ] Service & Doctor management
- [ ] Appointment booking (Portal)
- [ ] Queue management (Admin)

### Phase 2 — Clinical
- [ ] Dental Chart (Interactive)
- [ ] Treatment Record
- [ ] Invoice & Billing
- [ ] PDF export (ใบเสร็จ, OPD Card)

### Phase 3 — Operations
- [ ] Inventory management
- [ ] Doctor schedule & leave
- [ ] Staff management

### Phase 4 — Enhancement
- [ ] Real-time queue board (Reverb)
- [ ] Email / SMS notifications
- [ ] Analytics & Reports dashboard
- [ ] X-Ray image upload & viewer

---

## 📄 License

Proprietary — Aurora Dental Clinic. All rights reserved.

---

<p align="center">
  Built with ❤️ for Aurora Dental Clinic
</p>