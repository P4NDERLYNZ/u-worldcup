# 🐹 Fin-D API Gateway — Project Structure & Architecture Guide

> **Module:** `github.com/uteam/fin-d/api_fin-d`  
> **Framework:** Go-Fiber v2.52 + GORM v1.31 + Redis v9  
> **จัดทำโดย:** น้องไอจัง (Go-Fiber Expert) 🐹  
> **Last Updated:** 09 Mar 2026

---

## 📁 Directory Tree

```
api_fin-d/
├── cmd/
│   └── api/
│       └── main.go                    # 🚀 Entrypoint (Fiber App Init + Route Registration)
│
├── internal/
│   ├── config/
│   │   └── database.go                # ⚙️ MySQL (GORM) + Redis client initialization
│   │
│   ├── domain/                        # 💎 Pure Domain Entities (NO framework tags)
│   │   ├── activity.go                #    ActivityLog entity
│   │   ├── admin.go                   #    Admin entity
│   │   ├── api_log.go                 #    APILog entity
│   │   ├── bank.go                    #    Bank entity
│   │   ├── dispute.go                 #    Dispute + DisputeLog entity
│   │   ├── matching.go                #    MatchingPair entity + MatchingStatus
│   │   ├── merchant.go                #    Merchant entity + MerchantStatus
│   │   ├── merchant_user.go           #    MerchantUser entity
│   │   ├── slip.go                    #    Slip entity + SlipStatus
│   │   ├── transaction.go             #    Transaction entity + Type/Status constants
│   │   └── webhook.go                 #    WebhookLog entity + WebhookStatus
│   │
│   ├── handler/                       # 🎯 HTTP Handlers (Fiber Ctx → Service)
│   │   ├── dto/                       #    📦 Data Transfer Objects
│   │   │   ├── common_dto.go          #       Generic APIResponse[T] (Success/Failure)
│   │   │   ├── deposit_dto.go         #       DepositRequest, DepositResponse, P2PDetails
│   │   │   └── webhook_dto.go         #       WebhookPayload, WebhookEvent constants
│   │   ├── deposit_handler.go         #    POST /v1/merchant/deposit handler
│   │   └── registry.go               #    Handler Registry (DI container)
│   │
│   ├── repository/                    # 🗄️ Data Access Layer (GORM ↔ Domain)
│   │   ├── dbmodel/                   #    🔩 GORM Models (with tags + mapper functions)
│   │   │   ├── activity.go            #       TableName() + ToDomain() + FromDomain()
│   │   │   ├── admin.go
│   │   │   ├── api_log.go
│   │   │   ├── bank.go
│   │   │   ├── dispute.go
│   │   │   ├── matching.go
│   │   │   ├── merchant.go
│   │   │   ├── merchant_user.go
│   │   │   ├── slip.go
│   │   │   ├── transaction.go
│   │   │   └── webhook.go
│   │   ├── base_repo.go              #    🧬 Generic BaseRepository[T] (CRUD)
│   │   ├── activity_repo.go          #    embed BaseRepository[dbmodel.Activity]
│   │   ├── admin_repo.go             #    + GetByUsername()
│   │   ├── api_log_repo.go           #    embed BaseRepository[dbmodel.APILog]
│   │   ├── bank_repo.go              #    + GetByCode(), GetActiveBanks()
│   │   ├── dispute_repo.go           #    embed BaseRepository[dbmodel.Dispute]
│   │   ├── matching_repo.go          #    + CreateFromDomain()
│   │   ├── merchant_repo.go          #    + GetByCode(), GetByUUID()
│   │   ├── slip_repo.go              #    + GetByTransactionID(), UpdateStatus()
│   │   ├── transaction_repo.go       #    + CreateFromDomain(), GetActiveDeposit(), UpdateStatus()
│   │   ├── user_repo.go              #    + GetByMerchantID()
│   │   ├── webhook_repo.go           #    embed BaseRepository[dbmodel.WebhookLog]
│   │   └── registry.go               #    Repository Registry (11 repos)
│   │
│   └── service/                       # ⚡ Business Logic Layer
│       ├── deposit_service.go         #    DepositService interface + depositService struct
│       └── registry.go               #    Service Registry
│
├── pkg/                               # 📦 Shared Packages (reusable across modules)
│   ├── crypto/
│   │   └── hmac.go                    #    🔐 SignHMACSHA256() + VerifyHMACSHA256()
│   ├── middleware/
│   │   ├── auth.go                    #    🛡️ SignatureAuth (HMAC Verify + Anti-Replay + IP Whitelist)
│   │   └── logger.go                  #    📊 APILogger (Async DB logging per request)
│   └── utils/                         #    🔧 Utility functions (reserved)
│
├── docs/                              # 📜 API Documentation
│   ├── example_js_signsignature.yml   #    JavaScript example
│   ├── example_go_signsignature.yml   #    Go example
│   ├── example_php_signsignature.yml  #    PHP example
│   ├── example_python_signsignature.yml  # Python example
│   ├── example_java_signsignature.yml    # Java example
│   └── example_csharp_signsignature.yml  # C# example
│
├── go.mod                             # Module definition
└── go.sum                             # Dependency checksums
```

