var currentPage = 0;
var answers = [];
var VicRoads = VicRoads || {};
VicRoads = {

  Init: function() {
    $(".button-container a").on("click", function() {
      VicRoads.NextPage(this);
    });

    $(".button-container a.finish").on("click", function() {
      VicRoads.FinishQuiz(currentPage);
    });

    $(".button-container a.start-again").on("click", function() {
      VicRoads.RestartQuiz();
    });
  },

  NextPage: function(selector) {
    if (currentPage === 0 || VicRoads.ValidateAnswer(currentPage)) {
      if (currentPage !== 0) { VicRoads.AnswerQuestion(currentPage); }
      nextPage = currentPage + 1;
      $(".page-"+nextPage).addClass("active-page");
      $(".page-"+currentPage).removeClass("active-page").addClass("already-shown");
      currentPage += 1;
    }
  },

  AnswerQuestion: function(pageNumber) {
    var selectedAnswer = $(".question-"+pageNumber+":checked");
    answers.push({
      'questionId': 'question-'+pageNumber,
      'question': $(".page-"+pageNumber+" h1").text(),
      'answer': selectedAnswer.val(),
      'correctAnswer': selectedAnswer.attr('data-answer')
    });
  },

  ValidateAnswer: function(pageNumber) {
    if ($(".question-"+pageNumber).is(':checked')) {
      return true;
    } else {
      return false;
    }
    return false;
  },

  FinishQuiz: function() {
    var totalAnswers = answers.length;
    var correctAnswers = 0;

    $.each(answers, function(index, answer) {
      VicRoads.AddAnswerSheet(answer);
      if (answer.answer === answer.correctAnswer) {
        correctAnswers += 1;
      }
    });

    $(".total-questions").text(totalAnswers);
    $(".correct-answers").text(correctAnswers);

  },

  AddAnswerSheet: function(answer) {
    $(".results").append("<p class='"+answer.questionId+" results-question'>"+answer.question+"</p>");
    $(".results").append("<p class='"+answer.questionId+" results-answer-correct'>"+answer.correctAnswer+"</p>");
    $(".results").append("<p class='"+answer.questionId+" results-answer-user'>"+answer.answer+"</p>");

    if (answer.answer === answer.correctAnswer) {
      $("."+answer.questionId+".results-answer-user").addClass("correct");
    }
  },

  RestartQuiz: function() {
    currentPage = 0;
    answers = [];

    $(".already-shown").removeClass("already-shown");
    $(".active-page").removeClass("active-page");
    $(".page-0").addClass("active-page");
    $("input[type='radio']").prop('checked', false);
    $(".results").empty();
  }
};

$(document).ready(function() {
  VicRoads.Init();
});
