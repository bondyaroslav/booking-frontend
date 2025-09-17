export type CheckoutPayload = {
    bookingId: string;
    amountCents: number;
    currency: string;
    name: string;
    customerEmail: string;
    method?: string;
};

export type CheckoutResponse = {
    redirectUrl?: string;
    id?: string;
    status?: string;
    [k: string]: unknown;
};

export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
    console.log("createCheckout", payload);
    const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    console.log(data);
    if (!res.ok) {
        throw new Error(data?.error ?? `Checkout failed: ${res.status}`);
    }
    return data;
}
