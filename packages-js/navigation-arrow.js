/**
 * Created by jasonmosley on 8/14/16.
 */

/*
* -- TODO: Move carat to front on down arrow, beacuse carat jumps to back.
* -- Working TODO: Function with if to move to prev or next based on carat position at front or back of item.
* TODO: Catch error where cannot go to prev or next.
* -- preventDefault fixed TODO: Cursor jumps to second character coming from last item.
* -- moveCursor function TODO: Move Cursor to end of prev div when coming from start.
* TODO: navigate lines inside contentEditable.
* */

// --------------------------------------------------------------------------------
// Function: Move to previous list item.
// --------------------------------------------------------------------------------
function navigateList_previous(e, moveCarat_location) {
    e.preventDefault(); // prevent the default action (scroll / move caret)
    //console.log(e.currentTarget);
    var previous = e.currentTarget.previousSibling;
    previous.focus();

    moveCarat(previous, moveCarat_location);
}


// --------------------------------------------------------------------------------
// Function: Move to next list item.
// --------------------------------------------------------------------------------
function navigateList_next(e, moveCarat_location) {
    e.preventDefault(); // prevent the default action (scroll / move caret)
    //console.log(e.currentTarget);
    var next = e.currentTarget.nextSibling;
    next.focus();

    moveCarat(next, moveCarat_location);
}


// --------------------------------------------------------------------------------
// Function: Return the location of the carat, beginning or end.
// --------------------------------------------------------------------------------
function caratLocation(e) {
    var atStart = false,
        atEnd = false;
    var selRange,
        testRange;

    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            selRange = sel.getRangeAt(0);
            testRange = selRange.cloneRange();

            console.log(testRange)
            testRange.selectNodeContents(e);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            atStart = (testRange.toString() == "");

            testRange.selectNodeContents(e);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            atEnd = (testRange.toString() == "");
        }
    } else if (document.selection && document.selection.type != "Control") {
        selRange = document.selection.createRange();
        testRange = selRange.duplicate();

        testRange.moveToElementText(e);
        testRange.setEndPoint("EndToStart", selRange);
        atStart = (testRange.text == "");

        testRange.moveToElementText(e);
        testRange.setEndPoint("StartToEnd", selRange);
        atEnd = (testRange.text == "");
    }

    return { atStart: atStart, atEnd: atEnd };
}


// --------------------------------------------------------------------------------
// Function: Move carat to location in div
// --------------------------------------------------------------------------------
function moveCarat(el, location) {
    switch(location) {
        case 'start':
            //console.log('moveToStart');
            placeCaretAtStart(el);
            break;
        case 'end':
            //console.log('moveToEnd');
            placeCaretAtEnd(el);
            break;
    }
}

// --------------------------------------------------------------------------------
// Function: Move carat to end
function placeCaretAtEnd(el) {
    console.log('moveToEnd');
    console.log(el)
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

// --------------------------------------------------------------------------------
// Function: Move carat to start
function placeCaretAtStart(el) {
    //console.log('moveToStart');
    console.log(el)
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(true);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.select();
    }
}


// --------------------------------------------------------------------------------
// Function: Keydown functions linked to individual items.
// --------------------------------------------------------------------------------
function keyDownFunctions(e) {
    //console.log('keydown')
    var caratInfo = caratLocation(e.currentTarget); // get carat info object
    //console.log(caratInfo);

    switch(e.which) {
        case 37: // left
            console.log('left key');

            if (caratInfo.atStart == true) {
                console.log("atStart");
                navigateList_previous(e, 'end');
                //moveCarat(e.currentTarget, 'end');
            }
            break;

        case 38: // up
            console.log('up key');
            navigateList_previous(e, 'start');
            break;

        case 39: // right
            console.log('right key');

            if (caratInfo.atEnd == true) {
                console.log("atEnd");
                navigateList_next(e, 'start');
                //moveCarat(e.currentTarget, 'start');
            }
            break;

        case 40: // down
            console.log('down key');
            navigateList_next(e, 'start');
            break;

        default: return; // exit this handler for other keys
    }
    //e.preventDefault(); // prevent the default action (scroll / move caret)
};