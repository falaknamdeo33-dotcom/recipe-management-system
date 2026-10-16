import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RecipeContext = createContext(null);
const STORAGE_KEY = "recipe-book-data";
const STARTER_VERSION = 9;

const starterRecipes = [
  {
    id: "lemon-pasta",
    title: "Creamy Lemon Pasta",
    description: "Bright lemon, parmesan, and fresh herbs make this an easy weeknight favorite.",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    ingredients: ["200 g dried pasta", "1 lemon, zested and juiced", "1 small garlic clove, finely grated", "2 tbsp olive oil", "30 g butter", "50 g finely grated parmesan, plus extra to serve", "120 ml reserved pasta water", "Fresh parsley and black pepper"],
    instructions: ["Bring a pot of well-salted water to a boil. Cook the pasta until al dente, following the packet time; reserve a mug of pasta water before draining.", "While the pasta cooks, gently warm the olive oil and garlic in a large pan for about 30 seconds. Do not let the garlic brown.", "Add the drained pasta, lemon zest and juice, butter, and a splash of pasta water. Toss over low heat.", "Add parmesan a little at a time, tossing and adding pasta water until the sauce turns glossy and coats the pasta.", "Season with black pepper, taste for salt and lemon, and finish with parsley and extra parmesan."],
  },
  {
    id: "avocado-toast",
    title: "Avocado Breakfast Toast",
    description: "Crispy sourdough topped with creamy avocado, chili flakes, and a squeeze of lime.",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 slices sourdough bread", "1 ripe avocado", "1/2 lime", "Chili flakes", "Salt and pepper"],
    instructions: ["Toast the sourdough until golden.", "Mash the avocado with lime juice, salt, and pepper.", "Spread over the toast and finish with chili flakes."],
  },
  {
    id: "tomato-salad",
    title: "Fresh Tomato & Basil Salad",
    description: "Juicy tomatoes, basil, and a simple balsamic dressing for a fresh side.",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Fresh ripe tomatoes still on the vine",
    time: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: ["500 g ripe tomatoes", "A handful of fresh basil", "2 tbsp olive oil", "1 tbsp balsamic vinegar", "Salt and pepper"],
    instructions: ["Slice the tomatoes and arrange on a serving plate.", "Drizzle with olive oil and balsamic vinegar.", "Season and finish with torn basil leaves."],
  },
  {
    id: "mango-overnight-oats",
    title: "Banana Coconut Overnight Oats",
    description: "Cool, creamy make-ahead oats topped with banana, coconut, and cacao nibs.",
    category: "Breakfast",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Banana_Oatmeal_Breakfast_Bowl_%2844302857265%29.jpg",
    imageAlt: "Oatmeal breakfast bowl topped with banana and cacao nibs",
    imageCredit: "Ella Olsson",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Banana_Oatmeal_Breakfast_Bowl_(44302857265).jpg",
    imageLicense: "CC BY 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    illustration: "🥣",
    time: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: ["1 cup rolled oats", "1 cup milk or oat milk", "1/2 cup plain yogurt", "1 ripe banana, sliced", "2 tbsp shredded coconut", "1 tbsp chia seeds", "1 tbsp cacao nibs"],
    instructions: ["Stir oats, milk, yogurt, and chia seeds together in a bowl or jar.", "Cover and refrigerate for at least 4 hours, preferably overnight.", "Top with sliced banana, coconut, and cacao nibs before serving."],
    restTime: "Chill for at least 4 hours",
  },
  {
    id: "shakshuka",
    title: "Smoky Tomato Shakshuka",
    description: "Eggs gently poached in a warmly spiced tomato and pepper sauce. Perfect with crusty bread.",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=85",
    time: 35,
    servings: 4,
    difficulty: "Medium",
    ingredients: ["1 tbsp olive oil", "1 red bell pepper, diced", "1 small onion, diced", "2 garlic cloves, minced", "1 tsp smoked paprika", "1 can (400 g) crushed tomatoes", "4 large eggs", "Fresh parsley"],
    instructions: ["Warm the oil in a skillet and cook the pepper and onion until soft.", "Add garlic and smoked paprika; cook for 30 seconds.", "Stir in tomatoes and simmer for 10 minutes until thickened.", "Make four small wells, add an egg to each, cover, and cook until the whites are set.", "Scatter with parsley and serve with bread."],
  },
  {
    id: "chickpea-spinach-curry",
    title: "Chickpea & Spinach Coconut Curry",
    description: "A cozy, gently spiced one-pot curry with creamy coconut milk and plenty of greens.",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Indian curry garnished with fresh herbs",
    illustration: "🥬",
    time: 30,
    servings: 4,
    difficulty: "Easy",
    ingredients: ["1 tbsp vegetable oil", "1 onion, diced", "2 tbsp curry powder", "1 can (400 ml) coconut milk", "2 cans (400 g each) chickpeas, drained and rinsed", "150 g baby spinach", "1 lime", "Salt, to taste", "Cooked rice, to serve"],
    instructions: ["Cook the onion in oil until soft, then stir in the curry powder and cook for 30 seconds.", "Add coconut milk and chickpeas; simmer gently for 15 minutes.", "Fold in the spinach and cook just until wilted.", "Season with salt and lime juice, then serve over rice."],
  },
  {
    id: "miso-salmon-bowl",
    title: "Ginger Miso Salmon Bowls",
    description: "Glazed salmon, fluffy rice, crisp cucumber, and a bright sesame-lime dressing.",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Roasted salmon served with vegetables",
    illustration: "🐟",
    time: 35,
    servings: 2,
    difficulty: "Medium",
    ingredients: ["2 salmon fillets (about 150 g each)", "1 tbsp white miso", "1 tbsp honey", "1 tsp grated ginger", "2 cups cooked rice", "1 cucumber, sliced", "1 tsp sesame oil", "1 lime"],
    instructions: ["Heat the oven to 220°C (425°F) and line a baking tray. Cook or warm the rice according to its package instructions.", "Mix miso, honey, and ginger; brush over the salmon.", "Bake for 10–12 minutes, until the thickest part reaches 63°C (145°F) or flakes easily.", "Divide the rice and cucumber between bowls, add the salmon, and finish with sesame oil and lime."],
  },
  {
    id: "caprese-pesto-flatbread",
    title: "Caprese Pesto Flatbread",
    description: "Crisp flatbread topped with basil pesto, ripe tomatoes, and melty mozzarella.",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Baked flatbread topped with tomatoes and cheese",
    illustration: "🫓",
    time: 20,
    servings: 2,
    difficulty: "Easy",
    ingredients: ["2 flatbreads", "4 tbsp basil pesto", "150 g mozzarella, torn", "200 g cherry tomatoes, halved", "Fresh basil", "1 tsp balsamic glaze"],
    instructions: ["Heat the oven to 220°C (425°F).", "Spread pesto over the flatbreads and top with mozzarella and tomatoes.", "Bake for 8–10 minutes until crisp and bubbling.", "Finish with fresh basil and a drizzle of balsamic glaze."],
  },
  {
    id: "strawberry-yogurt-bark",
    title: "Strawberry Yogurt Bark",
    description: "A refreshing freezer treat with creamy yogurt, juicy berries, and a little dark chocolate crunch.",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Strawberry yogurt dessert topped with fresh berries",
    time: 15,
    servings: 6,
    difficulty: "Easy",
    ingredients: ["2 cups thick Greek yogurt", "2 tbsp honey", "150 g strawberries, sliced", "2 tbsp chopped pistachios", "30 g dark chocolate, chopped"],
    instructions: ["Line a rimmed tray with baking paper.", "Stir honey into the yogurt and spread it evenly over the tray.", "Scatter strawberries, pistachios, and chocolate over the top.", "Freeze for at least 3 hours, then break into pieces and serve straight from the freezer."],
    restTime: "Freeze for at least 3 hours",
  },
  {
    id: "homestyle-poha",
    title: "Homestyle Kanda Poha",
    description: "A comforting Maharashtrian breakfast of soft flattened rice, onion, potato, peanuts, and a bright squeeze of lemon.",
    category: "Breakfast",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Poha_in_the_Morning_-_Indori_Food.jpg",
    imageAlt: "A serving of Indori poha",
    imageCredit: "Shubhkasera",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Poha_in_the_Morning_-_Indori_Food.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "🥣",
    time: 25,
    servings: 3,
    difficulty: "Easy",
    ingredients: ["2 cups thick poha (flattened rice)", "1 small onion, finely chopped", "1 small potato, diced small", "2 tbsp roasted peanuts", "1 green chilli, finely chopped", "1/2 tsp mustard seeds", "8 curry leaves", "1/4 tsp turmeric", "1 tbsp oil", "1/2 lemon", "Fresh coriander and salt"],
    instructions: ["Rinse the poha briefly in a sieve, drain well, and let it soften for 5 minutes. Mix in turmeric and salt.", "Heat oil in a pan. Add mustard seeds; when they pop, add curry leaves, chilli, peanuts, and potato.", "Cover and cook the potato until tender, adding a splash of water if needed. Stir in the onion and cook until soft.", "Fold in the poha and warm gently for 2–3 minutes. Finish with lemon juice and coriander."],
  },
  {
    id: "dal-tadka",
    title: "Ghar Ka Dal Tadka",
    description: "Everyday yellow lentils finished with a sizzling cumin, garlic, and ghee tadka. Lovely with rice or roti.",
    category: "Dinner",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/31/Dal_Tadka_And_Rice.JPG",
    imageAlt: "Dal tadka served with rice",
    imageCredit: "Siya Bedi",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Dal_Tadka_And_Rice.JPG",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "🍛",
    time: 40,
    servings: 4,
    difficulty: "Easy",
    ingredients: ["1 cup toor dal (split pigeon peas)", "3 cups water", "1/2 tsp turmeric", "1 small tomato, chopped", "1 tbsp ghee", "1 tsp cumin seeds", "3 garlic cloves, sliced", "1/4 tsp red chilli powder", "Salt", "Fresh coriander"],
    instructions: ["Rinse the dal. Simmer with water and turmeric until completely soft, about 25–30 minutes; add water as needed.", "Lightly mash the cooked dal, stir in the tomato and salt, and simmer for 5 minutes.", "For the tadka, heat ghee in a small pan. Add cumin seeds, then garlic; cook until fragrant and lightly golden.", "Turn off the heat, stir in the chilli powder, and immediately pour the tadka over the dal. Garnish with coriander."],
  },
  {
    id: "aloo-paratha",
    title: "Aloo Paratha with Dahi",
    description: "Golden, pan-toasted flatbreads filled with warmly spiced potato, served the way home kitchens do it—with cool yogurt.",
    category: "Breakfast",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Aloo_Paratha_North_Indian.jpg",
    imageAlt: "Aloo paratha, a North Indian potato-stuffed flatbread",
    imageCredit: "Onef9day",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Aloo_Paratha_North_Indian.jpg",
    imageLicense: "CC BY-SA 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    illustration: "🫓",
    time: 40,
    servings: 4,
    difficulty: "Medium",
    restTime: "Rest the dough for 20 minutes",
    ingredients: ["2 cups whole-wheat atta", "About 3/4 cup water", "3 medium potatoes, boiled and peeled", "1 green chilli, finely chopped", "1/2 tsp cumin seeds", "1/2 tsp garam masala", "2 tbsp chopped coriander", "Salt", "Ghee or oil for cooking", "Plain yogurt, to serve"],
    instructions: ["Mix atta with a pinch of salt and enough water to make a soft dough. Cover and rest for 20 minutes.", "Mash the potatoes until smooth. Mix with chilli, cumin, garam masala, coriander, and salt.", "Divide dough and filling into 8 portions. Roll each dough portion into a small disc, add filling, seal, and gently roll out again.", "Cook each paratha on a hot tawa, turning and brushing with ghee, until both sides are golden. Serve hot with yogurt."],
  },
  {
    id: "paneer-bhurji",
    title: "Quick Paneer Bhurji",
    description: "Soft crumbled paneer cooked with onion, tomato, and everyday masalas—ready for roti, toast, or a lunchbox.",
    category: "Lunch",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Paneer_Bhurji.jpg",
    imageAlt: "Paneer bhurji made with crumbled paneer",
    imageCredit: "Mradulkapoor",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Paneer_Bhurji.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "🧀",
    time: 25,
    servings: 3,
    difficulty: "Easy",
    ingredients: ["250 g paneer, crumbled", "1 tbsp oil or ghee", "1 small onion, finely chopped", "1 tomato, chopped", "1 green chilli, finely chopped", "1/4 tsp turmeric", "1/2 tsp cumin", "1/2 tsp garam masala", "2 tbsp chopped coriander", "Salt"],
    instructions: ["Heat oil or ghee in a pan. Add cumin and let it sizzle briefly.", "Add onion and green chilli; cook until the onion turns translucent.", "Stir in tomato, turmeric, garam masala, and salt. Cook until the tomato softens.", "Fold in crumbled paneer and cook for 2–3 minutes. Finish with coriander and serve warm."],
  },
  {
    id: "vegetable-pulao",
    title: "One-Pot Vegetable Pulao",
    description: "Fragrant basmati rice with vegetables and whole spices for a simple, satisfying family meal.",
    category: "Dinner",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Vegetable_Pulao_as_served_in_South_India.jpg",
    imageAlt: "Vegetable pulao served in South Indian style",
    imageCredit: "Vardhankoshal",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Vegetable_Pulao_as_served_in_South_India.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "🍚",
    time: 25,
    servings: 4,
    difficulty: "Easy",
    restTime: "Soak rice for 20 minutes; rest cooked pulao for 5 minutes",
    ingredients: ["1 1/2 cups basmati rice, rinsed and soaked 20 minutes", "1 tbsp ghee or oil", "1 small onion, sliced", "1 cup mixed vegetables", "1 bay leaf", "1 small cinnamon stick", "2 green cardamom pods", "2 1/4 cups water", "Salt", "Fresh coriander, to serve"],
    instructions: ["Heat ghee in a heavy pot. Add bay leaf, cinnamon, and cardamom; stir until fragrant.", "Add onion and cook until lightly golden. Stir in the mixed vegetables.", "Drain the soaked rice and add it to the pot. Stir gently for 1 minute.", "Add water and salt. Bring to a boil, then cover and cook on low until the rice is tender and the water is absorbed, about 12–15 minutes.", "Rest covered for 5 minutes, fluff gently, and serve with coriander."],
  },
  {
    id: "vegetable-upma",
    title: "Soft Vegetable Upma",
    description: "A simple South Indian breakfast of toasted semolina, vegetables, curry leaves, and a little lemon.",
    category: "Breakfast",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Upma_%2810051975223%29.jpg",
    imageAlt: "A serving of South Indian upma",
    imageCredit: "Devika",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Upma_(10051975223).jpg",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    illustration: "🥣",
    time: 25,
    servings: 3,
    difficulty: "Easy",
    ingredients: ["1 cup coarse rava (semolina)", "1 tbsp oil or ghee", "1/2 tsp mustard seeds", "1 tsp urad dal (optional)", "8 curry leaves", "1 small onion, chopped", "1 small carrot, diced", "2 1/2 cups hot water", "Salt", "1/2 lemon", "Fresh coriander"],
    instructions: ["Dry-roast the rava in a pan over low heat for 4–5 minutes, stirring often. Tip into a bowl.", "Heat oil or ghee in the pan. Add mustard seeds and urad dal; when the seeds pop, add curry leaves and onion.", "Cook the onion until soft, then add the carrot and cook for 2 minutes.", "Carefully add hot water and salt; bring to a steady boil.", "Lower the heat and slowly rain in the rava while stirring to prevent lumps.", "Cover and cook on low for 3–4 minutes. Finish with lemon juice and coriander."],
  },
  {
    id: "moong-dal-khichdi",
    title: "Gentle Moong Dal Khichdi",
    description: "A soothing one-pot meal of rice and split yellow moong, finished with ghee and cumin.",
    category: "Dinner",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Khichdi_Kitchiri_Khichri_comfort_food_India.jpg",
    imageAlt: "Rice and lentil khichdi, a traditional Indian comfort food",
    imageCredit: "Francis Bijl",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Khichdi_Kitchiri_Khichri_comfort_food_India.jpg",
    imageLicense: "CC BY 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    illustration: "🍲",
    time: 35,
    servings: 3,
    difficulty: "Easy",
    ingredients: ["1/2 cup basmati or short-grain rice", "1/2 cup split yellow moong dal", "4 cups water", "1/4 tsp turmeric", "1 tsp ghee", "1/2 tsp cumin seeds", "A pinch of asafoetida (optional)", "Salt", "Fresh coriander, to serve"],
    instructions: ["Rinse the rice and moong dal together until the water runs mostly clear.", "Add rice, dal, water, turmeric, and salt to a saucepan. Bring to a boil.", "Cover and simmer on low for 25–30 minutes, stirring occasionally, until the rice and dal are very soft. Add a little hot water if you prefer it looser.", "Heat ghee in a small pan. Add cumin seeds and, if using, asafoetida. When fragrant, pour over the khichdi.", "Stir gently and serve warm with coriander and yogurt or pickle."],
  },
  {
    id: "masala-chai",
    title: "Everyday Masala Chai",
    description: "A warming stovetop tea brewed with fresh ginger, cardamom, black tea, milk, and just enough sweetness.",
    category: "Drinks",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Masala_chai.jpg",
    imageAlt: "Freshly brewed masala chai",
    imageCredit: "Nandhiniraji",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Masala_chai.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "☕",
    time: 15,
    servings: 2,
    difficulty: "Easy",
    ingredients: ["1 cup water", "1 cup milk", "2 tsp loose black tea or 2 tea bags", "2 green cardamom pods, lightly crushed", "1/2 inch fresh ginger, crushed", "1–2 tsp sugar, to taste"],
    instructions: ["Add water, crushed ginger, and cardamom to a small saucepan. Bring to a boil and simmer for 2 minutes.", "Stir in the tea and simmer for 1 minute.", "Add milk and sugar. Bring back to a gentle boil, watching closely so it does not overflow.", "Simmer for 2–3 minutes, strain into cups, and serve hot."],
  },
  {
    id: "besan-chilla",
    title: "Crisp Besan Chilla",
    description: "Savory chickpea-flour pancakes with onion, tomato, and coriander—an easy breakfast or light snack.",
    category: "Breakfast",
    cuisine: "Indian",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Besan_chilla.jpg",
    imageAlt: "Besan chilla made with chickpea flour and spices",
    imageCredit: "Patelaahil",
    imageCreditUrl: "https://commons.wikimedia.org/wiki/File:Besan_chilla.jpg",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    illustration: "🥞",
    time: 25,
    servings: 3,
    difficulty: "Easy",
    ingredients: ["1 cup besan (chickpea flour)", "About 3/4 cup water", "1/2 small onion, finely chopped", "1 small tomato, deseeded and chopped", "1 green chilli, finely chopped (optional)", "1/4 tsp ajwain (carom seeds)", "2 tbsp chopped coriander", "Salt", "Oil for the pan"],
    instructions: ["Whisk besan, water, ajwain, and salt into a smooth, pourable batter. Rest for 5 minutes.", "Stir in onion, tomato, chilli if using, and coriander. Add a splash of water if the batter is too thick.", "Heat a lightly oiled skillet over medium heat. Pour in a small ladle of batter and spread into a thin circle.", "Cook until the edges look dry and the underside is golden, about 2 minutes. Flip and cook the other side.", "Repeat with the remaining batter, lightly oiling the pan as needed. Serve hot with chutney or yogurt."],
  },
  {
    id: "rajma-masala",
    title: "Sunday Rajma Masala",
    description: "Red kidney beans simmered in a homestyle onion-tomato gravy with ginger, garlic, and warming spices.",
    category: "Dinner",
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Indian curry served with flatbread",
    illustration: "🍛",
    time: 55,
    servings: 4,
    difficulty: "Medium",
    ingredients: ["3 cups cooked kidney beans, drained (or 2 cans, about 400 g each)", "1 tbsp oil or ghee", "1 medium onion, finely chopped", "1 tbsp grated ginger", "2 garlic cloves, minced", "2 medium tomatoes, finely chopped or blended", "1/2 tsp cumin seeds", "1/2 tsp turmeric", "1 tsp ground coriander", "1/2 tsp garam masala", "2 cups water", "Salt", "Fresh coriander, to serve"],
    instructions: ["Heat oil in a heavy pot. Add cumin seeds; when fragrant, add onion and cook until golden, about 8 minutes.", "Add ginger and garlic; stir for 30 seconds. Add tomatoes, turmeric, and ground coriander.", "Cook the tomato mixture, stirring often, until thick and glossy and the oil begins to separate, about 10–12 minutes.", "Add cooked kidney beans, water, and salt. Lightly mash a few beans against the side of the pot to help thicken the gravy.", "Cover and simmer gently for 25–30 minutes, stirring occasionally. Add a splash of water if it becomes too thick.", "Stir in garam masala, taste and adjust seasoning, then garnish with coriander. Serve with rice."],
  },
];

