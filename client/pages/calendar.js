Template.calendar.onRendered(function () {
    Tracker.afterFlush(function () {
        $.getScript('/framework.js')
    })
})