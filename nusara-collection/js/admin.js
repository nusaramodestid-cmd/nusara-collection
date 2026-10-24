// Nusara Collection - Admin Studio & Curator Dashboard Logic

let adminProducts = [];
let adminBrand = {};
let currentEditingId = null;
let adminSearchQuery = '';
let adminActiveCategory = 'all';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  loadAdminData();
  initLucideIcons();
  setupAdminListeners();
  renderAdminProducts();
  updateStats();
});

// Admin PIN Authentication
function getAdminPin() {
  return localStorage.getItem('nusara_admin_pin') || 'nusara2026';
}

function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('nusara_admin_auth') === 'true';
  const lockScreen = document.getElementById('adminLockScreen');
  const pinForm = document.getElementById('adminPinForm');
  const pinInput = document.getElementById('adminPinInput');
  const errorMsg = document.getElementById('pinErrorMessage');

  if (isAuth) {
    if (lockScreen) lockScreen.classList.add('hidden');
  } else {
    if (lockScreen) lockScreen.classList.remove('hidden');
    if (pinInput) setTimeout(() => pinInput.focus(), 300);
  }

  if (pinForm && !pinForm.dataset.initialized) {
    pinForm.dataset.initialized = 'true';
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = pinInput ? pinInput.value.trim() : '';
      if (entered === getAdminPin()) {
        sessionStorage.setItem('nusara_admin_auth', 'true');
        if (errorMsg) errorMsg.classList.add('hidden');
        if (lockScreen) lockScreen.classList.add('hidden');
        showToast('Selamat datang di Admin Studio Nusara!');
      } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (pinInput) {
          pinInput.value = '';
          pinInput.focus();
        }
      }
    });
  }
}

function adminLogout() {
  sessionStorage.removeItem('nusara_admin_auth');
  const lockScreen = document.getElementById('adminLockScreen');
  const pinInput = document.getElementById('adminPinInput');
  if (lockScreen) lockScreen.classList.remove('hidden');
  if (pinInput) {
    pinInput.value = '';
    pinInput.focus();
  }
  showToast('Admin Studio terkunci.');
}

// Helper for Lucide icons
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Load Data from LocalStorage or Fallback to NUSARA_DATA
function loadAdminData() {
  try {
    const savedProducts = localStorage.getItem('nusara_custom_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        adminProducts = parsed;
      } else {
        adminProducts = [...NUSARA_DATA.products];
      }
    } else {
      adminProducts = [...NUSARA_DATA.products];
    }
  } catch (e) {
    console.error('Error loading products in admin:', e);
    adminProducts = [...NUSARA_DATA.products];
  }

  try {
    const savedBrand = localStorage.getItem('nusara_brand_settings');
    if (savedBrand) {
      adminBrand = JSON.parse(savedBrand);
    } else {
      adminBrand = { ...NUSARA_DATA.brand };
    }
  } catch (e) {
    console.error('Error loading brand in admin:', e);
    adminBrand = { ...NUSARA_DATA.brand };
  }

  // Populate brand inputs
  const waPhoneInput = document.getElementById('settingsWaPhone');
  const waDisplayInput = document.getElementById('settingsWaDisplay');
  if (waPhoneInput) waPhoneInput.value = adminBrand.phoneWhatsApp || '';
  if (waDisplayInput) waDisplayInput.value = adminBrand.displayWhatsApp || '';
}

// Save Products to LocalStorage
function saveAdminProducts() {
  try {
    localStorage.setItem('nusara_custom_products', JSON.stringify(adminProducts));
  } catch (e) {
    console.error('Error saving products:', e);
  }
  updateStats();
}

// Save Brand Settings to LocalStorage
function saveAdminBrand() {
  try {
    localStorage.setItem('nusara_brand_settings', JSON.stringify(adminBrand));
  } catch (e) {
    console.error('Error saving brand:', e);
  }
}

