document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year-select");
  const subfolderList = document.getElementById("subfolder-list");
  const subfolderItems = document.getElementById("subfolder-items");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("image-modal");
  const largeImage = document.getElementById("large-image");
  const closeModal = document.getElementById("close-modal");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");
  const imageCounter = document.getElementById("image-counter");
  const shareBar = document.getElementById("share-bar");
  const copyShareLinkBtn = document.getElementById("copy-share-link");
  const copyFeedback = document.getElementById("copy-feedback");
  const copyImageLinkBtn = document.getElementById("copy-image-link");
  const copyImageFeedback = document.getElementById("copy-image-feedback");

  let currentImages = []; // full paths
  let currentIndex = 0;
  let currentYearVal = null;
  let currentCat = null;

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1985 + 1 },
    (_, i) => 1985 + i,
  ).reverse();

  // ---------- URL helpers ----------
  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function buildShareUrl({ year, cat, img } = {}) {
    const url = new URL(window.location.href);
    url.search = "";
    if (year) url.searchParams.set("year", year);
    if (cat) url.searchParams.set("cat", cat);
    if (img) url.searchParams.set("img", img);
    return url.toString();
  }

  function updateUrl({ year, cat, img } = {}) {
    const newUrl = buildShareUrl({ year, cat, img });
    history.replaceState(null, "", newUrl);
  }

  async function copyToClipboard(text, feedbackEl) {
    try {
      await navigator.clipboard.writeText(text);
      if (feedbackEl) {
        feedbackEl.classList.remove("hidden");
        setTimeout(() => feedbackEl.classList.add("hidden"), 1500);
      }
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (feedbackEl) {
        feedbackEl.classList.remove("hidden");
        setTimeout(() => feedbackEl.classList.add("hidden"), 1500);
      }
    }
  }

  // ---------- Image protection ----------
  function protectImage(img) {
    if (!img) return;
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", (e) => e.preventDefault());
    img.addEventListener("dragstart", (e) => e.preventDefault());
  }

  function protectAllImages() {
    document
      .querySelectorAll("#gallery img, #subfolder-items img, #large-image")
      .forEach(protectImage);
  }

  modal.addEventListener("contextmenu", (e) => e.preventDefault());
  gallery.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  subfolderItems.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });

  // ---------- Loaders ----------
  function loadSubfolders(year, autoCat, autoImg) {
    currentYearVal = year;
    currentCat = null;
    subfolderList.classList.add("hidden");
    subfolderItems.innerHTML = "";
    gallery.innerHTML = "";
    currentImages = [];
    currentIndex = 0;
    shareBar.classList.remove("hidden");

    yearSelect.value = String(year);
    updateUrl({ year });

    fetch(`archive/${year}/subfolders.json`)
      .then((response) => response.json())
      .then((subfolders) => {
        if (subfolders.length === 0) {
          gallery.innerHTML =
            '<p class="text-center">No categories found for this year.</p>';
          return;
        }
        subfolderList.classList.remove("hidden");
        subfolders.forEach((subfolder) => {
          const div = document.createElement("div");
          div.className = "relative";
          const thumbnail = subfolder.thumbnail
            ? `archive/${year}/${subfolder.name}/${subfolder.thumbnail}`
            : "assets/placeholder.jpg";
          div.innerHTML = `
            <a href="#" data-year="${year}" data-subfolder="${subfolder.name}" class="block">
              <img src="${thumbnail}" alt="${subfolder.name}" class="w-full max-w-[60px] h-auto mx-auto border border-gray-200 cursor-pointer" draggable="false">
              <p class="text-[9px] font-serif mt-0 text-center">${subfolder.name}</p>
            </a>`;
          subfolderItems.appendChild(div);
        });
        protectAllImages();

        // Auto-open category from URL
        if (autoCat) {
          const link = subfolderItems.querySelector(
            `a[data-subfolder="${CSS.escape(autoCat)}"]`,
          );
          if (link) {
            link.classList.add("bg-gray-200");
            loadGallery(year, autoCat, autoImg);
          }
        }
      })
      .catch(() => {
        gallery.innerHTML =
          '<p class="text-center">No categories found for this year.</p>';
      });
  }

  function loadGallery(year, subfolder, autoImg) {
    currentYearVal = year;
    currentCat = subfolder;
    gallery.innerHTML = "";
    currentImages = [];
    currentIndex = 0;
    updateUrl({ year, cat: subfolder });

    fetch(`archive/${year}/${subfolder}/images.json`)
      .then((response) => response.json())
      .then((images) => {
        currentImages = images.map(
          (img) => `archive/${year}/${subfolder}/${img}`,
        );
        images.forEach((img, index) => {
          const div = document.createElement("div");
          div.className = "relative";
          const src = `archive/${year}/${subfolder}/${img}`;
          div.innerHTML = `<img src="${src}" alt="Artwork from ${year} - ${subfolder}" class="w-full h-auto rounded-lg shadow-lg cursor-pointer" data-src="${src}" data-index="${index}" data-filename="${img}" draggable="false">`;
          gallery.appendChild(div);
        });
        protectAllImages();

        // Auto-open specific image from URL
        if (autoImg) {
          const idx = images.findIndex((f) => f === autoImg);
          if (idx >= 0) openModal(idx);
        }
      })
      .catch(() => {
        gallery.innerHTML =
          '<p class="text-center">No artworks found for this category.</p>';
      });
  }

  function showImage(index) {
    if (currentImages.length === 0) return;
    currentIndex =
      ((index % currentImages.length) + currentImages.length) %
      currentImages.length;
    largeImage.src = currentImages[currentIndex];
    largeImage.setAttribute("draggable", "false");
    imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    const showNav = currentImages.length > 1;
    prevBtn.style.display = showNav ? "" : "none";
    nextBtn.style.display = showNav ? "" : "none";

    // Update URL with image filename
    const filename = currentImages[currentIndex].split("/").pop();
    updateUrl({
      year: currentYearVal,
      cat: currentCat,
      img: filename,
    });

    // Copyright: © (works-year)–(current-year) Lado Oniani
    const copyrightYearsEl = document.getElementById("copyright-years");
    if (copyrightYearsEl && currentYearVal) {
      const worksYear = currentYearVal;
      const nowYear = new Date().getFullYear();
      copyrightYearsEl.textContent =
        worksYear === nowYear ? String(worksYear) : `${worksYear}–${nowYear}`;
    }
  }

  function openModal(index) {
    showImage(index);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModalFn() {
    modal.classList.add("hidden");
    largeImage.src = "";
    imageCounter.textContent = "";
    document.body.style.overflow = "";
    // Keep year + category in URL, drop image
    updateUrl({ year: currentYearVal, cat: currentCat });
  }

  // ---------- Events ----------
  yearSelect.addEventListener("change", (e) => {
    loadSubfolders(e.target.value);
  });

  subfolderItems.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) {
      e.preventDefault();
      const year = link.dataset.year;
      const subfolder = link.dataset.subfolder;
      loadGallery(year, subfolder);
      subfolderItems
        .querySelectorAll("a")
        .forEach((a) => a.classList.remove("bg-gray-200"));
      link.classList.add("bg-gray-200");
    }
  });

  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const index = parseInt(e.target.dataset.index, 10);
      openModal(isNaN(index) ? 0 : index);
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  closeModal.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModalFn();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-content")) {
      closeModalFn();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      closeModalFn();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      showImage(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showImage(currentIndex + 1);
    }
  });

  // ---------- Touch swipe (mobile) ----------
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50; // min px for a swipe
  const SWIPE_RATIO = 1.5; // horizontal must dominate vertical

  function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return; // mostly vertical → ignore
    if (dx > 0) {
      showImage(currentIndex - 1); // swipe right → previous
    } else {
      showImage(currentIndex + 1); // swipe left → next
    }
  }

  modal.addEventListener(
    "touchstart",
    (e) => {
      if (modal.classList.contains("hidden")) return;
      const t = e.changedTouches[0];
      touchStartX = t.screenX;
      touchStartY = t.screenY;
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      if (modal.classList.contains("hidden")) return;
      const t = e.changedTouches[0];
      touchEndX = t.screenX;
      touchEndY = t.screenY;
      handleSwipe();
    },
    { passive: true },
  );
  // ---------- Tap left / right half of modal (mobile) ----------
  modal.addEventListener("click", (e) => {
    // Only on touch devices / small screens; ignore desktop (arrows handle it)
    if (window.innerWidth > 640) return;
    // Don't trigger when tapping buttons or links inside the modal
    if (
      e.target.closest("#close-modal") ||
      e.target.closest("#copy-image-link") ||
      e.target.closest("#copyright-link") ||
      e.target.closest("#prev-image") ||
      e.target.closest("#next-image")
    ) {
      return;
    }

    const rect = modal.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (x < half) {
      showImage(currentIndex - 1); // tap left → previous
    } else {
      showImage(currentIndex + 1); // tap right → next
    }
  });
  // Copy share link (year / category)
  copyShareLinkBtn.addEventListener("click", () => {
    const url = buildShareUrl({
      year: currentYearVal,
      cat: currentCat || undefined,
    });
    copyToClipboard(url, copyFeedback);
  });

  // Copy image link (from modal)
  copyImageLinkBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const filename = currentImages[currentIndex]
      ? currentImages[currentIndex].split("/").pop()
      : undefined;
    const url = buildShareUrl({
      year: currentYearVal,
      cat: currentCat,
      img: filename,
    });
    copyToClipboard(url, copyImageFeedback);
  });

  protectImage(largeImage);

  // ---------- Year list with empty / has-content colouring ----------
  yearSelect.innerHTML = "";

  fetch("archive/years.json")
    .then((r) => r.json())
    .then((yearsMeta) => {
      // Sort descending (newest first)
      yearsMeta
        .slice()
        .sort((a, b) => b.year - a.year)
        .forEach(({ year, hasContent }) => {
          const option = document.createElement("option");
          option.value = year;
          option.textContent = year;
          // Blue for empty years, black for years that contain works
          option.style.color = hasContent ? "#000000" : "#2563eb";
          yearSelect.appendChild(option);
        });

      // Initial load from URL
      const params = getParams();
      const urlYear = params.get("year");
      const urlCat = params.get("cat");
      const urlImg = params.get("img");

      const startYear =
        urlYear && yearsMeta.some((y) => y.year === Number(urlYear))
          ? Number(urlYear)
          : currentYear;

      loadSubfolders(startYear, urlCat, urlImg);
    })
    .catch(() => {
      // Fallback if years.json is missing – original behaviour
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });

      const params = getParams();
      const urlYear = params.get("year");
      const urlCat = params.get("cat");
      const urlImg = params.get("img");

      const startYear =
        urlYear && years.includes(Number(urlYear))
          ? Number(urlYear)
          : currentYear;

      loadSubfolders(startYear, urlCat, urlImg);
    });
};);
