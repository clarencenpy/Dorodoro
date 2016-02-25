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

FlowRouter.route('/group', {
    name: 'group',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'group'})
    }
})

FlowRouter.route('/chosenGift', {
    name: 'chosenGift',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'chosenGift'})
    }
})

FlowRouter.route('/camera', {
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'camera'})
    }
})
