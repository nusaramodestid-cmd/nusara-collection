// Nusara Collection - Interactive Web Application Logic

let currentCurrency = 'USD';
let activeCategory = 'all';
let searchQuery = '';
let lookbookBag = [];
let activeQuickViewProduct = null;

// Get Active Products (Local Storage or Default data.js)
function getActiveProducts() {
  try {
    const saved = localStorage.getItem('nusara_custom_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading custom products:', e);
  }
  return NUSARA_DATA.products;
}

// Get Brand Settings (Local Storage or Default data.js)
function getActiveBrandSettings() {
  try {
    const saved = localStorage.getItem('nusara_brand_settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading brand settings:', e);
  }
  return NUSARA_DATA.brand;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadBagFromStorage();
  syncBrandUI();
  initLucideIcons();
  setupEventListeners();
  renderProducts();
  updateBagUI();
  renderTestimonials();
  renderFaq();

  // Listen to storage changes from Admin Studio tab
  window.addEventListener('storage', (e) => {
    if (e.key === 'nusara_custom_products' || e.key === 'nusara_brand_settings') {
      syncBrandUI();
      renderProducts();
      showToast('Katalog diperbarui dari Admin Studio!');
    }
  });
});

// Sync Brand UI elements (WhatsApp number, etc.)
function syncBrandUI() {
  const brand = getActiveBrandSettings();
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach(link => {
    const url = new URL(link.href);
    const textParam = url.searchParams.get('text') || '';
    link.href = `https://wa.me/${brand.phoneWhatsApp}?text=${encodeURIComponent(textParam)}`;
  });

  const hotlineElem = document.getElementById('footerHotline');
  if (hotlineElem) {
    hotlineElem.textContent = brand.displayWhatsApp || `+${brand.phoneWhatsApp}`;
  }
}

