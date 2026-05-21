// ลอจิกใน Route Handler (เช่น app/api/deposit/route.ts)
import { runWithContext } from "@/lib/context";
import prisma from "@/lib/prisma";
export async function POST(req: Request) {
// 1. น้องยิ้มหวานใช้ runWithContext คลุมดักไว้ตั้งแต่หน้าประตู
return runWithContext({
actorType: "MERCHANT", // หรือระบบเป็นระบบ (SYSTEM) ที่เช็ค Auto
actorId: merchant.id,
ipAddress: ip,
}, async () => {
// 2. Dev เขียนไปแค่โค้ด Business Logic (อัปเดตสเตตัสปกติ)
const tx = await prisma.transaction.update({
where: { orderId: "DEP-12345" },
data: { status: "PROCESSING" }
// ->> 🪄 จังหวะนี้แหละ! Activity Log จะถูกแอบยิงใส่ Database อัตโนมัติแบบลับๆ ทันที!
});

    return Response.json({ status: "success", tx });

});
}
