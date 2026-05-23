/* ═══════════════════════════════════════════════════════
   IMAGE GALLERY — script.js
   Sections:
   1.  Image Data (IMAGES array)
   2.  State Variables
   3.  Helper — getFilteredImages()
   4.  Helper — renderGallery()
   5.  Helper — buildThumbs()
   6.  Helper — updateLightbox()
   7.  Event: Category Buttons
   8.  Event: Gallery Filter Buttons
   9.  Event: Search Input
   10. Event: Load More Button
   11. Event: Open Lightbox (image click)
   12. Event: Close Lightbox
   13. Event: Lightbox Prev / Next
   14. Event: Keyboard Navigation
   15. Event: Lightbox Filter Buttons
   16. Event: Touch / Swipe Support
   17. Init — first render
═══════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   1. IMAGE DATA
   Each object has:
     id     — unique number
     src    — local image path (images/ folder)
     title  — display name
     cat    — category key (matches data-cat on buttons)
     tags   — extra keywords for search
───────────────────────────────────────── */
const IMAGES = [
  { id:1,  src:"images/Arts1.png",      title:"Photography",         cat:"arts",     tags:["Camera","Photos"] },
  { id:2,  src:"images/Arts2.png",      title:"Singing",             cat:"arts",     tags:["Music","Songs"] },
  { id:3,  src:"images/Arts3.png",      title:"Pottery",             cat:"arts",     tags:["Clay","Pots"] },
  { id:4,  src:"images/Arts4.png",      title:"Dancing",             cat:"arts",     tags:["Classical","Dance"] },
  { id:5,  src:"images/Arts5.png",      title:"Drawing",             cat:"arts",     tags:["Draw","Sketches"] },
  { id:6,  src:"images/Animals1.png",   title:"Elephants",           cat:"animals",  tags:["Elephant","Strong Animal"] },
  { id:7,  src:"images/Animals2.png",   title:"Pandas",              cat:"animals",  tags:["Pandas","Cute Animal"] },
  { id:8,  src:"images/Animals3.png",   title:"Kangaroos",           cat:"animals",  tags:["Kangaroo","Jumping Animal"] },
  { id:9,  src:"images/Animals4.png",   title:"Lion Hunting",        cat:"animals",  tags:["Lion","King of forest"] },
  { id:10, src:"images/Animals5.png",   title:"Cheetah Hunting",     cat:"animals",  tags:["Cheetah","Fastest Animal"] },
  { id:11, src:"images/Birds1.png",     title:"Peacock",             cat:"birds",    tags:["Dancing","National Bird"] },
  { id:12, src:"images/Birds2.png",     title:"Sun Parakeets",       cat:"birds",    tags:["Cute","Love Birds"] },
  { id:13, src:"images/Birds3.png",     title:"Taiwan Blue Magpie",  cat:"birds",    tags:["Crow","Blue magpie"] },
  { id:14, src:"images/Birds4.png",     title:"Birds of Paradise",   cat:"birds",    tags:["Beautiful","Colourful Birds"] },
  { id:15, src:"images/Birds5.png",     title:"Fantail Pigeon",      cat:"birds",    tags:["Eyes","White Peacock"] },
  { id:16, src:"images/Cartoons1.png",  title:"Shinchan",            cat:"cartoons", tags:["Shinchan","Comedy"] },
  { id:17, src:"images/Cartoons2.png",  title:"Tom and Jerry",       cat:"cartoons", tags:["Tom VS Jerry","Fighting"] },
  { id:18, src:"images/Cartoons3.png",  title:"Doraemon",            cat:"cartoons", tags:["Robot","Gadgets"] },
  { id:19, src:"images/Cartoons4.png",  title:"Chota Bheem",         cat:"cartoons", tags:["Ladoos","Strong"] },
  { id:20, src:"images/Cartoons5.png",  title:"Ben10",               cat:"cartoons", tags:["Watch","Aliens"] },
  { id:21, src:"images/Children1.png",  title:"Baby Boy",            cat:"children", tags:["Sleeping","boy"] },
  { id:22, src:"images/Children2.png",  title:"Smiling Childs",      cat:"children", tags:["Smiling","Children"] },
  { id:23, src:"images/Children3.png",  title:"Baby girl",           cat:"children", tags:["Standing Girl","Cute"] },
  { id:24, src:"images/Children4.png",  title:"Children With Flag",  cat:"children", tags:["Childrens","Flag"] },
  { id:25, src:"images/Children5.png",  title:"Twin Babies",         cat:"children", tags:["Twins","cute"] },
  { id:26, src:"images/Food1.png",      title:"Non-Veg Thali",       cat:"food",     tags:["Non-Veg","Animals"] },
  { id:27, src:"images/Food2.png",      title:"Street Foods",        cat:"food",     tags:["Streets","Girls Fav Spot"] },
  { id:28, src:"images/Food3.png",      title:"Veg Thali",           cat:"food",     tags:["Veg","Vegetables"] },
  { id:29, src:"images/Food4.png",      title:"Tiffins Thali",       cat:"food",     tags:["Breakfast","Tiffins"] },
  { id:30, src:"images/Food5.png",      title:"Sweets Thali",        cat:"food",     tags:["Sweets","Cravings"] },
  { id:31, src:"images/Houses1.png",    title:"Kerala-Style House",  cat:"houses",   tags:["Nalukettu","Traditional"] },
  { id:32, src:"images/Houses2.png",    title:"Tree House",          cat:"houses",   tags:["Trees","Natural"] },
  { id:33, src:"images/Houses3.png",    title:"Apartment Houses",    cat:"houses",   tags:["Buildings","Apartments"] },
  { id:34, src:"images/Houses4.png",    title:"Boat House",          cat:"houses",   tags:["Boat","Water"] },
  { id:35, src:"images/Houses5.png",    title:"Villa",               cat:"houses",   tags:["Big House","Luxurious"] },
  { id:36, src:"images/Nature1.png",    title:"Alpine Landscape",    cat:"nature",   tags:["Mountains","Italy"] },
  { id:37, src:"images/Nature2.png",    title:"Chae Son Waterfall",  cat:"nature",   tags:["Waterfall","Thailand"] },
  { id:38, src:"images/Nature3.png",    title:"Sunset Over Ocean",   cat:"nature",   tags:["Ocean","Sunset"] },
  { id:39, src:"images/Nature4.png",    title:"Autumn Landscape Lake",cat:"nature",  tags:["Lake","Autumn"] },
  { id:40, src:"images/Nature5.png",    title:"Carpathian Mountains",cat:"nature",   tags:["Mountains","Wild Flowers"] },
  { id:41, src:"images/People1.png",    title:"Mahesh Babu",         cat:"people",   tags:["Super Star","Handsome"] },
  { id:42, src:"images/People2.png",    title:"Kajal Aggarwal",      cat:"people",   tags:["Queen of Tollywood","Cutie"] },
  { id:43, src:"images/People3.png",    title:"Vijay Talapathy",     cat:"people",   tags:["Talapathy","CM of Tamil"] },
  { id:44, src:"images/People4.png",    title:"Trisha Krishnan",     cat:"people",   tags:["Miss Chennai Pageant","beauty"] },
  { id:45, src:"images/People5.png",    title:"Dulqer Salmaan",      cat:"people",   tags:["DQ","Malyalam boy"] },
  { id:46, src:"images/Temples1.png",   title:"Kasi Vishwanath",     cat:"temples",  tags:["Lord Shiva","Varanasi"] },
  { id:47, src:"images/Temples2.png",   title:"Badrinath Temple",    cat:"temples",  tags:["Lord Vishnu","Uttarakhand"] },
  { id:48, src:"images/Temples3.png",   title:"Ramanathaswamy Temple",cat:"temples", tags:["Lord Shiva","Tamil Nadu"] },
  { id:49, src:"images/Temples4.png",   title:"Dwarakadish Temple",  cat:"temples",  tags:["Lord Krishna","Gujarat"] },
  { id:50, src:"images/Temples5.png",   title:"Virupaksha Temple",   cat:"temples",  tags:["Lord Shiva","Karnataka"] },
];


