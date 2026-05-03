"use client";

import { useState } from "react";

const tiers = [
  {
    id: 'luxury',
    number: '01',
    label: 'LUXURY',
    headline: 'Flagship boutiques in dedicated premium corridors',
    bullets: ['High-profile brand neighbors', 'Premium build-out support', 'Destination-zone positioning'],
    image: '/dior.jpg',
    accentColor: '#C8102E',
  },
  {
    id: 'flagship',
    number: '02',
    label: 'FLAGSHIP',
    headline: 'Anchor stores with peak-traffic placement',
    bullets: ['Multi-level retail options', 'Entertainment adjacency', 'Highest footfall corridors'],
    image: '/corridor.jpg',
    accentColor: '#003DA5',
  },
  {
    id: 'midtier',
    number: '03',
    label: 'MID-TIER',
    headline: 'Join 520+ established brands in a proven ecosystem',
    bullets: ['Community of top-performing brands', 'Strong repeat visitor base', 'Flexible sizing options'],
    image: '/moa-hall.jpg',
    accentColor: '#FFD100',
  },
  {
    id: 'popup',
    number: '04',
    label: 'POP-UP',
    headline: 'Short-term, experiential, and first-to-market launches',
    bullets: ['Flexible lease terms', 'Built-in discovery traffic', 'Low-risk market entry'],
    image: '/models.jpg',
    accentColor: '#C8102E',
  },
]

const stats = [
  { value: '520+', label: 'Active Tenants' },
  { value: '98%', label: 'Occupancy Rate' },
  { value: '170+', label: 'First-to-Market Brands' },
]

export default function Retail() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  /** Grid `fr` tracks always fill the row; percentage widths + transition rounded independently and left a gap on the right. */
  const panelGridColumns = hoveredTier
    ? tiers.map((t) => (hoveredTier === t.id ? '2fr' : '1fr')).join(' ')
    : 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)'

  const breakoutBleed = {
    width: '100vw' as const,
    marginLeft: 'calc(50% - 50vw)' as const,
    marginRight: 'calc(50% - 50vw)' as const,
  }

  return (
    <section
      id="retail"
      className="h-screen overflow-hidden flex flex-col bg-[#07090F] px-[80px] pt-6 max-md:px-8"
    >
      {/* Header */}
      <div className="flex items-end justify-between shrink-0">
        <div>
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">03 RETAIL & LEASING</p>
          <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px] leading-tight">
            Precision Leasing for Every Growth Stage
          </h2>
        </div>
      </div>

      {/* Stats bar no background, sits between header and panels */}
      <div
        className="shrink-0"
        style={{
          ...breakoutBleed,
          marginTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <div style={{ flex: '1 1 0', padding: 'clamp(14px, 2vh, 18px) clamp(24px, 5vw, 80px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            Why brands stay
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '4px 0 0', lineHeight: 1.3 }}>
            Average tenure at MOA is <span style={{ color: '#C8102E' }}>11 years</span>
          </p>
        </div>
        {stats.map((s, i) => (
          <div key={s.label} style={{ flex: '0 0 auto', padding: 'clamp(14px, 2vh, 18px) clamp(16px, 3vw, 40px)', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '4px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Panel strip flex-1 fills remaining space */}
      <div style={{ flex: 1, marginTop: '0', minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: panelGridColumns,
            ...breakoutBleed,
            height: '100%',
            overflow: 'hidden',
            transition: 'grid-template-columns 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {tiers.map((tier) => {
            const isHovered = hoveredTier === tier.id
            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                style={{
                  position: 'relative',
                  minWidth: 0,
                  height: '100%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Background image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${tier.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isHovered ? 'scale(1.07)' : 'scale(1.03)',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
                {/* Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.4) 100%)',
                    transition: 'background 0.5s ease',
                  }}
                />
                {/* Top accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: tier.accentColor,
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease 0.1s',
                  }}
                />
                {/* Vertical label */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-90deg)',
                  opacity: isHovered ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '4px', textTransform: 'uppercase',
                  }}>
                    {tier.label}
                  </span>
                </div>
                {/* Content */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '28px 24px',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: tier.accentColor, letterSpacing: '2px' }}>
                      {tier.number}
                    </span>
                    <div style={{ width: '24px', height: '1px', background: tier.accentColor }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'white', letterSpacing: '3px', textTransform: 'uppercase' }}>
                      {tier.label}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isHovered ? '20px' : '15px',
                    fontWeight: 700, color: '#FFFFFF', margin: 0,
                    lineHeight: 1.3, letterSpacing: '-0.3px',
                    transition: 'font-size 0.4s ease', maxWidth: '260px',
                  }}>
                    {tier.headline}
                  </h3>
                  <div style={{ maxHeight: isHovered ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.5s ease 0.1s' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', paddingTop: '8px' }}>
                      {tier.bullets.map((bullet, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: tier.accentColor, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      style={{
                        marginTop: '16px', padding: '9px 18px',
                        background: 'transparent', border: `1px solid ${tier.accentColor}`,
                        borderRadius: '4px', color: 'white',
                        fontFamily: "'Inter', sans-serif", fontSize: '10px',
                        fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'background 0.3s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = tier.accentColor }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Enquire About Leasing
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
