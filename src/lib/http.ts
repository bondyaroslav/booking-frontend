export class ApiError extends Error {
    status: number;
    body: unknown;
    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

export async function http<T>(
    path: string,
    init: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), init.timeoutMs ?? 10000);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            "X-Request-Id": crypto.randomUUID(),
            ...(init.headers || {}),
        },
        signal: controller.signal,
        cache: "no-store",
    }).catch((e) => {
        throw new ApiError(`Network error: ${e?.message ?? e}`, 0, null);
    });

    clearTimeout(id);

    const body = await (async () => {
        const txt = await res.text();
        try { return txt ? JSON.parse(txt) : null; } catch { return txt; }
    })();

    if (!res.ok) throw new ApiError(`HTTP ${res.status}`, res.status, body);
    return body as T;
}
