// Menu — real items + a few descriptive details so cards feel alive
const MENU = [
  // Premium meals — bowls
  { id: 'classic-buddha', cat: 'premium', name: 'Classic Buddha Bowl',
    blurb: 'Quinoa, roasted chickpeas, tahini drizzle, seasonal greens.',
    veg: 349, nonVeg: 379, kcal: 520, time: 12, tags: ['high-protein', 'gluten-free'], tone: 'forest' },
  { id: 'mexican-burrito', cat: 'premium', name: 'Mexican Burrito Bowl',
    blurb: 'Cilantro lime rice, black beans, charred corn, avocado crema.',
    veg: 349, nonVeg: 379, kcal: 610, time: 12, tags: ['high-protein'], tone: 'tomato' },
  { id: 'hawaiian-pro', cat: 'premium', name: 'Hawaiian Pro-Bowl',
    blurb: 'Brown rice, pineapple, edamame, ginger-soy glaze.',
    veg: 349, nonVeg: 379, kcal: 580, time: 14, tags: ['high-protein'], tone: 'lavender' },
  { id: 'indian-curry', cat: 'premium', name: 'Indian Curry Bowl',
    blurb: 'Slow-cooked masala, basmati, raita, toasted cumin.',
    veg: 349, nonVeg: 379, kcal: 590, time: 14, tags: ['gluten-free'], tone: 'tomato' },
  { id: 'baked-shakshuka', cat: 'premium', name: 'Baked Shakshuka',
    blurb: 'Cherry tomato, smoked paprika, herbed labneh, sourdough.',
    veg: 349, nonVeg: 379, kcal: 540, time: 16, tags: ['high-protein'], tone: 'tomato' },
  { id: 'grilled-salad', cat: 'premium', name: 'Grilled Salad Bowl',
    blurb: 'Grilled veg, mixed leaves, sunflower seeds, lemon vinaigrette.',
    veg: 349, nonVeg: 379, kcal: 420, time: 10, tags: ['low-cal', 'gluten-free'], tone: 'forest' },
  { id: 'green-thai', cat: 'premium', name: 'Green Thai Curry Pro-Bowl',
    blurb: 'Coconut basil curry, jasmine rice, baby corn, kaffir lime.',
    veg: 349, nonVeg: 379, kcal: 600, time: 15, tags: ['high-protein'], tone: 'forest' },

  // Basic meals — single price (chicken or paneer)
  { id: 'anabolic-chicken', cat: 'basic', name: 'Anabolic Chicken Meal',
    blurb: 'Lean grilled chicken, rice, steamed broccoli — clean fuel.',
    price: 279, kcal: 480, time: 10, tags: ['high-protein'], tone: 'cream' },
  { id: 'popeye-paneer', cat: 'basic', name: 'Popeye\'s Cottage Cheese Meal',
    blurb: 'Spinach-tossed paneer, brown rice, garlic greens.',
    price: 249, kcal: 510, time: 10, tags: ['high-protein', 'gluten-free'], tone: 'forest' },
  { id: 'popeye-chicken', cat: 'basic', name: 'Popeye\'s Chicken Meal',
    blurb: 'Spinach-tossed chicken, brown rice, garlic greens.',
    price: 279, kcal: 520, time: 10, tags: ['high-protein'], tone: 'forest' },
  { id: 'schezwan-paneer', cat: 'basic', name: 'Spicy Schezwan Paneer',
    blurb: 'Paneer in fiery schezwan, hakka noodles.',
    price: 249, kcal: 540, time: 11, tags: ['high-protein'], tone: 'tomato' },
  { id: 'schezwan-chicken', cat: 'basic', name: 'Spicy Schezwan Chicken',
    blurb: 'Wok-tossed chicken, schezwan glaze, hakka noodles.',
    price: 279, kcal: 560, time: 11, tags: ['high-protein'], tone: 'tomato' },
  { id: 'tandoori-paneer', cat: 'basic', name: 'Tandoori Paneer Meal',
    blurb: 'Charred tandoori paneer, jeera rice, mint chutney.',
    price: 249, kcal: 510, time: 12, tags: ['high-protein', 'gluten-free'], tone: 'tomato' },
  { id: 'og-paneer', cat: 'basic', name: 'The "OG" Grilled Paneer',
    blurb: 'House-marinated paneer, smoky char, peri sauce.',
    price: 249, kcal: 490, time: 10, tags: ['high-protein'], tone: 'cream' },
  { id: 'og-chicken', cat: 'basic', name: 'The "OG" Grilled Chicken',
    blurb: 'House-marinated chicken, smoky char, peri sauce.',
    price: 279, kcal: 500, time: 10, tags: ['high-protein'], tone: 'cream' },
  { id: 'anabolic-paneer', cat: 'basic', name: 'Anabolic Paneer Meal',
    blurb: 'Lean grilled paneer, rice, steamed broccoli.',
    price: 249, kcal: 470, time: 10, tags: ['high-protein', 'gluten-free'], tone: 'cream' },
  { id: 'tandoori-chicken', cat: 'basic', name: 'Tandoori Grilled Chicken',
    blurb: 'Charred tandoori chicken, jeera rice, mint chutney.',
    price: 279, kcal: 520, time: 12, tags: ['high-protein', 'gluten-free'], tone: 'tomato' },

  // Wraps
  { id: 'wrap-veggie', cat: 'wraps', name: 'Classic Veggie Wrap',
    blurb: 'Hummus, grilled veg, pickled onion, multigrain wrap.',
    price: 245, kcal: 380, time: 8, tags: [], tone: 'cream' },
  { id: 'wrap-paneer-tikka', cat: 'wraps', name: 'Tandoori Paneer Tikka Wrap',
    blurb: 'Tandoori paneer, mint chutney, slaw, multigrain.',
    price: 245, kcal: 420, time: 9, tags: ['high-protein'], tone: 'tomato' },
  { id: 'wrap-veg-shawarma', cat: 'wraps', name: 'Veg Shawarma Wrap',
    blurb: 'Falafel, garlic toum, pickles, lettuce.',
    price: 245, kcal: 410, time: 9, tags: [], tone: 'cream' },
  { id: 'wrap-chicken', cat: 'wraps', name: 'Classic Chicken Wrap',
    blurb: 'Grilled chicken, lettuce, herbed yogurt, multigrain.',
    price: 275, kcal: 430, time: 8, tags: ['high-protein'], tone: 'cream' },
  { id: 'wrap-chicken-tikka', cat: 'wraps', name: 'Tandoori Chicken Tikka Wrap',
    blurb: 'Tandoori chicken, mint chutney, slaw, multigrain.',
    price: 275, kcal: 460, time: 9, tags: ['high-protein'], tone: 'tomato' },
  { id: 'wrap-chicken-shawarma', cat: 'wraps', name: 'Chicken Shawarma Wrap',
    blurb: 'Spiced chicken, garlic toum, pickles, lettuce.',
    price: 275, kcal: 470, time: 9, tags: ['high-protein'], tone: 'cream' },

  // Subs
  { id: 'sub-veggie', cat: 'subs', name: 'Classic Veggie Sub',
    blurb: 'Stacked veg, hummus, multigrain hero loaf.',
    price: 245, kcal: 440, time: 9, tags: [], tone: 'cream' },
  { id: 'sub-paneer-tikka', cat: 'subs', name: 'Tandoori Paneer Tikka Sub',
    blurb: 'Tandoori paneer, mint mayo, multigrain hero.',
    price: 245, kcal: 480, time: 10, tags: ['high-protein'], tone: 'tomato' },
  { id: 'sub-chicken', cat: 'subs', name: 'Classic Chicken Sub',
    blurb: 'Grilled chicken, lettuce, herbed yogurt.',
    price: 275, kcal: 500, time: 9, tags: ['high-protein'], tone: 'cream' },
  { id: 'sub-chicken-tikka', cat: 'subs', name: 'Tandoori Chicken Tikka Sub',
    blurb: 'Tandoori chicken, mint mayo, slaw, multigrain.',
    price: 275, kcal: 520, time: 10, tags: ['high-protein'], tone: 'tomato' },

  // Desserts
  { id: 'dessert-blueberry', cat: 'dessert', name: 'Blueberry Smoothie Bowl',
    blurb: 'Wild blueberry, banana, oats, almond butter.',
    price: 329, kcal: 410, time: 6, tags: ['gluten-free'], tone: 'lavender' },
  { id: 'dessert-fruit-punch', cat: 'dessert', name: 'Fruit Punch Smoothie Bowl',
    blurb: 'Mango, berry, granola, coconut shavings.',
    price: 329, kcal: 420, time: 6, tags: ['gluten-free'], tone: 'tomato' },
  { id: 'dessert-pancake', cat: 'dessert', name: 'High Protein Pancake',
    blurb: 'Whey-spiked oat pancakes, berries, maple drizzle.',
    price: 249, kcal: 460, time: 8, tags: ['high-protein'], tone: 'cream' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'premium', label: 'Premium Bowls' },
  { id: 'basic', label: 'Basic Meals' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'subs', label: 'Subs' },
  { id: 'dessert', label: 'Healthy Desserts' },
];

const FILTERS = [
  { id: 'high-protein', label: 'High Protein', icon: 'flame' },
  { id: 'low-cal', label: 'Under 500 kcal', icon: 'leaf' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: 'leaf' },
  { id: 'veg', label: 'Vegetarian', icon: 'leaf' },
];

// helper to get a starting price for a meal
function startPrice(item) {
  return item.price ?? item.veg ?? 0;
}

Object.assign(window, { MENU, CATEGORIES, FILTERS, startPrice });
