FlowRouter.route('/splash', {
    action: function () {
        BlazeLayout.render("splash")
    }
})

FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render("mainLayout", {content: "home"})
    }
})

FlowRouter.route('/camera', {
    action: function () {
        BlazeLayout.render("mainLayout", {content: "camera"})
    }
})
