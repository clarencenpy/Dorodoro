Template.giftSuggestions.onRendered(function () {
    const instance = this;
    const sortable = new Sortable(instance.$('#giftsContainer')[0], {
        animation: 0,
        ghostClass: "sortable-ghost"  // Class name for the drop placeholder
    })
});