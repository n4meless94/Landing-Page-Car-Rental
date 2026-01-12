"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "60178355503";

type Car = {
  name: string;
  daily: number;
  package3: number;
  units: number;
  category: "economy" | "sedan" | "mpv" | "suv" | "premium";
  seats: number;
};

const CARS: Car[] = [
  { name: "Proton Saga 1.3", daily: 130, package3: 370, units: 3, category: "economy", seats: 5 },
  { name: "Proton Persona 1.6", daily: 140, package3: 400, units: 1, category: "economy", seats: 5 },
  { name: "Perodua Bezza 1.3", daily: 140, package3: 400, units: 3, category: "economy", seats: 5 },
  { name: "Honda City 1.5", daily: 200, package3: 540, units: 2, category: "sedan", seats: 5 },
  { name: "Toyota Vios 1.5", daily: 200, package3: 540, units: 2, category: "sedan", seats: 5 },
  { name: "Perodua Alza", daily: 200, package3: 570, units: 3, category: "mpv", seats: 7 },
  { name: "Mitsubishi Xpander", daily: 220, package3: 600, units: 3, category: "mpv", seats: 7 },
  { name: "Proton X90", daily: 380, package3: 1100, units: 1, category: "suv", seats: 7 },
  { name: "Toyota Fortuner", daily: 480, package3: 1350, units: 1, category: "suv", seats: 7 },
  { name: "Hyundai Staria", daily: 550, package3: 1570, units: 3, category: "premium", seats: 11 },
  { name: "Hyundai Starex", daily: 550, package3: 1570, units: 2, category: "premium", seats: 11 },
  { name: "Toyota Vellfire", daily: 750, package3: 2200, units: 1, category: "premium", seats: 7 },
  { name: "Toyota Alphard", daily: 800, package3: 2300, units: 1, category: "premium", seats: 7 },
];

const formatRM = (v: number) =>
  `RM ${v.toLocaleString("en-MY", { minimumFractionDigits: 0 })}`;

const waUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const estimate = (car: Car | undefined, days: number) => {
  if (!car || days <= 0) return null;
  if (days >= 3) return car.package3 + Math.max(0, days - 3) * car.daily;
  return days * car.daily;
};

