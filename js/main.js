(function ($) {
  "use strict";

  $(document).ready(function () {
    initNavToggle();
    initAOS();
    initLifestyleSlider();
    initGallery();
    initLandmarks();
    initUnitConfig();
    initHotspots();
    initLightbox();
    initWalkthrough();
    initContactForm();
    initLocationCategories();
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
  var UNIT_DATA = {
    "2bhk-1": {
      title: "2 BHK Type 1",
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
      title: "2 BHK Type 2",
      img: "assets/images/floor-plans/2bhk-type-f.webp",
      rows: [
        ["Entrance Lobby", "5′0″ x 4′5″"],
        ["Living/Dining", "17′6″ x 12′0″"],
        ["Balcony", "15′8″ x 3′11″"],
        ["Kitchen", "9′0″ x 7′8″"],
        ["Utility", "3′11″ x 7′8″"],
        ["Common Toilet", "8′6″ x 4′11″"],
        ["Kids Bedroom", "10′0″ x 11′6″"],
        ["Master Bedroom", "10′6″ x 13′3″"],
        ["Master Toilet", "5′3″ x 7′10″"],
        ["Walk In Wardrobe", "5′8″ x 7′10″"],
      ],
    },
    "3bhk": {
      title: "3 BHK",
      img: "assets/images/floor-plans/3bhk.webp",
      rows: [
        ["Entrance Lobby", "5′6″ x 5′0″"],
        ["Living/Dining", "22′0″ x 13′6″"],
        ["Balcony", "20′0″ x 3′11″"],
        ["Kitchen", "10′0″ x 8′6″"],
        ["Utility", "4′0″ x 8′6″"],
        ["Common Toilet", "9′6″ x 5′0″"],
        ["Bedroom 2", "11′0″ x 12′6″"],
        ["Bedroom 3", "10′6″ x 12′0″"],
        ["Master Bedroom", "12′0″ x 14′6″"],
        ["Master Toilet", "5′6″ x 8′6″"],
        ["Walk In Wardrobe", "6′0″ x 8′6″"],
      ],
    },
    "3-5duplex": {
      title: "3.5 Duplex",
      img: "assets/images/floor-plans/3-5bhk-duplex.webp",
      rows: [
        ["Entrance Lobby", "6′0″ x 5′6″"],
        ["Living/Dining", "24′0″ x 14′0″"],
        ["Balcony", "22′0″ x 4′0″"],
        ["Kitchen", "10′6″ x 9′0″"],
        ["Utility", "4′6″ x 9′0″"],
        ["Powder Room", "5′0″ x 4′11″"],
        ["Bedroom 2 (Upper)", "11′6″ x 13′0″"],
        ["Study / Den (Upper)", "9′0″ x 10′0″"],
        ["Master Bedroom (Upper)", "13′0″ x 15′0″"],
        ["Master Toilet", "6′0″ x 9′0″"],
        ["Walk In Wardrobe", "6′6″ x 9′0″"],
        ["Private Terrace", "18′0″ x 8′0″"],
      ],
    },
    "3-5simplex": {
      title: "3.5 Simplex",
      img: "assets/images/floor-plans/3-5bhk-simplex.webp",
      rows: [
        ["Entrance Lobby", "6′0″ x 5′0″"],
        ["Living/Dining", "23′0″ x 13′6″"],
        ["Balcony", "21′0″ x 4′0″"],
        ["Kitchen", "10′0″ x 8′10″"],
        ["Utility", "4′0″ x 8′10″"],
        ["Powder Room", "5′0″ x 4′10″"],
        ["Bedroom 2", "11′0″ x 12′6″"],
        ["Study / Den", "9′0″ x 9′6″"],
        ["Master Bedroom", "12′6″ x 14′0″"],
        ["Master Toilet", "6′0″ x 8′10″"],
        ["Walk In Wardrobe", "6′0″ x 8′10″"],
      ],
    },
  };

  function initUnitConfig() {
    var $tabs = $(".unit-config__tab");
    var $img = $("#unitPlanImg");
    var $title = $("#unitPlanTitle");
    var $tbody = $("#unitPlanTable tbody");

    $tabs.on("click", function () {
      var key = $(this).data("unit");
      var data = UNIT_DATA[key];
      if (!data) return;

      $tabs.removeClass("is-active").attr("aria-selected", "false");
      $(this).addClass("is-active").attr("aria-selected", "true");

      $img.attr("src", data.img).attr("alt", data.title + " floor plan");
      $title.text(data.title);

      var rowsHtml = data.rows
        .map(function (r) {
          return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>";
        })
        .join("");
      $tbody.html(rowsHtml);
    });
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
  // Floor plan zoom lightbox
  // -------------------------------------------------------------
  function initLightbox() {
    var $lightbox = $("#planLightbox");
    var $lbImg = $("#lightboxImg");

    $("#unitZoom").on("click", function () {
      $lbImg.attr("src", $("#unitPlanImg").attr("src"));
      $lightbox.addClass("is-visible");
    });

    $("#lightboxClose, #planLightbox").on("click", function (e) {
      if (e.target === this || $(e.target).is("#lightboxClose")) {
        $lightbox.removeClass("is-visible");
      }
    });

    $(document).on("keyup", function (e) {
      if (e.key === "Escape") $lightbox.removeClass("is-visible");
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
})(jQuery);
