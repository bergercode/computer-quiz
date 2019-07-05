// DOCUMENT READY?
$(document).ready(function(){

  // If user hits enter key on any link, accept this as a click event
  $(document).on("keydown","a",function(event){
    if(event.which === 13){
      this.click();
    }
  });
  $(document).on("keydown","input",function(event){
    if(event.which === 13){
      this.checked=true;
    }
  });

  // If user wants to go to home page will be prompted that all progress
  // will be lost.
  $(".return-home").on("click",function(event){
    // return confirm("Are you sure? Your progress will be lost.");
    $(".modal2").show();
    $(".modal-submit").click(function(event){
      window.location.href = "index.html";
      localStorage.clear();
    });
    $(".modal-cancel").click(function(event){
      $(".modal2").hide();
    });
    event.preventDefault;
  });

  // ********************INDEX********************

  //If begin clicked, prompt for user name
  $("#begin-button").click(function(event){
    $(".modal").css({
      "display":"flex",
      "flex-direction":"column",
      "justify-content":"space-evenly",
      "align-items":"center"
    });
    event.preventDefault();
  });
  $(".close").click(function(){
    $(".modal").css("display","none");
  });

  // If no name entered, defaults to Adventurer.
  // Can not continue unless something entered.
  // Saves name and redirects.
  $("#start").click(function(){
    var userName = $("#user-name").val();
    if(userName != ""){
      localStorage.setItem("userName",userName);
      window.location.href = "learning.html";
    }else {
      $("#user-name").attr("value","Adventurer")
    }
  });

  // If user inputs name and hits 'enter'
  // instead of hitting submit.
  $("#user-name").keypress(function(event){
    if(event.which == 13){
      $("#start").click();
      return false;
    }
  });

  // ********************LEARNING********************

  // Pulls user name from local Storage
  $("#user-name").html(localStorage.getItem("userName"));

  //Parts list, show or hide info depending on active.
  $("#components a").click(function(event){
    $("#information div").removeClass("show");
    $("a").removeClass("active");
    $("label").removeClass("highlight");
    $("#inf-info").addClass("hide");
    if($(this).attr("id")=="cpu"){
      $("div #cpu-info").addClass("show");
      $(this).addClass("active");
      $("label[for=cpu]").addClass("highlight");
    } else if($(this).attr("id")=="ram"){
      $("#ram-info").addClass("show");
      $(this).addClass("active");
      $("label[for=ram]").addClass("highlight");
    } else if($(this).attr("id")=="mbd"){
      $("#mbd-info").addClass("show");
      $(this).addClass("active");
      $("label[for=mbd]").addClass("highlight");
    } else if($(this).attr("id")=="psu"){
      $("#psu-info").addClass("show");
      $(this).addClass("active");
      $("label[for=psu]").addClass("highlight");
    } else if($(this).attr("id")=="hdd"){
      $("#hdd-info").addClass("show");
      $(this).addClass("active");
      $("label[for=hdd]").addClass("highlight");
    } else if($(this).attr("id")=="gpu"){
      $("#gpu-info").addClass("show");
      $(this).addClass("active");
      $("label[for=gpu]").addClass("highlight");
    }
  });

  //Check if scrolled to bottom and add heading to parts list.
  $(window).scroll(function(){

    if($("body").height()<=($(window).height()+ $(window).scrollTop())){
      $(".parts-label").addClass("show");
    }else{
      $(".parts-label").removeClass("show");
    }
  });

  // ********************QUIZ********************

  // When submitting quiz will check if all questions answered.
  // If not all are, prompts user to complete quiz.
  // Calculates if pass or fail and redirects to win/lose screen.
  $("#quiz-submit").click(function(event){
    var answerCount = 0;
    var score = 0;
    $("input").each(function(event){
      if($(this).is(":checked")){
        answerCount++;
      }
    });
    if(answerCount<5){
      $("#modal2").show();
    }else{
      if($("#q1a3").is(":checked")){
        score++;
      }
      if($("#q2a3").is(":checked")){
        score++;
      }
      if($("#q3a2").is(":checked")){
        score++;
      }
      if($("#q4a1").is(":checked")){
        score++;
      }
      if($("#q5a2").is(":checked")){
        score++
      }
      $("#modal3").show();
      $(".modal-submit").click(function(event){
        if(score>=3){
          window.location.href = "win.html";
        }else{
          window.location.href = "lose.html";
        }
      });
      $(".modal-cancel").click(function(event){
        $(".modal2").hide();
      })
    }
    localStorage.setItem("score",score);
    event.preventDefault();
  });
  $("#score").html(localStorage.getItem("score"));

  // Hides custom pop-up message
  $("#answer-all").click(function(event){
    $(".modal2").hide();
  });

  // ********************ABOUT********************

  // Back button on about page take user back to last page
  // they were interacting with.
  $(".go-back").click(function(event){
    window.history.back();
    event.preventDefault;
  });
});
