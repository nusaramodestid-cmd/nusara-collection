# 🌺 NUSARA COLLECTION — Luxury Modest Wear Curator
### Indonesian Modest Elegance Curated for the Maldives Market

Website resmi dan katalog interaktif mewah untuk **Nusara Collection**, kurator busana modest dari Indonesia yang dirancang khusus untuk pasar kepulauan Maladewa (Maldives).

---

## 🌴 Gambaran Konsep & Keunggulan

Nusara Collection bertindak sebagai **kurator fashion premium** yang menjembatani keunggulan modest fashion Indonesia dengan gaya hidup resort mewah dan masyarakat Maladewa:
- **Tropical Resort Luxury Aesthetic**: Palet warna alami terinspirasi dari pasir hangat (*warm sand*), sutra gading (*pearl ivory*), terakota matahari terbenam (*sunset terracotta*), dan nuansa laut atoll (*ocean deep*).
- **Climate-Engineered Fabrics**: Menyoroti bahan 100% alami (pure Belgian/French flax linen softened in Indonesia, breathable mulberry silk crepe, cooling tencel modal, dan tenun slub sejuk) yang anti-gerah dan nyaman pada suhu 28°C–32°C di Maladewa.
- **Maldives Concierge Experience**:
  - Konverter multi-mata uang instan: **USD ($)**, **MVR (Rf - Maldivian Rufiyaa)**, dan **IDR (Rp)**.
  - **Lookbook Bag Drawer**: Pengunjung dapat memilih beberapa pakaian dan langsung mengirimkan daftar pesanan rapi via WhatsApp ke Concierge.
  - **Pilihan Pengiriman Maldives**: Opsi pengiriman ke Malé City, Hulhumalé, serta koordinasi speedboat / seaplane transfer langsung ke resort villa (Soneva, Cheval Blanc, Velaa, dll.).
  - **Quick View Modal**: Detail spesifikasi kain, tingkat sirkulasi udara (*breathability*), catatan styling untuk resort, dan pemilih ukuran.

---

## 📁 Struktur File Proyek

```
nusara-collection/
│
├── index.html          # Halaman utama katalog pelanggan (Responsive, Tailwind CSS, Lucide Icons)
├── admin.html          # Halaman Admin Studio (Dashboard visual untuk tambah, edit, & hapus produk)
├── css/
│   └── styles.css      # Styling kustom (Playfair Display, Cormorant Garamond, animasi luxury)
├── js/
│   ├── data.js         # Database katalog awal (8 produk kurasi, rate kurs, testimonial, FAQ)
│   ├── app.js          # Logika interaktif pelanggan (filter, keranjang lookbook, formatter WA, modal)
│   └── admin.js        # Logika Admin Studio (CRUD produk, live image preview, ekspor data.js)
└── README.md           # Panduan lengkap pengelolaan & peluncuran
```

---

## 🎛️ Menggunakan Admin Studio Nusara (Edit Langsung Visual)

