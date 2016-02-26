Template.store.onCreated(function () {
    const template = this
    template.goingBack = !!Session.get('goingBack')
    Session.set('goingBack', false)

    //gift selection mode
    //{
    //    group:
    //    selection: [products]
    //}
})

Template.store.onRendered(function () {

    const template = this

    Session.set('header', 'Gift Store')
    this.$('.rateit').rateit();

    let gs = Session.get('giftSelection')

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

                    let id = $(draggableEl).data('id')
                    console.log(id)
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
            //draggabilly: {containment: dropArea},
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
        return Products.find()
    },
    goingBack() {
        return Template.instance().goingBack
    },

    //single selection mode
    isSelecting() {
        return !!Session.get('giftSelection')
    },
    receiverName() {
        let gs = Session.get('giftSelection')
        if (gs) {
            return Meteor.users.findOne(gs.group.receiver).profile.name
        }
    },
    selection() {
        let gs = Session.get('giftSelection')
        if (gs) {
            return gs.selection
        }
    },



    productRating(arr){
        return _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length);
    },
    selectedProduct() {
        return Session.get('selectedProduct')
    }
})

Template.store.events({
    'click .group-block'() {
        Session.set('selectedProduct', this)
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
                    votes: 0
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
    }
})

Template.store.onDestroyed(function () {
    Session.set('header', null)
})