// Helper for Lucide icons
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Load Bag from LocalStorage
function loadBagFromStorage() {
  try {
    const saved = localStorage.getItem('nusara_lookbook_bag');
    if (saved) {
      lookbookBag = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading bag:', e);
    lookbookBag = [];
  }
}

// Save Bag to LocalStorage
function saveBagToStorage() {
  try {
    localStorage.setItem('nusara_lookbook_bag', JSON.stringify(lookbookBag));
  } catch (e) {
    console.error('Error saving bag:', e);
  }
}

// Price Formatter based on current currency
function formatPrice(usdAmount) {
  const currencyConf = NUSARA_DATA.currencyRates[currentCurrency] || NUSARA_DATA.currencyRates.USD;
  return currencyConf.format(usdAmount);
}

// Setup Event Listeners
function setupEventListeners() {
  // Currency Selector in header & mobile
  const currencySelectors = document.querySelectorAll('.currency-select');
  currencySelectors.forEach(select => {
    select.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      currencySelectors.forEach(s => s.value = currentCurrency);
      renderProducts();
      updateBagUI();
      showToast(`Currency changed to ${currentCurrency}`);
    });
  });

  // Category filter clicks
  const categoryContainer = document.getElementById('categoryFilters');
  if (categoryContainer) {
    categoryContainer.innerHTML = '';
    NUSARA_DATA.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
        activeCategory === cat.id
          ? 'bg-[#142a25] text-white shadow-md'
          : 'bg-[#faf8f5] text-[#4a4643] border border-[#eadfd3] hover:border-[#142a25]'
      }`;
      btn.textContent = cat.name;
      btn.dataset.category = cat.id;
      btn.addEventListener('click', () => {
        activeCategory = cat.id;
        document.querySelectorAll('.cat-btn').forEach(b => {
          b.className = 'cat-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 bg-[#faf8f5] text-[#4a4643] border border-[#eadfd3] hover:border-[#142a25]';
        });
        btn.className = 'cat-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 bg-[#142a25] text-white shadow-md';
        renderProducts();
      });
      categoryContainer.appendChild(btn);
    });
  }

  // Search input
  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('-translate-x-full');
    });
  }
  if (closeMobileMenu && mobileDrawer) {
    closeMobileMenu.addEventListener('click', () => {
      mobileDrawer.classList.add('-translate-x-full');
    });
  }

  // Lookbook Bag Drawer toggle
  const bagOpenBtns = document.querySelectorAll('.open-bag-btn');
  const bagDrawer = document.getElementById('lookbookDrawer');
  const bagCloseBtn = document.getElementById('closeBagDrawer');
  const bagBackdrop = document.getElementById('bagBackdrop');

  bagOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (bagDrawer && bagBackdrop) {
        bagDrawer.classList.remove('translate-x-full');
        bagBackdrop.classList.remove('hidden');
      }
    });
  });

  const hideBag = () => {
    if (bagDrawer && bagBackdrop) {
      bagDrawer.classList.add('translate-x-full');
      bagBackdrop.classList.add('hidden');
    }
  };

  if (bagCloseBtn) bagCloseBtn.addEventListener('click', hideBag);
  if (bagBackdrop) bagBackdrop.addEventListener('click', hideBag);

  // Quick View Modal Close
  const closeQuickModalBtn = document.getElementById('closeQuickModal');
  const quickModal = document.getElementById('quickViewModal');
  const quickModalBackdrop = document.getElementById('quickModalBackdrop');

  const hideQuickModal = () => {
    if (quickModal) quickModal.classList.add('hidden');
  };

  if (closeQuickModalBtn) closeQuickModalBtn.addEventListener('click', hideQuickModal);
  if (quickModalBackdrop) quickModalBackdrop.addEventListener('click', hideQuickModal);

  // Send Entire Bag to WhatsApp Concierge
  const sendBagWhatsAppBtn = document.getElementById('sendBagWhatsApp');
  if (sendBagWhatsAppBtn) {
    sendBagWhatsAppBtn.addEventListener('click', sendBagToWhatsApp);
  }

  // Resort Concierge Quick Form Submit
  const conciergeForm = document.getElementById('resortConciergeForm');
  if (conciergeForm) {
    conciergeForm.addEventListener('submit', handleConciergeSubmit);
  }
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyProductsState');
  if (!grid) return;

  grid.innerHTML = '';
  const products = getActiveProducts();

  let filtered = products.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery) ||
      (item.designer && item.designer.toLowerCase().includes(searchQuery)) ||
      (item.fabric && item.fabric.toLowerCase().includes(searchQuery)) ||
      (item.shortDesc && item.shortDesc.toLowerCase().includes(searchQuery));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-2xl overflow-hidden border border-[#eadfd3]/60 flex flex-col justify-between group';

    const fallbackImg = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80';
    const displayImg = product.image || fallbackImg;

    card.innerHTML = `
      <div class="card-image-wrap bg-[#f5f0eb] relative overflow-hidden aspect-tall cursor-pointer" onclick="openQuickView('${product.id}')">
        <img 
          src="${displayImg}" 
          alt="${product.name}" 
          class="main-image w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onerror="this.src='${fallbackImg}'"
        />
        
        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          ${product.tag ? `<span class="badge-tag shadow-sm">${product.tag}</span>` : ''}
          <span class="bg-black/60 backdrop-blur-md text-white text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium">
            ${product.designer || 'Indonesian Atelier'}
          </span>
        </div>

        <!-- Quick View Overlay Pill -->
        <div class="absolute bottom-3 inset-x-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span class="bg-white/90 backdrop-blur-md text-[#142a25] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg flex items-center gap-1.5 hover:bg-white transition-colors">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View
          </span>
        </div>
      </div>

      <!-- Card Details -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Fabric Specs -->
          <div class="flex items-center gap-1 text-[11px] text-[#6e7f6e] font-medium tracking-wide uppercase mb-1.5">
            <i data-lucide="feather" class="w-3.5 h-3.5 text-[#b86b4d]"></i>
            <span class="truncate">${product.fabric || 'Premium Modest Fabric'}</span>
          </div>

          <h3 class="font-editorial text-lg text-[#1f1d1c] font-medium leading-snug cursor-pointer hover:text-[#b86b4d] transition-colors" onclick="openQuickView('${product.id}')">
            ${product.name}
          </h3>

          <p class="text-xs text-[#4a4643] mt-2 line-clamp-2 leading-relaxed">
            ${product.shortDesc || product.description || 'Curated Indonesian modest wear designed for Maldives tropical resort living.'}
          </p>
        </div>

        <div class="mt-5 pt-4 border-t border-[#f5f0eb]">
          <div class="flex items-baseline justify-between mb-3">
            <div>
              <span class="text-xs text-[#4a4643]/70 uppercase tracking-wider block text-[10px]">Curated Price</span>
              <span class="font-editorial text-xl font-semibold text-[#142a25]">
                ${formatPrice(product.priceUSD || 0)}
              </span>
            </div>
            <span class="text-[11px] text-[#6e7f6e] bg-[#ebf0eb] px-2 py-0.5 rounded-full font-medium">
              Maldives Ready
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2">
            <button 
              onclick="addToLookbook('${product.id}')"
              class="w-full bg-[#faf8f5] hover:bg-[#eadfd3] text-[#142a25] border border-[#dccebe] rounded-full py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5">
              <i data-lucide="bookmark-plus" class="w-3.5 h-3.5"></i> Lookbook
            </button>
            <button 
              onclick="inquireSingleWhatsApp('${product.id}')"
              class="w-full bg-[#142a25] hover:bg-[#b86b4d] text-white rounded-full py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Inquire
            </button>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  initLucideIcons();
}

