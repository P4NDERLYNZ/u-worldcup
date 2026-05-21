//go:build ignore

package examples

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shopspring/decimal"
	"github.com/uteam/fin-d/api_fin-d/internal/handler/dto"
)

// --- 1. DTO Flattening Pattern (Fin-D Standard) ---
// We use a flat structure for the 'data' field to be developer-friendly.

type SampleDepositResponse struct {
	TransactionID string          `json:"transaction_id"`
	OrderID       string          `json:"order_id"`
	Amount        decimal.Decimal `json:"amount"`
	Status        string          `json:"status"`
	// Flattened Instruction Fields (No more nested objects like p2p_details)
	BankCode    string `json:"bank_code,omitempty"`
	AccountNo   string `json:"account_no,omitempty"`
	AccountName string `json:"account_name,omitempty"`
	QRString    string `json:"qr_string,omitempty"`
}

// --- 2. Handler Implementation Pattern ---

type ExampleHandler struct {
	// svc ExampleService
}

func (h *ExampleHandler) HandleDeposit(c *fiber.Ctx) error {
	// 🪄 Get data from service (Mocked)
	resp := &SampleDepositResponse{
		TransactionID: "tx-12345",
		OrderID:       "ORDER-99",
		Amount:        decimal.NewFromInt(100),
		Status:        "MATCHED",
		BankCode:      "KBANK",
		AccountNo:     "0123456789",
		AccountName:   "นายสมชาย ใจดี",
	}

	// 🚀 Standard Response Wrapping
	// Use dto.Success() to wrap the flat response into the { success: true, data: { ... } } structure.
	return c.Status(fiber.StatusOK).JSON(dto.Success(resp))
}

/*
EXPECTED JSON OUTPUT:
{
  "success": true,
  "data": {
    "transaction_id": "tx-12345",
    "order_id": "ORDER-99",
    "amount": "100",
    "status": "MATCHED",
    "bank_code": "KBANK",
    "account_no": "0123456789",
    "account_name": "นายสมชาย ใจดี"
  }
}

ERROR HANDLING (Handled by Global Error Handler in main.go):
If an error is returned: return fiber.NewError(400, "Invalid Amount")
OUTPUT:
{
  "success": false,
  "error": true,
  "message": "Invalid Amount"
}
*/
