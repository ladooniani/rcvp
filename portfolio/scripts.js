document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year-select");
  const subfolderList = document.getElementById("subfolder-list");
  const subfolderItems = document.getElementById("subfolder-items");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("image-modal");
  const largeImage = document.getElementById("large-image");
  //const closeModal = document.getElementById("close-modal-bottom");
  const closeModal = document.getElementById("close-modal");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");
  const imageCounter = document.getElementById("image-counter");
  const shareBar = document.getElementById("share-bar");
  const copyShareLinkBtn = document.getElementById("copy-share-link");
  const copyFeedback = document.getElementById("copy-feedback");
  const copyImageLinkBtn = document.getElementById("copy-image-link");
  const copyImageFeedback = document.getElementById("copy-image-feedback");

  let currentImages = [];
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

        // Share-link: open exact image
        if (autoImg) {
          const idx = images.findIndex((f) => f === autoImg);
          if (idx >= 0) openModal(idx);
        }
        // Mobile: open first image immediately (no scroll needed)
        else if (
          window.matchMedia("(max-width: 640px)").matches &&
          images.length > 0
        ) {
          openModal(0);
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

    const filename = currentImages[currentIndex].split("/").pop();
    updateUrl({
      year: currentYearVal,
      cat: currentCat,
      img: filename,
    });

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

  // Gallery grid thumbnails → open modal
  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const index = parseInt(e.target.dataset.index, 10);
      openModal(isNaN(index) ? 0 : index);
    }
  });

  // Tap left half of screen → previous; right half → next
  // Tap left half of screen → previous; right half → next
  function handleSideTap(e) {
    if (currentImages.length <= 1) return;
    // Ignore side-tap while zoomed or right after a pinch
    if (zoomScale > 1.05 || didPinchThisGesture) return;
    const midX = window.innerWidth / 2;
    if (e.clientX < midX) {
      showImage(currentIndex - 1);
    } else {
      showImage(currentIndex + 1);
    }
  } /* function handleSideTap(e) {
    if (currentImages.length <= 1) return;
    const midX = window.innerWidth / 2;
    if (e.clientX < midX) {
      showImage(currentIndex - 1);
    } else {
      showImage(currentIndex + 1);
    }
  }*/

  largeImage.addEventListener("click", (e) => {
    e.stopPropagation();
    handleSideTap(e);
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

  // Tapping modal background / content also navigates by side of screen
  // (close via × button, Escape, or swipe still available)
  modal.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.classList.contains("modal-content") ||
      e.target === imageCounter ||
      e.target.closest("#image-copyright")
    ) {
      e.stopPropagation();
      handleSideTap(e);
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
  // ---------- Pinch-zoom + swipe (modal image only) ----------
  // Zoom stays on the image via CSS transform. Page chrome never scales.
  // On finger-up the image always snaps back to 1× so swipe can navigate again.
  // ---------- Pinch-zoom + pan + swipe (modal image only) ----------
  // Zoom/pan apply only to #large-image. Page chrome never scales.
  // Zoom stays until ALL fingers lift, then snaps back to 1× so swipe works again.
  // ---------- Pinch-zoom (to finger point) + pan + swipe ----------
  // Only #large-image scales/moves. Page chrome never zooms.
  // Zoom stays until ALL fingers lift, then snaps to 1× so swipe works again.
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50;
  const SWIPE_RATIO = 1.5;

  let zoomScale = 1;
  let panX = 0;
  let panY = 0;
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let isPinching = false;
  let isPanning = false;
  let didPinchThisGesture = false;
  let didPanThisGesture = false;
  let panStartX = 0;
  let panStartY = 0;
  let panOriginX = 0;
  let panOriginY = 0;
  // Last pinch midpoint (screen) — used to zoom toward fingers
  let lastPinchMidX = 0;
  let lastPinchMidY = 0;
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function getMidpoint(t1, t2) {
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    };
  }

  function applyTransform() {
    if (zoomScale <= 1.01) {
      zoomScale = 1;
      panX = 0;
      panY = 0;
      largeImage.style.transform = "";
      return;
    }
    largeImage.style.transform =
      "translate(" + panX + "px, " + panY + "px) scale(" + zoomScale + ")";
  }

  // Zoom toward a screen point (finger midpoint) instead of image center
  function zoomToPoint(newScale, midX, midY) {
    newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    if (newScale <= 1.01) {
      zoomScale = 1;
      panX = 0;
      panY = 0;
      applyTransform();
      return;
    }

    const rect = largeImage.getBoundingClientRect();
    // Current visual center of the image on screen
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Offset from focus point to center (screen px)
    const ox = midX - centerX;
    const oy = midY - centerY;
    const ratio = newScale / zoomScale;

    // Keep the point under the fingers fixed while scale changes
    panX = panX + ox - ox * ratio;
    panY = panY + oy - oy * ratio;
    // Also follow finger midpoint drift during the pinch
    panX += midX - lastPinchMidX;
    panY += midY - lastPinchMidY;

    zoomScale = newScale;
    lastPinchMidX = midX;
    lastPinchMidY = midY;
    applyTransform();
  }

  function resetZoom() {
    zoomScale = 1;
    panX = 0;
    panY = 0;
    largeImage.style.transform = "";
    isPinching = false;
    isPanning = false;
    pinchStartDist = 0;
  }

  function handleSwipe() {
    if (zoomScale > 1.05 || didPinchThisGesture || didPanThisGesture) return;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    if (dx > 0) {
      showImage(currentIndex - 1);
    } else {
      showImage(currentIndex + 1);
    }
  }

  modal.addEventListener(
    "touchstart",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      if (e.touches.length === 2) {
        isPinching = true;
        isPanning = false;
        didPinchThisGesture = true;
        pinchStartDist = getDistance(e.touches[0], e.touches[1]);
        pinchStartScale = zoomScale;
        const mid = getMidpoint(e.touches[0], e.touches[1]);
        lastPinchMidX = mid.x;
        lastPinchMidY = mid.y;
        e.preventDefault();
        return;
      }

      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartX = t.screenX;
        touchStartY = t.screenY;

        if (zoomScale > 1.05) {
          isPanning = true;
          didPanThisGesture = true;
          panStartX = t.clientX;
          panStartY = t.clientY;
          panOriginX = panX;
          panOriginY = panY;
          e.preventDefault();
        } else {
          isPanning = false;
          didPanThisGesture = false;
          didPinchThisGesture = false;
        }
      }
    },
    { passive: false },
  );

  modal.addEventListener(
    "touchmove",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      // Pinch — zoom toward finger midpoint
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        didPinchThisGesture = true;
        isPanning = false;
        if (pinchStartDist <= 0) {
          pinchStartDist = getDistance(e.touches[0], e.touches[1]);
          pinchStartScale = zoomScale;
          const mid0 = getMidpoint(e.touches[0], e.touches[1]);
          lastPinchMidX = mid0.x;
          lastPinchMidY = mid0.y;
        }
        const dist = getDistance(e.touches[0], e.touches[1]);
        const mid = getMidpoint(e.touches[0], e.touches[1]);
        if (pinchStartDist > 0) {
          zoomToPoint(pinchStartScale * (dist / pinchStartDist), mid.x, mid.y);
        }
        return;
      }

      // One-finger pan while zoomed
      if (e.touches.length === 1 && zoomScale > 1.05) {
        e.preventDefault();
        const t = e.touches[0];
        if (!isPanning) {
          isPanning = true;
          didPanThisGesture = true;
          panStartX = t.clientX;
          panStartY = t.clientY;
          panOriginX = panX;
          panOriginY = panY;
        }
        panX = panOriginX + (t.clientX - panStartX);
        panY = panOriginY + (t.clientY - panStartY);
        applyTransform();
      }
    },
    { passive: false },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      // 2 → 1 finger: keep zoom, hand off to pan
      if (e.touches.length === 1 && zoomScale > 1.05) {
        isPinching = false;
        pinchStartDist = 0;
        isPanning = true;
        didPanThisGesture = true;
        const t = e.touches[0];
        panStartX = t.clientX;
        panStartY = t.clientY;
        panOriginX = panX;
        panOriginY = panY;
        return;
      }

      // ALL fingers up → snap to 1×
      if (e.touches.length === 0) {
        const t = e.changedTouches[0];
        if (t) {
          touchEndX = t.screenX;
          touchEndY = t.screenY;
        }
        const canSwipe =
          !didPinchThisGesture && !didPanThisGesture && zoomScale <= 1.05;
        resetZoom();
        didPinchThisGesture = false;
        didPanThisGesture = false;
        if (canSwipe) handleSwipe();
      }
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchcancel",
    () => {
      resetZoom();
      didPinchThisGesture = false;
      didPanThisGesture = false;
    },
    { passive: true },
  );
  // ---------- Swipe down to close ----------
  let swipeDownStartY = 0;
  let isSwipeDown = false;

  modal.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1 && zoomScale <= 1.05) {
        swipeDownStartY = e.touches[0].clientY;
        isSwipeDown = true;
      } else {
        isSwipeDown = false;
      }
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      if (!isSwipeDown || e.changedTouches.length !== 1) return;

      const deltaY = e.changedTouches[0].clientY - swipeDownStartY;

      // Swipe down more than 100px → close
      if (deltaY > 100 && zoomScale <= 1.05) {
        closeModalFn();
      }

      isSwipeDown = false;
    },
    { passive: true },
  );

  const _origShowImage = showImage;
  showImage = function (index) {
    resetZoom();
    didPinchThisGesture = false;
    didPanThisGesture = false;
    _origShowImage(index);
  };

  const _origCloseModalFn = closeModalFn;
  closeModalFn = function () {
    resetZoom();
    didPinchThisGesture = false;
    didPanThisGesture = false;
    _origCloseModalFn();
  };
  /*let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50;
  const SWIPE_RATIO = 1.5;

  let zoomScale = 1;
  let panX = 0;
  let panY = 0;
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let isPinching = false;
  let isPanning = false;
  let didPinchThisGesture = false;
  let didPanThisGesture = false;
  let panStartX = 0;
  let panStartY = 0;
  let panOriginX = 0;
  let panOriginY = 0;
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function applyTransform() {
    if (zoomScale <= 1.01) {
      zoomScale = 1;
      panX = 0;
      panY = 0;
      largeImage.style.transform = "";
      return;
    }
    largeImage.style.transform =
      "translate(" + panX + "px, " + panY + "px) scale(" + zoomScale + ")";
  }

  function applyZoom(scale) {
    zoomScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
    applyTransform();
  }

  function resetZoom() {
    zoomScale = 1;
    panX = 0;
    panY = 0;
    largeImage.style.transform = "";
    isPinching = false;
    isPanning = false;
    pinchStartDist = 0;
  }

  function handleSwipe() {
    if (zoomScale > 1.05 || didPinchThisGesture || didPanThisGesture) return;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    if (dx > 0) {
      showImage(currentIndex - 1);
    } else {
      showImage(currentIndex + 1);
    }
  }

  modal.addEventListener(
    "touchstart",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      if (e.touches.length === 2) {
        isPinching = true;
        isPanning = false;
        didPinchThisGesture = true;
        pinchStartDist = getDistance(e.touches[0], e.touches[1]);
        pinchStartScale = zoomScale;
        e.preventDefault();
        return;
      }

      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartX = t.screenX;
        touchStartY = t.screenY;

        if (zoomScale > 1.05) {
          isPanning = true;
          didPanThisGesture = true;
          panStartX = t.clientX;
          panStartY = t.clientY;
          panOriginX = panX;
          panOriginY = panY;
          e.preventDefault();
        } else {
          isPanning = false;
          didPanThisGesture = false;
          didPinchThisGesture = false;
        }
      }
    },
    { passive: false },
  );

  modal.addEventListener(
    "touchmove",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        didPinchThisGesture = true;
        isPanning = false;
        if (pinchStartDist <= 0) {
          pinchStartDist = getDistance(e.touches[0], e.touches[1]);
          pinchStartScale = zoomScale;
        }
        const dist = getDistance(e.touches[0], e.touches[1]);
        if (pinchStartDist > 0) {
          applyZoom(pinchStartScale * (dist / pinchStartDist));
        }
        return;
      }

      if (e.touches.length === 1 && zoomScale > 1.05) {
        e.preventDefault();
        const t = e.touches[0];
        if (!isPanning) {
          isPanning = true;
          didPanThisGesture = true;
          panStartX = t.clientX;
          panStartY = t.clientY;
          panOriginX = panX;
          panOriginY = panY;
        }
        panX = panOriginX + (t.clientX - panStartX);
        panY = panOriginY + (t.clientY - panStartY);
        applyTransform();
      }
    },
    { passive: false },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      if (modal.classList.contains("hidden")) return;

      // 2 fingers → 1 finger: keep zoom, switch to pan
      if (e.touches.length === 1 && zoomScale > 1.05) {
        isPinching = false;
        pinchStartDist = 0;
        isPanning = true;
        didPanThisGesture = true;
        const t = e.touches[0];
        panStartX = t.clientX;
        panStartY = t.clientY;
        panOriginX = panX;
        panOriginY = panY;
        return;
      }

      // ALL fingers up → snap to 1×
      if (e.touches.length === 0) {
        const t = e.changedTouches[0];
        if (t) {
          touchEndX = t.screenX;
          touchEndY = t.screenY;
        }
        const canSwipe =
          !didPinchThisGesture && !didPanThisGesture && zoomScale <= 1.05;
        resetZoom();
        didPinchThisGesture = false;
        didPanThisGesture = false;
        if (canSwipe) handleSwipe();
      }
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchcancel",
    () => {
      resetZoom();
      didPinchThisGesture = false;
      didPanThisGesture = false;
    },
    { passive: true },
  );

  const _origShowImage = showImage;
  showImage = function (index) {
    resetZoom();
    didPinchThisGesture = false;
    didPanThisGesture = false;
    _origShowImage(index);
  };

  const _origCloseModalFn = closeModalFn;
  closeModalFn = function () {
    resetZoom();
    didPinchThisGesture = false;
    didPanThisGesture = false;
    _origCloseModalFn();
  };
  */
  // Copy share link
  copyShareLinkBtn.addEventListener("click", () => {
    const url = buildShareUrl({
      year: currentYearVal,
      cat: currentCat || undefined,
    });
    copyToClipboard(url, copyFeedback);
  });

  // Copy image link
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

  // ---------- Frame / Wide view toggle ----------
  const toggleFrameBtn = document.getElementById("toggle-frame-view");
  const FRAME_KEY = "lado-archive-frame-view";

  function isFrameView() {
    return localStorage.getItem(FRAME_KEY) === "1";
  }

  function applyFrameView(on) {
    if (on) {
      largeImage.classList.add("frame-view");
      if (toggleFrameBtn) toggleFrameBtn.textContent = "Wide view";
    } else {
      largeImage.classList.remove("frame-view");
      if (toggleFrameBtn) toggleFrameBtn.textContent = "Frame view";
    }
  }

  // Apply saved preference on load
  applyFrameView(isFrameView());

  if (toggleFrameBtn) {
    toggleFrameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const next = !isFrameView();
      localStorage.setItem(FRAME_KEY, next ? "1" : "0");
      applyFrameView(next);
    });
  }

  // Also re-apply when a new image is shown (in case the class was lost)
  const _origShowImage2 = showImage;
  showImage = function (index) {
    _origShowImage2(index);
    applyFrameView(isFrameView());
  };
  // ---------- Year list ----------
  yearSelect.innerHTML = "";

  fetch("archive/years.json")
    .then((r) => r.json())
    .then((yearsMeta) => {
      yearsMeta
        .slice()
        .sort((a, b) => b.year - a.year)
        .forEach(({ year, hasContent, categories = 0, images = 0 }) => {
          const option = document.createElement("option");
          option.value = year;

          option.textContent = `${year} - ${categories} ${
            categories === 1 ? "category" : "categories"
          }, ${images} ${images === 1 ? "image" : "images"}`;

          option.style.color = hasContent ? "#000000" : "#2563eb";
          yearSelect.appendChild(option);
        });

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
      // Fallback if years.json fails to load
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
  /*  yearSelect.innerHTML = "";

  fetch("archive/years.json")
    .then((r) => r.json())
    .then((yearsMeta) => {
      yearsMeta
        .slice()
        .sort((a, b) => b.year - a.year)
        .forEach(({ year, hasContent, categories = 0, images = 0 }) => {
          const option = document.createElement("option");
          option.value = year;

          // Format: 2026 - 3 categories, 34 images
          option.textContent = `${year} - ${categories} ${
            categories === 1 ? "category" : "categories"
          }, ${images} ${images === 1 ? "image" : "images"}`;

          option.style.color = hasContent ? "#000000" : "#2563eb";
          yearSelect.appendChild(option);
        });*/
  /* yearsMeta
        .slice()
        .sort((a, b) => b.year - a.year)
        .forEach(({ year, hasContent }) => {
          const option = document.createElement("option");
          option.value = year;
          option.textContent = year;
          option.style.color = hasContent ? "#000000" : "#2563eb";
          yearSelect.appendChild(option);
        });*/

  /*  const params = getParams();
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
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `${year} - ${categories ?? 0} ${
          (categories ?? 0) === 1 ? "category" : "categories"
        }, ${images ?? 0} ${(images ?? 0) === 1 ? "image" : "images"}`;
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
    });*/
});