---

## 🏗️ Architecture — Registry Chain Pattern

```
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │   Handler    │    │   Service   │    │  Repository  │
    │   Registry   │───▶│   Registry  │───▶│   Registry   │───▶ MySQL / Redis
    └─────────────┘    └─────────────┘    └─────────────┘
          ▲                                      │
          │                                      ▼
     Fiber App                              ┌──────────┐
     (main.go)                              │  dbmodel  │
          │                                 │  (GORM)   │
          ▼                                 └──────────┘
    ┌──────────┐                                 │
    │Middleware │                                 ▼
    │(Auth+Log)│                            ┌──────────┐
    └──────────┘                            │  domain   │
                                            │  (Pure)   │
                                            └──────────┘
```

**Initialization Flow (main.go):**

```go
repos    := repository.NewRegistry(db)     // 1️⃣ DB Layer
svcs     := service.NewRegistry(repos)     // 2️⃣ Business Logic
handlers := handler.NewRegistry(svcs)      // 3️⃣ HTTP Handlers
```

---

## 📐 Layer Rules (STRICT — ห้ามละเมิด!)

| Rule                                 | Description                                                                          |
| :----------------------------------- | :----------------------------------------------------------------------------------- |
| **Domain ห้ามมี framework tag**      | `internal/domain/` = Pure Go structs เท่านั้น, ห้ามมี `gorm:""`, `json:""`           |
| **DBModel อยู่แยกจาก Domain**        | `internal/repository/dbmodel/` = GORM structs + `ToDomain()` / `FromDomain()` mapper |
| **Handler ห้ามเรียก Repository ตรง** | Handler → Service → Repository เท่านั้น                                              |
| **DTO อยู่ใน handler/**              | Request/Response DTOs อยู่ใน `handler/dto/` เท่านั้น, ห้าม Service ใช้ DTO ตรง       |
| **pkg/ ใช้ร่วมได้ทุก Layer**         | Crypto, Middleware, Utils สามารถ import ได้จากทุก Layer                              |

---

## 💎 Domain Entities (internal/domain/)

> Domain = หัวใจธุรกิจ ไม่มี Tag ใดๆ บริสุทธิ์ 100%

### Transaction

```go
type TransactionType   string   // "DEPOSIT" | "WITHDRAW"
type TransactionStatus string   // "PENDING" | "MATCHED" | "PROCESSING" | "SUCCESS" | "CANCELLED" | "FAILED" | "DISPUTED"

type Transaction struct {
    ID, UUID, OrderID, MerchantID, Type, Amount,
    Status, BankAccountNo, BankCode, AccountName,
    CallbackURL, ExpiredAt, CreatedAt, UpdatedAt
}
// Methods: CanCancel() bool, IsExpired() bool
```

### Merchant

```go
type MerchantStatus string   // "ACTIVE" | "SUSPENDED" | "INACTIVE"

type Merchant struct {
    ID, UUID, MerchantCode, Name, SecretKey,
    WebhookURL, IPWhitelist, Status, CreatedAt, UpdatedAt
}
// Methods: IsActive() bool
```

### MatchingPair

```go
type MatchingStatus string   // "MATCHED" | "TRANSFERRING" | "COMPLETED" | "FAILED" | "DISPUTED"

type MatchingPair struct {
    ID, UUID, DepositTxID, WithdrawTxID,
    Amount, Status, MatchedAt, CompletedAt
}
// Methods: IsCompleted() bool
```

### Other Entities

| Entity           | Key Fields                                                                       |
| :--------------- | :------------------------------------------------------------------------------- |
| **Slip**         | TransactionID, ImageURL, SlipRef, Amount, Status, VerifiedAt                     |
| **Dispute**      | TransactionID, Reason, Resolution, Status, EvidenceURL                           |
| **WebhookLog**   | TransactionID, EventType, URL, RequestBody, ResponseBody, HTTPStatus, RetryCount |
| **Admin**        | Username, PasswordHash, Role, Status                                             |
| **MerchantUser** | MerchantID, Username, PasswordHash, Role, Status                                 |
| **Bank**         | Code, NameTH, NameEN, Status                                                     |
| **ActivityLog**  | UserType, UserID, Action, Details, IPAddress                                     |
| **APILog**       | MerchantID, Method, Path, RequestBody, ResponseStatus, IPAddress, Latency        |

---

## 🗄️ Repository Layer (internal/repository/)

### BaseRepository — Generic CRUD

```go
type BaseRepository[T any] interface {
    Create(ctx, model *T) error
    GetByID(ctx, id uint) (*T, error)
    Update(ctx, model *T) error
    Delete(ctx, id uint) error
}
```

### Specific Repository Methods

| Repository                | Custom Methods                                                                                                                              |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **MerchantRepository**    | `GetByCode(ctx, code)`, `GetByUUID(ctx, uuid)`                                                                                              |
| **TransactionRepository** | `CreateFromDomain(ctx, tx)`, `GetByOrderID(ctx, merchantID, orderID)`, `GetActiveDeposit(ctx, merchantID)`, `UpdateStatus(ctx, id, status)` |
| **MatchingRepository**    | `CreateFromDomain(ctx, pair)`                                                                                                               |
| **SlipRepository**        | `GetByTransactionID(ctx, txID)`, `UpdateStatus(ctx, id, status)`                                                                            |
| **BankRepository**        | `GetByCode(ctx, code)`, `GetActiveBanks(ctx)`                                                                                               |
| **AdminRepository**       | `GetByUsername(ctx, username)`                                                                                                              |
| **UserRepository**        | `GetByMerchantID(ctx, merchantID)`                                                                                                          |
| **WebhookRepository**     | (BaseRepository only)                                                                                                                       |
| **DisputeRepository**     | (BaseRepository only)                                                                                                                       |
| **ActivityRepository**    | (BaseRepository only)                                                                                                                       |
| **APILogRepository**      | (BaseRepository only)                                                                                                                       |

### DBModel Mapper Pattern

```go
// dbmodel/ → ทุกไฟล์ต้องมี 3 สิ่งนี้:
func (Model) TableName() string          // GORM table name
func (m *Model) ToDomain() *domain.X     // dbmodel → domain
func FromDomain(d *domain.X) *Model      // domain → dbmodel
```

---

## 🎯 Handler Layer (internal/handler/)

### Current Handlers

| Handler            | Route                  | Method | Description        |
| :----------------- | :--------------------- | :----- | :----------------- |
| **DepositHandler** | `/v1/merchant/deposit` | POST   | สร้างรายการฝากเงิน |

### Planned Handlers (TODO)

| Handler         | Route                           | Method | Description          |
| :-------------- | :------------------------------ | :----- | :------------------- |
| WithdrawHandler | `/v1/merchant/withdraw`         | POST   | สร้างรายการถอนเงิน   |
| SlipHandler     | `/v1/merchant/confirm-transfer` | POST   | ยืนยันการโอนด้วยสลิป |

### DTO — Generic Response

```go
type APIResponse[T any] struct {
    Success bool   `json:"success"`
    Data    T      `json:"data,omitempty"`
    Message string `json:"message,omitempty"`
    Error   string `json:"error,omitempty"`
}

// Usage:
dto.Success(data)      // { success: true, data: {...} }
dto.Failure[T]("msg")  // { success: false, message: "..." }
```

### Webhook Events

```go
const (
    EventDepositSuccess  = "DEPOSIT_SUCCESS"
    EventWithdrawMatched = "WITHDRAW_MATCHED"
    EventCancel          = "CANCEL"
    EventDispute         = "DISPUTE"
)
```

---

## 🛡️ Middleware Layer (pkg/middleware/)

### SignatureAuth (auth.go)

```
Request Flow:
  1. Extract Headers: X-Merchant-Code, X-Signature, X-Timestamp
  2. Verify Timestamp (±5 min Anti-Replay)
  3. Lookup Merchant from DB by code
  4. Check IP Whitelist (if configured)
  5. Verify HMAC-SHA256 Signature
     Payload = MerchantCode + Timestamp + Body
     Key = Merchant.SecretKey
  6. Store merchant in c.Locals("merchant")
```

### APILogger (logger.go)

```
Request Flow:
  1. Capture Request Body (POST/PUT/PATCH only)
  2. Execute c.Next() (run handler)
  3. Calculate Latency
  4. Extract Merchant ID from Locals (if available)
  5. Async go repos.APILog.Create() (non-blocking)
```

---

## ⚙️ Config (internal/config/)

### Environment Variables

| Variable       | Description          | Default                       |
| :------------- | :------------------- | :---------------------------- |
| `DATABASE_URL` | Full MySQL DSN       | (fallback to individual vars) |
| `DB_USERNAME`  | MySQL user           | -                             |
| `DB_PASSWORD`  | MySQL password       | -                             |
| `DB_HOST`      | MySQL host           | -                             |
| `DB_PORT`      | MySQL port           | -                             |
| `DB_NAME`      | MySQL database name  | -                             |
| `REDIS_URL`    | Redis connection URL | `redis://localhost:6379`      |
| `API_PORT`     | Fiber server port    | `8080`                        |

### Connection Pool

```go
MaxIdleConns:     10
MaxOpenConns:     100
ConnMaxLifetime:  1 hour
```

---

## 🔐 Crypto (pkg/crypto/)

```go
// Sign — สร้างลายเซ็น HMAC-SHA256
crypto.SignHMACSHA256(data []byte, secret string) string

// Verify — ตรวจสอบลายเซ็น (Constant-time comparison)
crypto.VerifyHMACSHA256(data []byte, signature string, secret string) bool
```

---

## 📏 Naming Conventions

| Category             | Convention                      | Example                                |
| :------------------- | :------------------------------ | :------------------------------------- |
| **File**             | `snake_case.go`                 | `deposit_handler.go`                   |
| **Package**          | `lowercase`                     | `repository`, `dbmodel`                |
| **Interface**        | `PascalCase` + Role suffix      | `MerchantRepository`, `DepositService` |
| **Struct (private)** | `camelCase`                     | `merchantRepo`, `depositService`       |
| **Constructor**      | `New` + Interface name          | `NewMerchantRepository()`              |
| **Domain Entity**    | `PascalCase`                    | `Transaction`, `Merchant`              |
| **DB Model**         | Same as Domain (in dbmodel pkg) | `dbmodel.Transaction`                  |
| **DTO**              | `PascalCase` + Request/Response | `DepositRequest`, `DepositResponse`    |
| **Constants**        | `PascalCase` (exported)         | `StatusPending`, `TxDeposit`           |

---

## 🧬 How to Add a New Feature (Step-by-Step)

> Example: Adding "Withdraw" feature

### Step 1: Domain Entity (if new)

```
internal/domain/transaction.go  ← Already has WITHDRAW type
```

### Step 2: DTO (Request/Response)

```
internal/handler/dto/withdraw_dto.go
  → WithdrawRequest { OrderID, Amount, BankCode, AccountNo, AccountName, CallbackURL }
  → WithdrawResponse { TransactionID, OrderID, Amount, Status, ExpiresIn }
```

### Step 3: Service Interface + Implementation

```
internal/service/withdraw_service.go
  → interface WithdrawService { RequestWithdraw(ctx, merchantID, req) (*dto.WithdrawResponse, error) }
  → struct withdrawService { repos *repository.Registry }
```

### Step 4: Handler

```
internal/handler/withdraw_handler.go
  → struct WithdrawHandler { svc service.WithdrawService }
  → func HandleRequest(c *fiber.Ctx) error
```

### Step 5: Register in Registries

```go
// service/registry.go
type Registry struct {
    Deposit  DepositService
    Withdraw WithdrawService    // ← ADD
}

// handler/registry.go
type Registry struct {
    Deposit  *DepositHandler
    Withdraw *WithdrawHandler   // ← ADD
}

// cmd/api/main.go
merchant.Post("/withdraw", handlers.Withdraw.HandleRequest)  // ← ADD route
```

---

## 📊 Dependency Graph

```
go.mod dependencies:
├── github.com/gofiber/fiber/v2      → HTTP Framework
├── github.com/joho/godotenv         → .env loader
├── github.com/redis/go-redis/v9     → Redis client
├── github.com/shopspring/decimal    → Decimal precision for money
├── gorm.io/driver/mysql             → MySQL driver
└── gorm.io/gorm                     → ORM
```

---

**Status:** _Architecture documented. Ready for team onboarding._ 🐹✨
