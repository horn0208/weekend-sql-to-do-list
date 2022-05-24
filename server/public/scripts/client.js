$(document).ready(onReady);

function onReady(){
    //display to-do list on DOM
    fetchTasks();
    //click handlers
    $('#taskInButton').on('click', taskIn);
    $('#list-display').on('click', '.completeBtn', completeTask);
    $('#list-display').on('click', '.deleteBtn', deleteTask);
    $('#sortTasksButton').on('click', sortTasks);
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

function sortTasks(){
    console.log('in sortTasks');
    // GET request to server for sorted tasks
    $.ajax({
        method: 'GET',
        url: '/todo?sort=complete'
    }).then(function(response){
        console.log('back from GET sort', response);
        // pass response to function to display results
        showTasks(response);
    }).catch(function(err){
        console.log(err);
        alert('Error getting todo tasks');
    })
}

function showTasks(tasks){
    let el = $('#list-display');
    el.empty();

    for (let i=0; i<tasks.length; i++){
        //conditionals to change appearance based on complete status:
        let itemClass = '';
        let showCompleteBtn = '';
        let checkMark = ''
        if (tasks[i].complete === false){
            itemClass = 'incomplete';
            checkMark = '&#128681';
            showCompleteBtn = `<button class="btn btn-sm btn-success completeBtn" data-id="${tasks[i].id}">Complete</button>`
        } else if (tasks[i].complete === true) {
            itemClass = 'complete';
            checkMark = '&#9989'; //hex code for checkmark emoji
        }
        // append to list on DOM
        $(el).append(`<li class=${itemClass}>
        <div class='description-box'>
        ${checkMark}  
        ${tasks[i].description}
        </div>
        <div class='button-box'>
        ${showCompleteBtn}   
        <button class="btn btn-sm btn-danger deleteBtn" data-id="${tasks[i].id}">Delete</button>
        </div>
        </li>`);
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

function completeTask(){
    console.log('data id:', $(this).data('id'));
    // update (PUT) request to server
    $.ajax({
        method: 'PUT',
        url: `/todo?id=${$(this).data('id')}`
    }).then(function(response){
        console.log('back from UPDATE:', response);
        // get updated task list and display on DOM:
        fetchTasks();
    }).catch(function(err){
        console.log(err);
        alert('Error marking task complete');
    })
}

function deleteTask(){
    console.log('data id:', $(this).data('id'));

    swal({
        title: "Really?",
        text: "You want to remove this task?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          //DELETE request to server
          $.ajax({
            method: 'DELETE',
            url: `/todo?id=${$(this).data('id')}`
        }).then(function(response){
            console.log('back from DELETE:', response);
            // get updated task list and display on DOM:
            fetchTasks();
        }).catch(function(err){
            console.log(err);
            alert('Error deleting task');
        });
        } else {
          swal("Your task is safe!");
        }
      });
    }

//     // DELETE request to server
//     $.ajax({
//         method: 'DELETE',
//         url: `/todo?id=${$(this).data('id')}`
//     }).then(function(response){
//         console.log('back from DELETE:', response);
//         // get updated task list and display on DOM:
//         fetchTasks();
//     }).catch(function(err){
//         console.log(err);
//         alert('Error deleting task');
//     })
// }