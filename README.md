# excel-test-zone-app

The application is built and made available via these public links from the dist/ directory:
 
* [Testing](https://exceltestzone-app-testing.s3-ap-southeast-2.amazonaws.com/)
* [Staging](https://exceltestzone-app-staging.s3-ap-southeast-2.amazonaws.com/)
# Running the app locally

Open two powershell windows in the folder
in one, run "grunt"
in the other, run "node server.js"

# Testing the app

In a powershell window, run "npm run test"
All tests should pass before merging back into develop
All react components should have some form of functional testing

# Accessibility

The following requirements for accessibilty should be met:
Contrast on text elements meets WCAG AA minimum contrast (automatically tested)
Site is colourblind accessible
Site is keyboard navigable (user tested):
- Forms should respect tab order
- Form elements should show focussed state
- Menus should respect tab order
- Forms should submit when enter is pressed
Site is mobile navigable (user tested):
- Buttons are a minimum size of 40px^2
- Site responds to pinch-zoom controls
No major WCAG AA errors (automatically tested)
Images have alt text, including user submitted images having the ability to have alt text provided (automatically tested)