function loadRecipes() {
  const storedRecipes = loadStoredValue(STORAGE_KEY, []);
  if (!Array.isArray(storedRecipes)) {
    console.error("Saved recipes are not a list. Starting with the sample recipes.");
    return starterRecipes;
  }

  const savedVersion = loadStoredValue(`${STORAGE_KEY}-starter-version`, 0);
  const recipesById = new Map(starterRecipes.map((recipe) => [recipe.id, recipe]));
  for (const recipe of storedRecipes) {
    if (recipe && typeof recipe === "object" && recipe.id != null) {
      const canonicalRecipe = starterRecipes.find(
        (starterRecipe) => String(starterRecipe.id) === String(recipe.id),
      );
      const restoredRecipe =
        canonicalRecipe && savedVersion < STARTER_VERSION
          ? { ...recipe, ...canonicalRecipe }
          : recipe;
      recipesById.set(String(recipe.id), restoredRecipe);
    } else {
      console.error("Ignored a saved recipe without a valid ID.", recipe);
    }
  }
  if (savedVersion < STARTER_VERSION) {
    try {
      localStorage.setItem(`${STORAGE_KEY}-starter-version`, String(STARTER_VERSION));
    } catch (error) {
      console.error("Could not save the starter-recipe update version.", error);
    }
  }
  return [...recipesById.values()];
}

function loadStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() =>
    loadRecipes(),
  );
  const [favorites, setFavorites] = useState(() =>
    loadStoredValue(`${STORAGE_KEY}-favorites`, []),
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error("Could not save recipes to local storage.", error);
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-favorites`, JSON.stringify(favorites));
    } catch (error) {
      console.error("Could not save favorites to local storage.", error);
    }
  }, [favorites]);

  function addRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
    };
    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    return newRecipe;
  }

  function updateRecipe(id, changes) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        String(recipe.id) === String(id) ? { ...recipe, ...changes, id: recipe.id } : recipe,
      ),
    );
  }

  function deleteRecipe(id) {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => String(recipe.id) !== String(id)),
    );
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favoriteId) => String(favoriteId) !== String(id)),
    );
  }

  function toggleFavorite(id) {
    setFavorites((currentFavorites) =>
      currentFavorites.some((favoriteId) => String(favoriteId) === String(id))
        ? currentFavorites.filter((favoriteId) => String(favoriteId) !== String(id))
        : [...currentFavorites, id],
    );
  }

  const value = useMemo(
    () => ({ recipes, favorites, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }),
    [recipes, favorites],
  );

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used inside a RecipeProvider.");
  }
  return context;
}
