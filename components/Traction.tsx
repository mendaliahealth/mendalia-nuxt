import Image from "next/image";

export default function Traction() {
  return (
    <section id="traction" className="py-24 px-[5%] bg-[var(--off)]" aria-labelledby="traction-title">
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            Traction and Partnerships
          </div>
          <h2 id="traction-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            Real-world deployment.{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
              At scale.
            </span>
          </h2>
          <p className="text-[var(--sage)] text-[0.97rem] mt-3 max-w-[520px] mx-auto leading-relaxed">
            From landmark institutional partnerships to global pharma engagement — Mendalia is trusted where it matters most.
          </p>
        </div>

        {/* === BLOCK 1: Institutional Partnerships === */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 sr-hidden">
            <div className="text-[0.7rem] font-bold tracking-widest uppercase text-[var(--brand)]">Institutional Partnerships</div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* MoU Banner */}
          <div className="bg-[var(--ink)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-6 sr-hidden">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[0.65rem] font-black tracking-widest uppercase text-[#4DD9AC] bg-[rgba(77,217,172,0.1)] border border-[rgba(77,217,172,0.2)] rounded-full px-3 py-1.5 w-fit mb-5">
                First of its kind
              </div>
              <h3 className="text-2xl font-black text-white leading-tight mb-4">
                Memorandum of Understanding with the Nepal Medical Association
              </h3>
              <p className="text-white/50 text-[0.87rem] leading-relaxed mb-5">
                The Nepal Medical Association has entered into a landmark MoU with Mendalia for the distribution and deployment of clinical AI across all public hospitals in Nepal. Mendalia is the first Clinical AI company to achieve this recognition.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4DD9AC] animate-pulse-dot" />
                <span className="text-[0.72rem] text-white/40">First Clinical AI Company in Nepal</span>
              </div>
            </div>
            <div className="relative min-h-[280px] lg:min-h-auto">
              {/* DEV NOTE: Replace with actual MoU photo */}
              <Image
                src="/images/mou-nepal-medical-association.jpg"
                alt="MoU signing ceremony with Nepal Medical Association"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/40 to-transparent" />
            </div>
          </div>

          {/* Bir + NAMS cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm card-hover sr-hidden">
              <div className="relative h-52">
                <Image
                  src="/images/nams-bir.jpg"
                  alt="Mendalia team with management of NAMS and Bir Hospital"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-bold text-sm">NAMS and Bir Hospital Partnership</div>
                  <div className="text-white/60 text-[0.62rem] mt-0.5">Management team photo with senior hospital leadership</div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[var(--ink)] mb-2">Bir Hospital and NAMS Technology Handover</h4>
                <p className="text-[var(--sage)] text-[0.84rem] leading-relaxed">
                  Mendalia has formally handed over its clinical AI infrastructure to Bir Hospital — the busiest and oldest public hospital — and to the Nepal Academy of Medical Sciences (NAMS) under the Government of Nepal.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm card-hover sr-hidden">
              <div className="relative h-52">
                <Image
                  src="/images/handover-teaching-hospital.jpg"
                  alt="Handover ceremony at Teaching Hospital"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-bold text-sm">Teaching Hospital Deployment</div>
                  <div className="text-white/60 text-[0.62rem] mt-0.5">Largest public hospital deployment</div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[var(--ink)] mb-2">Deployed at the Largest Public Teaching Hospital</h4>
                <p className="text-[var(--sage)] text-[0.84rem] leading-relaxed">
                  Mendalia is live at the country's largest public referral and teaching hospital, delivering ambient clinical scribing and AI reasoning support to physicians across all specialties.
                </p>
              </div>
            </div>
          </div>

          {/* Research Paper Card */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-7 shadow-sm sr-hidden">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-mist)] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--brand)] mb-2">Joint Research Paper</div>
                <h4 className="font-black text-[var(--ink)] text-lg leading-snug mb-3">
                  Clinical AI Infrastructure in Resource-Constrained Public Healthcare: Feasibility, Impact, and Physician Experience of AI-Assisted Scribing and Decision Support
                </h4>
                <p className="text-[var(--sage)] text-[0.85rem] leading-relaxed mb-4">
                  A joint research study conducted in partnership with NAMS and Bir Hospital examining the real-world feasibility and clinical impact of AI-assisted scribing and decision support at a high-volume public referral hospital.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[0.65rem] font-bold text-[var(--brand)] bg-[var(--brand-mist)] px-3 py-1 rounded-full">Peer Review Pending</span>
                  <span className="text-[0.65rem] font-bold text-[var(--sage)] bg-[var(--linen)] px-3 py-1 rounded-full">NAMS Partnership</span>
                  <span className="text-[0.65rem] font-bold text-[var(--sage)] bg-[var(--linen)] px-3 py-1 rounded-full">Bir Hospital</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === BLOCK 2: Clinicians trust us === */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 sr-hidden">
            <div className="text-[0.7rem] font-bold tracking-widest uppercase text-[var(--brand)]">Built with Clinicians</div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="bg-white rounded-2xl border border-[var(--border)] p-8 sr-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[0.68rem] font-bold tracking-widest uppercase text-[var(--brand)] mb-4">Clinicians trust us</div>
                <h3 className="text-2xl font-black text-[var(--ink)] leading-tight mb-4">
                  Designed in the clinic. Validated by Clinicians.
                </h3>
                <p className="text-[var(--sage)] text-[0.9rem] leading-relaxed mb-5">
                  Mendalia was built alongside practicing physicians across multiple specialties and settings. Every feature, every workflow, every edge case — shaped by real clinical experience. We run hands-on training sessions and feedback workshops to ensure the platform evolves with the people using it.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "200+", label: "Active Clinicians" },
                    { val: "12+", label: "Specialties Covered" },
                    { val: "70+", label: "Languages Supported" },
                    { val: "3+", label: "Continents Active" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[var(--off)] rounded-xl p-4">
                      <div className="text-2xl font-black text-[var(--brand)] leading-none mb-1">{s.val}</div>
                      <div className="text-[0.68rem] text-[var(--muted)]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                  <Image src="/images/class-bir-hospital.jpg" alt="Mendalia AI training class at Bir Hospital" fill className="object-cover" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[0.6rem] font-semibold">Training at Bir Hospital</div>
                </div>
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                  <Image src="/images/class-derma-kmc.jpg" alt="Mendalia AI training session for dermatology team at KMC" fill className="object-cover" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[0.6rem] font-semibold">Dermatology Team, KMC</div>
                </div>
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3] col-span-2">
                  <Image src="/images/director-bhaktapur.jpg" alt="Director of Bhaktapur Cancer Hospital discussing Mendalia AI in Oncology" fill className="object-cover" sizes="600px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[0.6rem] font-semibold">Director, Bhaktapur Cancer Hospital — AI in Oncology</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === BLOCK 3: CEO/CTO/Founder === */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 sr-hidden">
            <div className="text-[0.7rem] font-bold tracking-widest uppercase text-[var(--brand)]">Global Recognition</div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                img: "/images/ceo-with-doctors.jpg",
                alt: "Mendalia CEO with physicians",
                caption: "CEO with clinical advisory team",
                desc: "Building relationships with physicians who shape how clinical AI should work in the real world.",
              },
              {
                img: "/images/cto-dr-alark.jpg",
                alt: "Mendalia CTO with Dr Alark Rajouria",
                caption: "CTO with Dr Alark Rajouria",
                desc: "Technical partnerships with leading clinicians to ensure clinical accuracy and safety.",
              },
              {
                img: "/images/founder-premier-sa.jpg",
                alt: "Mendalia founder meeting the Premier of South Australia",
                caption: "Founder meets Premier of South Australia",
                desc: "Discussing Mendalia AI and the future of clinical intelligence at the governmental level.",
              },
            ].map((item) => (
              <div key={item.caption} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden card-hover sr-hidden">
                <div className="relative h-52">
                  <Image src={item.img} alt={item.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[0.6rem] font-semibold">{item.caption}</div>
                </div>
                <div className="p-4">
                  <p className="text-[var(--sage)] text-[0.82rem] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === BLOCK 4: Pharma === */}
        <div>
          <div className="flex items-center gap-3 mb-8 sr-hidden">
            <div className="text-[0.7rem] font-bold tracking-widest uppercase text-[var(--brand)]">Pharma Partnerships</div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="bg-white rounded-2xl border border-[var(--border)] p-8 mb-6 sr-hidden">
            <h3 className="text-xl font-black text-[var(--ink)] mb-3">Engaged with the world's leading pharmaceutical companies</h3>
            <p className="text-[var(--sage)] text-[0.9rem] leading-relaxed mb-6">
              Mendalia has held senior-level partnership discussions with major global pharmaceutical groups, exploring how clinical AI can enhance physician engagement, real-world evidence generation, and patient outcomes.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Lupin Limited","Mankind Pharma","Torrent Pharma","Emcure Pharma"].map((p) => (
                <span key={p} className="text-[0.75rem] font-bold text-[var(--brand)] bg-[var(--brand-mist)] px-4 py-1.5 rounded-full border border-[var(--border)]">{p}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/images/pharma-lupin.jpg", alt: "Mendalia meeting with Lupin Limited CEO South Asia and Medical Affairs team", caption: "CEO South Asia and Medical Affairs, Lupin Limited" },
              { img: "/images/pharma-mankind.jpg", alt: "Mendalia meeting with Mankind Pharma Sr President Atish Majumdar", caption: "Sr President Atish Majumdar, Mankind Pharma" },
              { img: "/images/pharma-torrent.jpg", alt: "Mendalia meeting with Torrent Pharma Sr Vice President Aditya Zutshi", caption: "Sr VP Aditya Zutshi, Torrent Pharma" },
              { img: "/images/pharma-emcure.jpg", alt: "Mendalia meeting with Emcure Pharma senior management", caption: "Senior Management, Emcure Pharma" },
            ].map((p) => (
              <div key={p.caption} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden card-hover sr-hidden">
                <div className="relative h-44">
                  <Image src={p.img} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[0.55rem] font-semibold leading-snug">{p.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