// Setup Event Listeners
function setupAdminListeners() {
  // Search & Filter
  const searchInput = document.getElementById('adminSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      adminSearchQuery = e.target.value.toLowerCase().trim();
      renderAdminProducts();
    });
  }

  const categoryFilter = document.getElementById('adminCategoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      adminActiveCategory = e.target.value;
      renderAdminProducts();
    });
  }

  // Image URL live preview
  const imgInput = document.getElementById('productImage');
  const imgPreview = document.getElementById('imagePreviewBox');
  if (imgInput && imgPreview) {
    imgInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url) {
        imgPreview.src = url;
        imgPreview.classList.remove('hidden');
      } else {
        imgPreview.classList.add('hidden');
      }
    });
  }

  // Save Hotline Settings
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const waPhone = document.getElementById('settingsWaPhone')?.value.trim() || '';
      const waDisplay = document.getElementById('settingsWaDisplay')?.value.trim() || '';

      if (!waPhone) {
        showToast('Nomor WhatsApp tidak boleh kosong!', 'error');
        return;
      }

      adminBrand.phoneWhatsApp = waPhone.replace(/[^0-9]/g, '');
      adminBrand.displayWhatsApp = waDisplay || `+${adminBrand.phoneWhatsApp}`;
      saveAdminBrand();
      showToast('Pengaturan WhatsApp Concierge berhasil disimpan!');
      updateStats();
    });
  }

  // Product Form Submit (Add or Edit)
  const productForm = document.getElementById('productModalForm');
  if (productForm) {
    productForm.addEventListener('submit', handleProductFormSubmit);
  }
}

// Update Dashboard Statistics
function updateStats() {
  const totalCountElem = document.getElementById('statTotalProducts');
  const linenCountElem = document.getElementById('statLinenProducts');
  const silkCountElem = document.getElementById('statSilkProducts');
  const waCurrentElem = document.getElementById('statWaNumber');

  if (totalCountElem) totalCountElem.textContent = adminProducts.length;
  if (linencountElem => linencountElem) {
    const linenCount = adminProducts.filter(p => p.category === 'resort-linen').length;
    if (linencountElem) linenCountElem.textContent = linenCount;
  }
  if (silkCountElem) {
    const silkCount = adminProducts.filter(p => p.category === 'silk-abayas').length;
    silkCountElem.textContent = silkCount;
  }
  if (waCurrentElem) {
    waCurrentElem.textContent = adminBrand.displayWhatsApp || `+${adminBrand.phoneWhatsApp}`;
  }
}

