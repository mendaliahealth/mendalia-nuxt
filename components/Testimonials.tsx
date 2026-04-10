"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const VIDEO_TESTIMONIALS = [
  {
    name: "Dr Kundan Nivangune",
    title: "Sr Consultant Physician",
    location: "India",
    src: "/images/dr-kundan-review.mp4",
    poster: "/images/dr-arjun.jpg",
    quote: "Mendalia has fundamentally changed how I document and reason through complex cases. It's not just a scribe — it's a clinical thinking partner.",
  },
  {
    name: "Dr Bikrant Dhakal",
    title: "Sr Dermatologist",
    location: "Nepal",
    src: "/images/dr-bikrant-review.mp4",
    poster: "/images/dr-arjun.jpg",
    quote: "For dermatology, the clinical reasoning engine catches things I sometimes need to deliberate on. The care plan generation is exceptional.",
  },
];

const TEXT_TESTIMONIALS = [
  {
    name: "Dr Suraj Kumar Gupta",
    title: "Sr Consultant Physician",
    institution: "Norvic International Hospital",
    initials: "SG",
    color: "#0A6B5A",
    quote: "In 25 years of practice I have never had a tool that kept up with my clinical thinking. Mendalia doesn't just scribe — it reasons. The differential diagnosis engine is remarkably accurate, and the care plan gives me a structured second opinion on every case. This is what AI in medicine should look like.",
    rating: 5,
  },
  {
    name: "Dr Naresh Parajuli",
    title: "Internal Medicine",
    institution: "TUTH",
    initials: "NP",
    color: "#0D5C4A",
    quote: "The multilingual scribing is a game-changer. I see patients who speak multiple languages and Mendalia handles the transitions seamlessly. The SOAP note is ready before the patient leaves the room. Our documentation quality has improved significantly since adoption.",
    rating: 5,
  },
  {
    name: "Dr Arjun Burlakoti",
    title: "Senior Anatomy Lecturer",
    institution: "University of Adelaide, Australia",
    initials: "AB",
    color: "#1A5C50",
    quote: "As an educator, I am impressed by the clinical accuracy and evidence-based reasoning that Mendalia produces. The differential diagnosis is grounded in sound clinical logic. It is the kind of tool that helps train the next generation of physicians to think systematically.",
    rating: 5,
  },
  {
    name: "Dr Peter Schaffer",
    title: "Cardiologist",
    institution: "United States",
    initials: "PS",
    color: "#2E7A6A",
    quote: "I was sceptical about AI scribing tools after trying several that missed clinical nuance entirely. Mendalia is different. The reasoning engine understands cardiology context, catches relevant comorbidities from the transcript, and generates a care plan I would actually sign off on. The case discussion AI is invaluable for complex patients.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VideoTestimonial({ testimonial, index }: { testimonial: typeof VIDEO_TESTIMONIALS[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden card-hover sr-hidden">
      <div className="relative aspect-video bg-[var(--ink)] cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={testimonial.src}
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
          playsInline
          aria-label={`Video testimonial from ${testimonial.name}`}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
              <svg className="w-6 h-6 text-[var(--brand)] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-white font-bold text-sm">{testimonial.name}</div>
              <div className="text-white/70 text-[0.68rem]">{testimonial.title} · {testimonial.location}</div>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <StarRating count={5} />
        <p className="text-[var(--sage)] text-[0.85rem] leading-relaxed mt-3 italic">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <div className="font-bold text-[var(--ink)] text-sm">{testimonial.name}</div>
          <div className="text-[var(--muted)] text-[0.72rem]">{testimonial.title}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-[5%] bg-white" aria-labelledby="testimonials-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-14 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            Testimonials
          </div>
          <h2 id="testimonials-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            What clinicians{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
              are saying.
            </span>
          </h2>
          <p className="text-[var(--sage)] text-[0.97rem] mt-3 max-w-[480px] mx-auto leading-relaxed">
            From emergency physicians to cardiologists, from public hospitals to private practice.
          </p>
        </div>

        {/* Video testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {VIDEO_TESTIMONIALS.map((t, i) => (
            <VideoTestimonial key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Text testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TEXT_TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[var(--off)] border border-[var(--border)] rounded-2xl p-6 card-hover sr-hidden">
              <StarRating count={t.rating} />
              <p className="text-[var(--ink)] text-[0.87rem] leading-[1.8] mt-4 mb-5 italic">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[0.62rem] font-black flex-shrink-0"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-[var(--ink)] text-[0.87rem]">{t.name}</div>
                  <div className="text-[var(--muted)] text-[0.7rem]">{t.title} · {t.institution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dr Arjun photo highlight */}
        <div className="mt-8 bg-[var(--ink)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr] sr-hidden">
          <div className="relative w-full lg:w-52 h-52 flex-shrink-0">
            <Image
              src="/images/dr-arjun.jpg"
              alt="Dr Arjun Burlakoti, Senior Anatomy Lecturer at University of Adelaide"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 208px"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <StarRating count={5} />
            <p className="text-white/70 text-[0.9rem] leading-relaxed mt-4 italic">
              &quot;It is the kind of tool that helps train the next generation of physicians to think systematically. The clinical accuracy is impressive.&quot;
            </p>
            <div className="mt-4">
              <div className="text-white font-bold">Dr Arjun Burlakoti</div>
              <div className="text-white/40 text-[0.72rem]">Senior Anatomy Lecturer, University of Adelaide, Australia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
