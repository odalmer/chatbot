var textInput = document.getElementById("textInput");
var sendBtn = document.getElementById("sendBtn");
var chatScreen = document.getElementById("chatScreen");
var userMsg;

var userRes = ["hola", "klk", "No"];
var operators = ["+", "-", "*", "/"];
//This occurd when the user clicks the send button
sendBtn.onclick = function () {
  userMsg = textInput.value;
  if (userMsg.length > 0) {
    displayMsg(userMsg, true);
    botResponse(userMsg);
  }
};
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    userMsg = textInput.value;
    if (userMsg.length > 0) {
      displayMsg(userMsg, true);
      botResponse(userMsg);
    }
  }
});

function displayMsg(userMsg, user) {
  //Creates the div that will contain the message
  var msgCont = document.createElement("div"),
    msgP = document.createElement("p");

  // setting the class name and evaluating if its the user or bot
  if (user) {
    msgCont.className = "user-msg-cont";
    msgP.className = "user-msg";
  } else {
    msgCont.className = "message-cont";
    msgP.className = "bot-msg";
  }

  msgP.innerText = userMsg;
  chatScreen.append(msgCont);
  msgCont.append(msgP);
  textInput.value = "";
}

function botResponse(userMsg) {
  // this will be the answer of the bot
  var answer,
    //Converting the user msg to a array
    arr = userMsg.split(" "),
    firstLetter = arr[0];

  var q = (msg) => {
    return userMsg.indexOf(msg);
  };
  userMsg = userMsg.toLowerCase();
  if (userMsg === "time") {
    // get the time
    answer = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (userMsg === "date") {
    // get the date
    answer = new Date().toLocaleDateString();
  }
  //        TIMER
  else if (q("set a timer") !== -1) {
    //set a timer for 30 seconds
    var timePeriod = q("minutes"),
      audio = new Audio("mario-sound.mp3"),
      time;
    // CONVERTING TIME PERIOD
    if (q("minutes") !== -1) {
      timePeriod = arr[arr.length - 2] + " " + "minutes";
      time = arr[arr.length - 2] * 60000;
    } else if (q("seconds") !== -1) {
      timePeriod = arr[arr.length - 2] + " " + "seconds";
      time = arr[arr.length - 2] * 1000;
    } else if (q("hours") !== -1) {
      timePeriod = arr[arr.length - 2] + " " + "hours";
      time = arr[arr.length - 2] * 3600000;
    }
    // SETTING THE TIMER
    var timer = setTimeout(() => {
      audio.play();
      answer = "Time over";
      displayMsg(answer, false);
    }, time);
    answer = "timer sets for " + timePeriod;
    // TIMER ENDS
  } else if (
    //  GREETINGS
    userMsg === "hello" ||
    userMsg === "hi" ||
    userMsg === "what's up"
  ) {
    answer = "what's up";
  } else if (userMsg == "arithmetic operations") {
    answer = "Use the numbers instead ex: 1+1";
  }
  // yt seacher
  else if (firstLetter == "yt" && arr.length >= 1) {
    window.location.assign(
      "https://www.youtube.com/results?search_query=" + arr[arr.length - 1]
    );
    answer = "redirecting...";
  }
  // google seacher
  else if (firstLetter == "g" && arr.length >= 1) {
    console.log(arr[arr.length - 1]);
    window.location.assign(
      "https://www.google.com/search?q=" + arr[arr.length - 1]
    );
    answer = "redirecting...";
  }
  // MATH OPERATIONS
  answer = mathOperations(userMsg, answer);

  // DEAFAULT MESSAGE
  if (answer === undefined || answer === NaN || answer === null) {
    console.log(answer);
    answer = "i have no clue. Try asking something else";
  }
  // DISPLAYING THE MESSAGE
  displayMsg(answer, false);

  // SETTING ANSWER TO NULL
  answer = null;
}

function mathOperations(userMsg, answer) {
  for (let j = 0; j < operators.length; j++) {
    if (userMsg.indexOf(operators[j]) !== -1) {
      // The eval function takes a string and then returns the value of that string considered as a math operation.
      answer = eval(userMsg);
    }
  }
  return answer;
}
