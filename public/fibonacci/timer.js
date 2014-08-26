var timeoutId = null;
onmessage = function(event) {
    if ( event.data.start ) {
        timeoutId = setTimeout(function(){
            postMessage('timeout.start');
        },event.data.ms||0);
    }
    if ( event.data.stop && timeoutId !== null ) {
        clearTimeout(timeoutId);
    }
};