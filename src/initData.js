//below is a default message when user hasn't created any recipes yet
//messages is an array. Each item gets rendered with a <p> tag.
let defaultMessages = ["Welcome! Since you haven't created any recipes yet, we've shown some samples below."];

//below is the default set of recipes shown, when user hasn't created any yet.
const defaultRecipes = [
  {
    id: 1,
    name: 'Chocolate Cake',
    ingredients: [
      ['flour', '2', 'cups'],
      ['cocoa powder', '1/2', 'cups'],
      ['sugar', '2', 'cups'],
      ['egg', '2', ''],
      ['baking powder', '2', 'tsp'],
      ['basking soda', '1 1/2', 'tsp'],
      ['salt', '1', 'tsp'],
      ['milk', '1', 'cups'],
      ['oil', '1/2', 'cups'],
      ['vanilla extract', '2', 'tsp']
    ],
    instructions: [
      'Preheat oven to 350F.',
      'Mix all dry ingredients.',
      'Mix all wet ingredients.',
      'Pour wet ingredients to dry ingredients, stir until combined.',
      'Pour the batter into a cake pan. Bake for 30 minutes or until an inserted toothpick comes out clean.',
      'Remove from pan, let it cool, and EAT!'
    ]
  },
  {
    id: 2,
    name: '100 Hot Dogs',
    ingredients: [
      ['buns', '100', ''],
      ['sausage', '100', ''],
      ['ketchup', 'to taste', ''],
      ['beer', 'many', '']
    ],
    instructions: [
      'start fire',
      'grill sausages',
      'drink beer',
      'assemble hot dogs',
      'eat hot dogs',
      'drink some more beer'
    ]
  }
];

export { defaultRecipes, defaultMessages };
