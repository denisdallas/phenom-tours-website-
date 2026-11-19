"use client"

import { useState, type FormEvent } from "react"

export function QuoteForm({ initialTour = "", initialDestination = "" }: { initialTour?: string; initialDestination?: string }) {
  const [status, setStatus] = useState<"idle" | "invalid" | "opening">("idle")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const startDate = String(formData.get("start_date") || "")
    const endDate = String(formData.get("end_date") || "")
    if (startDate && endDate && endDate < startDate) {
      setStatus("invalid")
      form.querySelector<HTMLInputElement>("[name='end_date']")?.focus()
      return
    }

    const message = form.elements.namedItem("message") as HTMLTextAreaElement
    if (!message.value.trim()) {
      message.setCustomValidity("Please enter a message about your safari.")
      message.reportValidity()
      return
    }

    const name = String(formData.get("name") || "")
    const tour = String(formData.get("preferred_tour") || formData.get("destination") || "Tour inquiry")
    const date = [startDate, endDate].filter(Boolean).join(" to ")
    const subject = `Tour Inquiry - ${name} - ${tour}`
    const body = [
      `Name: ${name}`,
      `Email: ${String(formData.get("email") || "")}`,
      `Phone: ${String(formData.get("phone") || "")}`,
      `Tour: ${tour}`,
      `Date: ${date}`,
      `Guests: ${String(formData.get("number_of_guests") || "")}`,
      `Message: ${String(formData.get("message") || "")}`,
    ].join("\r\n")
    setStatus("opening")
    window.location.href = `mailto:info@phenomtoursandtravel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return <form className="quote-form" action="mailto:info@phenomtoursandtravel.com" method="post" encType="text/plain" onSubmit={submit}>
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
    {status === "invalid" && <p className="form-message form-error" role="alert">The end date must be on or after the start date.</p>}
    {status === "opening" && <p className="form-message" role="status">Your email app should open with this enquiry ready to send. If it doesn’t, email <a href="mailto:info@phenomtoursandtravel.com">info@phenomtoursandtravel.com</a>.</p>}
    <button className="button button-orange form-submit" type="submit">Prepare enquiry email</button>
    <p className="form-note">This opens your email app to send to <a href="mailto:info@phenomtoursandtravel.com">info@phenomtoursandtravel.com</a>. No data is stored automatically.</p>
  </form>
}
