(function ($) {
  "use strict";

  $(document).ready(function () {
    initNavToggle();
    initHeaderScroll();
    initHeroSound();
    initAOS();
    initLifestyleSlider();
    initGallery();
    initLandmarks();
    initUnitConfig();
    initHotspots();
    initWalkthrough();
    initContactForm();
    initLocationCategories();
    initSiteVisitModal();
    initDisclaimerModal();
  });

  // -------------------------------------------------------------
  // Mobile navigation
  // -------------------------------------------------------------
  function initNavToggle() {
    var $toggle = $("#navToggle");
    var $mobile = $("#navMobile");

    $toggle.on("click", function () {
      var open = $mobile.toggleClass("is-open").hasClass("is-open");
      $toggle.attr("aria-expanded", open);
    });

    $mobile.on("click", "a", function () {
      $mobile.removeClass("is-open");
      $toggle.attr("aria-expanded", false);
    });
  }

  // -------------------------------------------------------------
  // Header: transparent over the hero video, solid once scrolled past it
  // -------------------------------------------------------------
  function initHeaderScroll() {
    var $header = $("#site-header");
    if (!$header.length) return;

    function update() {
      var threshold = window.innerHeight * 0.1;
      $header.toggleClass("is-scrolled", $(window).scrollTop() > threshold);
    }

    update();
    $(window).on("scroll resize", update);
  }

  // -------------------------------------------------------------
  // Hero video sound toggle
  // -------------------------------------------------------------
  function initHeroSound() {
    var video = document.getElementById("heroVideo");
    var $btn = $("#heroSoundToggle");
    if (!video || !$btn.length) return;

    function sync() {
      $btn
        .toggleClass("is-muted", video.muted)
        .attr("aria-label", video.muted ? "Unmute video" : "Mute video");
    }

    // browsers block unmuted autoplay without a prior user gesture — try
    // playing with sound first, and only fall back to muted if that's rejected
    var playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function () {
        video.muted = true;
        video.play();
        sync();
      });
    }
    sync();

    $btn.on("click", function () {
      video.muted = !video.muted;
      if (!video.muted) video.play();
      sync();
    });
  }

  // -------------------------------------------------------------
  // AOS
  // -------------------------------------------------------------
  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
      });
    }
  }

  // -------------------------------------------------------------
  // Lifestyle image slider (Overview section)
  // -------------------------------------------------------------
  function initLifestyleSlider() {
    $("#lifestyleSlider").owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      smartSpeed: 600,
    });
  }

  // -------------------------------------------------------------
  // Gallery: tabbed Owl Carousels
  // -------------------------------------------------------------
  function initGallery() {
    var owlOpts = {
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      navText: ["&#10094;", "&#10095;"],
      smartSpeed: 500,
    };

    // Owl Carousel can't measure width while its container is display:none,
    // so each panel is only initialized the moment it becomes active.
    function ensureInit($el) {
      if ($el.hasClass("owl-loaded")) return;
      $el.owlCarousel(owlOpts);
    }

    ensureInit($('.gallery__carousel[data-gallery="pavilion"]'));

    $(".gallery__tab").on("click", function () {
      var key = $(this).data("gallery-tab");

      $(".gallery__tab").removeClass("is-active");
      $(this).addClass("is-active");

      $(".gallery__carousel").removeClass("is-active");
      var $target = $('.gallery__carousel[data-gallery="' + key + '"]').addClass("is-active");
      ensureInit($target);
      $target.trigger("refresh.owl.carousel");
    });
  }

  // -------------------------------------------------------------
  // Our Landmarks: tabbed Owl Carousels
  // -------------------------------------------------------------
  function initLandmarks() {
    var owlOpts = {
      loop: false,
      nav: true,
      dots: false,
      navText: ["&#10094;", "&#10095;"],
      margin: 24,
      smartSpeed: 500,
      autoWidth: true,
      // Card width is fixed via CSS (.landmark-card), not computed from an
      // `items` count — that's what lets the next card peek, clipped, past
      // the right edge instead of everything shrinking to fit.
    };

    // Same display:none measurement issue as the gallery — lazy-init per tab.
    function ensureInit($el) {
      if ($el.hasClass("owl-loaded")) return;
      $el.owlCarousel(owlOpts);
    }

    ensureInit($('.landmarks__carousel[data-landmark-panel="industrial"]'));

    $(".landmarks__tab").on("click", function () {
      var key = $(this).data("landmark");

      $(".landmarks__tab").removeClass("is-active");
      $(this).addClass("is-active");

      $(".landmarks__carousel").removeClass("is-active");
      var $target = $('.landmarks__carousel[data-landmark-panel="' + key + '"]').addClass("is-active");
      ensureInit($target);
      $target.trigger("refresh.owl.carousel");
    });
  }

  // -------------------------------------------------------------
  // Unit Configuration tabs
  // -------------------------------------------------------------
  // Each unit is either a single dimensions table (`rows`) — the plan
  // image sits beside the card — or a `tables` array of two (a duplex's
  // lower/upper levels, or a simplex's dimensions list split across two
  // cards because it's too long for one) — the plan image spans full
  // width above the cards instead. A table with no `title` renders as a
  // bare continuation card (no "Dimensions" label/heading).
  var UNIT_DATA = {
    "2bhk-1": {
      title: "2 BHK Type 01",
      img: "assets/images/floor-plans/2bhk-type-b.webp",
      rows: [
        ["Entrance Lobby", "5′1″ x 4′7″"],
        ["Living/Dining", "18′0″ x 12′6″"],
        ["Balcony", "16′5″ x 3′11″"],
        ["Kitchen", "9′4″ x 8′0″"],
        ["Utility", "3′11″ x 8′0″"],
        ["Common Toilet", "9′0″ x 4′11″"],
        ["Kids Bedroom", "10′0″ x 12′0″"],
        ["Master Bedroom", "10′6″ x 13′9″"],
        ["Master Toilet", "5′3″ x 8′0″"],
        ["Walk In Wardrobe", "5′11″ x 8′0″"],
      ],
    },
    "2bhk-2": {
      title: "2 BHK Type 02",
      img: "assets/images/floor-plans/2-bhk-type-02.png",
      rows: [
        ["Entrance Lobby", "4′11″ x 5′1″"],
        ["Living/Dining", "18′1″ x 12′0″"],
        ["Balcony", "18′1″ x 3′11″"],
        ["Kitchen", "8′10″ x 8′6″"],
        ["Utility", "3′11″ x 8′6″"],
        ["Master Bedroom 01", "10′6″ x 12′0″"],
        ["Master Toilet 01", "4′11″ x 8′6″"],
        ["Walk In Wardrobe 01", "5′10″ x 8′6″"],
        ["Master Bedroom 02", "10′6″ x 12′0″"],
        ["Master Toilet 02", "4′11″ x 8′6″"],
        ["Walk In Wardrobe 02", "5′11″ x 8′6″"],
      ],
    },
    "3bhk": {
      title: "3 BHK",
      img: "assets/images/floor-plans/3-bhk.png",
      rows: [
        ["Entrance Lobby", "5′1″ x 9′4″"],
        ["Living/Dining", "21′0″ x 13′9″"],
        ["Balcony", "20′6″ x 4′11″"],
        ["Kitchen", "12′8″ x 9′0″"],
        ["Utility", "4′1″ x 9′0″"],
        ["Powder Room", "4′11″ x 4′11″"],
        ["Kids Bedroom", "10′6″ x 12′8″"],
        ["Kids Toilet", "7′3″ x 3′11″ + 3′3″ x 2′9″"],
        ["Master Bedroom 01", "11′0″ x 14′9″"],
        ["Master Toilet 01", "4′9″ x 9′0″"],
        ["Walk In Wardrobe 01", "5′11″ x 9′0″"],
        ["Master Bedroom 02", "11′0″ x 14′9″"],
        ["Master Toilet 02", "4′9″ x 9′0″"],
        ["Walk In Wardrobe 02", "5′11″ x 9′0″"],
      ],
    },
    "3-5duplex": {
      title: "3.5 Duplex",
      img: "assets/images/floor-plans/3.5-duplex.png",
      tables: [
        {
          title: "3.5 Duplex Lower Level",
          rows: [
            ["Entrance Lobby", "4′11″ x 8′6″"],
            ["Living/Dining", "18′1″ x 12′0″"],
            ["Balcony", "18′1″ x 3′11″"],
            ["Powder Room", "3′11″ x 5′7″"],
            ["Kitchen", "10′6″ x 12′0″"],
            ["Utility", "11′2″ x 3′5″"],
            ["Staff Room", "5′11″ x 8′4″"],
            ["Staff Toilet", "4′11″ x 5′1″"],
            ["Master Bedroom 03", "10′6″ x 12′0″"],
            ["Master Toilet 03", "4′11″ x 8′6″"],
            ["Walk In Wardrobe 03", "5′10″ x 8′6″"],
          ],
        },
        {
          title: "3.5 Duplex Upper Level",
          rows: [
            ["Family Area", "18′1″ x 11′10″"],
            ["Master Bedroom 02", "10′6″ x 12′0″"],
            ["Master Toilet 02", "4′11″ x 8′6″"],
            ["Walk In Wardrobe 02", "5′10″ x 8′6″"],
            ["Master Bedroom 01", "10′6″ x 12′0″"],
            ["Master Toilet 01", "4′11″ x 8′6″"],
            ["Walk In Wardrobe 01", "5′11″ x 11′10″"],
          ],
        },
      ],
    },
    "3-5simplex": {
      title: "3.5 Simplex",
      img: "assets/images/floor-plans/3.5-simple.png",
      tables: [
        {
          title: "3.5 Simplex",
          rows: [
            ["Entrance Lobby", "7′10″ x 8′0″"],
            ["Living/Dining", "36′3″ x 12′6″"],
            ["Balcony 01", "16′5″ x 3′11″"],
            ["Balcony 02", "16′5″ x 3′11″"],
            ["Kitchen", "12′0″ x 8′0″"],
            ["Utility", "3′11″ x 8′0″"],
            ["Common Toilet", "9′0″ x 4′11″"],
            ["Bedroom", "10′0″ x 12′0″"],
            ["Master Bedroom 02", "10′6″ x 13′9″"],
          ],
        },
        {
          title: null,
          rows: [
            ["Master Toilet 02", "5′3″ x 8′0″"],
            ["Walk In Wardrobe 02", "5′11″ x 8′0″"],
            ["Store Room", "6′9″ x 3′11″"],
            ["Staff Room", "6′3″ x 8′0″"],
            ["Staff Toilet", "6′9″ x 3′9″"],
            ["Master Bedroom 01", "20′10″ x 13′9″"],
            ["Master Toilet 01", "11′6″ x 8′0″"],
            ["Walk In Wardrobe 01", "9′0″ x 4′11″"],
          ],
        },
      ],
    },
  };

  function unitCardHtml(table) {
    var header = table.title
      ? '<p class="unit-config__card-label">Dimensions</p><h3>' +
        table.title +
        "</h3>"
      : "";
    var rowsHtml = table.rows
      .map(function (r) {
        return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>";
      })
      .join("");
    return (
      '<div class="unit-config__card">' +
      header +
      "<table><thead><tr><th>Heading</th><th>Carpet Area</th></tr></thead><tbody>" +
      rowsHtml +
      "</tbody></table></div>"
    );
  }

  function initUnitConfig() {
    var $tabs = $(".unit-config__tab");
    var $panel = $("#unitPanel");
    var $img = $("#unitPlanImg");
    var $cards = $("#unitCards");

    function render(key) {
      var data = UNIT_DATA[key];
      if (!data) return;

      $img.attr("src", data.img).attr("alt", data.title + " floor plan");

      var tables = data.tables || [{ title: data.title, rows: data.rows }];
      $cards.html(tables.map(unitCardHtml).join(""));
      $cards.toggleClass("unit-config__cards--row", tables.length > 1);
      $panel.toggleClass("unit-config__panel--stacked", tables.length > 1);
    }

    $tabs.on("click", function () {
      var key = $(this).data("unit");
      if (!UNIT_DATA[key]) return;

      $tabs.removeClass("is-active").attr("aria-selected", "false");
      $(this).addClass("is-active").attr("aria-selected", "true");

      render(key);
    });

    render($tabs.filter(".is-active").data("unit"));
  }

  // -------------------------------------------------------------
  // Amenity map hotspots
  // -------------------------------------------------------------
  function initHotspots() {
    var $popover = $("#hotspotPopover");
    var $img = $("#hotspotImg");
    var $title = $("#hotspotTitle");

    $(".hotspot").on("click", function (e) {
      e.stopPropagation();
      var $btn = $(this);
      var title = $btn.data("title");

      $(".hotspot").removeClass("is-active");
      $btn.addClass("is-active");

      $img.attr("src", $btn.data("img")).attr("alt", title);
      $title.text(title);

      positionPopover($btn);
      $popover.addClass("is-visible");
    });

    $("#hotspotClose").on("click", function (e) {
      e.stopPropagation();
      closePopover();
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest("#hotspotPopover, .hotspot").length) {
        closePopover();
      }
    });

    $(window).on("resize scroll", function () {
      if ($popover.hasClass("is-visible")) closePopover();
    });

    function closePopover() {
      $popover.removeClass("is-visible");
      $(".hotspot").removeClass("is-active");
    }

    // Figma shows the card pinned to the frame's bottom-right corner for
    // every hotspot, not floating next to whichever dot was clicked.
    function positionPopover($btn) {
      var $frame = $btn.closest(".amenity-map__frame");
      var frameRect = $frame.length
        ? $frame[0].getBoundingClientRect()
        : { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
      var margin = 24;
      var popW = $popover.outerWidth();
      var popH = $popover.outerHeight();

      var left = frameRect.right - margin - popW;
      var top = frameRect.bottom - margin - popH;

      left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));
      top = Math.max(12, Math.min(top, window.innerHeight - popH - 12));

      $popover.css({ left: left + "px", top: top + "px" });
    }
  }

  // -------------------------------------------------------------
  // Location: category pills reveal a curated place list
  // -------------------------------------------------------------
  function initLocationCategories() {
    var $cards = $(".location__card");

    function closeCard($card) {
      $card.find(".location__card-content").css("max-height", "0px");
      $card.removeClass("is-active");
      $card.find(".location__card-tab").attr("aria-expanded", "false");
    }

    function openCard($card) {
      var $content = $card.find(".location__card-content");
      $card.addClass("is-active");
      $card.find(".location__card-tab").attr("aria-expanded", "true");
      // scrollHeight reads the full content height even while it's clipped
      // by max-height:0/overflow:hidden, so this gives an exact animation
      // target regardless of how many places a category lists
      var target = $content[0].scrollHeight;
      requestAnimationFrame(function () {
        $content.css("max-height", target + "px");
      });
    }

    $(".location__card-tab").on("click", function () {
      var $card = $(this).closest(".location__card");
      var wasActive = $card.hasClass("is-active");

      $cards.filter(".is-active").each(function () {
        closeCard($(this));
      });

      if (!wasActive) openCard($card);
    });
  }

  // -------------------------------------------------------------
  // Walkthrough video
  // -------------------------------------------------------------
  function initWalkthrough() {
    var $frame = $("#walkthroughFrame");
    var video = document.getElementById("walkthroughVideo");

    $("#walkthroughPlay").on("click", function () {
      $frame.addClass("is-playing");
      if (video) video.play();
    });

    $("#walkthrough360").attr("title", "360° virtual tour — coming soon");
  }

  // -------------------------------------------------------------
  // Contact form (client-side only, no backend wired here)
  // -------------------------------------------------------------
  function initContactForm() {
    var $form = $("#interestForm");
    var $note = $("#formNote");

    $form.on("submit", function (e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }
      $note.text("Thank you! Our team will get back to you shortly.");
      $form[0].reset();
    });
  }

  // -------------------------------------------------------------
  // "Request Site Visit" popup form
  // -------------------------------------------------------------
  function initSiteVisitModal() {
    var $modal = $("#siteVisitModal");
    var $form = $("#siteVisitForm");
    var $note = $("#siteVisitNote");

    $(document).on("click", ".js-open-details-modal", function (e) {
      e.preventDefault();
      $modal.addClass("is-visible");
    });

    $("#siteVisitClose").on("click", function () {
      $modal.removeClass("is-visible");
    });

    $modal.on("click", function (e) {
      if (e.target === this) $modal.removeClass("is-visible");
    });

    $(document).on("keyup", function (e) {
      if (e.key === "Escape") $modal.removeClass("is-visible");
    });

    $form.on("submit", function (e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }
      $note.text("Thank you! Our team will get back to you shortly.");
      $form[0].reset();
    });
  }

  // -------------------------------------------------------------
  // Footer "Disclaimer" popup
  // -------------------------------------------------------------
  function initDisclaimerModal() {
    var $modal = $("#disclaimerModal");

    $(document).on("click", ".js-open-disclaimer-modal", function (e) {
      e.preventDefault();
      $modal.addClass("is-visible");
    });

    $("#disclaimerClose").on("click", function () {
      $modal.removeClass("is-visible");
    });

    $modal.on("click", function (e) {
      if (e.target === this) $modal.removeClass("is-visible");
    });

    $(document).on("keyup", function (e) {
      if (e.key === "Escape") $modal.removeClass("is-visible");
    });
  }
})(jQuery);
