import { NextResponse } from "next/server";

/**
 * Appointment requests.
 *
 * Delivery is deliberately explicit: the request is forwarded to whatever
 * endpoint `SERVICE_REQUEST_WEBHOOK_URL` points at (an email relay, a form
 * service, a CRM inbox). If that variable is not set, this route refuses the
 * submission and the UI tells the customer to call instead — a booking request
 * must never appear to succeed while quietly going nowhere.
 */

export const runtime = "nodejs";

const CALL_INSTEAD =
  "Online requests aren't connected for this site yet. Please call the shop and we'll get you booked in:";

type Payload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  vehicle?: unknown;
  message?: unknown;
};

const asText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { message: "That request couldn't be read." },
      { status: 400 },
    );
  }

  const submission = {
    name: asText(body.name, 120),
    phone: asText(body.phone, 40),
    email: asText(body.email, 160),
    vehicle: asText(body.vehicle, 160),
    message: asText(body.message, 2000),
    receivedAt: new Date().toISOString(),
  };

  if (
    submission.name.length < 2 ||
    submission.phone.replace(/\D/g, "").length < 10 ||
    submission.message.length < 5
  ) {
    return NextResponse.json(
      { message: "Please check the highlighted fields and try again." },
      { status: 422 },
    );
  }

  const webhook = process.env.SERVICE_REQUEST_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ message: CALL_INSTEAD }, { status: 501 });
  }

  try {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(8000),
    });

    if (!forwarded.ok) throw new Error(`Upstream responded ${forwarded.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        message:
          "We couldn't deliver that request just now. Please call the shop and we'll get you booked in:",
      },
      { status: 502 },
    );
  }
}
