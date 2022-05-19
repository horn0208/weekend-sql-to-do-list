$(document).ready(onReady);

function onReady(){
    //display to-do list on DOM

    //click handlers
    $('#taskInButton').on('click', taskIn);
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
        //TO DO run function to update list on DOM

    }).catch(function(err){
        console.log(err);
        alert('Error posting todo item');
    })
}