// Render Products Table
function renderAdminProducts() {
  const tableBody = document.getElementById('adminProductsTableBody');
  const emptyState = document.getElementById('adminEmptyState');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  let filtered = adminProducts.filter(item => {
    const matchesCat = adminActiveCategory === 'all' || item.category === adminActiveCategory;
    const matchesSearch = !adminSearchQuery || 
      item.name.toLowerCase().includes(adminSearchQuery) ||
      (item.sku && item.sku.toLowerCase().includes(adminSearchQuery)) ||
      (item.designer && item.designer.toLowerCase().includes(adminSearchQuery)) ||
      (item.fabric && item.fabric.toLowerCase().includes(adminSearchQuery));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  filtered.forEach(product => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-[#dccebe]/40 hover:bg-[#faf8f5] transition-colors';

    const fallbackImg = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80';
    const displayImg = product.image || fallbackImg;
    const priceMVR = Math.round((product.priceUSD || 0) * 15.42);

    tr.innerHTML = `
      <td class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-16 rounded-lg overflow-hidden bg-[#f5f0eb] flex-shrink-0 border border-[#dccebe]">
            <img src="${displayImg}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src='${fallbackImg}'">
          </div>
          <div>
            <span class="text-[11px] font-bold text-[#b86b4d] tracking-wider block">${product.sku || 'N/A'}</span>
            <h4 class="text-sm font-semibold text-[#142a25] leading-snug">${product.name}</h4>
            <span class="text-xs text-[#4a4643]/70">${product.designer || 'Indonesian Atelier'}</span>
          </div>
        </div>
      </td>
      <td class="p-4">
        <span class="inline-block bg-[#ebf0eb] text-[#142a25] text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
          ${getCategoryLabel(product.category)}
        </span>
        ${product.tag ? `<span class="inline-block bg-[#f7ebe6] text-[#b86b4d] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 uppercase">${product.tag}</span>` : ''}
      </td>
      <td class="p-4">
        <div class="text-xs text-[#1f1d1c]">
          <span class="font-medium block truncate max-w-[200px]">${product.fabric || '-'}</span>
          <span class="text-[11px] text-[#6e7f6e]">${product.climateSuitability || 'Tropical Ready'}</span>
        </div>
      </td>
      <td class="p-4">
        <div class="text-sm font-semibold text-[#142a25]">$${product.priceUSD || 0}</div>
        <div class="text-[11px] text-[#6e7f6e]">Rf ${priceMVR.toLocaleString()}</div>
      </td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="editProduct('${product.id}')" class="p-2 text-[#142a25] hover:bg-[#eadfd3] rounded-lg transition-colors" title="Edit Produk">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="confirmDeleteProduct('${product.id}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Produk">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  initLucideIcons();
}

function getCategoryLabel(catId) {
  switch (catId) {
    case 'resort-linen': return 'Resort Linen';
    case 'silk-abayas': return 'Silk Abayas';
    case 'kaftans': return 'Island Kaftans';
    case 'artisanal': return 'Artisanal';
    default: return catId || 'Curated';
  }
}

// Open Modal for New Product
function openNewProductModal() {
  currentEditingId = null;
  const modal = document.getElementById('productModal');
  const title = document.getElementById('modalFormTitle');
  const form = document.getElementById('productModalForm');
  const preview = document.getElementById('imagePreviewBox');

  if (title) title.textContent = 'Tambah Produk Kurasi Baru';
  if (form) form.reset();
  if (preview) {
    preview.src = '';
    preview.classList.add('hidden');
  }

  // Pre-fill default values
  document.getElementById('productClimate').value = '5/5 Ultra-Breathable for Island Heat';
  document.getElementById('productOpacity').value = 'Full Coverage (Non-sheer)';
  document.getElementById('productColors').value = 'Sand Dune, Sage Mist, Ivory';
  document.getElementById('productSizes').value = 'S-M, L-XL, Custom Resort Length';
  
  // Auto generate a SKU
  generateNewSKU();

  if (modal) modal.classList.remove('hidden');
  initLucideIcons();
}

// Generate SKU
function generateNewSKU() {
  const cat = document.getElementById('productCategory')?.value || 'RES';
  const prefix = cat === 'resort-linen' ? 'LNN' : cat === 'silk-abayas' ? 'SLK' : cat === 'kaftans' ? 'KFT' : 'ART';
  const rand = Math.floor(100 + Math.random() * 900);
  const sku = `NSR-${prefix}-${rand}`;
  const skuInput = document.getElementById('productSku');
  if (skuInput) skuInput.value = sku;
}

// Open Modal for Editing Product
function editProduct(productId) {
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;

  currentEditingId = productId;
  const modal = document.getElementById('productModal');
  const title = document.getElementById('modalFormTitle');
  const preview = document.getElementById('imagePreviewBox');

  if (title) title.textContent = `Edit Produk: ${product.name}`;

  document.getElementById('productName').value = product.name || '';
  document.getElementById('productSku').value = product.sku || '';
  document.getElementById('productCategory').value = product.category || 'resort-linen';
  document.getElementById('productTag').value = product.tag || '';
  document.getElementById('productPrice').value = product.priceUSD || '';
  document.getElementById('productDesigner').value = product.designer || '';
  document.getElementById('productFabric').value = product.fabric || '';
  document.getElementById('productClimate').value = product.climateSuitability || '5/5 Ultra-Breathable';
  document.getElementById('productOpacity').value = product.opacity || 'Full Coverage';
  document.getElementById('productColors').value = Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || '');
  document.getElementById('productSizes').value = Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || '');
  document.getElementById('productImage').value = product.image || '';
  document.getElementById('productSecondaryImage').value = product.secondaryImage || '';
  document.getElementById('productShortDesc').value = product.shortDesc || '';
  document.getElementById('productDesc').value = product.description || '';
  document.getElementById('productStylingNotes').value = product.stylingNotes || '';

  if (preview && product.image) {
    preview.src = product.image;
    preview.classList.remove('hidden');
  } else if (preview) {
    preview.classList.add('hidden');
  }

  if (modal) modal.classList.remove('hidden');
  initLucideIcons();
}

// Close Product Modal
function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('hidden');
  currentEditingId = null;
}

// Handle Product Form Submit
function handleProductFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const sku = document.getElementById('productSku').value.trim();
  const category = document.getElementById('productCategory').value;
  const tag = document.getElementById('productTag').value.trim();
  const priceUSD = parseFloat(document.getElementById('productPrice').value) || 0;
  const designer = document.getElementById('productDesigner').value.trim();
  const fabric = document.getElementById('productFabric').value.trim();
  const climateSuitability = document.getElementById('productClimate').value.trim();
  const opacity = document.getElementById('productOpacity').value.trim();
  const colorsRaw = document.getElementById('productColors').value.trim();
  const sizesRaw = document.getElementById('productSizes').value.trim();
  const image = document.getElementById('productImage').value.trim();
  const secondaryImage = document.getElementById('productSecondaryImage').value.trim();
  const shortDesc = document.getElementById('productShortDesc').value.trim();
  const description = document.getElementById('productDesc').value.trim();
  const stylingNotes = document.getElementById('productStylingNotes').value.trim();

  const colors = colorsRaw.split(',').map(c => c.trim()).filter(Boolean);
  const sizes = sizesRaw.split(',').map(s => s.trim()).filter(Boolean);

  const productData = {
    id: currentEditingId || `nc-${Date.now().toString().slice(-6)}`,
    name,
    sku,
    category,
    tag,
    priceUSD,
    designer,
    fabric,
    climateSuitability,
    opacity,
    colors: colors.length > 0 ? colors : ['Natural Ivory'],
    sizes: sizes.length > 0 ? sizes : ['Free Size'],
    image: image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    secondaryImage,
    shortDesc,
    description: description || shortDesc,
    stylingNotes
  };

  if (currentEditingId) {
    // Update existing
    const index = adminProducts.findIndex(p => p.id === currentEditingId);
    if (index > -1) {
      adminProducts[index] = productData;
      showToast(`Produk "${name}" berhasil diperbarui!`);
    }
  } else {
    // Add new (insert at beginning of list)
    adminProducts.unshift(productData);
    showToast(`Produk baru "${name}" berhasil ditambahkan ke katalog!`);
  }

  saveAdminProducts();
  renderAdminProducts();
  closeProductModal();
}

// Confirm Delete Product
let productToDeleteId = null;
function confirmDeleteProduct(productId) {
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;

  productToDeleteId = productId;
  const modal = document.getElementById('deleteConfirmModal');
  const nameElem = document.getElementById('deleteProductName');

  if (nameElem) nameElem.textContent = product.name;
  if (modal) modal.classList.remove('hidden');
}

function cancelDelete() {
  productToDeleteId = null;
  const modal = document.getElementById('deleteConfirmModal');
  if (modal) modal.classList.add('hidden');
}

function executeDelete() {
  if (!productToDeleteId) return;

  const index = adminProducts.findIndex(p => p.id === productToDeleteId);
  if (index > -1) {
    const deletedName = adminProducts[index].name;
    adminProducts.splice(index, 1);
    saveAdminProducts();
    renderAdminProducts();
    showToast(`Produk "${deletedName}" telah dihapus.`);
  }

  cancelDelete();
}

// Reset to Factory Catalog (NUSARA_DATA default)
function resetToDefaultCatalog() {
  if (confirm('Kembalikan katalog ke 8 koleksi bawaan Nusara? Perubahan custom yang belum diekspor akan tereset.')) {
    adminProducts = [...NUSARA_DATA.products];
    adminBrand = { ...NUSARA_DATA.brand };
    saveAdminProducts();
    saveAdminBrand();
    loadAdminData();
    renderAdminProducts();
    updateStats();
    showToast('Katalog berhasil dikembalikan ke kurasi awal.');
  }
}

// Export Updated data.js File
function exportDataJsFile() {
  const exportObject = {
    brand: adminBrand,
    currencyRates: NUSARA_DATA.currencyRates,
    categories: NUSARA_DATA.categories,
    products: adminProducts,
    resortConciergeFeatures: NUSARA_DATA.resortConciergeFeatures,
    testimonials: NUSARA_DATA.testimonials,
    faq: NUSARA_DATA.faq
  };

  const fileContent = `// Nusara Collection - Data Store & Catalog\n// Luxury Indonesian Modest Fashion Curated for Maldives\n// Exported from Admin Studio: ${new Date().toISOString()}\n\nconst NUSARA_DATA = ${JSON.stringify(exportObject, null, 2)};\n\nif (typeof window !== 'undefined') {\n  window.NUSARA_DATA = NUSARA_DATA;\n}\n`;

  const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.setAttribute('download', 'data.js');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  showToast('File data.js berhasil didownload! Anda bisa menimpa file js/data.js.');
}

// Toast helper
function showToast(message, type = 'success') {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'toast-notice bg-[#142a25] text-white text-xs font-medium px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#dccebe]/30';
    document.body.appendChild(toast);
  }

  const iconName = type === 'error' ? 'alert-circle' : 'check';
  const iconColor = type === 'error' ? 'text-red-400' : 'text-[#c4a47c]';

  toast.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 ${iconColor}"></i><span>${message}</span>`;
  initLucideIcons();
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
