(() => {
  const WHATSAPP_NUMBER_E164_NO_PLUS = "60178355503";

  const rateData = [
    { name: "Proton Saga 1.3", daily: 130, package3: 370, units: 3 },
    { name: "Proton Persona 1.6", daily: 140, package3: 400, units: 1 },
    { name: "Perodua Bezza 1.3", daily: 140, package3: 400, units: 3 },
    { name: "Honda City 1.5", daily: 200, package3: 540, units: 2 },
    { name: "Toyota Vios 1.5", daily: 200, package3: 540, units: 2 },
    { name: "Perodua Alza", daily: 200, package3: 570, units: 3 },
    { name: "Mitsubishi Xpander", daily: 220, package3: 600, units: 3 },
    { name: "Proton X90", daily: 380, package3: 1100, units: 1 },
    { name: "Toyota Fortuner", daily: 480, package3: 1350, units: 1 },
    { name: "Hyundai Staria", daily: 550, package3: 1570, units: 3 },
    { name: "Hyundai Starex", daily: 550, package3: 1570, units: 2 },
    { name: "Toyota Vellfire", daily: 750, package3: 2200, units: 1 },
    { name: "Toyota Alphard", daily: 800, package3: 2300, units: 1 },
  ];

  const formatRM = (value) => `RM ${Number(value).toFixed(2)}`;

  const buildWhatsAppUrl = (message) => {
    const base = `https://wa.me/${WHATSAPP_NUMBER_E164_NO_PLUS}`;
    const text = encodeURIComponent(message);
    return `${base}?text=${text}`;
  };

  const safeVal = (v) => (v && String(v).trim() ? String(v).trim() : "-");

  const estimatePrice = (car, days) => {
    if (!car || !Number.isFinite(days) || days <= 0) return null;

    if (days >= 3) {
      // If days > 3, keep it simple: use package3 + extra days at daily.
      const extraDays = Math.max(0, days - 3);
      return car.package3 + extraDays * car.daily;
    }

    return days * car.daily;
  };

  const initHeaderMenu = () => {
    const menuBtn = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    if (!menuBtn || !mobileNav) return;

    const close = () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    };

    const open = () => {
      menuBtn.setAttribute("aria-expanded", "true");
      mobileNav.hidden = false;
    };

    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      if (expanded) close();
      else open();
    });

    mobileNav.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  const initRates = () => {
    const grid = document.getElementById("ratesGrid");
    if (!grid) return;

    grid.innerHTML = rateData
      .map((car) => {
        const unitsLabel = car.units === 1 ? "1 unit" : `${car.units} units`;

        const bookPayload = {
          car: car.name,
          days: 3,
        };

        return `
          <article class="card">
            <div class="card-top">
              <div>
                <h3>${car.name}</h3>
                <div class="muted" style="margin-top:6px;font-size:13px">Available: ${unitsLabel}</div>
              </div>
              <span class="pill">From ${formatRM(car.daily)}/day</span>
            </div>

            <div class="prices">
              <div class="price">
                <span class="label">Daily rate</span>
                <span class="value">${formatRM(car.daily)}</span>
              </div>
              <div class="price">
                <span class="label">3+ days package</span>
                <span class="value">${formatRM(car.package3)}</span>
              </div>
            </div>

            <div class="card-actions">
              <a class="btn btn-ghost" href="#book" data-prefill='${JSON.stringify(bookPayload)}'>Book this car</a>
              <a class="btn btn-primary" href="${buildWhatsAppUrl(
                `Hi! I want to book ${car.name}.\nDates: -\nPickup: -\nDrop-off: -\nThank you!`
              )}" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </article>
        `;
      })
      .join("");

    grid.addEventListener("click", (e) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      const link = el.closest("[data-prefill]");
      if (!(link instanceof HTMLElement)) return;

      try {
        const payload = JSON.parse(link.getAttribute("data-prefill") || "{}") || {};
        const carSelect = document.getElementById("carSelect");
        const daysInput = document.getElementById("daysInput");
        if (carSelect && payload.car) carSelect.value = payload.car;
        if (daysInput && payload.days) daysInput.value = String(payload.days);

        setTimeout(() => {
          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
        }, 0);

        updateEstimate();
      } catch {
        // no-op
      }
    });
  };

  const initBooking = () => {
    const form = document.getElementById("bookingForm");
    const carSelect = document.getElementById("carSelect");
    const waDirectBtn = document.getElementById("waDirectBtn");
    const copyBtn = document.getElementById("copyMessageBtn");

    if (!(carSelect instanceof HTMLSelectElement)) return;

    // populate select
    carSelect.innerHTML = rateData
      .map((c) => `<option value="${c.name}">${c.name}</option>`)
      .join("");

    if (waDirectBtn instanceof HTMLAnchorElement) {
      waDirectBtn.href = buildWhatsAppUrl("Hi! I want to rent a car in Kota Kinabalu. Please share availability & rates.");
    }

    const inputs = [
      "daysInput",
      "startDate",
      "endDate",
      "pickupInput",
      "dropoffInput",
      "notesInput",
      "carSelect",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    inputs.forEach((input) => {
      input.addEventListener("input", updateEstimate);
      input.addEventListener("change", updateEstimate);
    });

    const buildMessageFromForm = () => {
      const selectedCar = rateData.find((c) => c.name === carSelect.value);
      const days = Number(document.getElementById("daysInput")?.value || 0);
      const start = safeVal(document.getElementById("startDate")?.value);
      const end = safeVal(document.getElementById("endDate")?.value);
      const pickup = safeVal(document.getElementById("pickupInput")?.value);
      const dropoff = safeVal(document.getElementById("dropoffInput")?.value);
      const notes = safeVal(document.getElementById("notesInput")?.value);

      const estimate = estimatePrice(selectedCar, days);
      const estimateLine = estimate != null ? `Estimated rate: ${formatRM(estimate)} (subject to confirmation)` : "";

      return [
        `Hi! I want to book a car rental in Kota Kinabalu.`,
        `Car: ${safeVal(carSelect.value)}`,
        `Days: ${Number.isFinite(days) && days > 0 ? days : "-"}`,
        `Start date: ${start}`,
        `End date: ${end}`,
        `Pickup: ${pickup}`,
        `Drop-off: ${dropoff}`,
        notes !== "-" ? `Notes: ${notes}` : null,
        estimateLine ? `${estimateLine}` : null,
        `Thank you!`,
      ]
        .filter(Boolean)
        .join("\n");
    };

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = buildMessageFromForm();
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    });

    copyBtn?.addEventListener("click", async () => {
      const message = buildMessageFromForm();
      try {
        await navigator.clipboard.writeText(message);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy message"), 1200);
      } catch {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = message;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy message"), 1200);
      }
    });

    updateEstimate();
  };

  const updateEstimate = () => {
    const carName = document.getElementById("carSelect")?.value;
    const days = Number(document.getElementById("daysInput")?.value || 0);
    const estimateLine = document.getElementById("estimateLine");

    const car = rateData.find((c) => c.name === carName);
    const estimate = estimatePrice(car, days);

    if (!estimateLine) return;

    if (estimate == null) {
      estimateLine.textContent = "";
      return;
    }

    estimateLine.textContent = `Estimated rate: ${formatRM(estimate)} (subject to confirmation)`;
  };

  const initYear = () => {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  };

  initHeaderMenu();
  initRates();
  initBooking();
  initYear();
})();
