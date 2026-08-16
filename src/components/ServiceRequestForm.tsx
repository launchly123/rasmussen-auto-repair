"use client";

import { useId, useRef, useState } from "react";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

const fieldClass =
  "min-h-12 w-full border border-paper/20 bg-ink-800 px-4 text-[0.9375rem] text-paper " +
  "placeholder:text-paper/35 transition-colors duration-200 hover:border-paper/35 " +
  "focus:border-red-300 focus:outline-none";

export function ServiceRequestForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      vehicle: String(data.get("vehicle") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const nextErrors: Errors = {};
    if (values.name.length < 2) nextErrors.name = "Please enter your name.";
    if (values.phone.replace(/\D/g, "").length < 10)
      nextErrors.phone = "Please enter a phone number we can reach you on.";
    if (values.message.length < 5)
      nextErrors.message = "Tell us briefly what the vehicle is doing.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
        return;
      }

      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setStatus({
        kind: "error",
        message:
          body?.message ??
          "We couldn't send that request. Please call the shop and we'll get you booked in.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Please call the shop and we'll get you booked in.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="border border-paper/20 bg-ink-800 p-8 md:p-10"
      >
        <p className="eyebrow text-red-300">Request received</p>
        <p className="mt-4 font-serif text-[1.5rem] leading-tight text-paper">
          Thank you — we&rsquo;ll be in touch.
        </p>
        <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-[1.7] text-mute-dark">
          Someone from the shop will call you back during business hours. If
          it&rsquo;s urgent, calling is still the fastest way to reach us.
        </p>
        <a
          href={business.phone.href}
          className="mt-6 inline-flex min-h-12 items-center border border-paper/25 px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:border-paper/60"
        >
          Call {business.phone.display}
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-paper/15 bg-ink-800/60 p-6 md:p-8"
    >
      <p className="eyebrow text-red-300">Request an appointment</p>
      <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-[1.7] text-mute-dark">
        Send a few details and the shop will call you back to arrange a time.
        Prefer to talk it through now?{" "}
        <a
          href={business.phone.href}
          className="whitespace-nowrap text-paper underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red-300"
        >
          Call {business.phone.display}
        </a>
        .
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          id={`${id}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          autoComplete="tel"
          required
          error={errors.phone}
        />
        <Field
          id={`${id}-email`}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          optional
        />
        <Field
          id={`${id}-vehicle`}
          name="vehicle"
          label="Vehicle"
          placeholder="Year, make and model"
          optional
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${id}-message`}
          className="eyebrow block text-mute-dark"
        >
          What&rsquo;s it doing?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          placeholder="A noise, a warning light, how it drives — whatever you've noticed."
          className={cn(
            fieldClass,
            "mt-2.5 resize-y py-3 leading-[1.6]",
            errors.message && "border-red-300",
          )}
        />
        {errors.message && (
          <p id={`${id}-message-error`} className="mt-2 text-sm text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center bg-red px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-red-700 disabled:opacity-60 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Send request"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status.kind === "submitting" ? "Sending your request" : ""}
      </p>

      {status.kind === "error" && (
        <p
          role="alert"
          className="mt-5 border-l-2 border-red-300 pl-4 text-[0.9375rem] leading-[1.6] text-paper/90"
        >
          {status.message}{" "}
          <a
            href={business.phone.href}
            className="font-medium whitespace-nowrap text-red-300 underline underline-offset-4"
          >
            {business.phone.display}
          </a>
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  optional,
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-mute-dark">
        {label}
        {optional && <span className="ml-2 opacity-60">optional</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, "mt-2.5", error && "border-red-300")}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