Anda tidak perlu membuka file kode untuk mengelola produk! Cukup buka:
👉 [`admin.html`](file:///C:/Users/basko/.gemini/antigravity/scratch/nusara-collection/admin.html) di browser Anda.

### Fitur Admin Studio:
1. **Tambah Produk Baru**:
   - Formulir lengkap: Nama produk, SKU (dengan tombol *Auto Generate*), kategori, harga USD, desainer/atelier, spesifikasi bahan linen/silk, tingkat breathability, warna, dan ukuran.
   - **Live Image Preview**: Masukkan URL foto dan lihat hasil tampilannya secara instan sebelum disimpan.
2. **Edit Produk yang Sudah Ada**:
   - Klik tombol pensil (Edit) pada baris produk untuk mengubah harga, deskripsi, atau foto kapan saja.
3. **Hapus Produk**:
   - Tombol hapus dengan dialog konfirmasi aman.
4. **Ganti Nomor WhatsApp Hotline**:
   - Ganti nomor WhatsApp di panel kanan atas, klik *Simpan*, dan nomor tujuan pemesanan di seluruh website langsung terupdate otomatis.
5. **Download Updated `data.js`**:
   - Tombol satu-klik untuk mengunduh file `data.js` terbaru jika Anda ingin menyimpan perubahan secara permanen untuk deploy ke hosting online.

---

## 🚀 Cara Menjalankan & Membuka Website

### Opsi 1: Buka Langsung di Browser (Paling Mudah)
Anda dapat langsung klik ganda (double-click) file `index.html` pada File Explorer:
`C:\Users\basko\.gemini\antigravity\scratch\nusara-collection\index.html`

### Opsi 2: Menggunakan Local Server (Python)
Jalankan perintah berikut di PowerShell atau Command Prompt pada folder proyek:
```bash
cd "C:\Users\basko\.gemini\antigravity\scratch\nusara-collection"
python -m http.server 8000
```
Buka browser di: `http://localhost:8000`

---

## ⚙️ Cara Kustomisasi

### 1. Mengganti Nomor WhatsApp Resmi
Buka file `js/data.js` pada baris 11:
```javascript
phoneWhatsApp: "6281234567890", // Ganti dengan nomor WhatsApp resmi Nusara (format 62...)
displayWhatsApp: "+62 812-3456-7890",
```

### 2. Menambah atau Mengubah Produk Katalog
Buka `js/data.js` pada bagian `NUSARA_DATA.products`. Anda bisa mengubah:
- `name`: Nama koleksi / abaya / kaftan
- `sku`: Kode produk
- `category`: Kategori (`resort-linen`, `silk-abayas`, `kaftans`, `artisanal`)
- `priceUSD`: Harga dasar dalam USD (otomatis dikonversi ke MVR dan IDR)
- `designer`: Nama desainer / artisan Indonesia mitra
- `fabric`: Jenis kain (misal *100% Breathable Linen*)
- `image`: URL foto produk
- `description` & `stylingNotes`: Tips padu padan untuk tamu resort di Maldives

### 3. Mengatur Kurs Mata Uang (USD ke MVR & IDR)
Di `js/data.js` pada bagian `currencyRates`:
```javascript
MVR: { symbol: "Rf", rate: 15.42, ... }, // Kurs resmi Bank of Maldives
IDR: { symbol: "Rp", rate: 16000, ... }
```

---

## 🌐 Rekomendasi Deploy & Peluncuran Online Gratis

Website ini dibuat dengan arsitektur modern statis murni sehingga sangat cepat, aman, dan dapat dihosting secara gratis dengan nama domain kustom (misal `nusaracollection.com`):
1. **Vercel**: Tarik folder proyek ke [vercel.com](https://vercel.com) (Drag & Drop).
2. **Netlify**: Tarik folder ke [netlify.com/drop](https://app.netlify.com/drop).
3. **GitHub Pages**: Buat repositori GitHub dan aktifkan GitHub Pages.

---

## 💡 Strategi Kurasi & Pemasaran untuk Pasar Maldives

1. **Target Pasar Maldives**:
   - **Wanita Lokal Maladewa**: Menghargai modest wear berkualitas tinggi untuk acara keluarga, hari Jumat, dan resepsi pernikahan di Malé & Hulhumalé.
   - **Tamu Resort Mewah & Honeymooners**: Turis dari Timur Tengah, Eropa, dan Asia yang menginap di resort bintang lima dan mencari busana modest bernuansa *resort chic* yang sejuk.
   - **Ekspatriat di Malé**: Mencari pakaian kerja dan santai yang sopan dan nyaman dengan iklim tropis.
2. **Model Penjualan Concierge**:
   - Pola WhatsApp Concierge yang diterapkan pada website ini sangat sesuai dengan kultur belanja luxury di Maldives, di mana klien menghargai layanan personal, kepastian ukuran, serta pengantaran langsung ke villa atau alamat lokal.
