Template.home.onRendered(function () {
    Tracker.afterFlush(function () {
        $.getScript('/framework.js')
    })
})
