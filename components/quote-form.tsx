"use client"

import { FormEvent, useState } from "react"

export function QuoteForm({ initialTour = "" }: { initialTour?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = event.currentTarget
    const formData = new FormData(form)
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      const fields = Array.from(formData.entries()).filter(([key]) => key !== "access_key").map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`).join("\n")
      window.location.href = `mailto:info@phenomtoursandtravel.com?subject=${encodeURIComponent("Safari quote request")}&body=${encodeURIComponent(fields)}`
      return
    }
    formData.set("access_key", accessKey)
    formData.set("subject", `Safari quote request — ${String(formData.get("preferred_tour") || "Phenom Tours")}`)
    formData.set("from_name", "Phenom Tours & Travel website")
    setStatus("sending")
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error("Submission failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }
  return <form className="quote-form" onSubmit={submit}>
    <div className="form-grid"><label>Full Name *<input name="name" type="text" autoComplete="name" required /></label><label>Email Address *<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone Number *<input name="phone" type="tel" autoComplete="tel" required /></label><label>Preferred Destination *<select name="destination" required defaultValue=""><option value="" disabled>Select a destination</option><option>Uganda</option><option>Kenya</option><option>Rwanda</option><option>Tanzania</option><option>Multiple countries</option></select></label>
      <label className="form-span">Preferred Tour / Package<input name="preferred_tour" type="text" defaultValue={initialTour} /></label>
      <label>Preferred Start Date *<input name="start_date" type="date" required /></label><label>Preferred End Date *<input name="end_date" type="date" required /></label>
      <label>Number of Guests<input name="number_of_guests" type="number" min="1" max="50" defaultValue="2" /></label><label>Approximate Budget<input name="approximate_budget" type="text" placeholder="e.g. USD 3,000 per person" /></label>
      <fieldset className="form-span"><legend>Are your dates flexible?</legend><label className="radio-label"><input type="radio" name="dates_flexible" value="Yes" defaultChecked /> Yes</label><label className="radio-label"><input type="radio" name="dates_flexible" value="No" /> No</label></fieldset>
      <label className="form-span">Special Requests &amp; Message *<textarea name="message" rows={5} required placeholder="Tell us what you would love to experience" /></label>
      <label className="consent form-span"><input name="marketing_consent" type="checkbox" value="yes" /> I would like to receive occasional news and travel offers from Phenom Tours &amp; Travel.</label>
    </div>
    {status === "success" && <p className="form-message form-success" role="status">Thank you. Your safari enquiry has been sent, and our team will be in touch.</p>}
    {status === "error" && <p className="form-message form-error" role="alert">We couldn’t send your enquiry just now. Please try again or email info@phenomtoursandtravel.com.</p>}
    <button className="button button-orange form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}</button>
    {!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY && <p className="form-note">Your email app will open to send this enquiry.</p>}
  </form>
}
