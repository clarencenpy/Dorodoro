FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'notFound'})
    }
};

FlowRouter.route('/splash', {
    action: function () {
        BlazeLayout.render('splash')
    }
})

FlowRouter.route('/balls', {
    action: function () {
        BlazeLayout.render('giftSuggestions')
    }
})

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'home'})
    }
})

FlowRouter.route('/calendar', {
    name: 'calendar',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'calendar'})
    }
})

/*Gift Store=======================================================*/
FlowRouter.route('/store', {
    name: 'store',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'store'})
    }
})
FlowRouter.route('/product/:id', {
    name: 'product',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'product'})
    }
})

/*Groups and Ideas=================================================*/
FlowRouter.route('/group', {
    name: 'group',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'group'})
    }
})
FlowRouter.route('/chat', {
    name: 'chat',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'chat'})
    }
})

FlowRouter.route('/camera', {
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'camera'})
    }
})
