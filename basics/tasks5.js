// @strict
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// type ProductWithPaid = {
//     type: "Program" | "Course";
//     title: string;
//     price: number;
//     isPaid: boolean;
//     isFree?: never; 
// };
// type ProductWithFree = {
//     type: "Program" | "Course";
//     title: string;
//     price: number;
//     isFree: boolean;
//     isPaid?: never; 
// };
// type Product = ProductWithFree | ProductWithFree;
var productForDetailsPage = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isPaid: false,
};
var productForCheckoutPage = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isFree: true,
};
// TODO: correct the function body to calculate the product'S
// free status correctly.
// What if, we do net set the function's return type
// explicitly just let the Typescript to infer it?
//  Typesciprt is not a "Godmode", it is still possible
//  to make runtime failures. 
var isProductFree = function (product) {
    return product.isFree === true;
};
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(products) {
        this._products = products;
    }
    Object.defineProperty(ShoppingCart.prototype, "products", {
        get: function () {
            return this._products;
        },
        enumerable: false,
        configurable: true
    });
    ShoppingCart.prototype.empty = function () {
        return new ShoppingCart([]);
    };
    ShoppingCart.prototype.addProduct = function (product) {
        return new ShoppingCart(__spreadArray(__spreadArray([], this._products, true), [product], false));
    };
    return ShoppingCart;
}());
// TODO: Modify the Cart interface to make it possible
// to empty the cart.
// const emptyCart = (cart: Cart) => cart.products = []
// TODO: Modify the Cart interface to disallow pushing 
//  a new Item to the cart's products.
// TODO: Modifty the function's body below (addProductToCart), to allow
//  add a new product, but the array, remains readonly.
// const addProductToCart = (product: Product, cart: Cart) => cart.products.push(product)
var cart2 = new ShoppingCart([{ type: "Course", title: "Cat Taming", price: 0 }]);
var newCart = cart2.addProduct({ type: "Program", title: "JavaScript Basics", price: 50 });
var emptyCart = cart2.empty(); // Creates a new empty cart
var mapProductsToPrices = function (cart) {
    var mapped = {};
    cart.products.forEach(function (product) { return mapped[product.title] = product.price; });
    return mapped;
};
// TODO: Generalize the FeatureFlags interface to allow adding
// any kind of feature flag. What kind of trouble we got?
// TODO: We decided to create a separate API endpoint to get the
//  the blocked emails, in this interface we just enable the feature.
//  Modify the FeatureFlags intrface and the function signature to
//  correct the type errors.
var addFeatureFlag = function (featureFlags, feature, flag) {
    featureFlags[feature] = flag;
};
var featureFlags = {
    shoppingCart: true,
    bulkPurchase: false,
};
addFeatureFlag(featureFlags, 'newFeature', true); // Adding a new boolean feature
addFeatureFlag(featureFlags, 'blockedEmailList', ['email1@example.com', 'email2@example.com']); // Adding blocked emails
console.log(featureFlags);
// TODO: correct the PathAccount interface, using the already
//  existing Account's interface to make this function type error free.
var renderPathAccount = function (account) {
    return "<a href=\"".concat(account.path, "\">").concat(account.name, "</a>");
};
// Example usage
var account = {
    id: 1,
    name: "John Doe",
    path: "/users/johndoe",
};
console.log(renderPathAccount(account));
var renderDomainSubAccount = function (account) {
    return "<span>".concat(account.domain, ": <a href=\"/accounts/").concat(account.rootId, "\">Go To Root Account</a></span>");
};
// Revisit the Everyday Types chapter to compare the interfaces and the types. In the Object Types
// chapter it is not so elaborated: 
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// It is worth to check this chapter also in the Object Types
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// Exercise 6)
// Tuples
// TODO: complete the type to conform the function declaration.
var calculateTax = function (_a) {
    var price = _a[0], tax = _a[1];
    return price * (tax / 100);
};
// TODO: Define the return type of the function.
var calculateTotalAndDiscount = function (cartData) {
    var itemPrice = cartData[0], discounts = cartData.slice(1);
    // Initialize the total discount to zero
    var totalDiscount = discounts.reduce(function (sum, discountData) {
        var discountType = discountData[0], amount = discountData[1];
        if (discountType === 'flat') {
            // Flat discount directly subtracts amount
            return sum + amount;
        }
        else {
            // Percentage discount calculated based on original price
            return sum + (itemPrice * (amount / 100));
        }
    }, 0);
    // Calculate total after applying discounts
    var total = Math.max(itemPrice - totalDiscount, 0); // Ensure total doesn't go negative
    return [total, totalDiscount]; // Return total and total discount
};
var cart = [1000, ['flat', 10], ['percent', 20], ['flat', 100]];
var _a = calculateTotalAndDiscount(cart), total = _a[0], discount = _a[1];
console.log("Total: ".concat(total, ", Discount: ").concat(discount));
