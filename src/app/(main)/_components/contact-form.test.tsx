// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ContactForm from "./contact-form";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("submits JSON once and announces success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, code: "sent", reference: "email-id" }), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "New Visitor");
    await user.type(screen.getByLabelText("Email"), "visitor@example.com");
    await user.type(screen.getByLabelText("Message"), "A useful project inquiry.");
    const form = screen.getByRole("button", { name: "Send message" }).closest("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Contact form element is missing from the DOM.");
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(screen.getByRole("button", { name: /Sending/ })).toBeDisabled();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      name: "New Visitor",
      email: "visitor@example.com",
      message: "A useful project inquiry.",
      website: "",
    });
    expect(await screen.findByRole("status")).toHaveTextContent("Thanks — your message was sent.");
    expect(screen.getByRole("button", { name: "Message sent" })).toBeDisabled();
  });

  it("shows the duplicate message and preserves values on 409", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "duplicate" }), {
        status: 409,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "New Visitor");
    await user.type(screen.getByLabelText("Email"), "visitor@example.com");
    await user.type(screen.getByLabelText("Message"), "A useful project inquiry.");
    const form = screen.getByRole("button", { name: "Send message" }).closest("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Contact form element is missing from the DOM.");
    fireEvent.submit(form);

    expect(await screen.findByRole("alert")).toHaveTextContent("This browser or email has already sent a message.");
    expect(screen.getByLabelText("Name")).toHaveValue("New Visitor");
    expect(screen.getByLabelText("Email")).toHaveValue("visitor@example.com");
    expect(screen.getByLabelText("Message")).toHaveValue("A useful project inquiry.");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("shows a retry-later message and preserves values on 429", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "rate_limited" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "New Visitor");
    await user.type(screen.getByLabelText("Email"), "visitor@example.com");
    await user.type(screen.getByLabelText("Message"), "A useful project inquiry.");
    const form = screen.getByRole("button", { name: "Send message" }).closest("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Contact form element is missing from the DOM.");
    fireEvent.submit(form);

    expect(await screen.findByRole("alert")).toHaveTextContent("Too many attempts. Please try again later.");
    expect(screen.getByLabelText("Name")).toHaveValue("New Visitor");
    expect(screen.getByLabelText("Email")).toHaveValue("visitor@example.com");
    expect(screen.getByLabelText("Message")).toHaveValue("A useful project inquiry.");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("shows a generic retry message and re-enables the button when fetch rejects", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "New Visitor");
    await user.type(screen.getByLabelText("Email"), "visitor@example.com");
    await user.type(screen.getByLabelText("Message"), "A useful project inquiry.");
    const form = screen.getByRole("button", { name: "Send message" }).closest("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Contact form element is missing from the DOM.");
    fireEvent.submit(form);

    expect(await screen.findByRole("alert")).toHaveTextContent("Your message could not be sent. Please try again.");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
    expect(screen.getByLabelText("Name")).toHaveValue("New Visitor");
  });

  it("calls fetch exactly once when submitted twice while pending", async () => {
    const deferred: { resolve?: (response: Response) => void } = {};
    const fetchMock = vi.fn().mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          deferred.resolve = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "New Visitor");
    await user.type(screen.getByLabelText("Email"), "visitor@example.com");
    await user.type(screen.getByLabelText("Message"), "A useful project inquiry.");
    const form = screen.getByRole("button", { name: "Send message" }).closest("form");
    if (!(form instanceof HTMLFormElement)) throw new Error("Contact form element is missing from the DOM.");
    fireEvent.submit(form);
    fireEvent.submit(form);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    deferred.resolve?.(
      new Response(JSON.stringify({ ok: true, code: "sent", reference: "email-id" }), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );
    expect(await screen.findByRole("status")).toHaveTextContent("Thanks — your message was sent.");
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
