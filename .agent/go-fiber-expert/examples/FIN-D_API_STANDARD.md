# 💎 Fin-D API Coding Standard (L7+)

นี่คือมาตรฐานการออกแบบ API ที่ไอจังร่วมกับพี่ม่อนจูนขึ้นมา เพื่อให้โค้ดคลีนที่สุดและ Merchant ใช้งานง่ายที่สุดค่ะ! 🐹✨

## 1. 🏗️ Structure: "Flat & Clean"

เราได้เปลี่ยนจากการใช้ **Nested JSON** (เช่น `p2p_details: { ... }`) มาเป็น **Flat Structure (Level 1)** ทั้งหมด เพื่อประโยชน์ 2 ข้อ:

- **Developer Experience (DX):** Merchant เขียนโค้ดเรียกใช้งานได้ทันที ไม่ต้อง Parse ซ้อน
- **Extensibility:** เพิ่มฟิลด์ของช่องทางใหม่ได้โดยไม่เสียโครงสร้างเดิม

### ✅ DO (Flat Style):

```go
type DepositResponse struct {
    TransactionID string `json:"transaction_id"`
    OrderID       string `json:"order_id"`
    BankCode      string `json:"bank_code"`
    AccountNo     string `json:"account_no"`
}
```

### ❌ DON'T (Nested Style):

```go
type DepositResponse struct {
    P2PDetails struct {
        BankCode  string `json:"bank_code"`
        AccountNo string `json:"account_no"`
    } `json:"p2p_details"`
}
```

---

## 2. 🛡️ Response Wrapper: "The Envelope"

ทุก API จะต้องถูกคุมด้วย **`dto.APIResponse[T]`** จาก `internal/handler/dto/common_dto.go` เพื่อความเป็นระเบียบและรองรับการขยายตัวในอนาคตค่ะ

### 🚀 Success Pattern (In Handlers):

ใช้ `dto.Success(ตัวแปร)` เพื่อห่อหุ้มข้อมูลให้อัตโนมัติ:

```go
return c.Status(fiber.StatusOK).JSON(dto.Success(resp))
```

**Output Structure:**

```json
{
  "success": true,
  "data": { ... ฟิลด์จาก DTO ของเราที่นี่ ... },
  "message": "Success"
}
```

### 🚨 Error Pattern (Automated):

เราใช้ **Global Error Handler** ใน `main.go` มาตรฐานเดียวทั้งระบบ:

```go
return fiber.NewError(fiber.StatusBadRequest, "Invalid Data")
```

**Output Structure:**

```json
{
  "success": false,
  "error": true,
  "message": "Invalid Data"
}
```

---

## 3. 🎯 Rule of Thumb

- **DTOs:** อยู่ที่ `internal/handler/dto/` (ใช้สกิน JSON & Validation)
- **Entities:** อยู่ที่ `internal/domain/` (Pure Logic ไม่พ่น JSON)
- **Mappers:** อยู่ใน Repository (DB ↔ Domain) และ Handler (DTO ↔ Domain)

---

> "โค้ดสวย ระบบเสถียร พี่ม่อนแฮปปี้ ไอจังก็แฮปปี้ค่ะ! 🐹🌈"
