const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set Handlebars as the view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory with /public prefix
app.use('/public', express.static(path.join(__dirname, 'public')));

// Define webpage routes
app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'The Joyful Child | Daycare & Preschool',
    metaDescription: 'We provide an accredited play-based child care program in a home-like environment. Join our growing community of families today!',
    metaKeywords: 'the joyful child, the joyful child daycare, del valle daycare, austin daycare, del valle child care, austin child care, play-based daycare, play-based child care, daycare near me, preschool in austin, preschool in del valle',
    // Open Graph
    ogTitle: 'The Joyful Child: Daycare & Preschool',
    ogDescription: 'We provide an accredited play-based child care program in a home-like environment. Join our growing community of families today!',
    ogImage: '/public/src/images/page-asset/landing/looking-bugs.jpg',
    pageUrl: 'https://thejoyfulchild.care/',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About | The Joyful Child',
    metaDescription: 'The Joyful Child was founded on the belief that all families deserve access to quality child care. Learn more about the passion and dedicated behind each young mind.',
    metaKeywords: 'the joyful child, about the joyful child, Leesa Rodriguez',
    // Open Graph
    ogTitle: 'About | The Joyful Child',
    ogDescription: 'The Joyful Child was founded on the belief that all families deserve access to quality child care. Learn more about the passion and dedicated behind each young mind.',
    ogImage: '/public/src/images/page-asset/landing/looking-bugs.jpg',
    pageUrl: 'https://thejoyfulchild.care/about/',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact | The Joyful Child',
    metaDescription: 'Are you looking for an affordable childcare program for your family? Reach out to us and we can help enroll into our program.',
    metaKeywords: 'the joyful child contact, the joyful child email, the joyful child phone number, child care tuition',
    // Open Graph
    ogTitle: 'Contact | The Joyful Child',
    ogDescription: 'Are you looking for an affordable childcare program for your family? Reach out to us and we can help enroll into our program.',
    ogImage: '/public/src/images/page-asset/contact/og-contact.jpg',
    pageUrl: 'https://thejoyfulchild.care/contact/',
  });
});
app.get('/programs', (req, res) => {
  res.render('programs', {
    pageTitle: 'Play based Childcare Programs | The Joyful Child',
    metaDescription: 'Our child care program provides early education through a play based approach, fostering creativity and a love of learning.',
    metaKeywords: 'child care program, early education, play based learning',
    // Open Graph
    ogTitle: 'Play based Childcare Programs | The Joyful Child',
    ogDescription: 'Our child care program provides early education through a play based approach, fostering creativity and a love of learning.',
    ogImage: '/public/src/images/page-asset/programs/all-children.jpg',
    pageUrl: 'https://thejoyfulchild.care/programs/',
  });
});
app.get('/philosophy', (req, res) => {
  res.render('philosophy', {
    pageTitle: 'Child Centered Philosophy | The Joyful Child',
    metaDescription: 'We believe your child thrives by being at the center of their journey. Learn how we can help your child grow into themselves.',
    metaKeywords: 'child care philosophy, the joyful child philosophy, the joyful child teaching philosophy',
    // Open Graph
    ogTitle: 'Child Centered Philosophy | The Joyful Child',
    ogDescription: 'We believe your child thrives by being at the center of their journey. Learn how we can help your child grow into themselves.',
    ogImage: '/public/src/images/page-asset/philosophy/child-centered.jpg',
    pageUrl: 'https://thejoyfulchild.care/philosophy/',
  });
});
app.get('/locations', (req, res) => {
  res.render('locations', {
    pageTitle: 'Locations | The Joyful Child',
    metaDescription: 'Our child care facilities proudly serve families located in East Austin and Del Valle. See our map to find the most convenient location for you.',
    metaKeywords: 'the joyful child locations, child care near me, daycare near me, austin child care, del valle child care, austin daycare, del valle daycare, East Austin, Del Valle',
    // Open Graph
    ogTitle: 'Locations | The Joyful Child',
    ogDescription: 'Our child care facilities proudly serve families located in East Austin and Del Valle. See our map to find the most convenient location for you.',
    ogImage: '/public/src/images/page-asset/contact/hornsby-bend-location.jpg',
    pageUrl: 'https://thejoyfulchild.care/locations/',
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});