// @strict

// Exercise 1)
// Optional Properties

// TODO: Unforutnately someone extended our common
//  Product interface with isPaid property hence the
//  the isFree has been already there. Some API endpoints
//  return isFree, some isPaid. But this interface incorrectly
//  types it. It suggest they are always exists, However
//  they aren't. It can cause runtime errors. 
// Correct the Product properties to allow both API response.
interface Product {
    type: "Program" | "Course",
    title: string,
    price: number,
    isPaid?: boolean,
    isFree?: boolean,
}

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

const productForDetailsPage: Product = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isPaid: false,
}

const productForCheckoutPage: Product = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isFree: true,
}

// TODO: correct the function body to calculate the product'S
// free status correctly.
// What if, we do net set the function's return type
// explicitly just let the Typescript to infer it?
//  Typesciprt is not a "Godmode", it is still possible
//  to make runtime failures. 
const isProductFree = (product: Product): boolean => {
    return product.isFree === true;
}

// Exercise 2)
// Readonly Properties, Readonly Arrays

interface Cart {
    readonly products: Product[];
    empty(): Cart;
    addProduct(product: Product): Cart
}

class ShoppingCart implements Cart {
    private _products: Product[];

    constructor(products: Product[]) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    empty(): Cart {
        return new ShoppingCart([]); 
    }

    addProduct(product: Product): Cart {
        return new ShoppingCart([...this._products, product]);
    }
}


// TODO: Modify the Cart interface to make it possible
// to empty the cart.
// const emptyCart = (cart: Cart) => cart.products = []

// TODO: Modify the Cart interface to disallow pushing 
//  a new Item to the cart's products.
// TODO: Modifty the function's body below (addProductToCart), to allow
//  add a new product, but the array, remains readonly.
// const addProductToCart = (product: Product, cart: Cart) => cart.products.push(product)

const cart2 = new ShoppingCart([{ type: "Course", title: "Cat Taming", price: 0 }]);
const newCart = cart2.addProduct({ type: "Program", title: "JavaScript Basics", price: 50 });
const emptyCart = cart2.empty(); // Creates a new empty cart


// Exercise 3)
// Index Signatures

// TODO: Complete the CartItems interface to
// support mapping of the product's titles to
// its prices.
interface CartItems {
    [title: string]: number;
}

const mapProductsToPrices = (cart: Cart) => {
    let mapped: CartItems = {}
    cart.products.forEach(product => mapped[product.title] = product.price)
    return mapped
}

// Exercies 4)
// Index Signatures

interface FeatureFlags {
    shoppingCart: boolean,
    bulkPurchase: boolean,
    [key: string]: boolean | string[]; 
}

// TODO: Generalize the FeatureFlags interface to allow adding
// any kind of feature flag. What kind of trouble we got?
// TODO: We decided to create a separate API endpoint to get the
//  the blocked emails, in this interface we just enable the feature.
//  Modify the FeatureFlags intrface and the function signature to
//  correct the type errors.
const addFeatureFlag = (featureFlags: FeatureFlags, feature: string, flag: boolean | string[]) => {
    featureFlags[feature] = flag;
};


const featureFlags: FeatureFlags = {
    shoppingCart: true,
    bulkPurchase: false,
};

addFeatureFlag(featureFlags, 'newFeature', true); // Adding a new boolean feature
addFeatureFlag(featureFlags, 'blockedEmailList', ['email1@example.com', 'email2@example.com']); // Adding blocked emails

console.log(featureFlags);

// Exercise 4)
// Extending Inerfaces

interface Account {
    id: number,
    name: string,
}

interface PathAccount extends Account{
    path: string
}

// TODO: correct the PathAccount interface, using the already
//  existing Account's interface to make this function type error free.
const renderPathAccount = (account: PathAccount) => {
    return `<a href="${account.path}">${account.name}</a>`
}

// Example usage
const account: PathAccount = {
    id: 1,
    name: "John Doe",
    path: "/users/johndoe",
};

console.log(renderPathAccount(account));

// Exercise 5)
// Intersection Types

type SubAccount = {
    rootId: number,    
}

type DomainAccount = {
    domain: string
}

// TODO: correct the DomainSubaccount type to make the function
//   type error free.
type DomainSubaccount = DomainAccount & SubAccount
const renderDomainSubAccount = (account: DomainSubaccount) => {
    return `<span>${account.domain}: <a href="/accounts/${account.rootId}">Go To Root Account</a></span>`
}

// Revisit the Everyday Types chapter to compare the interfaces and the types. In the Object Types
// chapter it is not so elaborated: 
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// It is worth to check this chapter also in the Object Types
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

// Exercise 6)
// Tuples

// TODO: complete the type to conform the function declaration.
const calculateTax = ([price, tax]: [number, number]) => price * (tax / 100)

// Exercise 7) 
// Tuples

// TODO: Define the Discount and CartData Tuple types based on the usage
//  example and the function body below. 
type DiscountType = 'flat' | 'percent'
type Discount = [DiscountType, number]
type CartData = [number, ...Discount[]]

// TODO: Define the return type of the function.
const calculateTotalAndDiscount = (cartData: CartData): [number, number] => {
    const [itemPrice, ...discounts] = cartData;
    const totalDiscount = discounts.reduce((sum, discountData) => {
        const [discountType, amount] = discountData;
        if (discountType === 'flat') {
            return sum + amount;
        } else {
            return sum + (itemPrice * (amount / 100));
        }
    }, 0);

    const total = Math.max(itemPrice - totalDiscount, 0);
    return [total, totalDiscount];
};

const cart: CartData = [1000, ['flat', 10], ['percent', 20], ['flat', 100]]
const [total, discount] = calculateTotalAndDiscount(cart)

console.log(`Total: ${total}, Discount: ${discount}`);