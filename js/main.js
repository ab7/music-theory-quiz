/*global $, alert*/

$(function () {
  "use strict";
  // start new quiz
  function newQuiz() {
    $('#startButton, #startOver').click(function () {
      $('.hint, .correctText, .incorrectText').hide();
      $('.needHint').fadeIn();
      $('.progressCircle').removeClass('correct incorrect');
      $('#progressCount').text('0/10');
      $('.choice').removeClass('greyOut');
      $('.notes, .x').remove();
      $('button').prop('disabled', false);
      $('#startOver, .prevQ, .nextQ').fadeIn();
      $('section').hide();
      $('.progressCircle').removeClass('progressCircleHL');
      $('.pc1').addClass('progressCircleHL');
      $('#q1').fadeIn();
    });
  }
  
  // move between questions
  function questionHandler() {
    $('.progressCircle').click(function () {
      $('section').hide();
      $('#startOver, .prevQ, .nextQ').fadeIn();
      $('.progressCircle').removeClass('progressCircleHL');
      $(this).addClass('progressCircleHL');
      var viewQuestion = $(this).text().toLowerCase();
      $('#' + viewQuestion).fadeIn();
    });
    $('.nextQ').click(function () {
      var currentQ = $('.progressCircleHL').text().toLowerCase();
      if (currentQ.slice(1) < 10) {
        $('section').hide();
        $('.progressCircle').removeClass('progressCircleHL');
        $('.pc' + (parseInt(currentQ.charAt(1), 16) + 1)).addClass('progressCircleHL');
        $('#q' + (parseInt(currentQ.charAt(1), 16) + 1)).fadeIn();
      }
    });
    $('.prevQ').click(function () {
      var currentQ = $('.progressCircleHL').text().toLowerCase();
      if (currentQ.slice(1) > 1) {
        $('section').hide();
        $('.progressCircle').removeClass('progressCircleHL');
        $('.pc' + (currentQ.slice(1) - 1)).addClass('progressCircleHL');
        $('#q' + (currentQ.slice(1) - 1)).fadeIn();
      }
    });
  }
  
  // check and lock questions
  function checkQuestion() {
    $('.choice').click(function () {
      var question, qNum, answer, progress, incorrectCount;
      question = $('#' + $(this).closest('section').prop('id'));
      qNum = question.data('check').toString().charAt(1);
      answer = $(this).data('choice').toString().charAt(3);
      progress = '.pc' + question.prop('id').slice(1);
      question.find('.choice').addClass('greyOut');
      if (answer === qNum) {
        $(this).removeClass('greyOut');
        question.find('.hint, .needHint').hide();
        question.find('.correctText').fadeIn();
        $(progress).addClass('correct');
        $(progress).append('<img class="notes" src="./img/notes2.png" alt="notes">');
      } else {
        question.find('.c' + qNum).removeClass('greyOut');
        question.find('.hint, .needHint').hide();
        question.find('.incorrectText').fadeIn();
        $(progress).addClass('incorrect');
        $(progress).append('<img class="x" src="./img/x.png" alt="x">');
      }
      question.find('button').prop('disabled', true);
      $('#progressCount').text((parseInt($('#progressCount').text().charAt(0), 16) + 1) + '/10');
      if ($('#progressCount').text().slice(0, 2) === '10') {
        incorrectCount = $('button.incorrect').length;
        $('section, .prevQ, .nextQ').hide();
        $('#finished').fadeIn();
        $('.howMany').text('You got ' + (10 - incorrectCount) + ' out of 10 correct!');
        if (incorrectCount === 0) {
          $('.outcome').text('A PERFECT SCORE! Nice!');
        } else if (incorrectCount === 1) {
          $('.outcome').text('Just one away, way to go!');
        } else {
          $('.outcome').text('Please review the questions you answered incorrectly!');
        }
      }
    });
  }
  
  // show a hint
  function showHint() {
    $('.needHint').click(function () {
      $(this).hide();
      $(this).closest('.feedbackWrapper').find('.hint').fadeIn();
    });
  }

  // start listeners
  $('#startOver, .prevQ, .nextQ').hide();
  newQuiz();
  questionHandler();
  checkQuestion();
  showHint();
});