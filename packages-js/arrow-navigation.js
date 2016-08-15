/**
 * Created by jasonmosley on 8/14/16.
 */

/*
* TODO: Move carat to fron on down arrow, beacuse carat jumps to back
* TODO: Function with if to move to prev or next based on carat position at front or back of item
* TODO: Catch error where cannot go to prev or next
* */

// --------------------------------------------------------------------------------
// Function: Move to previous list item
// --------------------------------------------------------------------------------
function navigateList_previous(e) {
    //console.log(e.currentTarget);
    e.currentTarget.previousSibling.focus();
}

// --------------------------------------------------------------------------------
// Function: Move to next list item
// --------------------------------------------------------------------------------
function navigateList_next(e) {
    //console.log(e.currentTarget);
    e.currentTarget.nextSibling.focus();
}

// --------------------------------------------------------------------------------
// Function: Keydown functions linked to individual items
// --------------------------------------------------------------------------------
function keyDownFunctions(e) {
    //console.log('keydown')
    switch(e.which) {
        case 37: // left
            console.log('left key');
            break;

        case 38: // up
            console.log('up key');
            navigateList_previous(e);
            break;

        case 39: // right
            console.log('right key');
            break;

        case 40: // down
            console.log('down key');
            navigateList_next(e);
            break;

        default: return; // exit this handler for other keys
    }
    //e.preventDefault(); // prevent the default action (scroll / move caret)
};