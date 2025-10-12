# 🟨 BrightLabel
BrightLabel is a React Native mobile app built with Expo that allows you to uses your phone's camera to scan barcodes on packaged foods and display (and save) nutrition information.

## Installation
1. Clone this repository
   ```bash
   git clone https://github.com/MattLong87/BrightLabel.git
   cd BrightLabel
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan the QR code with your iPhone
   - **Android**: Press `a` in the terminal or scan the QR code with your Android device
   - **Web**: Press `w` in the terminal

## Design and Development
### Wireframing
After a quick feasibility check to confirm that APIs and libraries existed to meet the requirements of the app, I created an initial user flow diagram to identify what screens would be needed and how users would navigate between them:
- **Camera** screen, to scan barcodes
- **Product Info** screen, listing details about a product
- **Saved Products** screen, displaying a list of all products that had been scanned. This screen was not part of the brief, but I planned to add it to increase the functionality of the app with minimal added complexity.
<img src="https://raw.githubusercontent.com/MattLong87/BrightLabel/refs/heads/main/assets/images/design/user_flow.jpg" width="250">

### Product Info Screen
One of the first screens I began development on was the Product Info screen, since I knew it would need the most design work. I created a more detailed wireframe of this screen and scaffolded an initial version of it in the app. I wasn't sure how best to display the nutrition data in a clean and appealing way, so I browsed Dribbble for other nutrition apps to use as inspiration. This led me to the design of the 2x2 grid of macros with emoji icons, which appears in the final design.

### API Challenges
Finding a reliable API to source data for this project was the biggest challenge. I initially attempted to use the [USDA FoodData Central API](https://fdc.nal.usda.gov/api-guide), but I found its data to be very inconsistent, both in ability to look up products by UPC and in the format of the data returned. Ultimately, I turned to the [OpenFoodFacts API](https://openfoodfacts.github.io/openfoodfacts-server/api/), which seemed to more consistently return appropriate product information. However, I have noticed issues with this dataset too: sometimes its data is inconsistent with the Nutrition Facts printed on a product, and it often lacks vitamin information. In my search, I noticed that there are several paid API options that offer this data, and I believe there would be a good business case to consider exploring those for an actual product.

If you have difficulty finding a product with vitamin data to test the app, you can use this barcode which I used in development:

<img src="https://raw.githubusercontent.com/MattLong87/BrightLabel/refs/heads/main/assets/images/design/clif_bar.png" width="250">

### Vitamins
In addition to the API challenges discussed above, identifying the "top three" vitamins was also an ambiguity. I decided to calculate the percent daily value for each using the [FDA's recommendations](https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels), and display the three vitamins with highest percentages. This also required converting between various units to compare the values provided by the API to the ones given by the FDA. I note that the brief specified that vitamin amounts should be displayed in milligrams, so I used that unit even for vitamins typically measured in much smaller units, which leads to some very small numbers being displayed. I'm also only displaying the %DV if it's >.01%, which it often isn't, in my experience. However, it is displayed for the Clif Bar product shown above.

### Final Details
Once the basic functionality of the app was implemented, I reviewed each screen and added details to cover various states and user flows. For example:
- Loading/"skeleton" screen while product info is fetched
- Error message if product is not found
- Informative message when Saved Products screen is empty
- Ability to delete a scanned product
- Button to exit the camera screen without scanning a barcode

### Future Improvements
- Experiment with using on-device AI to dynamically assign an emoji/icon to scanned foods (for example, 🥫 when a can of soup is scanned)
- Respect dark mode settings with useColorScheme()
- Search and filter options for the Saved Products screen
