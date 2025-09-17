import { NextRequest, NextResponse } from "next/server";
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const res = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
