$(document).ready(onReady);

function onReady(){
    //display to-do list on DOM
    fetchTasks();
    //click handlers
    $('#taskInButton').on('click', taskIn);
}

function fetchTasks(){
    //GET request to server
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function(response){
        console.log('back from GET', response);
        // pass response to function to display results
        showTasks(response);
    }).catch(function(err){
        console.log(err);
        alert('Error getting todo tasks');
    })
}

function showTasks(tasks){
    for (let i=0; i<tasks.length; i++){
        $('#list-display').append(`<li data-id="${tasks[i].id}">
        <button class="completeBtn">Complete!</button>
        <button class="deleteBtn">Delete</button>
        ${tasks[i].description}
        </li>`)
    }
}

function taskIn(){
    // store input in object
    const newTask = {
        description: $('#taskIn').val()
    }
    console.log('in taskIn', newTask);
    // pass object to POST function
    addTask(newTask);
    // clear input
    $('#taskIn').val('');
}

function addTask(newTask){
    //POST request to server
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: newTask
    }).then(function(response){
        console.log('back from POST:', response);
        //TO DO run function to get to do list
        fetchTasks();
    }).catch(function(err){
        console.log(err);
        alert('Error posting todo item');
    })
}