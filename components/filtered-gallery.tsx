"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryItem } from "@/lib/sanity"
import { getSanityImageUrl } from "@/lib/sanity"

export function FilteredGallery({ items }: { items: GalleryItem[] }) {
  const [country, setCountry] = useState("All destinations")
  const [activeId, setActiveId] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const countries = useMemo(() => ["All destinations", ...Array.from(new Set(items.map(item => item.country?.trim()).filter((value): value is string => Boolean(value)))).sort()], [items])
  const visibleItems = useMemo(() => items.filter(item => (country === "All destinations" || item.country?.trim() === country) && item.image?.url), [items, country])
  const activeIndex = visibleItems.findIndex(item => item._id === activeId)
  const activeItem = activeIndex >= 0 ? visibleItems[activeIndex] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (activeItem && !dialog.open) dialog.showModal()
    if (!activeItem && dialog.open) dialog.close()
  }, [activeItem])

  function moveImage(direction: -1 | 1) {
    if (!visibleItems.length || activeIndex < 0) return
    const nextIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length
    setActiveId(visibleItems[nextIndex]._id)
  }

  return (
    <div className="gallery-experience">
      <div className="gallery-filters" role="group" aria-label="Filter gallery by destination">
        {countries.map(option => <button key={option} type="button" className={country === option ? "gallery-filter is-active" : "gallery-filter"} aria-pressed={country === option} onClick={() => setCountry(option)}>{option}</button>)}
      </div>
      <p className="result-count" aria-live="polite">{visibleItems.length} {visibleItems.length === 1 ? "photo" : "photos"}</p>
      {visibleItems.length ? <div className="gallery-grid">{visibleItems.map(item => <button className="gallery-thumb" key={item._id} type="button" onClick={() => setActiveId(item._id)} aria-label={`View ${item.title}${item.country ? `, ${item.country}` : ""}`}>
        <img src={getSanityImageUrl(item.image, 1000)} alt={item.image?.alt || item.title} loading="lazy" />
        <span className="gallery-caption"><span>{item.country}</span><strong>{item.title}</strong></span>
      </button>)}</div> : <div className="empty-state">There are no gallery photos for this destination yet.</div>}

      <dialog ref={dialogRef} className="gallery-dialog" aria-label="Photo viewer" onClose={() => setActiveId(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
        {activeItem && <div className="gallery-dialog-content">
          <button className="gallery-close" type="button" aria-label="Close photo viewer" onClick={() => dialogRef.current?.close()}><X size={24} /></button>
          <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous photo" onClick={() => moveImage(-1)}><ChevronLeft size={30} /></button>
          <img src={getSanityImageUrl(activeItem.image, 1800)} alt={activeItem.image?.alt || activeItem.title} />
          <button className="gallery-arrow gallery-next" type="button" aria-label="Next photo" onClick={() => moveImage(1)}><ChevronRight size={30} /></button>
          <p><strong>{activeItem.title}</strong>{activeItem.country && <span>{activeItem.country}</span>}</p>
        </div>}
      </dialog>
    </div>
  )
}
