$(document).ready(onReady);

function onReady(){
    //display to-do list on DOM

    //click handlers
    $('#taskInButton').on('click', taskIn);
}

function taskIn(){
    console.log('in taskIn');
}