// Quick View Modal Logic
function openQuickView(productId) {
  const products = getActiveProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeQuickViewProduct = product;
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewModalContent');

  if (!modal || !content) return;

  const fallbackImg = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80';
  const displayImg = product.image || fallbackImg;
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ['Free Size'];
  const colors = Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || 'Natural Resort Tone');

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Image Gallery -->
      <div class="space-y-3">
        <div class="rounded-xl overflow-hidden aspect-[3/4] bg-[#f5f0eb]">
          <img id="modalMainImg" src="${displayImg}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        ${product.secondaryImage ? `
          <div class="flex gap-2">
            <button onclick="document.getElementById('modalMainImg').src='${displayImg}'" class="w-16 h-20 rounded-lg overflow-hidden border-2 border-[#142a25] focus:outline-none">
              <img src="${displayImg}" class="w-full h-full object-cover">
            </button>
            <button onclick="document.getElementById('modalMainImg').src='${product.secondaryImage}'" class="w-16 h-20 rounded-lg overflow-hidden border border-[#dccebe] hover:border-[#142a25] focus:outline-none">
              <img src="${product.secondaryImage}" class="w-full h-full object-cover">
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Details -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="badge-tag">${product.tag || 'Curated'}</span>
            <span class="text-xs text-[#4a4643] uppercase tracking-wider font-semibold">SKU: ${product.sku || 'NC-MOD'}</span>
          </div>

          <h2 class="font-editorial text-2xl md:text-3xl text-[#1f1d1c] font-medium leading-tight">
            ${product.name}
          </h2>

          <p class="text-xs text-[#6e7f6e] uppercase tracking-wider font-semibold mt-1">
            Curated from ${product.designer || 'Indonesian Atelier'}
          </p>

          <div class="my-4 pb-4 border-b border-[#eadfd3]">
            <span class="text-xs text-[#4a4643]/70 uppercase tracking-wider block">Price in ${currentCurrency}</span>
            <div class="font-editorial text-3xl font-semibold text-[#142a25] mt-1">
              ${formatPrice(product.priceUSD || 0)}
            </div>
            <p class="text-xs text-[#6e7f6e] mt-1">Includes curated concierge styling & Maldives import clearance</p>
          </div>

          <p class="text-sm text-[#4a4643] leading-relaxed mb-4">
            ${product.description || product.shortDesc || ''}
          </p>

          <!-- Specifications -->
          <div class="bg-[#faf8f5] p-4 rounded-xl border border-[#eadfd3] space-y-2.5 text-xs text-[#1f1d1c] mb-5">
            <div class="flex items-center justify-between">
              <span class="text-[#4a4643]">Fabric Composition:</span>
              <span class="font-medium text-right">${product.fabric || '100% Breathable Fiber'}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#4a4643]">Climate Breathability:</span>
              <span class="font-medium text-[#142a25] bg-[#ebf0eb] px-2 py-0.5 rounded">${product.climateSuitability || '5/5 High-Humidity Tested'}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#4a4643]">Coverage / Modesty:</span>
              <span class="font-medium">${product.opacity || '100% Modest Opaque'}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#4a4643]">Available Colors:</span>
              <span class="font-medium">${colors}</span>
            </div>
          </div>

          <!-- Size Selector -->
          <div class="mb-5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-[#4a4643] mb-2">Select Size</label>
            <div class="flex flex-wrap gap-2" id="modalSizeOptions">
              ${sizes.map((s, idx) => `
                <button type="button" onclick="selectModalSize(this, '${s}')" class="size-btn px-4 py-2 rounded-lg text-xs font-medium border ${idx === 0 ? 'bg-[#142a25] text-white border-[#142a25]' : 'bg-white text-[#1f1d1c] border-[#dccebe] hover:border-[#142a25]'}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          ${product.stylingNotes ? `
            <div class="bg-[#f7ebe6] p-3 rounded-lg text-xs text-[#985135] mb-6 flex items-start gap-2">
              <i data-lucide="sparkles" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
              <span><strong>Resort Styling Note:</strong> ${product.stylingNotes}</span>
            </div>
          ` : ''}
        </div>

        <!-- Buttons -->
        <div class="space-y-2.5 pt-4 border-t border-[#eadfd3]">
          <button 
            onclick="inquireModalProductWhatsApp()" 
            class="w-full btn-wa-gold py-3.5 text-sm flex items-center justify-center gap-2">
            <i data-lucide="message-circle" class="w-4 h-4"></i> Inquire via WhatsApp Concierge
          </button>
          <button 
            onclick="addModalProductToLookbook()" 
            class="w-full btn-secondary py-3 text-xs flex items-center justify-center gap-2">
            <i data-lucide="bookmark-plus" class="w-4 h-4"></i> Add to Lookbook Inquiry Bag
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  initLucideIcons();
}

let selectedModalSize = null;
function selectModalSize(btn, size) {
  selectedModalSize = size;
  document.querySelectorAll('.size-btn').forEach(b => {
    b.className = 'size-btn px-4 py-2 rounded-lg text-xs font-medium border bg-white text-[#1f1d1c] border-[#dccebe] hover:border-[#142a25]';
  });
  btn.className = 'size-btn px-4 py-2 rounded-lg text-xs font-medium border bg-[#142a25] text-white border-[#142a25]';
}

function addModalProductToLookbook() {
  if (!activeQuickViewProduct) return;
  const sizes = activeQuickViewProduct.sizes || ['Free Size'];
  const size = selectedModalSize || sizes[0];
  addToLookbook(activeQuickViewProduct.id, size);
  document.getElementById('quickViewModal').classList.add('hidden');
}

function inquireModalProductWhatsApp() {
  if (!activeQuickViewProduct) return;
  const sizes = activeQuickViewProduct.sizes || ['Free Size'];
  const size = selectedModalSize || sizes[0];
  inquireSingleWhatsApp(activeQuickViewProduct.id, size);
}

// Add Item to Lookbook Bag
function addToLookbook(productId, size = null) {
  const products = getActiveProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const sizes = product.sizes || ['Free Size'];
  const chosenSize = size || sizes[0];
  const existingIndex = lookbookBag.findIndex(item => item.id === productId && item.size === chosenSize);

  if (existingIndex > -1) {
    lookbookBag[existingIndex].quantity += 1;
  } else {
    lookbookBag.push({
      id: product.id,
      name: product.name,
      sku: product.sku || 'NC-MOD',
      priceUSD: product.priceUSD || 0,
      image: product.image,
      designer: product.designer || 'Indonesian Atelier',
      size: chosenSize,
      quantity: 1
    });
  }

  saveBagToStorage();
  updateBagUI();
  showToast(`Added "${product.name}" to your Lookbook Bag!`);
}

// Update Lookbook Bag UI
function updateBagUI() {
  const countBadges = document.querySelectorAll('.bag-count-badge');
  const totalItems = lookbookBag.reduce((sum, item) => sum + item.quantity, 0);

  countBadges.forEach(badge => {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });

  const listContainer = document.getElementById('lookbookBagItems');
  const emptyBagNotice = document.getElementById('emptyBagNotice');
  const bagTotalElem = document.getElementById('lookbookBagTotal');
  const bagSubtotalElem = document.getElementById('lookbookBagSubtotal');

  if (!listContainer) return;

  if (lookbookBag.length === 0) {
    listContainer.innerHTML = '';
    if (emptyBagNotice) emptyBagNotice.classList.remove('hidden');
    if (bagTotalElem) bagTotalElem.textContent = formatPrice(0);
    if (bagSubtotalElem) bagSubtotalElem.textContent = formatPrice(0);
    return;
  }

  if (emptyBagNotice) emptyBagNotice.classList.add('hidden');
  listContainer.innerHTML = '';

  let totalUSD = 0;

  lookbookBag.forEach((item, index) => {
    const itemTotalUSD = item.priceUSD * item.quantity;
    totalUSD += itemTotalUSD;

    const row = document.createElement('div');
    row.className = 'flex gap-3 py-3 border-b border-[#eadfd3]/60 items-center justify-between';
    row.innerHTML = `
      <div class="w-14 h-18 rounded-lg overflow-hidden bg-[#f5f0eb] flex-shrink-0">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-semibold text-[#1f1d1c] truncate">${item.name}</h4>
        <p class="text-[11px] text-[#4a4643]/80">Size: <span class="font-medium">${item.size}</span></p>
        <p class="text-xs font-medium text-[#142a25] mt-1">${formatPrice(item.priceUSD)} each</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center border border-[#dccebe] rounded-md overflow-hidden bg-white">
          <button onclick="changeBagQty(${index}, -1)" class="px-2 py-0.5 text-xs hover:bg-[#f5f0eb]">-</button>
          <span class="px-2 text-xs font-medium">${item.quantity}</span>
          <button onclick="changeBagQty(${index}, 1)" class="px-2 py-0.5 text-xs hover:bg-[#f5f0eb]">+</button>
        </div>
        <button onclick="removeFromBag(${index})" class="text-[#b86b4d] hover:text-red-700 p-1" title="Remove">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    listContainer.appendChild(row);
  });

  if (bagTotalElem) bagTotalElem.textContent = formatPrice(totalUSD);
  if (bagSubtotalElem) bagSubtotalElem.textContent = formatPrice(totalUSD);

  initLucideIcons();
}

function changeBagQty(index, change) {
  if (!lookbookBag[index]) return;
  lookbookBag[index].quantity += change;
  if (lookbookBag[index].quantity <= 0) {
    lookbookBag.splice(index, 1);
  }
  saveBagToStorage();
  updateBagUI();
}

function removeFromBag(index) {
  if (!lookbookBag[index]) return;
  lookbookBag.splice(index, 1);
  saveBagToStorage();
  updateBagUI();
}

// Inquire via WhatsApp for single product
function inquireSingleWhatsApp(productId, size = null) {
  const products = getActiveProducts();
  const brand = getActiveBrandSettings();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const sizes = product.sizes || ['Free Size'];
  const chosenSize = size || sizes[0];
  const priceDisplay = `${formatPrice(product.priceUSD)} (${currentCurrency})`;

  const message = `Hello Nusara Concierge! ✨\n\nI am inquiring from the Maldives catalog about:\n- *Product*: ${product.name}\n- *SKU*: ${product.sku || 'NC-MOD'}\n- *Designer*: ${product.designer || 'Indonesian Atelier'}\n- *Fabric*: ${product.fabric || 'Premium Modest'}\n- *Size*: ${chosenSize}\n- *Price*: ${priceDisplay}\n\nCould you please advise on availability, sizing assistance, and delivery timeframe to the Maldives (Malé / Resort)? Thank you!`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${brand.phoneWhatsApp}?text=${encoded}`;
  window.open(waUrl, '_blank');
}

// Send Entire Bag to WhatsApp Concierge
function sendBagToWhatsApp() {
  if (lookbookBag.length === 0) {
    showToast('Your Lookbook Bag is empty. Add items first!');
    return;
  }

  const brand = getActiveBrandSettings();
  const destinationSelect = document.getElementById('deliveryDestination');
  const destination = destinationSelect ? destinationSelect.value : "Malé / Resort Villa";

  let totalUSD = 0;
  let itemsList = '';

  lookbookBag.forEach((item, i) => {
    const itemTotalUSD = item.priceUSD * item.quantity;
    totalUSD += itemTotalUSD;
    itemsList += `${i + 1}. *${item.name}* (SKU: ${item.sku})\n   Size: ${item.size} | Qty: ${item.quantity} | ${formatPrice(item.priceUSD)}\n`;
  });

  const totalFormatted = `${formatPrice(totalUSD)} (${currentCurrency})`;

  const message = `Hello Nusara Collection! 🌺\n\nI have curated a Lookbook Inquiry for my Maldives stay/wardrobe:\n\n${itemsList}\n*Total Value*: ${totalFormatted}\n*Destination*: ${destination}\n\nCould you please confirm item availability, reserve my sizes, and provide Maldives delivery options? Thank you!`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${brand.phoneWhatsApp}?text=${encoded}`;
  window.open(waUrl, '_blank');
}

// Handle Resort Concierge Consultation Form
function handleConciergeSubmit(e) {
  e.preventDefault();
  const brand = getActiveBrandSettings();
  const name = document.getElementById('conciergeName')?.value || 'Guest';
  const dates = document.getElementById('conciergeDates')?.value || 'Upcoming Vacation';
  const resort = document.getElementById('conciergeResort')?.value || 'Malé / Resort';
  const notes = document.getElementById('conciergeNotes')?.value || 'Looking for modest resort looks';

  const message = `Hello Nusara Concierge Team! 🌴\n\nI would like to request a *Personal Resort Styling Consultation*:\n- *Guest Name*: ${name}\n- *Resort / Location*: ${resort}\n- *Travel Dates / Timeline*: ${dates}\n- *Preferences / Notes*: ${notes}\n\nPlease share your curated modest lookbook recommendations. Thank you!`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${brand.phoneWhatsApp}?text=${encoded}`;
  window.open(waUrl, '_blank');
}

// Render Testimonials
function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  container.innerHTML = '';
  NUSARA_DATA.testimonials.forEach(t => {
    const card = document.createElement('div');
    card.className = 'bg-[#faf8f5] p-8 rounded-2xl border border-[#dccebe]/60 relative flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <div class="flex text-[#b86b4d] mb-4">
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
        </div>
        <p class="font-serif-subtle text-lg italic text-[#1f1d1c] leading-relaxed mb-6">
          "${t.quote}"
        </p>
      </div>
      <div class="pt-4 border-t border-[#eadfd3] flex items-center justify-between">
        <div>
          <h4 class="text-sm font-semibold text-[#142a25]">${t.author}</h4>
          <span class="text-xs text-[#6e7f6e]">${t.location}</span>
        </div>
        <span class="text-[11px] text-[#4a4643] bg-white px-2.5 py-1 rounded-full border border-[#eadfd3]">
          ${t.product}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
  initLucideIcons();
}

// Render FAQ Accordion
function renderFaq() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

  container.innerHTML = '';
  NUSARA_DATA.faq.forEach((item, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'border-b border-[#dccebe]/60 py-4';
    wrap.innerHTML = `
      <button onclick="toggleFaq(${index})" class="w-full flex items-center justify-between text-left font-editorial text-lg text-[#1f1d1c] hover:text-[#b86b4d] transition-colors py-1 focus:outline-none">
        <span>${item.q}</span>
        <i id="faq-icon-${index}" data-lucide="plus" class="w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300"></i>
      </button>
      <div id="faq-answer-${index}" class="hidden mt-3 text-sm text-[#4a4643] leading-relaxed pr-6">
        ${item.a}
      </div>
    `;
    container.appendChild(wrap);
  });
  initLucideIcons();
}

function toggleFaq(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer) return;

  const isHidden = answer.classList.contains('hidden');
  document.querySelectorAll('[id^="faq-answer-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('[id^="faq-icon-"]').forEach(el => {
    el.setAttribute('data-lucide', 'plus');
  });

  if (isHidden) {
    answer.classList.remove('hidden');
    icon.setAttribute('data-lucide', 'minus');
  }

  initLucideIcons();
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('nusaraToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nusaraToast';
    toast.className = 'toast-notice bg-[#142a25] text-white text-xs font-medium px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#dccebe]/30';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-[#c4a47c]"></i><span>${message}</span>`;
  initLucideIcons();
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
