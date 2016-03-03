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
    name: 'groups',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'groups'})
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

FlowRouter.route('/searchFilter', {
    name: 'searchFilter',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'searchFilter'})
    }
})
FlowRouter.route('/questionnaire', {
    name: 'questionnaire',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'questionnaire'})
    }
})

/*Groups and Ideas=================================================*/
FlowRouter.route('/groups', {
    name: 'groups',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'groups'})
    }
})
FlowRouter.route('/group/:id', {
    name: 'group',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'group'})
    }
})
FlowRouter.route('/createGroup', {
    name: 'createGroup',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'createGroup'})
    }
})
FlowRouter.route('/addMembers', {
    name: 'addMembers',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'addMembers'})
    }
})
FlowRouter.route('/chat/:groupId/:productId', {
    name: 'chat',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'chat'})
    }
})

FlowRouter.route('/collectMoney/:id', {
    name: 'collectMoney',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'collectMoney'})
    }
})
/*=================================================================*/

FlowRouter.route('/camera', {
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'camera'})
    }
})
