const pad_start = 0;
const pad_stop = 99;
const target = Math.floor(Math.random() * 100);
var current_selected = 0;
var selectedRule = "";
var timeout = null;
var ruleTimeOut = null;

const rules = [
  "ผู้หญิงหมดแก้ว",
  "ผู้ชายหมดแก้ว",
  "คุณคือผู้โชคดีหมดแก้ว",
  "คนทางขวาหมดแก้ว",
  "คนทางซ้ายหมดแก้ว",
  "3 คน ทางขวาหมดแก้ว",
  "3 คน ทางซ้ายคนหมดแก้ว",
  "ตัวเองและ 3 คนทางขวาหมดแก้ว",
  "ตัวเองและ 3 คนทางซ้ายหมดแก้ว",
  "ขวามือคนที่ 3-5 หมดแก้ว",
  "ซ้ายมือคนที่ 3-5 หมดแก้ว",
  "หมดแก้วรอบวงยกเว้นตัวเอง",
  "หมดแก้วรอบวงยกเว้นซ้ายมือคนที่ 5",
  "หมดแก้วกับเสธ",
  "เลือกเพื่อนอีก 2 คน หมดแก้ว",
  "ทหารหมดแก้ว on the rock",
  "กำหนดเอง",
];

const winWords = [
  "ว้าว! คุณเลือกสุดยอดแล้ว!",
  "เลขของคุณถูกต้องอย่างสิ้นเชิง!",
  "คุณเป็นผู้เล่นสุดยอดที่เลือกถูก!",
  "เลขที่คุณเลือกน่าประทับใจมาก!",
  "ยินดีด้วย! คุณเลือกสุดยอดแล้ว.",
  "คุณเป็นผู้ชนะและเลือกถูกต้องเต็มที่!",
  "สุดยอด! คุณจับเลขถูกได้อย่างลงตัว.",
  "เลือกค่าที่ถูกต้องอย่างมืออาชีพ!",
  "คุณคือเกมเมอร์ที่เลือกสุดยอดแล้ว.",
  "เลขที่คุณเลือกเป็นสุดยอดที่สุด!",
];

const upperWords = [
  "โอ๊ะ! ยังไม่ถูก ลองต่ำกว่านี้ซิ!",
  "ยังไม่ถูกจ้า! เลขมากไปนิด.",
  "เลือกใหม่! ยังไม่ถูก ค่ามันสูงไป.",
  "เลขของคุณยังไม่ถูก มันเยอะไป.",
  "ฉันคิดว่าต้องต่ำกว่านี้น่ะ!",
  "อุ๊ปส์! ยังไม่ถูก สูงไปนิด!!.",
  "เกือบถูกล่ะ ต่ำกว่านี้อีกหน่อย!",
  "เลือกใหม่! เลขสูงไปสำหรับเกมนี้.",
  "ค่าที่เลือกสูงไป สำหรับจบเกม.",
  "เกือบถูกแล้วไง ลองต่ำลงอีกนิด!",
];

const belowWords = [
  "โอ๊ะ! ยังไม่ถูก สูงกว่านี้ซิ!",
  "ยังไม่ถูกจ้า! เลขน้อยไป.",
  "เลือกใหม่! ยังไม่ถูก ค่าต่ำเกินน่ะ.",
  "เลขของคุณยังไม่ถูก มันน้อยไป.",
  "ฉันคิดว่าต้องสูงกว่านี้น่ะ!",
  "อุ๊ปส์! ยังไม่ถูก ต่ำไปนิด!!.",
  "เกือบถูกล่ะ สูงกว่านี้หน่อย!",
  "เลือกใหม่! เลขน้อยเกินไปสำหรับเกมนี้.",
  "ค่าที่เลือกน้อยไปนิด สำหรับจบเกม.",
  "เกือบถูกแล้วไง สูงอีกนิด!",
];

