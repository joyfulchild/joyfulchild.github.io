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
    pageTitle: 'The Joyful Child: Daycare & Preschool',
    metaDescription: 'We provide an accredited play-based child care program in a home-like environment. Join our growing community of families and experience the joys of childhood.',
    metaKeywords: 'the joyful child, the joyful child daycare, del valle daycare, austin daycare, del valle child care, austin child care, play-based daycare, play-based child care, daycare near me, preschool in austin, preschool in del valle',
    // Open Graph
    ogTitle: 'The Joyful Child: Daycare & Preschool',
    ogDescription: 'We provide an accredited play-based child care program in a home-like environment. Join our growing community of families and experience the joys of childhood.',
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
    pageTitle: 'Play-based Childcare Programs | The Joyful Child',
    metaDescription: 'Play-based child care allows the best growth for children. Learn how our enviornment allows our children to grow naturally into themselves.',
    metaKeywords: 'Infant care, Toddler care, Preschool care, play-based child care, play based child care, early childhood education',
    // Open Graph
    ogTitle: 'Play-based Childcare Programs | The Joyful Child',
    ogDescription: 'Play-based child care allows the best growth for children. Learn how our enviornment allows our children to grow naturally into themselves.',
    ogImage: '/public/src/images/page-asset/programs/all-children.jpg',
    pageUrl: 'https://thejoyfulchild.care/programs/',
  });
});
app.get('/philosophy', (req, res) => {
  res.render('philosophy', {
    pageTitle: 'Child Centered Teaching Philosophy | The Joyful Child',
    metaDescription: 'We believe your child thrives by being at the center of their journey. Learn how we can help them become their best self.',
    metaKeywords: 'child care philosophy, the joyful child philosophy, the joyful child teaching philosophy',
    // Open Graph
    ogTitle: 'Child Centered Teaching Philosophy | The Joyful Child',
    ogDescription: 'We believe your child thrives by being at the center of their journey. Learn how we can help them become their best self.',
    ogImage: '/public/src/images/page-asset/philosophy/child-centered.jpg',
    pageUrl: 'https://thejoyfulchild.care/philosophy/',
  });
});
app.get('/locations', (req, res) => {
  res.render('locations', {
    pageTitle: 'Childcare for East Austin and Del Valle | The Joyful Child',
    metaDescription: 'We provide child care for East Austin and Del Valle families. Look at our map to see which of our locations is closest to your home.',
    metaKeywords: 'the joyful child locations, child care near me, daycare near me, austin child care, del valle child care, austin daycare, del valle daycare, East Austin, Del Valle',
    // Open Graph
    ogTitle: 'Childcare for East Austin and Del Valle | The Joyful Child',
    ogDescription: 'We provide child care for East Austin and Del Valle families. Look at our map to see which of our locations is closest to your home.',
    ogImage: '/public/src/images/page-asset/contact/hornsby-bend-location.jpg',
    pageUrl: 'https://thejoyfulchild.care/locations/',
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});