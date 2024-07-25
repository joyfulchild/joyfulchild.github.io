const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set Handlebars as the view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define webpage routes
app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'The Joyful Child',
    metaDescription: 'We provide an affordable accredited play-based childcare and daycare service.',
    metaKeywords: 'the joyful child, the joyful child daycare, the joyful child del valle, del valle daycare, austin daycare, del valle child care, austin child care, play based daycare, play based child care, daycare near me',
    // Open Graph
    ogTitle: 'The Joyful Child',
    ogDescription: 'We provide an affordable accredited play-based childcare and daycare service.',
    ogImage: 'public/src/images/page-asset/landing/looking-bugs.jpg',
    pageUrl: 'https://thejoyfulchild.care',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About - The Joyful Child',
    metaDescription: 'Learn how our leadership is paving the way to provide real quality childcare.',
    metaKeywords: 'the joyful child, about the joyful child, Leesa Rodriguez',
    // Open Graph
    ogTitle: 'About - The Joyful Child',
    ogDescription: 'Learn how our leadership is paving the way to provide real quality childcare.',
    ogImage: 'public/src/images/employees/leesa-rodriguez.png',
    pageUrl: 'https://thejoyfulchild.care/about',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact - The Joyful Child',
    metaDescription: 'Are you looking for childcare? See how you can contact us about our service and childcare tuition.',
    metaKeywords: 'the joyful child contact, the joyful child email, the joyful child phone number, child care tuition',
    // Open Graph
    ogTitle: 'Contact - The Joyful Child',
    ogDescription: 'Are you looking for childcare? See how you can contact us about our service and child care tuition.',
    ogImage: 'public/src/images/page-asset/contact/og-contact.jpg',
    pageUrl: 'https://thejoyfulchild.care/contact',
  });
});
app.get('/programs', (req, res) => {
  res.render('programs', {
    pageTitle: 'Programs - The Joyful Child',
    metaDescription: 'Play-based & Nature inspired child care program.',
    metaKeywords: 'Infant care, Toddler care, Preschool care, play-based child care, play based child care, early childhood education',
    // Open Graph
    ogTitle: 'Programs - The Joyful Child',
    ogDescription: 'Play-based & Nature inspired child care program.',
    ogImage: 'public/src/images/page-asset/programs/all-children.jpg',
    pageUrl: 'https://thejoyfulchild.care/programs',
  });
});
app.get('/philosophy', (req, res) => {
  res.render('philosophy', {
    pageTitle: 'Philosophy - The Joyful Child',
    metaDescription: 'Children grow best simply by being at the center of their own journey.',
    metaKeywords: 'child care philosophy, the joyful child philosophy, the joyful child teaching philosophy',
    // Open Graph
    ogTitle: 'Philosophy - The Joyful Child',
    ogDescription: 'Children grow best simply by being at the center of their own journey.',
    ogImage: 'public/src/images/page-asset/philosophy/child-centered.jpg',
    pageUrl: 'https://thejoyfulchild.care/programs',
  });
});
app.get('/locations', (req, res) => {
  res.render('locations', {
    pageTitle: 'Locations - The Joyful Child',
    metaDescription: 'We provide child care for East Austin and Del Valle families.',
    metaKeywords: 'the joyful child locations, child care near me, daycare near me, austin child care, del valle child care, austin daycare, del valle daycare, East Austin, Del Valle',
    // Open Graph
    ogTitle: 'Locations - The Joyful Child',
    ogDescription: 'We provide child care for East Austin and Del Valle families.',
    ogImage: 'public/src/images/page-asset/contact/hornsby-bend-location.jpg',
    pageUrl: 'https://thejoyfulchild.care/locations',
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});