const categoryColors: Record<Car["category"], string> = {
  economy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  sedan: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  mpv: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  suv: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  premium: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function LandingPage() {
  const [selectedCar, setSelectedCar] = useState(CARS[0].name);
  const [days, setDays] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState<Car["category"] | "all">("all");

  const car = useMemo(() => CARS.find((c) => c.name === selectedCar), [selectedCar]);
  const price = useMemo(() => estimate(car, days), [car, days]);

  const filteredCars = filter === "all" ? CARS : CARS.filter((c) => c.category === filter);

  const buildMessage = () => {
    const lines = [
      "Hi! I'd like to book a car rental in Kota Kinabalu.",
      `Car: ${selectedCar}`,
      `Days: ${days}`,
      `Start: ${startDate || "-"}`,
      `End: ${endDate || "-"}`,
      `Pickup: ${pickup || "-"}`,
      `Drop-off: ${dropoff || "-"}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes}`);
    if (price) lines.push(`Estimated: ${formatRM(price)} (subject to confirmation)`);
    lines.push("Thank you!");
    return lines.join("\n");
  };

  const openWhatsApp = () => window.open(waUrl(buildMessage()), "_blank");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-lg">
              E
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-tight">Eean Enterprise</div>
              <div className="text-xs text-white/50">Car Rental Kota Kinabalu</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#fleet" className="hover:text-white transition">Fleet</a>
            <a href="#how" className="hover:text-white transition">How It Works</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <a
            href="#book"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-cyan-500/25"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Trusted Local Rental in Sabah
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Rent Your
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Perfect Ride
                </span>
              </h1>

              <p className="text-lg text-white/60 max-w-lg leading-relaxed">
                Explore Kota Kinabalu with ease. Choose from our fleet of well-maintained vehicles and book instantly via WhatsApp.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition shadow-xl shadow-cyan-500/30"
                >
                  Book via WhatsApp
                </a>
                <a
                  href="#fleet"
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition"
                >
                  View Fleet
                </a>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">13+</div>
                  <div className="text-sm text-white/50">Vehicles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-white/50">Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">RM130</div>
                  <div className="text-sm text-white/50">From/day</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
                <Image
                  src="/kinabalu-promo.jpg"
                  alt="Car rental promo"
                  width={600}
                  height={700}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🚗", label: "Economy Cars", value: "From RM130" },
              { icon: "🚙", label: "SUVs & MPVs", value: "From RM200" },
              { icon: "✨", label: "Premium Fleet", value: "From RM550" },
              { icon: "📱", label: "WhatsApp Booking", value: "Instant Reply" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-semibold text-white/90">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Fleet</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From budget-friendly economy cars to premium luxury vehicles. All well-maintained and ready for your journey.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(["all", "economy", "sedan", "mpv", "suv", "premium"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat === "all" ? "All Vehicles" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Car Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((c) => (
              <article
                key={c.name}
                className="group relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[c.category]}`}>
                      {c.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-3">{c.name}</h3>
                    <p className="text-sm text-white/50 mt-1">{c.seats} seats • {c.units} unit{c.units > 1 ? "s" : ""}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-xs text-white/50 mb-1">Daily</div>
                    <div className="text-xl font-bold text-cyan-400">{formatRM(c.daily)}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-xs text-white/50 mb-1">3+ Days</div>
                    <div className="text-xl font-bold text-white/90">{formatRM(c.package3)}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedCar(c.name);
                      setDays(3);
                      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition"
                  >
                    Select
                  </button>
                  <a
                    href={waUrl(`Hi! I want to book ${c.name}.\nDates: -\nPickup: -\nThank you!`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-center hover:opacity-90 transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Rate Sheet Link */}
          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Want the full rate sheet?</h3>
              <p className="text-sm text-white/50">View our complete pricing table</p>
            </div>
            <a
              href="/rate-sheet.jpg"
              target="_blank"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition"
            >
              Open Rate Sheet
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60">Book your car in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose Your Car", desc: "Browse our fleet and select the perfect vehicle for your needs." },
              { step: "02", title: "Send via WhatsApp", desc: "Fill in your details and we'll prepare a message for you to send." },
              { step: "03", title: "Get Confirmation", desc: "We'll reply quickly with availability and pickup details." },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-5xl font-black text-cyan-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-3 p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10">
              <h2 className="text-3xl font-bold mb-2">Book Your Ride</h2>
              <p className="text-white/60 mb-8">Fill in the details and we'll prepare your WhatsApp message</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-sm text-white/70 font-medium">Select Car</span>
                  <select
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500/50 transition"
                  >
                    {CARS.map((c) => (
                      <option key={c.name} value={c.name} className="bg-[#0a0a0f]">
                        {c.name} - {formatRM(c.daily)}/day
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-white/70 font-medium">Rental Days</span>
                  <input
                    type="number"
                    min={1}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value) || 1)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500/50 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-white/70 font-medium">Start Date</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500/50 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-white/70 font-medium">End Date</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-500/50 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-white/70 font-medium">Pickup Location</span>
                  <input
                    type="text"
                    placeholder="Airport, Hotel, City..."
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-white/70 font-medium">Drop-off Location</span>
                  <input
                    type="text"
                    placeholder="Same as pickup?"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm text-white/70 font-medium">Additional Notes</span>
                  <textarea
                    rows={3}
                    placeholder="Flight time, child seat, special requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition resize-none"
                  />
                </label>
              </div>

              {/* Price Estimate */}
              {price && (
                <div className="mt-6 p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/60">Estimated Total</div>
                      <div className="text-2xl font-bold text-cyan-400">{formatRM(price)}</div>
                    </div>
                    <div className="text-xs text-white/50 text-right">
                      {days} day{days > 1 ? "s" : ""}<br />
                      Subject to confirmation
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition shadow-lg shadow-cyan-500/25"
                >
                  Open WhatsApp
                </button>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(buildMessage());
                    alert("Message copied!");
                  }}
                  className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Contact Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold mb-4">Contact Us Directly</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+60178355503"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                  >
                    <span className="text-xl">📞</span>
                    <div>
                      <div className="text-sm text-white/50">Phone</div>
                      <div className="font-medium">+60 17-835 5503</div>
                    </div>
                  </a>
                  <a
                    href="mailto:eeanenterprise@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                  >
                    <span className="text-xl">✉️</span>
                    <div>
                      <div className="text-sm text-white/50">Email</div>
                      <div className="font-medium">eeanenterprise@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href={waUrl("Hi! I want to rent a car in Kota Kinabalu. Please share availability.")}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
                  >
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="text-sm text-emerald-400/70">WhatsApp</div>
                      <div className="font-medium text-emerald-400">Chat Now</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "Fast WhatsApp response",
                    "Transparent pricing",
                    "Well-maintained vehicles",
                    "Flexible pickup locations",
                    "Local Sabah expertise",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked</h2>
            <p className="text-white/60">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is availability guaranteed?", a: "Availability depends on dates and current bookings. WhatsApp us to confirm your preferred vehicle and dates." },
              { q: "How does the 3+ day package work?", a: "Book for 3 or more days to get our discounted package rate. Additional days beyond 3 are charged at the daily rate." },
              { q: "Where can I pick up the car?", a: "We offer flexible pickup at Kota Kinabalu Airport, hotels, or other locations in the city. Just let us know your preference." },
              { q: "What documents do I need?", a: "You'll need a valid driving license and identification. International visitors should have an International Driving Permit." },
              { q: "Is there a deposit required?", a: "Yes, a refundable deposit is required. The amount varies by vehicle type. We'll confirm the details when you book." },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 cursor-pointer"
              >
                <summary className="font-semibold flex items-center justify-between">
                  {faq.q}
                  <span className="text-white/30 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/60 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
            <h2 className="text-4xl font-bold mb-4">Ready to Hit the Road?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Book your car now and explore the beauty of Sabah. We're just a WhatsApp message away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#book"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition shadow-xl shadow-cyan-500/30"
              >
                Book Now
              </a>
              <a
                href={waUrl("Hi! I want to rent a car in Kota Kinabalu.")}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black">
                E
              </div>
              <div>
                <div className="font-semibold">Eean Enterprise</div>
                <div className="text-xs text-white/50">Car Rental Kota Kinabalu</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#fleet" className="hover:text-white transition">Fleet</a>
              <a href="#how" className="hover:text-white transition">How It Works</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <a href="#book" className="hover:text-white transition">Book</a>
            </div>

            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} Eean Enterprise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
