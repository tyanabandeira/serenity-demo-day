var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down")
var trash = document.getElementsByClassName("fa-trash-o");


Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('thumbDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbDown':thumbDown
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});




Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



// TODO LIST FUNTIONALITY

document.querySelector('#addTaskToList').addEventListener('click', addTask)
let update = document.querySelector('.update')
document.querySelector('#completedTask').addEventListener('click', clearCompleted)
let countTag = document.querySelector('.count')
let count = 0

function addTask(){
  // created a variable for the input task, a user will be able to write a task
  let task = document.querySelector('#task').value
  if(task){
    const ul = document.querySelector('#taskList')
    const li = document.createElement('li')
    // putting text into the li
    li.appendChild(document.createTextNode(task))
    ul.appendChild(li)
    count++ 
    countTag.innerText = 'you have ' + count + ' tasks left'
    li.addEventListener('click', crossOut)
  } else{
    update.innerText = 'you forgot to add a task'
  }
  }

 
// create a new function that strikes through whenever the user clicks on an li 

function crossOut(e){
  e.target.classList.toggle('strike')
  let listTotal= document.querySelectorAll('li').length - document.querySelectorAll('.strike').length
  count = listTotal
  countTag.innerText = 'you have ' + listTotal + ' tasks left'

}


document.querySelector('#clearList').addEventListener('click', clearAll)
// create a function to clear all the list items 
function clearAll(){
  window.location.reload()
}

// create a function to clear all of the completed list items 
function clearCompleted(){
  document.querySelectorAll('.strike').forEach(list => {
    list.remove()
  })
}