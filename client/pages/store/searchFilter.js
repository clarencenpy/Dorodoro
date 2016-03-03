Template.searchFilter.onCreated(function () {
    const template = this
    template.maxPrice = 5000
    template.minPrice = 0
    template.categories = [
        {
            name: 'Sport',
            image: '/images/sport.png'
        },
        {
            name: 'Fashion',
            image: '/images/fashion.png'
        },
        {
            name: 'Gadget',
            image: '/images/gadget.png'
        },
        {
            name: 'Living',
            image: '/images/home&living.png'
        },
        {
            name: 'Book',
            image: '/images/book.png'
        },
        {
            name: 'Game',
            image: '/images/game.png'
        }
    ]
})

Template.searchFilter.onRendered(function () {
    const template = this

    $('#slider').ionRangeSlider({
        min: template.minPrice,
        max: template.maxPrice,
        from: Session.get("searchQuery"),
        to: Session.get("searchQuery"),
        type: 'double',
        prefix: "$",

        onFinish: function (data) {
            let sq = Session.get('searchQuery')
            if (sq) {
                sq.to = data.to
                sq.from = data.from
            } else {
                sq = {
                    to: data.to,
                    from: data.from
                }
            }
            Session.set('searchQuery', sq)
        }
    });
})

Template.searchFilter.helpers({
    categories() {
        return Template.instance().categories
    },
    gender() {
        return {
            male: 'm',
            female: 'f'
        }
    },
    isCategorySelected(category) {
        return _.find(Session.get('searchQuery').categories, function (cat) {
            return cat === category
        })
    },
    sortby(sortby){
        return Session.get('searchQuery').sort.sortby === sortby
    },
    sort(sortby){
        return Session.get('searchQuery').sort.by === sortby
    }
})

Template.searchFilter.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('slideOutUp')
        Meteor.setTimeout(function () {
            Session.set('showFilter', false)
        }, 1000)
    },
    'click .category-btn'() {
        let name = this.name
        let sq = Session.get('searchQuery')
        if (!_.find(sq.categories, function (category) {
                return category === name
            })) {
            sq.categories.push(name)
        } else {
            sq.categories = _.without(sq.categories, name)
        }
        Session.set('searchQuery', sq)

    },
    'click .gender-btn'() {
        let gender = this.toString()
        gender = gender === 'm' ? 'For Him' : 'For Her'
        let sq = Session.get('searchQuery')
        if (!_.find(sq.categories, function (category) {
                return category === gender
            })) {
            sq.categories.push(gender)
        } else {
            sq.categories = _.without(sq.categories, gender)
        }
        Session.set('searchQuery', sq)
    },


    'click #filter-done-btn': function (event, template) {
        template.$('.modal-container').addClass('slideOutUp')
        Meteor.setTimeout(function () {
            Session.set('showFilter', false)
        }, 1000)
    },

    'click #sortby-likes': function (event, template) {
        let sq = Session.get('searchQuery')
        let sortby = sq.sort.sortby
        if(sortby === 'likes'){
            if(template.$('#sortby-likes').hasClass('ion-arrow-up-c')){
                sq.sort = {sortby: 'likes', by: -1}
                Session.set('searchQuery', sq)
            }else{
                sq.sort = {sortby: 'likes', by: 1}
                Session.set('searchQuery', sq)
            }
        }else{
            sq.sort = {sortby: 'likes', by: -1}
            Session.set('searchQuery', sq)
        }
    },
    'click #sortby-price': function (event, template) {
        let sq = Session.get('searchQuery')
        let sortby = sq.sort.sortby
        if(sortby === 'price'){
            if(template.$('#sortby-price').hasClass('ion-arrow-up-c')){
                sq.sort = {sortby: 'price', by: -1}
                Session.set('searchQuery', sq)
            }else{
                sq.sort = {sortby: 'price', by: 1}
                Session.set('searchQuery', sq)
            }
        }else{
            sq.sort = {sortby: 'price', by: 1}
            Session.set('searchQuery', sq)
        }
    },
    'click #sortby-rating': function (event, template) {
        let sq = Session.get('searchQuery')
        let sortby = sq.sort.sortby
        if(sortby === 'rating'){
            if(template.$('#sortby-rating').hasClass('ion-arrow-up-c')){
                template.$('#sortby-rating').removeClass('ion-arrow-up-c')
                template.$('#sortby-rating').addClass('ion-arrow-down-c')
                sq.sort = {sortby: 'rating', by: 1}
                Session.set('searchQuery', sq)
            }else{
                template.$('#sortby-rating').removeClass('ion-arrow-down-c')
                template.$('#sortby-rating').addClass('ion-arrow-up-c')
                sq.sort = {sortby: 'rating', by: -1}
                Session.set('searchQuery', sq)
            }
        }else{
            sq.sort = {sortby: 'rating', by: -1}
            Session.set('searchQuery', sq)
        }
    }
})

Template.searchFilter.onDestroyed(function () {

})