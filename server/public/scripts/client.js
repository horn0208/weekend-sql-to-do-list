$(document).ready(onReady);

function onReady(){
    //display to-do list on DOM
    showTasks();
    //click handlers
    $('#taskInButton').on('click', taskIn);
}

function showTasks(){
    //GET request to server
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function(response){
        console.log('back from GET', response);
        // run function to display results

    }).catch(function(err){
        console.log(err);
        alert('Error getting todo tasks');
    })
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
        showTasks();
    }).catch(function(err){
        console.log(err);
        alert('Error posting todo item');
    })
}