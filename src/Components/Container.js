import { useState,createContext, useEffect,Fragment } from 'react';
import Login from './Login';
import Questions from './Questions';
import Result from './Result';
import { questions } from './QuestionBank';

export const globalVariable = createContext();

const Container = ( )=>{
     // THIS STATE WILL HOLD THE NAME OF THE PERSON THAT JUST LOGGED IN TO TAKE THE QUIZ
  const [firstName,setFirstName] = useState('')
  // THIS STATE WILL HELP TO CHANGE FROM THE LOGIN PAGE TO THE QUIZ PAGE
  const [displayQuiz,setDisplayQuiz] = useState(true)
  // THIS STATE WILL HELP TO CHANGE THE QUESTION WHEN YOU PRESS ON THE NEXT BUTTON
  const [questionCount,setQuestionCount] = useState(0)
  // THIS STATE WILLL HELP TO DISPLAY THE FINAL RESULT PAGE WHEN YOU'RE DONE WITH THE QUIZ
  const [displayResult,setDisplayResult] = useState(false)

  // THESE DIFFERENT STATES WILL HELP TO KNOW IF THE ANSWER IS CORRECT WHEN YOU CLICK ON IT
  const[correctAnswerA,setCorrectAnswerA] = useState(false)
  const[correctAnswerB,setCorrectAnswerB] = useState(false)
  const[correctAnswerC,setCorrectAnswerC] = useState(false)
  const[correctAnswerD,setCorrectAnswerD] = useState(false)
 
  // STATE TO HOLD THE TOTAL POINT OF THE USER
  const[totalScore,setTotalScore]= useState(0)


  //STATE TO DISABLE CLICK ANY OTHER OPTION WHEN THE CORRECT ANSWER HAS ALREADY BEEN CLICKED
  const [nextbtn,setNextBtn] = useState(false)

  //STATE FOR THE TIMER
  const[timer,setTimer] = useState(20)


  //FUNCTION TO UPDATE THE TIMER(COUNTDOWN)
  useEffect(()=>{
    if(timer === 0 && displayQuiz === true){//This makes sure that the questions do not change to the next question, if the user hasnt logged in yet, so it checks for when the timer is at zero, and it is still at question number one, instead of changing to the next question, it is going to reset the timer back to 20
      setTimer(20)
    }
    else if(timer === 0 && questionCount < questions.length ){
      changeQuestion()//THIS MAKES SURE THAT ONCE THE TIME ELAPSES, IT GOES TO THE NEXT QUESTION
    }
    const Quiztimer =
    timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
  return () => clearInterval(Quiztimer);
  },[timer])

  //FUNCTION TO RESTART TIMER FROM THE BEGINNING
  const restartTimer = ()=>{
    setTimer(20)
  }
  //FUNCTION TO UPDATE TOTAL POINT OF THE USER AFTER QUIZ
  const updateTotalScore = ()=>{
    setTotalScore((prev)=>{
      return prev + 1
    })
  }
  
  //THIS FUNCTION DISABLES CLICKING ANY OTHER OPTION WHEN YOU CLICK ON THE CORRECT ANSWER
  const disableNextBtn = ()=>{
      setNextBtn(true)
  }
  
//FUNCTION TO RESET THE STYLES ADDED TO THE CORRECT ANSWER DIVS WHEN YOU CLICK ON THE CORRECT ANSWER
  const resetAll = ()=>{
    setCorrectAnswerA(false)
    setCorrectAnswerB(false)
    setCorrectAnswerC(false)
    setCorrectAnswerD(false)
    setNextBtn(false)
  }
   //FUNCTION TO CHANGE THE QUESTION
   const changeQuestion = ()=>{
    if(questionCount === questions.length-1){
      setDisplayResult(true)
    }
    else if(questionCount < questions.length){
    setQuestionCount((prev)=>{
        return prev + 1;
    })
    resetAll()
    restartTimer()
  }
}

//Function to change from the login page to the Quiz page
  const changeDisplay = (e)=>{
    if(firstName.length === 0){
        setDisplayQuiz(true)
    }
    else if(firstName.length > 0){
    setDisplayQuiz(false)
    setTimer(20)//Resets the timer to 20 when we start the quiz proper
    }
  }

//Function to store the name of the user that has logged in to start the quiz
  const setUserName = (e)=>{
    setFirstName(e.target.value)
  }
  return (
      <div>
        <globalVariable.Provider value = {{firstName,setUserName,
          displayQuiz,displayResult,changeDisplay,
          questionCount,changeQuestion,correctAnswerC,
          correctAnswerA,correctAnswerB,correctAnswerD,
          setCorrectAnswerC,setCorrectAnswerA,setCorrectAnswerB,
          setCorrectAnswerD,updateTotalScore,totalScore,disableNextBtn,nextbtn,timer}}>
           {displayQuiz && <Login />}
           {!displayQuiz && <Questions />}
           {displayResult && <Result />}
        </globalVariable.Provider>
      </div>
  )
}


export default Container;