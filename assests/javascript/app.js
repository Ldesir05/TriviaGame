$(document).ready(function(){
function Question(quest,answerArray,correct,index){
    this.quest = quest;
    this.answers = answerArray;
    this.correctAnswer = correct;
    this.correctIndex = index;
}
function createQuestions(){
    trivia.questions.push(new Question("Who found the fountain of youth?",["Jack","Nenya","Naria","Vilya"],"Jack",0));
    trivia.questions.push(new Question("What are the Pirates of the Caribbean movies based on?",["Book","Song","theme park rides","Gold"],"theme park rides",2));
    trivia.questions.push(new Question("When was the first film released?",["2001","2002","2003","2016"],"2003",0));
    trivia.questions.push(new Question("Who directed The Curse of the Black Perl?",["Gore Verbinski","Steven Spielberg","Limbert Desir","James Cameron"],"Gore Verbinski",0));
    trivia.questions.push(new Question("Who is the first Captain of the Black Pearl?",["Captain Jack Sparrow","Captain Sam","Captain Hector Barbossa","Captain Edward Teaque"],"Captain Hector Barbossa",2));
    trivia.questions.push(new Question("How much did The Curse of the Black Pearl make at the box office?",["$644m","$654m","$664m","$554m"],"$654",1));
    trivia.questions.push(new Question("In which country does Jack escape from jail in Dead Man's Chest?",["Turkey","Italy","Greece","Spain"],"Turkey",0));
    trivia.questions.push(new Question("Which beach was Port Royal filmed on for The Black Pearl??",["St Vincent","St Lucia","Laguna Beach","Venice Beach"],"St Vincent",0));
    trivia.questions.push(new Question("Which ship do Jack and Will first use to sail after Elizabeth??",["HMS Dauntles","HMS Interceptor","HMS Belfast","HMS Pearl"],"HMS Interceptor",1));
    trivia.questions.push(new Question("How old is Elizabeth when we first meet her?",["A baby","12","18","20"],"12",1));
}   

var trivia = {
    questions: [],
     correct:0,
     incorrect:0,
     time:30,
     ticker: 0,
     current: 0,
     userAnswer: undefined,
     showTime: function(){
        trivia.time--;
        console.log(trivia.time);
        $('#time').html(trivia.time);
         if (trivia.time == 0){
            trivia.answered();
            trivia.tooLong();
        }
    },

    tooLong: function(){
        $('section').html('<h2>Time is UP!</h2><p>The correct answer is ' + this.questions[trivia.current].correctAnswer + '.</p>');
        trivia.incorrect++;
         tick = setInterval(trivia.count, 1000);
    },

    showCorrect: function(){
        $('section').html('<h2>Incorrect</h2><p class="incorrect">The correct answer is ' + this.questions[trivia.current].correctAnswer + '.</p>');
        trivia.incorrect++;
         tick = setInterval(trivia.count, 1000);
     },

    right: function(){
        $('section').html('<h2>Correct!</h2>');
        
         tick = setInterval(trivia.count, 1000);
        trivia.correct++;
     },

    showQuestion: function(current){
        trivia.time = 30;
        $('section').html('<h2 id="time">30</h2>'+'<p class="question">' + trivia.questions[trivia.current].quest +'</p>' + '<ul class="list-group"><li class="list-group-item" data-index="0">'+ trivia.questions[trivia.current].answers[0] +'</li><li class="list-group-item" data-index="1">'+ trivia.questions[trivia.current].answers[1] +'</li><li class="list-group-item" data-index="2">'+ trivia.questions[trivia.current].answers[2] +'</li><li class="list-group-item" data-index="3">'+ trivia.questions[trivia.current].answers[3] +'</li></ul>');
        counter = setInterval(trivia.showTime, 1000);
            
        $('li').on('click', function(){
            trivia.userAnswer = $(this).data('index')
            trivia.answered();
        
        if(trivia.userAnswer == trivia.questions[trivia.current].correctIndex){
            trivia.right();
        }
        
        else {
            trivia.showCorrect();
        }
        
        })
    },  

     result: function(){
        $('section').html('<h1>Finished!</h1> <h2>Correct answers: ' + trivia.correct + '</h2><h2>Wrong answers: ' + trivia.incorrect + '</h2><button type="button" class="btn btn-primary btn-lg reset">Try Again</button>')
        $('.reset').on('click', function(){
            trivia.reset();
        })
     },

     reset: function(){
        trivia.correct = 0,
        trivia.incorrect = 0,
        trivia.time = 30,
        trivia.ticker = 0,
        trivia.current = 0,
        trivia.showQuestion();
     },

     count: function(){
        trivia.ticker++;
        if(trivia.ticker == 3) {
            trivia.timeUp();
            $('section').empty();
            
            trivia.current++
            if(trivia.current < 10){
                trivia.showQuestion(trivia.current);
            }
            else{
                trivia.result();
            }
        }

     },
     
  answered: function(){
    clearInterval(counter);

  },

  timeUp: function(){
    clearInterval(tick);
    trivia.ticker = 0;
  },
  

}

createQuestions();

$('.begin').on('click', function(){
    
        trivia.showQuestion();

        })
        

});