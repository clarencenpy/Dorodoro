Template.storeB.onCreated(function () {
    const template = this

    Session.set('searchQuery', {
        title: '',
        to: 5000,
        from: 0,
        categories: [],
        sort: {
            sortby: 'likes',
            by: -1
        }
    })
})

Template.storeB.onRendered(function () {

    const template = this

    Session.set('header', 'Gift Store')
    this.$('.rateit').rateit();

    //add listener to search input
    let $search = template.$('#search-input')
    $search.on('keyup', function (event) {
        let query = $search.val()
    })

})

Template.storeB.helpers({
    products() {
        let queryParams = {}
        let sq = Session.get('searchQuery')
        let sortBy = sq.sort.sortby

        let products = Products.find({isUserSubmitted: {$in: [null, undefined, false]}}).fetch()
        products = _.map(products, function (product) {
            if (sq.title.length > 0 && product.title.toUpperCase().search(sq.title.toUpperCase()) < 0) product.hide = true
            if (product.price < sq.from || product.price > sq.to) product.hide = true
            let inAllCategories = true
            _.each(sq.categories, function (cat) {
                if (_.indexOf(product.category, cat) === -1) inAllCategories = false
            })
            if (!inAllCategories) product.hide = true
            return product
        })

        if (sortBy === 'likes') {
            products = _.sortBy(products, 'likes')
            if (sq.sort.by < 0) products.reverse()
        }
        if (sortBy === 'price') {
            products = _.sortBy(products, 'price')
            if (sq.sort.by < 0) products.reverse()
        }
        /*if(sortby === 'rating'){
         return Products.find(queryParams, {sort: { $avg{}: sq.sort.by }})
         }*/
        return products
    },

    groups() {
        return Groups.find({$or: [{members: Meteor.userId()}, {createdBy: Meteor.userId()}]}, {sort: {date: -1}})
    },

    productRating(arr){
        return _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length);
    },

    selectedProduct() {
        return Session.get('selectedProduct')
    },
    showFilter(){
        return Session.get('showFilter')
    },
    currentGift() {
        return Session.get('currentGift')
    },
    //onboarding prompts
    onboarded() {
        return Session.get('onboarded.giftStore')
    }
})

Template.storeB.events({
    'click .group-block'() {
        Session.set('selectedProduct', this)
    },
    'click .search-filter'() {
        Session.set('showFilter', true)
    },
    'keyup #search-input'(event, template) {
        let title = $(event.target).val()
        let sq = Session.get('searchQuery') || {}
        sq.title = title
        Session.set('searchQuery', sq)
    },
    
    'click .dialog .btn-close'(event) {
        $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
    },

    'click .drag-handle'(event, template) {
        event.stopPropagation()
        Session.set('currentGift', this._id)
        template.$('.group-dialog').removeClass("dialog--close").addClass('dialog--open')
    },
    'click .group-btn'(event) {
        $(event.target).addClass('tick-feedback')

        Meteor.setTimeout(function() {
            $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
        }, 1000)

        Meteor.setTimeout(function () {
            Session.set('currentGift', null)
        }, 2000)


        let pid = Session.get('currentGift')
        if (!pid) return
        let groupId = this._id
        let group = Groups.findOne(groupId)
        let addedBefore = false
        _.each(group.giftIdeas, function (idea) {
            if (idea.productId === pid) addedBefore = true
        })
        if (!addedBefore) {
            Groups.update(groupId, {
                $push: {
                    giftIdeas: {
                        productId: pid,
                        contributor: Meteor.userId(),
                        date: new Date(),
                        votes: []
                    }
                }
            })

            //create a chat!
            Chats.insert({
                groupId: groupId,
                productId: pid
            })
        }
    }

})

Template.storeB.onDestroyed(function () {
    Session.set('header', null)
})

