var lang;

//Options KAnjiviewer
const options = {
  strokeWidth: 3,
  fontSize: 3,
  zoomFactor: 100,
  displayOrders: true,
  colorGroups: false
};

$(document).ready(function() {
  lang = window.location.pathname.split("/")[1] == "ja" ? "ja" : "en";

  var sample = "日本語";

  var kanji = new URL(document.location).searchParams.get("kanji");
  if (kanji == null) {
    kanji = sample;
  } else {
    kanji = kanji.trim().replace(/\s+/g, "");
    $("#kanji").val(kanji);
    location.hash = "#viewer";
  }

  // Draw from URL parameter or draw the sample if empty
  draw(kanji);

  // If form is sumbitted again, redraw according to new value
  $("#submitBtn").click(function() {
    console.log("refresh without sending the form");
    draw($("#kanji").val());
    updateURL($("#kanji").val());
    location.hash = "#viewer";
  });
});

// Animate letter on tap/click
$(document).on("click", ".kanjiViewer", function() {
  animate($(this));
});

// Open modal for dictionnary entry
$(document).on("click", "#kanjisViewer .modalButton", function() {
  var src = $(this).data("src");
  var letter = $(this).data("letter");

  $("#myModal .modal-title").text(letter);
  $("#myModal iframe").attr({ src: src });
  $("#myModal").modal("toggle");
});

$("#myModal").on("hidden.bs.modal", function(e) {
  $("#myModal iframe").attr({ src: "about:blank" });
  $("#myModal iframe").removeAttr("src");
});

/////// /////// ////////
//      FUNCTIONS     //
/////// /////// ////////

var draw = function(q) {
  console.log("stroke order for : ", q);

  // URL Dictionnary according to the selected language, en by default
  var dictCTA = " details on jisho.org";
  var dictURL = "https://jisho.org/search/";
  var tapHint = "👆 Click/Tap to animate.";
  if (lang == "ja") {
    dictCTA = "  - 辞書";
    dictURL = "https://www.weblio.jp/content/";
    tapHint = "👆クリック／タップしてアニメートする。";
  }

  $("#kanjisViewer").empty();
  // For each character in the sentence
  for (var i = 0; i < q.length; i++) {
    let currentChar;
    currentChar = q.charAt(i);

    var positionHint =
      q.slice(0, i) +
      '<span class="text-danger">' +
      currentChar +
      "</span>" +
      q.slice(i + 1);

    var elm = `
    <div id="letter-card-${i}" class="letter-card letter-${currentChar} col-md-4">
    <div class="card mb-4">
    <div class="letter border-bottom">
    <div class="kanjiViewer" id="kanjiViewer${i}"></div>
    </div>
    <div class="card-body">

    <p class="card-text text-muted font-weight-light">
    <small>
    ${tapHint}
    </small>
    </p>
    <p class="card-text">
    ${positionHint}
    </p>

    <button type="button" class="btn btn-sm btn-outline-secondary btn-block modalButton" data-toggle="modal" data-target="#myModal"
    data-src="${dictURL}${currentChar}" data-letter="${currentChar}"
    >
    ${currentChar}${dictCTA}
    </button>
    </div>
    </div>
    </div>
    </div>
    `;
    $(elm).appendTo($("#kanjisViewer"));

    KanjiViewer.initialize(
      "kanjiViewer" + i,
      options.strokeWidth,
      options.fontSize,
      options.zoomFactor,
      options.displayOrders,
      options.colorGroups,
      currentChar
    );
  }
};

function updateURL(q) {
  // Construct URLSearchParams object instance from current URL querystring.
  var queryParams = new URLSearchParams(window.location.search);

  // Set new or modify existing parameter value.
  queryParams.set("kanji", q);

  // Replace current querystring with the new one.
  history.replaceState(null, null, "?" + queryParams.toString());
}

var animate = function(e) {
  var r = 0;
  e.find("svg")
    .find("path")
    .each(function() {
      var e = $(this),
        t = this.getTotalLength(),
        n = 0.0075 * t; //
      e.css({
        transitionProperty: "none",
        strokeDasharray: t,
        strokeDashoffset: t
      }),
        e.offset(),
        e.css({
          transitionProperty: "stroke-dashoffset",
          transitionDuration: n + "s",
          transitionDelay: r + "s",
          strokeDashoffset: 0
        }),
        (r += n + 0.175); //Time in seconds between strokes
    });
};