function openFullscreen() {
  var elem = document.getElementById("main");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function displayRule() {
  for (var index = 0; index < rules.length; index++) {
    $("#rule-container").append(
      '<button onclick="selectRule(' +
        index +
        ')" type="button"  class="btn-block btn-info btn-lg" style="font-size: 4vw;">' +
        rules[index] +
        "</button>"
    );
  }
}

function selectRule(ruleIndex) {
  openFullscreen();
  $("#mega-display").html(
    '<div class="msg-container" onclick="clearTimerRule()"><div class="rainbow change-size"><p class="mega-text">' +
      rules[ruleIndex] +
      "</p></div></div>"
  );
  selectedRule = rules[ruleIndex];
  $("#mega-display").addClass("show");
  timeout = setTimeout(clearScr, 10000);
  ruleTimeOut = setTimeout(displayNumpad, 10000);
  $("#rule-section").addClass("no-show");
}
function clearTimerRule(){
    clearScr();
    clearTimeout(ruleTimeOut);
    displayNumpad();
}
function timerCheck(valSelected) {
  $("#mega-display").html(
    '<div class="msg-container" onclick="disable_numpad()"><div class="rainbow"><p class="mega-text">' +
      valSelected +
      "</p></div></div>"
  );
  $("#mega-display").addClass("show");
  current_selected = valSelected;
  //setTimeout(disable_numpad, 5000);
}

function clearScr() {
  clearTimeout(timeout);
  $("#mega-display").removeClass("show");
}
function resetGame() {
  console.log("Call me.....");
  window.location.reload();
}
function displayNumpad() {
  $("#game-numpad").addClass("show");
  $("#game-numpad").html(
    '<h1 onclick="openFullscreen()"  style="text-align: center;">The Drunker Number Game</h1>'
  );
  $("#game-numpad").append(
    '<p style="text-align: center;">' + selectedRule + "</p>"
  );
  const isMobile = window.matchMedia(
    "only screen and (max-width: 760px)"
  ).matches;
  for (var i = pad_start; i <= pad_stop; i++) {
    if (isMobile) {
      $("#game-numpad").append(
        '<div id="contain-' +
          i +
          '" class="contain-btn mobile"><button onclick="timerCheck(' +
          i +
          ')" type="button" id="pad-btn-' +
          i +
          '" class="btn btn-default btn-block mobile">' +
          i +
          "</button></div>"
      );
      //...
    } else {
      $("#game-numpad").append(
        '<div id="contain-' +
          i +
          '" class="contain-btn"><button onclick="timerCheck(' +
          i +
          ')" type="button" id="pad-btn-' +
          i +
          '" class="btn btn-default btn-block">' +
          i +
          "</button></div>"
      );
    }
  }
}

function disable_numpad() {
  console.log(current_selected);
  console.log("disable numpad call");
  var select = parseInt(current_selected);
  console.log(select + " | " + target);
  if (target == select) {
    $("#mega-display").html(
      '<div class="msg-container"><div onclick="resetGame()"  class="rainbow change-size"><div class="mega-text"><p style="font-size: 10vw !important">☑ ' +
        select +
        "</p><p>" +
        selectedRule +
        '</p><button onclick="resetGame()" style="font-size:2vw !important;">เริ่มเกมใหม่</button></div></div></div>'
    );
  } else if (select < target) {
    console.log("select < target");
    var ranIndex = Math.floor(Math.random() * belowWords.length);
    if (ranIndex >= belowWords.length) ranIndex = belowWords.length - 1;
    var belowWord = belowWords[ranIndex];
    $("#mega-display").html(
      '<div class="msg-container" onclick="clearScr()"><div class="rainbow change-size" style="background-color:red;"><div class="mega-text"><p style="font-size: 10vw !important; color:red;">☒ ' +
        select +
        "</p>" +
        belowWord +
        "</div></div></div>"
    );
    timeout = setTimeout(clearScr, 5000);
    $("#contain-" + select).removeClass("rainbow");
    $("#pad-btn-" + select).removeClass("btn-txt-size");

    for (var i = select; i >= pad_start; i--) {
      console.log("disable numpad " + i);
      $("#pad-btn-" + i).prop("disabled", true);
      $("#pad-btn-" + i).css({ "background-color": "darkgrey" });
      $("#pad-btn-" + i).addClass("strike");
    }
  } else if (select > target) {
    var ranIndex = Math.floor(Math.random() * upperWords.length);
    if (ranIndex >= upperWords.length) ranIndex = upperWords.length - 1;
    var upperWord = upperWords[ranIndex];
    $("#mega-display").html(
      '<div class="msg-container" onclick="clearScr()"><div class="rainbow change-size" style="background-color:red;"><div class="mega-text"><p style="font-size: 10vw !important; color:red;">☒ ' +
        select +
        "</p>" +
        upperWord +
        "</div></div></div>"
    );
    timeout = setTimeout(clearScr, 5000);
    console.log("select > target");
    $("#contain-" + select).removeClass("rainbow");
    $("#pad-btn-" + select).removeClass("btn-txt-size");
    for (var i = select; i <= pad_stop; i++) {
      console.log("disable numpad " + i);
      $("#pad-btn-" + i).prop("disabled", true);
      $("#pad-btn-" + i).css({ "background-color": "darkgray" });
      $("#pad-btn-" + i).addClass("strike");
    }
  } else {
    console.log("disable numpad nothing");
  }
}
$(document).ready(function () {
  displayRule();
});
