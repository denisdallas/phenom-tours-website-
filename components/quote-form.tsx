"use client"

import { useState, type FormEvent } from "react"

const WEB3FORMS_ACCESS_KEY = "e4f7625d-5980-462d-ab14-93a32a40e22d"

type SubmissionStatus = "idle" | "invalid" | "sending" | "success" | "error"

export function QuoteForm({ initialTour = "", initialDestination = "" }: { initialTour?: string; initialDestination?: string }) {
  const [status, setStatus] = useState<SubmissionStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const startDate = String(formData.get("start_date") || "")
    const endDate = String(formData.get("end_date") || "")

    if (startDate && endDate && endDate < startDate) {
      setStatus("invalid")
      setStatusMessage("The end date must be on or after the start date.")
      form.querySelector<HTMLInputElement>("[name='end_date']")?.focus()
      return
    }

    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement
    if (!messageField.value.trim()) {
      messageField.setCustomValidity("Please enter a message about your safari.")
      messageField.reportValidity()
      return
    }

    formData.append("access_key", WEB3FORMS_ACCESS_KEY)
    formData.append("subject", "New safari enquiry from the Phenom Tours website")
    setStatus("sending")
    setStatusMessage("Sending your enquiry…")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data: { success?: boolean } = await response.json()

      if (!response.ok || !data.success) {
        throw new Error("The enquiry could not be sent.")
      }

      form.reset()
      setStatus("success")
      setStatusMessage("Thank you. Your enquiry has been sent to Phenom Tours. Our team will reply using the email address you provided.")
    } catch {
      setStatus("error")
      setStatusMessage("We could not send your enquiry just now. Please try again or email info@phenomtoursandtravel.com.")
    }
  }

  const alertStatus = status === "invalid" || status === "error"

  return <form className="quote-form" onSubmit={submit}>
    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
    <div className="form-grid">
      <label>Full Name *<input name="name" type="text" autoComplete="name" pattern={".*[^\\s].*"} maxLength={120} required /></label>
      <label>Email Address *<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone Number *<input name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
      <label>Preferred Destination *<select name="destination" required defaultValue={initialDestination}><option value="" disabled>Select a destination</option><option>Uganda</option><option>Kenya</option><option>Rwanda</option><option>Tanzania</option><option>Multiple countries</option></select></label>
      <label className="form-span">Preferred Tour / Package<input name="preferred_tour" type="text" defaultValue={initialTour} /></label>
      <label>Preferred Start Date *<input name="start_date" type="date" required /></label>
      <label>Preferred End Date *<input name="end_date" type="date" required /></label>
      <label>Number of Guests<input name="number_of_guests" type="number" min="1" max="50" defaultValue="2" /></label>
      <label>Approximate Budget<input name="approximate_budget" type="text" placeholder="e.g. USD 3,000 per person" /></label>
      <fieldset className="form-span"><legend>Are your dates flexible?</legend><label className="radio-label"><input type="radio" name="dates_flexible" value="Yes" defaultChecked /> Yes</label><label className="radio-label"><input type="radio" name="dates_flexible" value="No" /> No</label></fieldset>
      <label className="form-span">Special Requests &amp; Message *<textarea name="message" rows={5} onInput={event => event.currentTarget.setCustomValidity("")} maxLength={1000} required placeholder="Tell us what you would love to experience" /></label>
      <label className="consent form-span"><input name="marketing_consent" type="checkbox" value="yes" /> I would like to receive occasional news and travel offers from Phenom Tours &amp; Travel.</label>
    </div>
    {statusMessage && <p className={`form-message${alertStatus ? " form-error" : ""}`} role={alertStatus ? "alert" : "status"}>{statusMessage}{status === "error" && <> <a href="mailto:info@phenomtoursandtravel.com">Email us directly</a>.</>}</p>}
    <button className="button button-orange form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending enquiry…" : "Send enquiry"}</button>
    <p className="form-note">Your enquiry is sent to Phenom Tours through Web3Forms so we can respond. See our <a href="/privacy-policy">privacy policy</a>.</p>
  </form>
}
