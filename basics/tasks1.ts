// If you get stucked, here is the docs: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

// Exercise 1, 
// Create the Product interface based on the following example products.
// - type can be only "Program" or "Course"
// - currency can be only "USD", "HUF", "EUR"
//
// If you get stuck with the createdAt, check what is the return type of
// Date.parse (you can hover your mouse over it).

export interface Product {

    id: number,
    title: string,
    price: string,
    createdAt: number,
    currency: 'HUF' | 'EUR' | 'USD'; 
    type: 'Course' | 'Program'; 
    relatedCourses: Product[];
  }
  
  const products: Product[] = [
    {
      id: 4,
      title: "How to Hack NASA with HTML",
      price: "5000.00",
      createdAt: Date.parse("2022-05-18T14:48:00"),
      currency: "HUF",
      type: "Course",
      relatedCourses: [],
    },
    {
      id: 6,
      title: "Cat Grooming Masterclass",
      price: "10.00",
      createdAt: Date.parse("2022-05-19T16:00:00"),
      currency: "USD",
      type: "Program",
      relatedCourses: [
        {
          id: 11,
          title: "Lying Yourself, that you are the Master",
          price: "0.00",
          createdAt: Date.parse("2022-05-18T16:00:00"),
          currency: "USD",
          type: "Course",
          relatedCourses: [],
        },
        {
          id: 16,
          title: "Taming your cat, a life long learning",
          price: "0.00",
          createdAt: Date.parse("2022-05-17T16:00:00"),
          currency: "USD",
          type: "Course",
          relatedCourses: [],
        },
      ],
    },
  ]
  
  
  // Exercise 2,
  // Add type annotations to the arguements and return types 
  // of these two functions. 
  
  function filterCourses(products: Product[] ): Product[]  {
    return products.filter(product => product.type === 'Course')
  }
  
  function getTitles(products: Product[]) :string[]{
   return products.map(product => product.title)
  }
  
  // Exercise 3,
  // When Typescript infers correctly the types and when it is necessary
  // to define them explicitly? Try to remove type annotations from the 
  // filterCourses and getTitles functions
  // above. Hover the mouse to the variables to check the inferred types.
  // When do you see "any", and when something else?
  
  // This two functions just here to check the proper return type in the tests.

  // A: 
  // TypeScript infers return types correctly (e.g., Product[] for filterCourses, string[] for getTitles).
  // However, function parameters default to 'any' if not explicitly typed, losing type safety.
  // It's important to define parameter types (e.g., products: Product[]) explicitly, 
  // while return types can often be inferred.

  const courses = filterCourses(products)
  const titles = getTitles(products)
  
  
  // Exercise 4,
  // Can I pass a Product object to the format Price function without
  // typescript error? Why? 
  // Spot that the inline type annotation here is different than the
  // Product's type definition.  


  //A:
  // TypeScript allows passing a Product object to formatPrice because it contains the required properties (price and currency), 
  // even if it has extra fields like id and title. This works due to TypeScript's structural typing.

  function formatPrice(product: {price: string, currency: string}) {
    return `${product.price} ${product.currency}`
  }
  
  // passing a product to the function, for tests only.
  const price = formatPrice(products[0])
  
  
  
  
  // Spoiler Alert!
  //
  // The exercises are over. Here are some type tests to check
  // your solutions. They should be error free. Also here you can 
  // check some solutions too.
  //
  
  typeAssert<IsTypeEqual<Product, {id: number, title: string, price: string, createdAt: number, currency: 'HUF'|'EUR'|'USD', type: 'Course'|'Program', relatedCourses: Product[]}>>()
  typeAssert<IsTypeEqual<typeof courses, Product[]>>()
  typeAssert<IsTypeEqual<typeof titles, string[]>>()
  typeAssert<IsTypeEqual<typeof price, string>>()

  //
// Type Assert Helper functions, nothing to do with them,
// they are used for the type tests.
// 

/**
 * Checks if T1 equals to T2.
 */
type IsTypeEqual<T1, T2> = IsNotAny<T1> extends false ? false : (
    IsNotAny<T2> extends false ? false : (
        [T1] extends [T2] ? ([T2] extends [T1] ? true : false): false
    )
);

/**
 * Checks if T2 can be assigned to T1.
 */
export type IsTypeAssignable<T1, T2> = IsNotAny<T1> extends false ? false : (
    IsNotAny<T2> extends false ? false : (
        [T2] extends [T1] ? true : false
    )
);

/**
 * Returns `false` if `any` is specified, otherwise returns `true`.
 * @see https://stackoverflow.com/a/49928360/3406963
 */
export type IsNotAny<T> = 0 extends (1 & T) ? false : true;

/**
 * A simple type assertion function which always expects a true-type.
 */
export function typeAssert<T extends true>() {}