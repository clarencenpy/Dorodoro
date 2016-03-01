Template.searchFilter.onCreated(function () {
    const template = this
    template.maxPrice = 5000
    template.minPrice = 1000
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
        from: template.minPrice + 100,
        to: template.maxPrice - 100,
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


    'click #search-btn': function (event, template) {

    }
})

Template.searchFilter.onDestroyed(function () {

})