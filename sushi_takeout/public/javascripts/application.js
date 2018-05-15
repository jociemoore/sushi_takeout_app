var App = {
  templates: JST,
  $el: $('#content'),
  renderMenu: function() {
    this.menu.each(this.renderItemView);
  },
  renderItemView: function(menuItem) {
    new ItemView({
      model: menuItem,
    });
  },
  renderHeader: function() {
    this.header = new HeaderView({
      collection: this.cart,
    });
  },
  indexView: function() {
    this.index = new IndexView();
    this.renderMenu();
    this.createCart();
    this.renderHeader();
    this.bindEvents();
  },
  createCart: function() {
    this.cart = new Cart();
    this.cart.view = new CartView({
      collection: this.cart,
    });
  },
  getItemDetails: function(id) {
    var id = Number(id) - 1;
    var item = this.menu.get(id);
    new ItemDetailsView({
      model: item,
    });
  },
  goToCheckout: function() {
    this.checkout = new CheckoutView({
      collection: this.cart,
    });
  },
  emptyCart: function() {
    this.cart.reset();
    this.indexView();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.index, 'get_item_details', this.getItemDetails);
    this.listenTo(this.cart.view, 'go_to_checkout', this.goToCheckout);
    this.listenTo(this.cart.view, 'empty_cart', this.emptyCart);
    this.listenTo(this.header, 'go_to_homepage', this.indexView);
    this.on('go_to_homepage', this.emptyCart);
    this.on('add_to_cart', this.cart.addItem.bind(this.cart));
    this.on('remove_from_cart', this.cart.removeItem.bind(this.cart));
  },
}