/* ─────────────────────────────────────────
   2. STATE VARIABLES
───────────────────────────────────────── */
let activeCategory = 'all';   // currently selected category
let activeFilter   = 'none';  // currently selected gallery-wide CSS filter
let lbFilter       = 'none';  // filter active inside lightbox
let currentLbIndex = 0;       // which image is open in lightbox
let visibleItems   = [];      // filtered + sliced images shown in gallery
let shownCount     = 50;      // show all 50 images initially (5 per category max)


/* ─────────────────────────────────────────
   3. HELPER — getFilteredImages()
   Returns IMAGES filtered by:
     • activeCategory
     • search input text
───────────────────────────────────────── */
function getFilteredImages() {
  // read search query, lowercase for case-insensitive match
  const query = document.getElementById('searchInput').value.trim().toLowerCase();

  return IMAGES.filter(img => {
    // category check
    const catMatch    = activeCategory === 'all' || img.cat === activeCategory;

    // search check — matches title OR any tag
    const searchMatch = !query
      || img.title.toLowerCase().includes(query)
      || img.tags.some(tag => tag.toLowerCase().includes(query));

    return catMatch && searchMatch;
  });
}


/* ─────────────────────────────────────────
   4. HELPER — renderGallery()
   Clears the #gallery div and re-builds
   cards from the filtered image list.
───────────────────────────────────────── */
function renderGallery() {
  const galleryEl = document.getElementById('gallery');

  // get filtered list, slice to shownCount
  const filtered = getFilteredImages();
  visibleItems   = filtered.slice(0, shownCount);

  // clear existing cards
  galleryEl.innerHTML = '';

  // build one card per image
  visibleItems.forEach((img, index) => {

    // outer wrapper div
    const item = document.createElement('div');

    // apply filter class if one is active
    item.className = 'gallery-item' + (activeFilter !== 'none' ? ' ' + activeFilter : '');

    // stagger the fade-up animation (max 12 steps so it resets each page)
    item.style.animationDelay = (index % 12) * 0.04 + 's';
    item.dataset.index = index;

    // inner HTML: image + overlay
    // FIX: local .png files — no Unsplash query params appended
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy">
      <div class="overlay">
        <div class="tag">${img.cat}</div>
        <div class="img-title">${img.title}</div>
        <div class="zoom-icon">⊕</div>
      </div>
    `;

    // clicking a card opens lightbox at that index
    item.addEventListener('click', () => openLightbox(index));

    galleryEl.appendChild(item);
  });

  // show/hide Load More button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.style.display = shownCount >= filtered.length ? 'none' : 'inline-flex';
}


/* ─────────────────────────────────────────
   5. HELPER — buildThumbs()
   Rebuilds the thumbnail strip inside the
   lightbox to match current visibleItems.
───────────────────────────────────────── */
function buildThumbs() {
  const strip = document.getElementById('lbThumbs');
  strip.innerHTML = '';

  visibleItems.forEach((img, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'lb-thumb' + (i === currentLbIndex ? ' active' : '');

    // FIX: local .png files — no Unsplash query params appended
    thumb.innerHTML = `<img src="${img.src}" alt="${img.title}">`;

    // clicking a thumb jumps to that image
    thumb.addEventListener('click', () => {
      currentLbIndex = i;
      updateLightbox();
    });

    strip.appendChild(thumb);
  });

  // auto-scroll active thumb into view
  const activeThumb = strip.querySelector('.active');
  if (activeThumb) {
    activeThumb.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }
}


/* ─────────────────────────────────────────
   6. HELPER — updateLightbox()
   Refreshes the lightbox main image,
   counter text, and thumbnails whenever
   currentLbIndex or lbFilter changes.
───────────────────────────────────────── */
function updateLightbox() {
  const img   = visibleItems[currentLbIndex];
  const lbImg = document.getElementById('lbImg');

  // FIX: local .png files — no Unsplash query params appended
  lbImg.src = img.src;
  lbImg.alt = img.title;

  // apply filter class (or none)
  lbImg.className = lbFilter !== 'none' ? lbFilter : '';

  // update counter text
  document.getElementById('lbCounter').textContent =
    `${currentLbIndex + 1} / ${visibleItems.length}  —  ${img.title}`;

  // rebuild thumbnails
  buildThumbs();
}


/* ─────────────────────────────────────────
   7. EVENT — Category Buttons
   When a .cat-btn is clicked:
   • mark it active
   • update activeCategory state
   • reset shownCount and re-render
───────────────────────────────────────── */
document.getElementById('categories').addEventListener('click', function(e) {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;

  // remove active from all, add to clicked
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  activeCategory = btn.dataset.cat;
  shownCount = 50;          // reset — enough to show all images in any category
  renderGallery();
});


/* ─────────────────────────────────────────
   8. EVENT — Gallery Filter Buttons
   When a .filter-btn is clicked:
   • mark it active
   • update activeFilter state
   • re-render (cards will get filter class)
───────────────────────────────────────── */
document.getElementById('galleryFilters').addEventListener('click', function(e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  activeFilter = btn.dataset.filter;
  renderGallery();
});


/* ─────────────────────────────────────────
   9. EVENT — Search Input
   Re-render on every keystroke.
   Reset pagination so filtered results
   start from the beginning.
───────────────────────────────────────── */
document.getElementById('searchInput').addEventListener('input', function() {
  shownCount = 50;
  renderGallery();
});


/* ─────────────────────────────────────────
   10. EVENT — Load More Button
   Show a brief spinner, then increase
   shownCount and re-render.
───────────────────────────────────────── */
document.getElementById('loadMoreBtn').addEventListener('click', function() {
  this.classList.add('loading');   // show spinner

  setTimeout(() => {
    this.classList.remove('loading');
    shownCount += 10;              // reveal 10 more images
    renderGallery();
  }, 600);                         // 600ms fake delay for UX
});


/* ─────────────────────────────────────────
   11. OPEN LIGHTBOX
   Called when a gallery card is clicked.
   index — position in visibleItems array
───────────────────────────────────────── */
function openLightbox(index) {
  currentLbIndex = index;
  lbFilter       = 'none';         // reset filter when opening

  updateLightbox();                // populate image + thumbs
  syncLbFilterBtns();              // reset filter button UI

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}


/* ─────────────────────────────────────────
   12. CLOSE LIGHTBOX
───────────────────────────────────────── */
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';  // restore scroll
}

// Close when ✕ button is clicked
document.getElementById('lbClose').addEventListener('click', closeLightbox);

// Close when backdrop (dark area) is clicked
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);


/* ─────────────────────────────────────────
   13. LIGHTBOX PREV / NEXT
   Cycles through visibleItems with wrap-around.
───────────────────────────────────────── */
document.getElementById('lbPrev').addEventListener('click', function() {
  // go to previous, wrap to last if at 0
  currentLbIndex = (currentLbIndex - 1 + visibleItems.length) % visibleItems.length;
  updateLightbox();
});

document.getElementById('lbNext').addEventListener('click', function() {
  // go to next, wrap to 0 if at last
  currentLbIndex = (currentLbIndex + 1) % visibleItems.length;
  updateLightbox();
});


/* ─────────────────────────────────────────
   14. KEYBOARD NAVIGATION
   ← ArrowLeft  → go to previous image
   → ArrowRight → go to next image
   Escape       → close lightbox
   Only fires when lightbox is open.
───────────────────────────────────────── */
document.addEventListener('keydown', function(e) {
  // check if lightbox is currently open
  if (!document.getElementById('lightbox').classList.contains('open')) return;

  if (e.key === 'ArrowLeft') {
    currentLbIndex = (currentLbIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  if (e.key === 'ArrowRight') {
    currentLbIndex = (currentLbIndex + 1) % visibleItems.length;
    updateLightbox();
  }

  if (e.key === 'Escape') {
    closeLightbox();
  }
});


/* ─────────────────────────────────────────
   15. LIGHTBOX FILTER BUTTONS
   Apply a CSS filter class to #lbImg
   without affecting the gallery cards.
───────────────────────────────────────── */
document.querySelectorAll('.lb-filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    lbFilter = this.dataset.lbfilter;

    // update class on the lightbox image
    const lbImg   = document.getElementById('lbImg');
    lbImg.className = lbFilter !== 'none' ? lbFilter : '';

    syncLbFilterBtns();
  });
});

// Helper: mark the correct .lb-filter-btn as active
function syncLbFilterBtns() {
  document.querySelectorAll('.lb-filter-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.lbfilter === lbFilter);
  });
}


/* ─────────────────────────────────────────
   16. TOUCH / SWIPE SUPPORT
   On mobile: swipe left = next image
              swipe right = previous image
───────────────────────────────────────── */
let touchStartX = 0;

document.getElementById('lightbox').addEventListener('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;   // record start position
});

document.getElementById('lightbox').addEventListener('touchend', function(e) {
  const dx = e.changedTouches[0].clientX - touchStartX;

  if (Math.abs(dx) > 50) {              // threshold: 50px swipe
    if (dx < 0) {
      // swipe left → next image
      currentLbIndex = (currentLbIndex + 1) % visibleItems.length;
    } else {
      // swipe right → previous image
      currentLbIndex = (currentLbIndex - 1 + visibleItems.length) % visibleItems.length;
    }
    updateLightbox();
  }
});


/* ─────────────────────────────────────────
   17. INIT — first render on page load
───────────────────────────────────────── */
renderGallery();
