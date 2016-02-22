FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'notFound'})
    }
};

FlowRouter.route('/splash', {
    action: function () {
        BlazeLayout.render("splash")
    }
})

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render("mainLayout", {content: "home"})
    }
})

FlowRouter.route('/calendar', {
    name: 'calendar',
    action: function () {
        BlazeLayout.render("mainLayout", {content: "calendar"})
    }
})

FlowRouter.route('/camera', {
    action: function () {
        BlazeLayout.render("mainLayout", {content: "camera"})
    }
})
