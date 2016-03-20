Template.store.onCreated(function () {
    const template = this

    //gift selection mode
    //{
    //    group:
    //    selection: [products]
    //}


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

Template.store.onRendered(function () {

    const template = this

    Session.set('header', 'Gift Store')
    this.$('.rateit').rateit();

    let gs = Session.get('giftSelection')

    //add listener to search input
    let $search = template.$('#search-input')
    $search.on('keyup', function (event) {
        let query = $search.val()
    })

    /** Draggable Code **/
    dragdrop()
    var body = document.body,
        dropArea = document.getElementById('drop-area'),
        droppableArr = [], dropAreaTimeout;

    if (!gs) {

        // initialize droppables
        [].slice.call(document.querySelectorAll('#drop-area .drop-area__item')).forEach(function (el) {
            droppableArr.push(new Droppable(el, {
                onDrop: function (instance, draggableEl) {
                    // show checkmark inside the droppabe element
                    classie.add(instance.el, 'drop-feedback');
                    clearTimeout(instance.checkmarkTimeout);
                    instance.checkmarkTimeout = setTimeout(function () {
                        classie.remove(instance.el, 'drop-feedback');
                    }, 800);

                    let groupId = $(instance.el).data('id')
                    let pid = $(draggableEl).data('id')
                    //check if product has already been added
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
            }));
        })
    } else {

        //initialize droparea for single selection mode
        droppableArr.push(new Droppable(document.getElementById('selection-droparea'), {
            onDrop: function (instance, draggableEl) {
                //add the product here!
                let id = $(draggableEl).data('id')
                let gs = Session.get('giftSelection')
                let product = Products.findOne({_id: id}, {
                    fields: {
                        image: 1
                    }
                })
                if (!_.findWhere(gs.selection, product)) {
                    gs.selection.push(product)
                }
                Session.set('giftSelection', gs)
            }
        }));
    }

    // initialize draggable(s)
    [].slice.call(document.querySelectorAll('#grid .grid__item')).forEach(function (el) {

        new Draggable(el, droppableArr, {
            draggabilly: {
                handle: '.drag-handle'
            },
            scroll : true,
            scrollable : '#drop-area',
            scrollSpeed : 40,
            scrollSensitivity : 50,
            animBack: false,
            helper: true,
            onStart: function () {

                if (!gs) {
                    // add class 'drag-active' to body
                    classie.add(body, 'drag-active');
                    // clear timeout: dropAreaTimeout (toggle drop area)
                    clearTimeout(dropAreaTimeout);
                    // show dropArea
                    classie.add(dropArea, 'show');
                }
            },
            onEnd: function (wasDropped) {
                var afterDropFn = function () {
                    // hide dropArea
                    classie.remove(dropArea, 'show');
                    // remove class 'drag-active' from body
                    classie.remove(body, 'drag-active');
                };

                if (!wasDropped) {
                    afterDropFn();
                }
                else {
                    // after some time hide drop area and remove class 'drag-active' from body
                    clearTimeout(dropAreaTimeout);
                    dropAreaTimeout = setTimeout(afterDropFn, 400);
                }
            }
        })
    });
    /** End Draggable Code **/
})

Template.store.helpers({
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
    
    
    //show a prompt if they came from the group page
    currentlySuggestingFor() {
        return Session.get('currentlySuggestingFor')
    },
    
    //onboarding prompts
    onboarded() {
        return Session.get('onboarded.giftStore')
    }
})

Template.store.events({
    'click .group-block'() {
        Session.set('selectedProduct', this)
    },
    'click .search-filter'() {
        Session.set('showFilter', true)
    },
    'click .selection-done-btn'() {
        let gs = Session.get('giftSelection')
        let ideas = []

        //query for the group, so that we can prevent adding duplicate ideas
        let group = Groups.findOne(gs.group._id)
        let giftIdeas = group.giftIdeas;

        _.each(gs.selection, function (product) {
            //check that it has not been added before
            let addedBefore = false
            _.each(giftIdeas, function (idea) {
                if (idea.productId === product._id) addedBefore = true
            })
            if (!addedBefore) {
                ideas.push({
                    contributor: Meteor.userId(),
                    date: new Date(),
                    productId: product._id,
                    votes: []
                })
            }
        })
        Groups.update(gs.group._id, {$push: {giftIdeas: {$each: ideas}}})

        //for each idea, create a chat!
        _.each(ideas, function (idea) {
            Chats.insert({
                groupId: gs.group._id,
                productId: idea.productId
            })
        })

        Session.set('giftSelection', null)
        FlowRouter.go('group', {id: gs.group._id})
    },
    'keyup #search-input'(event) {
        let title = $(event.target).val()
        let sq = Session.get('searchQuery') || {}
        sq.title = title
        Session.set('searchQuery', sq)
    },
    'click .dialog .btn-close'(event) {
        $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
        Session.set('onboarded.giftStore', true)
    }

})

Template.store.onDestroyed(function () {
    Session.set('header', null)
})

