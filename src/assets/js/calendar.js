"use strict";
function renameKey(obj, old_key, new_key) {    
// check if old key = new key   
  if (old_key !== new_key) {                   
	 Object.defineProperty(obj, new_key,  
	 Object.getOwnPropertyDescriptor(obj, old_key)); 
	 delete obj[old_key];        
	 } 
} 
function rename(){ 
	var capitals = JSON.parse(localStorage.getItem('calander-events'));
	capitals.forEach(obj => renameKey(obj, 'event_date', 'start')); 
	capitals.forEach(obj => renameKey(obj, 'event_name', 'title')); 
	return capitals;
} 
var eventslist = rename();
console.log('capitals-after',eventslist); 

var d = new Date();
var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
    },
    defaultDate: strDate,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
        }
    },
    eventLimit: true, // allow "more" link when too many events
       events: eventslist
});

    