# Product Requirements Document
## Website Pembelajaran Geometri Bangun Datar untuk Siswa Tunarungu

| | |
|---|---|
| **Nama kerja produk** | GeoVisual *(placeholder — lihat OQ-01)* |
| **Versi dokumen** | 1.0 (Draft untuk validasi client & guru) |
| **Status** | Pre-development — menunggu validasi |
| **Platform** | Web (Next.js 16.3.5), responsive desktop / tablet / mobile |
| **Tahap berikutnya** | PRD → IA → User Flow → Wireframe → UI Design → Technical Design → Development → Testing |

### Konvensi penandaan

Setiap pernyataan dalam dokumen ini ditandai sumbernya:

| Tanda | Arti |
|---|---|
| **[C]** | **Client** — berasal langsung dari hasil perbincangan dengan client. Tidak boleh diubah tanpa persetujuan. |
| **[A]** | **Assumption** — asumsi yang dibuat karena informasi client masih high-level. Wajib divalidasi. |
| **[R]** | **Recommendation** — rekomendasi produk/desain hasil analisis. Boleh ditolak client. |
| **[OQ]** | **Open Question** — belum bisa diputuskan, butuh jawaban client/guru. |

Dan jenis requirement dibedakan:

| Kode | Jenis |
|---|---|
| **PR** | Product Requirement — apa yang harus dilakukan sistem |
| **LR** | Learning Requirement — syarat agar tujuan pembelajaran tercapai |
| **UXR** | UX Recommendation — arahan pengalaman/antarmuka |
| **TC** | Technical Consideration — arah teknis, bukan keputusan implementasi |

---

# 1. Executive Summary

Produk ini adalah website pembelajaran geometri bangun datar (persegi, persegi panjang, segitiga, lingkaran) yang dirancang khusus untuk siswa tunarungu. Fokusnya bukan memindahkan buku pelajaran ke layar, melainkan membangun **pemahaman konsep melalui pengalaman visual yang dapat dimanipulasi siswa secara langsung**.

Tiga keputusan produk yang menentukan seluruh isi dokumen ini:

1. **Kanal visual adalah satu-satunya kanal instruksi yang boleh diandalkan.** Audio tidak boleh membawa informasi apa pun. Konsekuensinya lebih jauh dari sekadar "tanpa suara": teks pun harus diminimalkan, karena hambatan utama siswa tunarungu dalam matematika umumnya bukan pada kemampuan spasial, melainkan pada bahasa yang membungkus matematika.
2. **Perhatian visual siswa tunarungu tidak dapat dibagi dua.** Siswa dengar bisa mendengarkan penjelasan sambil menatap gambar. Siswa tunarungu harus memilih: membaca teks **atau** melihat animasi. Karena itu produk ini menggunakan prinsip **satu fokus visual dalam satu waktu (sequential, bukan simultan)** — bukan sekadar "layout yang rapi".
3. **Interaktivitas tidak boleh merusak kebenaran matematis.** Siswa boleh mengubah ukuran dan warna, tetapi tidak boleh menghasilkan bentuk yang secara geometri salah (persegi yang menjadi persegi panjang, lingkaran yang menjadi elips, sudut 90° yang tidak lagi 90°). Ini adalah batas keras yang ditetapkan client **[C]**.

MVP mencakup: katalog & detail 4 bangun dengan highlight sisi/sudut, aktivitas membandingkan dua bangun, aktivitas mengelompokkan, pengenalan keliling & luas secara visual (trace keliling dan isi satuan persegi), 4 mini game, engine latihan dengan 5 tipe soal, dan progress sederhana per topik. Login, dashboard guru, dan konten bahasa isyarat masuk Post-MVP.

Produk dinyatakan berhasil apabila siswa dapat berpindah dari **mengenali bentuk secara utuh** ("ini persegi karena mirip persegi") ke **mengenali bentuk dari sifat-sifatnya** ("ini persegi karena 4 sisinya sama panjang dan semua sudutnya siku-siku") — yaitu transisi Van Hiele level 0 ke level 1. Metrik produk disusun untuk mengukur hal itu, bukan lama waktu siswa membuka website.

---

# 2. Product Background

## 2.1 Ringkasan kebutuhan client (fakta)

Berikut daftar pernyataan yang benar-benar berasal dari client. Semuanya ditandai **[C]** dan menjadi jangkar seluruh requirement.

| ID | Pernyataan client |
|---|---|
| C-01 | Website pembelajaran geometri bangun datar untuk siswa berkebutuhan khusus dengan gangguan pendengaran (tunarungu). |
| C-02 | Dibangun dengan Next.js 16.3.5. |
| C-03 | Tujuan: mengenal, memahami, membandingkan, mengidentifikasi, mengelompokkan, dan menghitung karakteristik dasar bangun datar. |
| C-04 | Pengalaman belajar harus sangat visual, interaktif, sederhana, dan sesuai kebutuhan siswa tunarungu. |
| C-05 | Bangun datar yang dicakup: persegi, persegi panjang, lingkaran, segitiga. |
| C-06 | Website memberi pengalaman visual soal **ukuran dan warna**. |
| C-07 | Bentuk dasar bangun **tidak boleh diubah sembarangan**; karakteristik geometri harus tetap akurat. |
| C-08 | Siswa dapat mengamati bagian bangun: **sisi dan sudut**. |
| C-09 | Sisi dan sudut dapat diberi penanda atau warna tertentu agar mudah diamati. |
| C-10 | Ada aktivitas membandingkan dua bangun: menentukan **persamaan dan perbedaan**. |
| C-11 | Siswa dapat menentukan nama/jenis bangun berdasarkan ciri-cirinya. |
| C-12 | Ada aktivitas **mengelompokkan** bangun berdasarkan karakteristik tertentu. |
| C-13 | Materi **keliling dan luas** disajikan lebih visual dan berbentuk permainan/interaksi, tetapi tetap punya tujuan pembelajaran yang jelas. |
| C-14 | Ada **latihan** yang mencakup: mengenali bangun, mengidentifikasi karakteristik, membandingkan, mengelompokkan, memahami keliling dan luas. |

Perlu dicatat secara jujur: **client belum menyebutkan** jenjang/usia siswa, jumlah siswa, perangkat yang dipakai di sekolah, apakah guru ikut memakai sistem, apakah butuh login, apakah ada kebutuhan pelaporan, dan sistem bahasa isyarat yang dipakai sekolah. Semua itu menjadi Open Question di Bab 28 dan asumsi di Bab 2.2.

## 2.2 Asumsi utama yang dipakai dokumen ini

| ID | Asumsi | Dampak bila salah |
|---|---|---|
| A-01 | Siswa berada pada jenjang setara SD kelas 3–6 (SDLB-B) atau awal SMPLB dengan materi bangun datar dasar. **[A]** | Mengubah tingkat kesulitan, rentang angka, dan panjang kalimat instruksi. |
| A-02 | Kemampuan membaca siswa berada **di bawah** level kelasnya; kosakata matematika belum mapan. **[A]** | Bila kemampuan baca lebih tinggi, teks boleh lebih kaya dan sebagian video isyarat tidak perlu. |
| A-03 | Penggunaan utama adalah **di kelas dengan pendampingan guru**, bukan belajar mandiri penuh di rumah. **[A]** | Bila mandiri penuh, sistem butuh onboarding, instruksi, dan bantuan yang jauh lebih kuat. |
| A-04 | Perangkat utama adalah laptop/PC sekolah atau tablet, layar ≥ 10 inci, dengan koneksi internet sederhana. **[A]** | Bila HP kecil dominan, interaksi drag-and-drop dan layout dua-bangun harus dirancang ulang. |
| A-05 | Sebagian besar siswa **tidak** memiliki gangguan penglihatan atau motorik halus berat yang signifikan. **[A]** | Bila ada, muncul kebutuhan aksesibilitas tambahan (screen reader, switch access, target lebih besar). |
| A-06 | Satu perangkat bisa dipakai bergantian oleh beberapa siswa. **[A]** | Menentukan apakah progress cukup disimpan lokal atau wajib per-akun. |
| A-07 | Bahasa antarmuka adalah Bahasa Indonesia sederhana. **[A]** | — |
| A-08 | Produk adalah alat bantu ajar (supplement), bukan pengganti guru atau pengganti manipulatif fisik. **[A]** | Menentukan kedalaman materi dan kebutuhan fitur asesmen formal. |
| A-09 | Tidak ada integrasi dengan LMS/sistem sekolah pada rilis pertama. **[A]** | Memengaruhi arsitektur data dan kebutuhan autentikasi. |
| A-10 | Materi mengikuti kurikulum matematika SD Indonesia, termasuk cara kurikulum tersebut mendefinisikan sisi lingkaran dan nilai π. **[A]** | Lihat risiko R-11 — ini asumsi paling berbahaya secara konten. |

---

# 3. Problem Statement

## 3.1 Masalah belajar geometri pada siswa tunarungu

Analisis ini memisahkan mana yang merupakan masalah **matematika**, mana masalah **bahasa**, dan mana masalah **media**. Pemisahan ini penting karena solusinya berbeda.

### (a) Masalah bahasa, bukan masalah spasial

Literatur pendidikan matematika untuk siswa tunarungu secara konsisten menunjukkan bahwa kesenjangan capaian paling besar muncul pada soal yang **dibungkus bahasa** (soal cerita, definisi verbal, instruksi panjang), sementara kemampuan **spasial-visual** relatif setara dengan siswa dengar. **[A — didasarkan pada pola umum, perlu dikonfirmasi ke guru]**

Implikasi produk yang sangat konkret:

- Geometri justru adalah **topik matematika yang paling menguntungkan** bagi siswa tunarungu, karena objeknya bisa dilihat. Yang mematikan bukan geometrinya, melainkan kalimat "Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Hitunglah kelilingnya."
- Karena itu, **soal harus diberi bentuk visual, bukan hanya narasi**. Angka menempel pada gambar, bukan di paragraf terpisah.
- Kosakata matematika (*sisi, sudut, siku-siku, keliling, luas, sejajar*) sering belum dimiliki siswa sebagai konsep, bukan hanya sebagai kata. Produk harus **memperkenalkan istilah lewat objek yang bisa ditunjuk**, bukan lewat definisi.

### (b) Perhatian visual yang tidak bisa dibagi (*divided visual attention*)

Ini adalah masalah paling sering diabaikan oleh produk e-learning yang "diadaptasi" untuk tunarungu. Siswa dengar dapat menerima penjelasan (audio) dan visual secara **paralel**. Siswa tunarungu harus menerima keduanya secara **serial**: melihat teks, lalu melihat animasi, lalu kembali ke teks.

Konsekuensinya:

- Animasi yang berjalan **sementara** instruksi tertulis muncul = siswa kehilangan salah satunya.
- Video bahasa isyarat yang diputar **sementara** demonstrasi geometri bergerak = sama buruknya.
- Prinsip yang harus dipegang: **satu sumber informasi aktif dalam satu waktu**, dengan kontrol penuh di tangan siswa (tombol ulang, tanpa timer). *(→ LR-VIS-01)*

### (c) Miskonsepsi geometri yang sudah umum pada semua siswa, dan lebih sulit dikoreksi tanpa penjelasan verbal

| Miskonsepsi | Penjelasan | Respons produk |
|---|---|---|
| **Prototipe bentuk** | Segitiga dianggap selalu "sama sisi, alas mendatar"; persegi yang diputar 45° dianggap "belah ketupat", bukan persegi lagi. | Setiap bangun wajib ditampilkan dalam **beberapa orientasi dan ukuran** sejak awal *(FR-06)*. |
| **Bentuk = gambar utuh** | Siswa menilai "ini persegi" karena *mirip* persegi, bukan karena sifatnya (Van Hiele level 0). | Highlight sisi & sudut satu per satu untuk memindahkan perhatian dari siluet ke bagian *(FR-03)*. |
| **Keliling ↔ luas tertukar** | Keduanya "angka hasil hitung dari bangun yang sama" sehingga mudah tertukar. | Dua representasi yang sangat berbeda secara visual: keliling = **garis/jejak tepi**, luas = **bidang terisi ubin**. Warna dan ikon dibedakan konsisten di seluruh produk *(LR-KL-01)*. |
| **Sudut = titik sudut** | "Sudut" dipahami sebagai pojok, bukan sebagai besaran bukaan. | Bedakan istilah dan penanda: **titik sudut** (titik) vs **sudut** (busur/kotak siku-siku). Lihat OQ-07 soal istilah yang dipakai guru. |
| **Satuan hilang** | Angka ditulis tanpa satuan, atau satuan luas dan keliling dianggap sama. | Satuan selalu menempel pada angka dan dibaca dari gambar (petak = satuan persegi). |
| **Luas = panjang × lebar untuk semua bangun** | Rumus dihafal tanpa makna. | Luas selalu diperkenalkan lewat **menghitung ubin** dulu, rumus datang belakangan sebagai jalan pintas. |

### (d) Masalah media: e-learning umum tidak dirancang untuk kanal ini

Materi geometri digital yang ada umumnya: banyak teks, mengandalkan narasi video, memakai gamifikasi berbasis waktu (timer, countdown), dan memakai warna sebagai satu-satunya pembeda. Semua pola ini merugikan target pengguna. Inilah *gap* yang diisi produk ini.

## 3.2 Kebutuhan belajar yang harus didukung sistem

| ID | Kebutuhan | Berasal dari |
|---|---|---|
| N-01 | Melihat bangun datar yang akurat, dalam berbagai ukuran dan orientasi. | C-05, C-06, C-07 |
| N-02 | Mengarahkan perhatian ke **bagian** bangun (sisi, sudut), bukan hanya siluet. | C-08, C-09 |
| N-03 | Menghitung/mencacah sisi dan sudut dengan bantuan visual, bukan hafalan. | C-03 |
| N-04 | Menjajarkan dua bangun dan melihat persamaan/perbedaan secara serentak. | C-10 |
| N-05 | Mengambil keputusan kategorisasi dan langsung melihat akibatnya. | C-12 |
| N-06 | Mengalami keliling sebagai perjalanan mengelilingi tepi, bukan sebagai rumus. | C-13 |
| N-07 | Mengalami luas sebagai bidang yang ditutup satuan persegi, bukan sebagai rumus. | C-13 |
| N-08 | Mendapat umpan balik **seketika, visual, dan tidak menghakimi**. | C-04, C-14 |
| N-09 | Mengulang tanpa rasa gagal dan tanpa tekanan waktu. | C-04 |
| N-10 | Memahami instruksi tanpa membaca kalimat panjang dan tanpa audio. | C-01, C-04 |
| N-11 | Guru dapat melihat/menemani proses belajar siswa. | A-03, perlu validasi (OQ-04) |

## 3.3 Risiko bila UI/UX terlalu kompleks

Ini bukan sekadar isu estetika; pada populasi ini kompleksitas UI langsung menurunkan hasil belajar.

| Risiko | Mekanisme | Mitigasi (ringkas) |
|---|---|---|
| **Extraneous cognitive load** | Working memory habis untuk memahami antarmuka, tidak tersisa untuk konsep geometri. | Maksimal **1 tugas utama per layar**; kontrol yang tidak dipakai disembunyikan, bukan di-*disable*. |
| **Kompetisi perhatian visual** | Animasi dekoratif menarik pandangan menjauh dari objek yang sedang dipelajari. | Larangan animasi dekoratif di area kanvas belajar; hanya animasi yang menjelaskan *(LR-VIS-05)*. |
| **Teks menjadi tembok** | Instruksi 2–3 kalimat langsung membuat siswa menebak, lalu menebak jadi kebiasaan. | Instruksi maks. **1 kalimat, ≤ 8 kata**, plus ikon, plus contoh 1 langkah *(FR-20)*. |
| **Navigasi tersesat** | Siswa tidak tahu sedang di mana dan bagaimana kembali. | Kedalaman navigasi maks. **3 level**; tombol kembali selalu di posisi yang sama; breadcrumb visual berbasis ikon. |
| **Menebak alih-alih berpikir** | Feedback "salah" tanpa arah membuat siswa mencoba semua opsi. | Feedback wajib **menunjukkan bagian yang relevan** pada bangun, bukan hanya menandai benar/salah *(FR-17)*. |
| **Ikon ambigu** | Ikon tanpa label diinterpretasi salah dan menjadi beban bahasa baru. | Ikon **selalu berpasangan dengan label teks pendek**; satu makna satu ikon, konsisten di seluruh produk. |

## 3.4 Menjaga kebenaran matematis di tengah interaktivitas

Ini penjabaran dari C-07, dan merupakan bagian yang paling sering rusak ketika produk dibuat "menarik". Aturan berikut bersifat **wajib** dan akan diuji pada QA.

| ID | Aturan | Alasan |
|---|---|---|
| MATH-01 | **Persegi dan lingkaran hanya boleh diskalakan secara uniform** (sx = sy). | Skala non-uniform mengubah persegi menjadi persegi panjang dan lingkaran menjadi elips — bentuk yang salah dengan nama yang benar. |
| MATH-02 | Persegi panjang boleh diskalakan pada dua sumbu, tetapi **rasio sisi harus dijaga ≥ 1,25 : 1**. | Bila mendekati 1:1, siswa melihat persegi yang diberi label "persegi panjang". *(Catatan: secara matematis persegi memang persegi panjang khusus — lihat OQ-08.)* |
| MATH-03 | Sudut siku-siku harus tetap **tepat 90°** dan ditandai dengan **kotak kecil**, bukan busur. | Notasi standar; membedakan sudut siku-siku dari sudut lain tanpa mengandalkan warna. |
| MATH-04 | Segitiga yang diskalakan harus **mempertahankan jenisnya** bila jenis sedang diajarkan (sama sisi tetap sama sisi). | Mencegah label yang tidak sesuai bentuk. |
| MATH-05 | MVP hanya memakai **segitiga lancip dan siku-siku**; segitiga tumpul ditunda. | Pada segitiga tumpul, garis tinggi jatuh **di luar** bangun — sangat membingungkan saat mengenalkan luas. |
| MATH-06 | Sisi yang sama panjang ditandai **tanda garis (tick marks)**; sudut yang sama besar ditandai **busur**. | Notasi matematika standar, dan merupakan redundansi non-warna (WCAG 1.4.1). |
| MATH-07 | Grid satuan luas harus **presisi**; MVP hanya memakai dimensi **bilangan bulat** sehingga tidak ada petak separuh. | Petak separuh memerlukan konsep pecahan yang belum tentu dikuasai. |
| MATH-08 | Dilarang menggunakan **perspektif, bayangan 3D, atau gradien tebal** pada bangun datar. | Bayangan/perspektif menyiratkan kedalaman, merusak konsep "datar" dan mengaburkan tepi. |
| MATH-09 | Angka pada gambar **selalu disertai satuan**, dan satuan luas ditulis berbeda dari satuan keliling. | Mencegah keliling-luas tertukar. |
| MATH-10 | Seluruh nilai turunan (jumlah sisi, jumlah sudut, keliling, luas) **dihitung dari definisi bangun**, tidak ditulis manual di konten. | Mencegah jawaban soal tidak sinkron dengan gambar. *(→ TC-04)* |
| MATH-11 | Variasi orientasi **wajib** ada pada setiap bangun. | Melawan prototipe bentuk (3.1c). |
| MATH-12 | Lingkaran **tidak** diperlakukan sebagai poligon dalam logika sistem (tidak punya titik sudut). Cara menyebut "sisi lengkung" mengikuti keputusan guru. | Lihat R-11 dan OQ-06 — ini titik konflik antara ketepatan matematis dan kebiasaan buku SD Indonesia. |

## 3.5 Batasan (constraints)

| ID | Batasan | Sumber |
|---|---|---|
| CON-01 | Tidak boleh ada informasi yang hanya tersedia lewat audio. | C-01 |
| CON-02 | Bentuk geometri harus akurat dalam kondisi apa pun. | C-07 |
| CON-03 | Stack: Next.js 16.3.5. | C-02 |
| CON-04 | Cakupan materi terbatas 4 bangun: persegi, persegi panjang, segitiga, lingkaran. | C-05 |
| CON-05 | Semua fitur harus punya kaitan langsung ke tujuan pembelajaran. | C-13, C-04 |
| CON-06 | Kompleksitas antarmuka dibatasi (lihat 3.3). | C-04 |

---

# 4. Product Vision

> **Visi:** Menjadikan geometri bangun datar sesuatu yang **bisa dilihat, disentuh, dan dicoba** oleh siswa tunarungu — sehingga pemahaman lahir dari pengamatan dan manipulasi langsung, bukan dari kalimat yang harus dibaca dan rumus yang harus dihafal.

**Positioning statement**

> Untuk **siswa tunarungu jenjang dasar** yang **kesulitan mengakses matematika karena bahasa yang membungkusnya**, GeoVisual adalah **media belajar geometri berbasis web** yang **mengubah setiap konsep menjadi objek visual yang dapat dimanipulasi dan langsung memberi umpan balik**. Berbeda dengan e-learning umum yang mengandalkan narasi video dan teks panjang, produk ini **menempatkan bahasa sebagai pendukung, bukan sebagai pintu masuk**.

## 4.1 Rantai Masalah → Tujuan Produk → Tujuan Pembelajaran → Fitur → Outcome

| Masalah | Tujuan Produk | Tujuan Pembelajaran | Fitur Utama | Outcome |
|---|---|---|---|---|
| Konsep geometri disampaikan lewat teks/definisi yang tidak terjangkau bahasa siswa | Menyajikan setiap konsep sebagai objek visual yang bisa diamati | LO-01 … LO-05 | Katalog Bangun, Shape Viewer, Highlight Sisi/Sudut | Siswa mengenali bangun dari **ciri**, bukan dari tebakan siluet |
| Siswa menilai bentuk dari siluet (Van Hiele level 0) | Memindahkan perhatian dari bentuk utuh ke bagian-bagiannya | LO-03, LO-04, LO-05 | Part Highlighting, Counter Sisi & Sudut, Orientation Explorer | Siswa bertahan menyebut nama bangun walau diputar/diubah ukurannya |
| Perbandingan antar bangun hanya berupa tabel hafalan | Membuat perbandingan menjadi aktivitas melihat berdampingan | LO-06, LO-07 | Compare View, "Apa yang sama / berbeda?" | Siswa menyebut minimal 1 persamaan & 1 perbedaan dua bangun |
| Pengelompokan diajarkan sebagai soal pilihan ganda | Mengubah klasifikasi menjadi tindakan memindahkan objek | LO-08, LO-09 | Classification Sandbox (drag & tap) | Siswa mengelompokkan berdasarkan kriteria yang diminta |
| Keliling & luas dihafal sebagai rumus, sering tertukar | Memberi pengalaman fisik-visual atas kedua besaran | LO-10 … LO-13 | Perimeter Trace, Area Tiling, mini game | Siswa memilih cara hitung yang benar untuk soal keliling vs luas |
| Umpan balik hanya "benar/salah", siswa lalu menebak | Menjadikan umpan balik sebagai penjelasan visual | seluruh LO | Feedback System, Retry tanpa penalti | Tingkat menebak turun; percobaan kedua lebih terarah |
| Guru sulit tahu bagian mana yang belum dikuasai siswa | Merekam pola kesalahan per kompetensi | — | Progress & Ringkasan Hasil | Guru punya bahan untuk mengulang materi yang tepat |

## 4.2 Nilai untuk siswa

- Bisa belajar **mandiri sejauh mungkin** tanpa bergantung pada seseorang yang menerjemahkan instruksi.
- Bisa **mencoba, salah, dan mengulang** tanpa malu dan tanpa dikejar waktu.
- Mendapat **rasa berhasil yang terukur** melalui progress per topik, bukan lewat skor kompetitif.
- Membangun **kosakata matematika** karena istilah selalu melekat pada objek yang ditunjuk.

## 4.3 Nilai untuk guru **[A — bergantung OQ-04]**

- Alat peraga digital yang konsisten, akurat, dan bisa diproyeksikan ke layar kelas.
- Menghemat waktu menyiapkan manipulatif fisik (potongan bangun, kertas berpetak).
- Melihat topik mana yang paling banyak salah, sebagai bahan pengulangan.
- **Bukan** menggantikan guru: sistem dirancang sebagai bahan diskusi guru–siswa.

---

# 5. Goals & Objectives

## 5.1 Tujuan produk (product goals)

| ID | Tujuan | Indikator |
|---|---|---|
| G-01 | Siswa dapat menyelesaikan satu topik penuh (belajar → latihan) tanpa bantuan membaca dari guru. | ≥ 70% sesi topik selesai tanpa intervensi guru **[A, perlu observasi]** |
| G-02 | Seluruh konsep inti tersedia dalam bentuk visual yang dapat dimanipulasi. | 100% LO MVP punya representasi visual interaktif |
| G-03 | Tidak ada informasi yang hanya tersedia lewat audio atau hanya lewat warna. | Audit aksesibilitas: 0 pelanggaran |
| G-04 | Seluruh visualisasi geometri akurat secara matematis. | Checklist MATH-01…12 lulus 100% pada QA |
| G-05 | Siswa menunjukkan peningkatan penguasaan antar percobaan. | Success rate percobaan ke-2 > percobaan ke-1 pada topik yang sama |

## 5.2 Non-goals (secara eksplisit di luar cakupan)

- Bukan LMS, bukan sistem penilaian resmi sekolah.
- Tidak mencakup bangun ruang (3D), bangun datar selain 4 bangun di C-05, atau bangun majemuk (gabungan) pada MVP.
- Tidak mengajarkan bahasa isyarat; sistem boleh **memakai** bahasa isyarat sebagai media, tetapi bukan materinya.
- Tidak menyediakan komunikasi antar-pengguna (chat, forum), karena tidak melayani tujuan pembelajaran dan menambah risiko keamanan anak.
- Tidak membuat konten generatif/AI pada MVP.

---

# 6. Target Users

## 6.1 Primary user — Siswa tunarungu

**Peringatan analisis:** populasi tunarungu **sangat heterogen**. Menyamaratakan mereka adalah kesalahan desain yang paling mahal di proyek ini. Variasi berikut nyata dan berpengaruh langsung ke antarmuka:

| Dimensi variasi | Rentang nyata | Implikasi desain |
|---|---|---|
| **Derajat ketunarunguan** | Ringan–berat, dengan/ tanpa alat bantu dengar atau implan koklea | Sebagian siswa masih memanfaatkan sisa pendengaran. Audio boleh ada sebagai **pelengkap opsional**, tidak pernah sebagai pembawa informasi. |
| **Bahasa pertama** | BISINDO, SIBI, oral/bahasa Indonesia lisan, kombinasi | Menentukan apakah video isyarat perlu, dan versi mana. **OQ-05** |
| **Kemampuan membaca** | Dari mengenali kata tunggal sampai membaca kalimat sederhana | Menentukan panjang instruksi; desain harus tetap jalan pada level terendah. |
| **Kosakata matematika** | Sebagian belum punya kata "sisi"/"sudut" sebagai konsep | Istilah harus diperkenalkan lewat objek + ikon + pengulangan konsisten. |
| **Pemahaman matematika** | Dalam satu kelas bisa berbeda 2–3 tingkat | Butuh tingkat kesulitan bertingkat dan kemampuan mengulang tanpa penalti. |
| **Motorik halus** | Umumnya normal; sebagian punya hambatan penyerta | Target sentuh besar, drag-and-drop **selalu** punya alternatif tap. |
| **Pengalaman digital** | Dari terbiasa HP sampai jarang memakai komputer | Ikon standar + label; hindari gestur tersembunyi (swipe, long-press) sebagai satu-satunya cara. |

### Kebutuhan yang diturunkan dari variasi di atas

| Kode | Kebutuhan siswa |
|---|---|
| SN-01 | Instruksi dapat dipahami tanpa audio dan tanpa membaca kalimat panjang. |
| SN-02 | Navigasi sederhana, dapat ditebak, dan selalu punya jalan kembali. |
| SN-03 | Umpan balik visual yang jelas, seketika, dan menunjukkan **mengapa**. |
| SN-04 | Bebas dari tekanan waktu. |
| SN-05 | Objek besar, kontras tinggi, dan tidak ramai. |
| SN-06 | Konsistensi total: warna, ikon, istilah, posisi tombol tidak berubah antar halaman. |
| SN-07 | Dapat mengulang penjelasan sebanyak yang diinginkan. |
| SN-08 | Tidak menghadapi lebih dari satu keputusan dalam satu waktu. |

### Persona 1 — Rizky, 10 tahun (kelas 4 SDLB-B) **[A]**

- Tunarungu sejak lahir, berkomunikasi dengan BISINDO dan sedikit membaca.
- Bisa membaca kata tunggal ("persegi", "sisi") tetapi melewati kalimat panjang; cenderung menebak.
- Sangat cepat menangkap pola visual; suka mencocokkan dan menyusun.
- Kebiasaan: bila tidak paham, ia mencoba semua tombol sampai ada yang "hijau".
- **Kebutuhan kritis:** instruksi berupa demonstrasi 1 langkah; umpan balik yang menunjukkan bagian bangun, bukan sekadar tanda silang.
- **Kegagalan produk baginya:** layar penuh teks pengantar sebelum ia boleh menyentuh apa pun.

### Persona 2 — Nabila, 13 tahun (SMPLB) **[A]**

- Kemampuan baca lebih baik, sudah mengenal istilah keliling dan luas, tetapi sering tertukar.
- Hafal rumus tanpa paham asalnya; menjawab "panjang × lebar" untuk soal keliling.
- Mudah bosan pada materi yang terasa kekanak-kanakan.
- **Kebutuhan kritis:** pengalaman yang menjelaskan **asal** rumus (trace keliling, tiling luas), dan tampilan yang terasa sesuai usianya.
- **Kegagalan produk baginya:** maskot lucu dan animasi bertepuk tangan yang membuatnya merasa diperlakukan seperti anak kecil.

## 6.2 Secondary user — Guru / pendamping **[A — perlu validasi OQ-04]**

### Persona 3 — Bu Sari, guru SLB

- Mengajar kelas dengan kemampuan sangat beragam; sering menyiapkan manipulatif sendiri.
- Waktu terbatas, tidak akan membaca manual panjang.
- **Kebutuhan:** membuka materi tertentu dengan cepat untuk diproyeksikan; menyetel tingkat kesulitan; melihat topik mana yang paling banyak salah.
- **Bukan kebutuhannya:** dashboard analitik rumit.

## 6.3 Tertiary user — Pengelola konten / developer

Membutuhkan pemisahan konten dari UI agar soal, materi, dan bangun dapat ditambah tanpa menyentuh komponen visual *(→ TC-05)*.

---

# 7. Learning Objectives

Setiap tujuan pembelajaran (LO) diturunkan dari C-03/C-14 dan dipetakan ke fitur di Bab 11. Format: kompetensi → konsep matematika → contoh aktivitas → indikator keberhasilan → tingkat kesulitan.

**Skala tingkat kesulitan:** L1 (pengenalan) · L2 (pemahaman) · L3 (penerapan) · L4 (analisis sederhana).

---

### LO-01 — Mengenali bangun datar

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa dapat menunjuk/memilih bangun datar yang dimaksud dari beberapa pilihan. |
| **Konsep** | Bentuk sebagai keseluruhan (Van Hiele level 0). Bangun datar adalah bentuk dua dimensi tertutup. |
| **Aktivitas** | Melihat katalog bangun; game "Temukan bangun ini"; memilih 1 dari 4 gambar. |
| **Indikator** | ≥ 4 dari 5 soal benar, termasuk minimal 1 bangun dalam orientasi tidak standar. |
| **Kesulitan** | L1 |
| **Fitur** | FR-01, FR-02, FR-18a |

### LO-02 — Menyebutkan / memilih nama bangun berdasarkan bentuk

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa mencocokkan bentuk dengan namanya secara tertulis. |
| **Konsep** | Hubungan label–objek; kosakata: persegi, persegi panjang, segitiga, lingkaran. |
| **Aktivitas** | Mencocokkan kartu nama ke bangun; game "Pilih namanya". |
| **Indikator** | ≥ 4 dari 5 pasangan benar tanpa bantuan. |
| **Kesulitan** | L1 |
| **Fitur** | FR-02, FR-24, FR-18a |

### LO-03 — Mengenali jumlah sisi

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menghitung banyaknya sisi suatu bangun. |
| **Konsep** | Sisi = ruas garis pembatas bangun. Persegi & persegi panjang = 4; segitiga = 3; lingkaran = kasus khusus (lihat OQ-06). |
| **Aktivitas** | Menyentuh setiap sisi satu per satu, sisi berubah warna dan penghitung bertambah. |
| **Indikator** | Siswa menghitung benar pada ≥ 3 bangun berbeda, termasuk orientasi miring. |
| **Kesulitan** | L1–L2 |
| **Fitur** | FR-03, FR-04, FR-18e |

### LO-04 — Mengenali jumlah sudut

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menghitung banyaknya sudut dan mengenali sudut siku-siku. |
| **Konsep** | Sudut terbentuk oleh dua sisi yang bertemu pada satu titik sudut; sudut siku-siku = 90°. Bedakan **titik sudut** (titik) dan **sudut** (bukaan). |
| **Aktivitas** | Menyentuh tiap sudut; penanda busur muncul; sudut siku-siku ditandai kotak kecil. |
| **Indikator** | Menghitung sudut benar pada ≥ 3 bangun; mengenali sudut siku-siku pada persegi & persegi panjang. |
| **Kesulitan** | L2 |
| **Fitur** | FR-03, FR-04, FR-18f |

### LO-05 — Mengenali karakteristik setiap bangun

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menyebut ciri utama tiap bangun (jumlah sisi, jumlah sudut, sisi sama panjang, sudut siku-siku). |
| **Konsep** | Bangun didefinisikan oleh sifat, bukan oleh penampilan (Van Hiele level 1). |
| **Aktivitas** | Kartu karakteristik; "Benar atau salah: persegi punya 4 sisi sama panjang". |
| **Indikator** | ≥ 4 dari 5 pernyataan ciri dinilai benar/salah dengan tepat. |
| **Kesulitan** | L2 |
| **Fitur** | FR-02, FR-07, FR-16 |

### LO-06 — Membandingkan dua bangun datar

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa membandingkan dua bangun pada atribut tertentu (jumlah sisi, jumlah sudut, ukuran). |
| **Konsep** | Perbandingan berdasarkan atribut yang sama (*apple-to-apple*). |
| **Aktivitas** | Compare View berdampingan; "Mana yang sisinya lebih banyak?" |
| **Indikator** | ≥ 4 dari 5 perbandingan benar. |
| **Kesulitan** | L2 |
| **Fitur** | FR-08, FR-18c |

### LO-07 — Menentukan persamaan dan perbedaan dua bangun

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa memilih pernyataan yang merupakan persamaan dan yang merupakan perbedaan. |
| **Konsep** | Atribut bisa sama pada dua bangun berbeda; satu perbedaan sudah cukup untuk membedakan. |
| **Aktivitas** | Dua bangun + daftar atribut; siswa menempatkan tiap atribut ke kolom **Sama** / **Berbeda**. |
| **Indikator** | Menyebut minimal 1 persamaan dan 1 perbedaan yang benar untuk 3 pasangan bangun. |
| **Kesulitan** | L3 |
| **Fitur** | FR-08, FR-09 |

### LO-08 — Mengelompokkan bangun berdasarkan karakteristik

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa memasukkan beberapa bangun ke kelompok sesuai kriteria yang diberikan. |
| **Konsep** | Klasifikasi berdasarkan satu atribut; anggota kelompok berbagi sifat yang sama. |
| **Aktivitas** | Classification Sandbox: 6–8 bangun, 2–3 keranjang berlabel ("3 sisi" / "4 sisi"). |
| **Indikator** | Seluruh bangun ditempatkan benar pada ≥ 2 kriteria berbeda. |
| **Kesulitan** | L3 |
| **Fitur** | FR-10, FR-18d |

### LO-09 — Menentukan bangun berdasarkan ciri tertentu

| Aspek | Isi |
|---|---|
| **Kompetensi** | Diberi daftar ciri, siswa menentukan bangun yang dimaksud (arah terbalik dari LO-05). |
| **Konsep** | Ciri → nama; sebagian ciri belum cukup untuk menentukan bangun secara unik. |
| **Aktivitas** | "Aku punya 4 sisi sama panjang dan 4 sudut siku-siku. Siapa aku?" (dengan ikon, bukan paragraf) |
| **Indikator** | ≥ 4 dari 5 teka-teki ciri terjawab benar. |
| **Kesulitan** | L3–L4 |
| **Fitur** | FR-07, FR-16, FR-18b |

### LO-10 — Memahami konsep keliling

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menunjukkan bahwa keliling adalah panjang seluruh tepi bangun. |
| **Konsep** | Keliling = jumlah panjang semua sisi; merupakan besaran **panjang** (satuan cm, bukan cm²). |
| **Aktivitas** | Perimeter Trace: menyeret titik mengelilingi tepi; tiap sisi yang dilewati "menyala" dan panjangnya masuk ke jumlah berjalan. |
| **Indikator** | Siswa memilih representasi keliling yang benar (tepi, bukan bidang) pada ≥ 4 dari 5 soal. |
| **Kesulitan** | L2 |
| **Fitur** | FR-11 |

### LO-11 — Menghitung keliling

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menghitung keliling persegi, persegi panjang, dan segitiga dari panjang sisi yang tertera pada gambar. |
| **Konsep** | Penjumlahan semua sisi → jalan pintas (4 × s; 2 × (p + l)). Rumus diperkenalkan **setelah** penjumlahan dipahami. |
| **Aktivitas** | Soal dengan angka menempel pada gambar; mini game "Hitung keliling". |
| **Indikator** | ≥ 4 dari 5 benar pada bilangan bulat ≤ 20 per sisi. |
| **Kesulitan** | L3 |
| **Fitur** | FR-12, FR-18g |

### LO-12 — Memahami konsep luas

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menunjukkan bahwa luas adalah banyaknya satuan persegi yang menutupi bangun. |
| **Konsep** | Luas = ukuran bidang; satuan luas berbentuk persegi satuan; tanpa celah dan tanpa tumpang tindih. |
| **Aktivitas** | Area Tiling: menyeret satuan persegi untuk menutupi bangun; penghitung bertambah otomatis. |
| **Indikator** | Siswa membedakan luas dan keliling dengan benar pada ≥ 4 dari 5 soal pembeda. |
| **Kesulitan** | L2–L3 |
| **Fitur** | FR-13 |

### LO-13 — Menghitung luas

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menghitung luas persegi dan persegi panjang; (segitiga siku-siku sebagai lanjutan). |
| **Konsep** | Barisan × kolom → p × l; segitiga siku-siku = setengah persegi panjang. |
| **Aktivitas** | Grid dengan baris/kolom yang dapat dihitung; mini game "Hitung luas". |
| **Indikator** | ≥ 4 dari 5 benar; siswa dapat menjelaskan lewat grid (dengan menunjuk baris & kolom). |
| **Kesulitan** | L3 |
| **Fitur** | FR-13, FR-14, FR-18h |

### LO-14 — Menerapkan konsep melalui latihan/game

| Aspek | Isi |
|---|---|
| **Kompetensi** | Siswa menerapkan seluruh kompetensi di atas dalam konteks campuran. |
| **Konsep** | Transfer: memilih strategi yang tepat untuk pertanyaan yang tepat. |
| **Aktivitas** | Latihan campuran per topik; game dengan progres tingkat kesulitan. |
| **Indikator** | Penguasaan (≥ 80% benar) pada latihan campuran, tanpa bantuan. |
| **Kesulitan** | L3–L4 |
| **Fitur** | FR-16, FR-18, FR-19 |

**Catatan cakupan [R]:** keliling dan luas **lingkaran** (melibatkan π) **tidak** dimasukkan ke MVP. Alasannya: π adalah lompatan abstraksi besar, memerlukan perkalian desimal/pecahan, dan tidak dapat diperagakan dengan tiling satuan persegi tanpa konsep pendekatan (aproksimasi). Diusulkan sebagai Post-MVP dengan pendekatan visual "membuka tali keliling" dan "memotong juring". → **OQ-09**

---

# 8. Scope

## 8.1 In scope (MVP)

- 4 bangun datar: persegi, persegi panjang, segitiga (lancip & siku-siku), lingkaran **[C]**
- Katalog + halaman detail tiap bangun dengan highlight sisi/sudut **[C]**
- Eksplorasi ukuran, warna, dan orientasi dengan batasan matematis **[C + R]**
- Aktivitas membandingkan dua bangun (persamaan & perbedaan) **[C]**
- Aktivitas mengelompokkan bangun **[C]**
- Pengenalan keliling (trace) & luas (tiling) secara visual **[C]**
- Perhitungan keliling & luas untuk persegi dan persegi panjang **[C]**
- 4 mini game dengan tujuan pembelajaran eksplisit **[C]**
- Latihan per topik (5 tipe soal) + umpan balik visual **[C]**
- Progress per topik disimpan di perangkat **[R]**
- Aksesibilitas visual penuh (tanpa audio) **[C]**
- Responsif desktop/tablet; mobile didukung dengan layout alternatif **[R]**

## 8.2 Out of scope (MVP)

| Item | Alasan |
|---|---|
| Login / akun siswa | Menambah friksi & risiko data anak; progress lokal cukup untuk MVP. **[R]** |
| Dashboard guru & pelaporan | Butuh akun + backend; belum dikonfirmasi client. **OQ-04** |
| Video bahasa isyarat (BISINDO/SIBI) | Butuh talent, standar, dan produksi; sistem isyarat sekolah belum diketahui. **OQ-05** |
| Keliling & luas lingkaran (π) | Lompatan abstraksi; lihat catatan LO-14. **OQ-09** |
| Bangun ruang, bangun majemuk, bangun datar lain | Di luar C-05. |
| Simetri, pencerminan, kesebangunan | Tidak diminta client. |
| Leaderboard / kompetisi antarsiswa | Tekanan sosial, tidak menambah nilai pedagogis. **[R]** |
| Mode offline / PWA | Nice to have; tergantung kondisi koneksi sekolah. **OQ-10** |
| Multi-bahasa | Tidak diminta. |

---

# 9. User Journey

## 9.1 Journey makro

```
[Home]
   │  pilih topik (ikon besar)
   ▼
[Halaman Materi] ── Konsep (lihat) ──► Coba (interaksi) ──► Latihan ──► Hasil
   │                                                                    │
   │◄──────────────── ulangi materi / ulangi latihan ───────────────────┤
   │                                                                    ▼
   └────────────────────────────────────────────────────────► [Topik berikutnya]
```

Pola tetap di setiap topik: **LIHAT → COBA → LATIHAN → HASIL**. Empat langkah ini ditandai indikator langkah yang sama posisinya di seluruh produk *(UXR-NAV-02)* sehingga siswa selalu tahu di mana ia berada.

## 9.2 Flow A — Mempelajari satu bangun datar

```
Home
 └─► Kenali Bangun (daftar 4 bangun)
      └─► Detail Bangun: Persegi
           ├─ (1) LIHAT  : bangun ditampilkan besar di tengah, tanpa kontrol lain
           ├─ (2) SISI   : tap tombol "Sisi" → sisi menyala satu per satu, counter 1..4
           ├─ (3) SUDUT  : tap tombol "Sudut" → busur/kotak siku-siku muncul, counter 1..4
           ├─ (4) UBAH   : slider ukuran (uniform), pilihan warna, tombol putar
           ├─ (5) CIRI   : kartu ciri muncul satu per satu (bukan daftar sekaligus)
           └─► [Latihan topik ini]  atau  [Bangun berikutnya]
```

## 9.3 Flow B — Membandingkan dua bangun

```
Home ─► Bandingkan Bangun
 └─ Pilih Bangun A  ─►  Pilih Bangun B      (default: pasangan yang disarankan)
     └─► Compare View (dua bangun berdampingan, ukuran kanvas identik)
          ├─ Tab/tombol atribut: [Sisi] [Sudut] [Bentuk]
          │    → atribut yang dipilih di-highlight SERENTAK pada kedua bangun
          ├─ Panel ringkas: nilai A vs nilai B + tanda = atau ≠
          └─► Aktivitas: "Apa yang SAMA?" / "Apa yang BERBEDA?"
               └─ seret/tap kartu atribut ke kolom Sama / Berbeda
                    └─► Feedback: kartu benar terkunci + bagian terkait menyala pada bangun
```

## 9.4 Flow C — Mengelompokkan bangun

```
Home ─► Kelompokkan Bangun
 └─ Pilih kriteria (disediakan sistem): [Jumlah sisi] [Jumlah sudut] [Punya sudut siku-siku?]
     └─► Sandbox: 6–8 bangun di area bawah, 2–3 keranjang berlabel di atas
          ├─ Interaksi 1 (desktop/tablet): drag & drop
          ├─ Interaksi 2 (wajib tersedia): tap bangun → bangun terpilih → tap keranjang
          ├─ Umpan balik: saat dijatuhkan → keranjang berkedip hijau/abu + ikon ✓/↩
          │   (salah = bangun kembali ke area bawah, TIDAK hilang, tanpa pengurangan skor)
          └─► Selesai bila semua bangun tertempatkan → ringkasan visual
```

## 9.5 Flow D — Belajar keliling

```
Home ─► Keliling
 ├─ (1) CONCEPT   : animasi titik berjalan mengelilingi persegi, tepi menyala,
 │                  penghitung panjang bertambah di tiap sudut  (siswa menekan "Ulangi" sesuka hati)
 ├─ (2) GUIDED    : siswa menyeret titik sendiri; sistem menahan titik di tepi (snap ke sisi)
 │                  tiap sisi selesai → angka sisi muncul & masuk ke penjumlahan berjalan
 ├─ (3) INDEPENDENT: bangun dengan angka pada tiap sisi → siswa menyusun penjumlahan → hasil
 │                  lalu diperkenalkan jalan pintas (4 × s) dengan animasi 4 sisi identik
 └─ (4) ASSESS    : latihan keliling campuran (persegi, persegi panjang, segitiga)
```

## 9.6 Flow E — Belajar luas

```
Home ─► Luas
 ├─ (1) CONCEPT   : bangun kosong → satuan persegi jatuh menutupi bangun satu per satu,
 │                  penghitung 1..n; ditutup dengan "Luas = n satuan persegi"
 ├─ (2) GUIDED    : siswa menyeret satuan persegi ke bangun (snap ke grid, tanpa celah)
 ├─ (3) INDEPENDENT: grid sudah tergambar → siswa menghitung baris & kolom → p × l
 │                  perbandingan langsung: "menghitung satu-satu" vs "baris × kolom"
 └─ (4) ASSESS    : latihan luas + soal pembeda keliling-vs-luas
```

## 9.7 Flow F — Bermain game & Flow G — Latihan

```
Home ─► Permainan ─► pilih game ─► layar aturan (1 kalimat + 1 demo animasi)
 └─► main (ronde 5 soal, tanpa timer) ─► hasil ronde (visual) ─► [Main lagi] / [Naik level] / [Keluar]

Home ─► Latihan ─► pilih topik ─► 5–10 soal ─► tiap soal: jawab → feedback → lanjut
 └─► Hasil: jumlah benar, bagian yang perlu diulang (ikon topik), tombol [Ulangi] / [Belajar lagi]
```

---

# 10. Information Architecture

## 10.1 Sitemap

```
/                              Home / Dashboard siswa
├── /bangun                    Kenali Bangun — katalog 4 bangun
│    └── /bangun/[slug]        Detail bangun (persegi | persegi-panjang | segitiga | lingkaran)
├── /bandingkan                Pemilih pasangan bangun
│    └── /bandingkan/[a]-[b]   Compare View + aktivitas sama/berbeda
├── /kelompokkan               Pemilih kriteria
│    └── /kelompokkan/[kriteria]  Classification sandbox
├── /keliling                  Alur 4 tahap keliling
│    └── /keliling/[tahap]     konsep | latihan-terbimbing | latihan-mandiri
├── /luas                      Alur 4 tahap luas
│    └── /luas/[tahap]
├── /permainan                 Daftar mini game
│    └── /permainan/[game]     Layar permainan
├── /latihan                   Daftar latihan per topik
│    └── /latihan/[topik]      Sesi latihan
│         └── /latihan/[topik]/hasil   Hasil sesi
├── /progress                  Ringkasan penguasaan per topik
├── /kamus                     Kamus visual istilah (sisi, sudut, siku-siku, keliling, luas)
└── /pengaturan                Ukuran teks, animasi, tingkat kesulitan, reset progress
```

**Kedalaman maksimum 3 level** *(UXR-NAV-01)*. Halaman `/kamus` dan `/pengaturan` dapat dijangkau dari header di semua halaman.

## 10.2 Hubungan antarhalaman

| Dari | Ke | Pemicu |
|---|---|---|
| Home | 6 topik utama | Kartu ikon besar |
| Detail bangun | Latihan topik terkait | Tombol "Latihan" di akhir halaman |
| Detail bangun | Detail bangun lain | Navigator bangun (4 ikon) yang selalu tampil |
| Compare View | Detail masing-masing bangun | Tap nama bangun |
| Latihan (hasil) | Materi yang perlu diulang | Tombol "Belajar lagi" pada topik yang salah |
| Semua halaman | Kamus visual | Ikon buku di header; istilah pada teks dapat di-tap **[R]** |
| Semua halaman | Home | Ikon rumah di posisi tetap (kiri atas) |

## 10.3 Prinsip navigasi

- **UXR-NAV-01** Maksimal 3 level kedalaman; tidak ada menu bertingkat/dropdown.
- **UXR-NAV-02** Indikator langkah (LIHAT → COBA → LATIHAN → HASIL) muncul di posisi & bentuk sama di semua topik.
- **UXR-NAV-03** Tombol kembali dan tombol rumah selalu di posisi yang sama, tidak pernah tersembunyi.
- **UXR-NAV-04** Setiap tautan/nav item = **ikon + label teks**, tidak pernah ikon saja.
- **UXR-NAV-05** Tidak ada gestur tersembunyi (swipe/long-press) sebagai satu-satunya cara melakukan sesuatu.
- **UXR-NAV-06** Tidak ada modal bertumpuk; maksimal satu lapis overlay.

---

# 11. Functional Requirements

Prioritas: **MH** = Must Have (MVP) · **SH** = Should Have · **CH** = Could Have · **WH** = Won't Have (rilis ini).

Setiap fitur wajib menyebut LO yang dilayaninya — sesuai aturan "tidak ada fitur tanpa alasan pembelajaran" (CON-05).

---

### FR-01 · Katalog Bangun Datar — **MH**

| | |
|---|---|
| **Tujuan** | Pintu masuk visual ke seluruh materi bangun; memperkenalkan 4 bangun sekaligus namanya. |
| **User** | Siswa |
| **LO** | LO-01, LO-02 |
| **Deskripsi** | Grid 4 kartu besar berisi bangun datar akurat + nama. Tanpa teks pengantar. |
| **Input** | Tap/klik/Enter pada kartu |
| **Proses** | Navigasi ke halaman detail bangun |
| **Output** | Halaman detail bangun terbuka |
| **Berhasil** | Halaman detail tampil < 1 detik; bangun tergambar benar |
| **Gagal** | Konten bangun tidak ditemukan → tampilkan kartu "belum tersedia" (ikon), bukan error teknis |
| **Feedback** | Kartu membesar halus + garis fokus saat disorot/di-fokus keyboard |

---

### FR-02 · Shape Viewer (kanvas bangun interaktif) — **MH**

| | |
|---|---|
| **Tujuan** | Menyajikan satu bangun sebagai objek yang dapat diamati dan dimanipulasi. |
| **User** | Siswa |
| **LO** | LO-01, LO-02, LO-05 |
| **Deskripsi** | Kanvas SVG menampilkan satu bangun besar di tengah, dengan area kontrol terpisah di bawah/samping. Kanvas tidak berisi elemen dekoratif. |
| **Input** | Pilihan bangun; aksi dari panel kontrol (FR-03…FR-06) |
| **Proses** | Bangun dirender dari definisi geometri tunggal (lihat TC-04); seluruh transformasi tervalidasi terhadap aturan MATH-01…12 |
| **Output** | Render bangun + penanda aktif |
| **Berhasil** | Bangun akurat pada semua ukuran layar; rasio terjaga |
| **Gagal** | Parameter tidak valid (mis. skala non-uniform pada persegi) → ditolak oleh layer validasi, nilai dikembalikan ke terakhir yang valid, **tanpa pesan error ke siswa** |
| **Feedback** | Perubahan dianimasikan ≤ 300 ms agar siswa melihat transisi, bukan lompatan |

---

### FR-03 · Highlight Bagian Bangun (sisi / sudut / titik sudut) — **MH**

| | |
|---|---|
| **Tujuan** | Memindahkan perhatian siswa dari siluet ke bagian bangun. Ini adalah fitur inti dari C-08 & C-09. |
| **User** | Siswa |
| **LO** | LO-03, LO-04, LO-05 |
| **Deskripsi** | Tombol mode: **Sisi**, **Sudut**, **Titik Sudut**. Mode aktif mewarnai/menandai bagian terkait. Mode bersifat **eksklusif** — hanya satu aktif dalam satu waktu (mencegah kanvas penuh penanda). |
| **Input** | Pilih mode; tap langsung pada sebuah sisi/sudut di kanvas |
| **Proses** | Bagian yang dipilih diberi warna semantik + penanda bentuk (tick mark / busur / kotak siku-siku / titik tebal) |
| **Output** | Bagian menyala, label pendek muncul dekat bagian tersebut (mis. "sisi", "5 cm") |
| **Berhasil** | Setiap sisi/sudut dapat dipilih individual dan penandanya sesuai notasi matematika |
| **Gagal** | Tap di area kosong kanvas → tidak terjadi apa-apa (tidak ada pesan error) |
| **Feedback** | Bagian aktif: warna + tebal garis bertambah + penanda bentuk (redundansi non-warna, WCAG 1.4.1) |

---

### FR-04 · Penghitung Sisi & Sudut (tap to count) — **MH**

| | |
|---|---|
| **Tujuan** | Membuat pencacahan menjadi tindakan, bukan hafalan. |
| **User** | Siswa |
| **LO** | LO-03, LO-04 |
| **Deskripsi** | Dalam mode Sisi/Sudut, setiap bagian yang di-tap terhitung sekali; penghitung besar menampilkan angka berjalan. Bagian yang sudah dihitung tetap bertanda agar tidak terhitung dua kali. |
| **Input** | Tap pada tiap sisi/sudut |
| **Proses** | Menambah hitungan; mencegah duplikasi; menampilkan hasil akhir bila semua bagian terhitung |
| **Output** | Angka hitungan + status "semua terhitung" |
| **Berhasil** | Hitungan akhir = jumlah sebenarnya menurut definisi bangun |
| **Gagal** | Tap ulang bagian yang sama → penanda berkedip singkat, hitungan tidak berubah |
| **Feedback** | Angka membesar sesaat setiap bertambah; ikon ✓ saat lengkap |

---

### FR-05 · Eksplorasi Ukuran & Warna — **MH**

| | |
|---|---|
| **Tujuan** | Memberi pengalaman visual soal ukuran & warna (C-06) tanpa merusak bentuk (C-07). |
| **User** | Siswa |
| **LO** | LO-01, LO-05, mendukung LO-12/LO-13 |
| **Deskripsi** | Slider ukuran (kecil–sedang–besar, diskrit **[R]** — bukan kontinu, agar mudah dikontrol motorik) dan pilihan 5–6 warna isi dengan kontras terjamin. |
| **Input** | Slider/tombol ukuran; pilihan warna |
| **Proses** | Skala uniform untuk persegi & lingkaran (MATH-01); dua sumbu dengan rasio terjaga untuk persegi panjang (MATH-02) |
| **Output** | Bangun berubah ukuran/warna; nama & ciri **tidak berubah** — ditegaskan lewat kartu ciri yang tetap sama |
| **Berhasil** | Setelah perubahan, semua sifat (jumlah sisi/sudut, siku-siku) tetap valid |
| **Gagal** | Nilai di luar batas ditolak diam-diam; slider kembali ke posisi valid |
| **Feedback** | Transisi halus; label ukuran ("kecil/sedang/besar") ikut berubah |
| **Catatan LR** | Pesan pembelajaran fitur ini: **ukuran dan warna tidak mengubah jenis bangun**. Perlu ditegaskan lewat kartu "Namanya tetap: Persegi". |

---

### FR-06 · Orientation Explorer (putar bangun) — **MH**

| | |
|---|---|
| **Tujuan** | Melawan miskonsepsi prototipe bentuk (3.1c). |
| **User** | Siswa |
| **LO** | LO-01, LO-02, LO-05 |
| **Deskripsi** | Tombol putar (mis. 15°/45° per tekan) dan tombol "Posisi semula". Kartu ciri tetap menampilkan sifat yang sama. |
| **Input** | Tap tombol putar / reset |
| **Proses** | Rotasi murni (tanpa distorsi); label teks tetap tegak agar terbaca **[R]** |
| **Output** | Bangun berorientasi baru |
| **Berhasil** | Semua sifat tetap; penanda siku-siku ikut berputar mengikuti sisi |
| **Gagal** | — |
| **Feedback** | Animasi rotasi 200–300 ms; indikator "diputar 45°" opsional |

---

### FR-07 · Kartu Karakteristik Bangun — **MH**

| | |
|---|---|
| **Tujuan** | Menyajikan ciri bangun dalam potongan kecil, bukan paragraf. |
| **User** | Siswa |
| **LO** | LO-05, LO-09 |
| **Deskripsi** | Deret kartu, **satu ciri per kartu**: ikon + angka/simbol + frasa ≤ 4 kata (mis. ikon sisi + "4" + "sisi sama panjang"). Menyorot kartu akan menyalakan bagian terkait pada kanvas (koneksi kartu ↔ bangun). |
| **Input** | Tap/fokus kartu |
| **Proses** | Menyalakan bagian bangun yang relevan |
| **Output** | Kartu aktif + highlight pada bangun |
| **Berhasil** | Setiap kartu punya pasangan visual pada bangun |
| **Gagal** | — |
| **Feedback** | Kartu terangkat + garis penghubung tipis ke bagian bangun **[R — uji apakah garis penghubung membantu atau meramaikan]** |

---

### FR-08 · Compare View (dua bangun berdampingan) — **MH**

| | |
|---|---|
| **Tujuan** | Memenuhi C-10: membandingkan dua bangun dan menentukan persamaan/perbedaan. |
| **User** | Siswa |
| **LO** | LO-06, LO-07 |
| **Deskripsi** | Dua kanvas berukuran identik berdampingan (bertumpuk vertikal di layar sempit). Tombol atribut ([Sisi] [Sudut] [Bentuk]) menyalakan atribut yang sama pada **kedua** bangun serentak, plus panel nilai A vs B dengan tanda **=** / **≠**. Dilanjutkan aktivitas menempatkan kartu atribut ke kolom **Sama** / **Berbeda**. |
| **Input** | Pilihan bangun A & B; pilihan atribut; penempatan kartu |
| **Proses** | Sistem menghitung persamaan/perbedaan dari definisi bangun (TC-04), bukan dari data yang ditulis manual |
| **Output** | Highlight paralel, tabel nilai, hasil aktivitas |
| **Berhasil** | Semua kartu atribut tertempatkan benar |
| **Gagal** | Kartu salah → kembali ke tumpukan, atribut terkait disorot pada kedua bangun sebagai petunjuk |
| **Feedback** | Kartu benar terkunci dengan ✓; tanda = / ≠ muncul besar |
| **Catatan UXR** | Skala kedua kanvas **harus sama** agar perbandingan ukuran tidak menyesatkan. Bila ukuran sebenarnya berbeda, tampilkan penggaris/grid acuan yang sama. |

---

### FR-09 · Overlay Comparison (tumpuk dua bangun) — **SH**

| | |
|---|---|
| **Tujuan** | Memperlihatkan perbedaan ukuran/bentuk secara langsung dengan menumpuk. |
| **User** | Siswa |
| **LO** | LO-06, LO-07 |
| **Deskripsi** | Bangun B semi-transparan dapat digeser ke atas bangun A; area tumpang tindih diberi pola. |
| **Input** | Drag bangun B |
| **Proses** | Perhitungan tumpang tindih visual (tanpa klaim numerik) |
| **Output** | Visual tumpukan |
| **Berhasil** | Tidak ada distorsi saat digeser |
| **Gagal** | — |
| **Feedback** | Pola garis pada area tumpang tindih (bukan sekadar warna) |
| **Risiko** | Berpotensi memunculkan miskonsepsi "luas dibandingkan dengan menumpuk" secara tidak akurat → **uji dulu dengan guru sebelum masuk rilis** |

---

### FR-10 · Classification Sandbox — **MH**

| | |
|---|---|
| **Tujuan** | Memenuhi C-12: mengelompokkan bangun berdasarkan karakteristik. |
| **User** | Siswa |
| **LO** | LO-08, LO-09 |
| **Deskripsi** | 6–8 bangun (variasi ukuran & orientasi) di area sumber; 2–3 keranjang berlabel ikon+teks. Kriteria dipilih di awal: jumlah sisi / jumlah sudut / ada sudut siku-siku / jenis bangun. |
| **Input** | Drag & drop **atau** tap-pilih lalu tap-keranjang (wajib keduanya) |
| **Proses** | Validasi terhadap definisi bangun; pencatatan kesalahan per kriteria |
| **Output** | Bangun berada di keranjang; ringkasan akhir |
| **Berhasil** | Semua bangun tertempatkan benar |
| **Gagal** | Penempatan salah → bangun kembali ke area sumber dengan animasi lembut, keranjang yang benar **tidak** langsung diberitahu pada percobaan pertama; pada percobaan kedua, ciri relevan bangun tersebut disorot sebagai petunjuk |
| **Feedback** | Benar: keranjang berdenyut + ✓; salah: gerak "kembali" + ikon ↩ (bukan ✗ merah besar) |
| **Catatan a11y** | Target jatuh ≥ 96 px; tidak ada batas waktu; drag tidak memerlukan presisi tinggi (snap radius besar) |

---

### FR-11 · Perimeter Trace (mengelilingi bangun) — **MH**

| | |
|---|---|
| **Tujuan** | Membuat keliling menjadi pengalaman perjalanan mengelilingi tepi (C-13, N-06). |
| **User** | Siswa |
| **LO** | LO-10 |
| **Deskripsi** | Titik/karakter kecil diseret mengelilingi tepi bangun. Titik ter-*snap* ke tepi. Setiap sisi yang selesai dilalui: sisi menyala permanen + panjangnya muncul + masuk ke penjumlahan berjalan di panel. |
| **Input** | Drag sepanjang tepi; alternatif: tap tiap sisi berurutan (untuk perangkat/motorik terbatas) |
| **Proses** | Deteksi urutan sisi; akumulasi panjang |
| **Output** | Jejak tepi lengkap + total keliling dengan satuan |
| **Berhasil** | Seluruh tepi terlalui dan kembali ke titik awal → animasi "tertutup" |
| **Gagal** | Titik lepas dari tepi → kembali ke posisi terakhir di tepi, **tanpa mengulang dari awal** |
| **Feedback** | Warna keliling (konsisten di seluruh produk), angka penjumlahan berjalan: 5 → 5+5 → 5+5+5 → … |

---

### FR-12 · Latihan Menghitung Keliling — **MH**

| | |
|---|---|
| **Tujuan** | Menghubungkan pengalaman trace ke perhitungan. |
| **User** | Siswa |
| **LO** | LO-11 |
| **Deskripsi** | Bangun dengan angka pada setiap sisi; siswa menyusun penjumlahan (menyeret angka ke slot) atau memasukkan hasil lewat papan angka di layar. Setelah beberapa soal, diperkenalkan jalan pintas (4 × s ; 2 × (p+l)) dengan animasi yang menunjukkan asalnya. |
| **Input** | Penyusunan penjumlahan / angka |
| **Proses** | Validasi terhadap nilai yang dihitung dari definisi bangun |
| **Output** | Benar/salah + visual sisi |
| **Berhasil** | Hasil sesuai |
| **Gagal** | Salah → sisi-sisi disorot satu per satu dengan angkanya, siswa diminta coba lagi (maks. 2× lalu ditunjukkan penyelesaiannya bertahap) |
| **Feedback** | Angka tiap sisi ikut menyala saat penjumlahan disusun |

---

### FR-13 · Area Tiling (menutup bangun dengan satuan persegi) — **MH**

| | |
|---|---|
| **Tujuan** | Membuat luas menjadi "banyaknya ubin", bukan rumus (C-13, N-07). |
| **User** | Siswa |
| **LO** | LO-12, LO-13 |
| **Deskripsi** | Bangun kosong + persediaan satuan persegi. Siswa menyeret ubin ke dalam bangun; ubin *snap* ke grid, tidak boleh tumpang tindih atau keluar bangun. Penghitung bertambah. Setelah penuh: "Luas = n satuan persegi". Tahap berikutnya menampilkan grid penuh dan mengajak menghitung baris × kolom. |
| **Input** | Drag ubin; alternatif tap sel kosong untuk mengisi |
| **Proses** | Validasi posisi; hitung jumlah; deteksi bangun penuh |
| **Output** | Bangun tertutup ubin + nilai luas bersatuan |
| **Berhasil** | Bangun tertutup penuh tanpa celah/tumpang tindih |
| **Gagal** | Ubin di posisi tidak valid → kembali ke persediaan (tanpa penalti) |
| **Feedback** | Warna luas (berbeda tegas dari warna keliling), penghitung besar, ✓ saat penuh |
| **Batasan** | MVP: hanya dimensi bilangan bulat (MATH-07); segitiga siku-siku diperkenalkan sebagai "setengah persegi panjang" dengan animasi lipat/duplikat |

---

### FR-14 · Eksplorasi Hubungan Ukuran ↔ Luas — **SH**

| | |
|---|---|
| **Tujuan** | Menunjukkan bahwa menambah sisi menambah luas (dan keliling) — memperkuat beda keduanya. |
| **User** | Siswa |
| **LO** | LO-12, LO-13, mendukung LO-10 |
| **Deskripsi** | Slider ukuran pada bangun bergrid; luas & keliling ditampilkan bersamaan dengan dua representasi visual berbeda (bidang vs tepi) dan berubah saat slider digeser. |
| **Input** | Slider (diskrit) |
| **Proses** | Perhitungan langsung dari definisi |
| **Output** | Dua angka + dua visual |
| **Berhasil** | Angka & visual selalu sinkron |
| **Gagal** | — |
| **Feedback** | Perubahan bertahap; nilai lama sempat terlihat agar perbandingan terasa |

---

### FR-15 · Kamus Visual Istilah — **SH**

| | |
|---|---|
| **Tujuan** | Menopang kosakata matematika yang belum mapan (3.1a). |
| **User** | Siswa, guru |
| **LO** | mendukung seluruh LO |
| **Deskripsi** | Halaman berisi istilah (sisi, sudut, titik sudut, siku-siku, keliling, luas, satuan persegi) dengan gambar/animasi pendek dan contoh — tanpa definisi verbal panjang. Istilah dalam instruksi dapat di-tap untuk membuka entri ini dalam panel samping. |
| **Input** | Tap istilah / buka halaman |
| **Proses** | Menampilkan entri |
| **Output** | Gambar + animasi + contoh + non-contoh |
| **Berhasil** | Panel terbuka tanpa meninggalkan halaman saat ini |
| **Gagal** | Istilah tidak ada di kamus → tautan tidak aktif (tidak ditampilkan sebagai tautan) |
| **Feedback** | Istilah yang punya entri diberi penanda visual konsisten |
| **Post-MVP** | Video bahasa isyarat untuk tiap istilah (**OQ-05**) |

---

### FR-16 · Exercise Engine (mesin latihan) — **MH**

| | |
|---|---|
| **Tujuan** | Memenuhi C-14 — latihan mencakup seluruh kompetensi. |
| **User** | Siswa |
| **LO** | LO-01 … LO-14 |
| **Deskripsi** | Mesin soal yang mendukung 5 tipe (lihat Bab 16): pilihan ganda visual, mencocokkan, drag-klasifikasi, seleksi pada bangun (tap bagian), jawaban angka. Satu soal per layar. Tanpa timer. |
| **Input** | Jawaban siswa |
| **Proses** | Validasi dari definisi bangun; pencatatan attempt; penentuan penguasaan |
| **Output** | Feedback per soal + ringkasan sesi |
| **Berhasil** | Sesi selesai & tersimpan |
| **Gagal** | Penyimpanan gagal → sesi tetap berjalan, hasil ditampilkan, peringatan hanya untuk guru/di log (**tidak** ditampilkan ke siswa sebagai error teknis) |
| **Feedback** | Lihat FR-17 |

---

### FR-17 · Sistem Umpan Balik Visual — **MH**

| | |
|---|---|
| **Tujuan** | Umpan balik harus **mengajar**, bukan menghakimi (N-08). |
| **User** | Siswa |
| **LO** | seluruh LO |
| **Deskripsi** | Tiga lapis: (1) **status** — ikon ✓/↩ + warna + perubahan bentuk; (2) **lokasi** — bagian bangun yang relevan disorot; (3) **petunjuk** — pada percobaan kedua, satu petunjuk visual (mis. sisi dihitung ulang satu per satu). |
| **Input** | Hasil validasi jawaban |
| **Proses** | Memilih lapis feedback sesuai jumlah percobaan |
| **Output** | Feedback di layar |
| **Berhasil** | Feedback tampil < 200 ms setelah jawaban |
| **Gagal** | — |
| **Feedback** | Benar: ✓ hijau + bentuk berdenyut halus. Salah: ↩ netral (abu/oranye, **bukan** merah menyala + tanda silang besar), objek kembali ke posisi semula. **Tidak ada** animasi kegagalan yang dramatis. |
| **Catatan LR** | Warna **tidak boleh** menjadi satu-satunya penanda benar/salah (WCAG 1.4.1): ikon dan gerak wajib menyertai. |

---

### FR-18 · Mini Games — **MH (a–d), SH (e–h)**

Detail tiap game ada di Bab 15. Ringkas:

| Kode | Game | LO | Prioritas |
|---|---|---|---|
| FR-18a | Temukan Bangun (identify) | LO-01, LO-02 | MH |
| FR-18b | Siapa Aku? (ciri → bangun) | LO-05, LO-09 | MH |
| FR-18c | Sama atau Beda? | LO-06, LO-07 | MH |
| FR-18d | Masukkan ke Keranjang (grouping) | LO-08 | MH |
| FR-18e | Hitung Sisi | LO-03 | SH |
| FR-18f | Hitung Sudut | LO-04 | SH |
| FR-18g | Keliling Cepat | LO-11 | SH |
| FR-18h | Tutup dengan Ubin (luas) | LO-12, LO-13 | SH |

---

### FR-19 · Progress & Ringkasan Hasil — **MH**

| | |
|---|---|
| **Tujuan** | Memberi siswa gambaran kemajuan dan guru gambaran topik yang perlu diulang. |
| **User** | Siswa (guru secara tidak langsung) |
| **LO** | LO-14 |
| **Deskripsi** | Peta topik dengan status per topik: **Belum dicoba / Sedang belajar / Sudah dikuasai** (ikon + warna + teks). Ringkasan sesi latihan: jumlah benar, topik yang perlu diulang. |
| **Input** | Hasil sesi latihan & game |
| **Proses** | Penentuan penguasaan (lihat Bab 16.4); penyimpanan lokal |
| **Output** | Halaman progress |
| **Berhasil** | Status akurat & bertahan setelah halaman dimuat ulang |
| **Gagal** | Storage tidak tersedia → sistem tetap berjalan dalam mode sesi (progress tidak bertahan), ditandai halus untuk guru |
| **Feedback** | Tidak ada skor kompetitif, tidak ada perbandingan antarsiswa |

---

### FR-20 · Sistem Instruksi Visual — **MH**

| | |
|---|---|
| **Tujuan** | Memastikan siswa tahu apa yang harus dilakukan tanpa audio dan tanpa kalimat panjang (N-10, SN-01). |
| **User** | Siswa |
| **LO** | prasyarat seluruh LO |
| **Deskripsi** | Setiap aktivitas dibuka dengan: **1 kalimat ≤ 8 kata + 1 ikon + 1 demonstrasi animasi 3–5 detik yang dapat diulang**. Demonstrasi memakai tangan/kursor semu yang memperagakan satu aksi. Tombol "Ulangi contoh" tersedia permanen di layar aktivitas. |
| **Input** | Tap "Mulai" / "Ulangi contoh" |
| **Proses** | Memutar demo; **menghentikan** elemen lain selama demo (prinsip satu fokus visual) |
| **Output** | Demo + aktivitas aktif |
| **Berhasil** | Siswa dapat memulai aktivitas dengan benar pada percobaan pertama |
| **Gagal** | Siswa tidak beraksi dalam beberapa saat → petunjuk halus (elemen yang harus disentuh berdenyut sekali) **[R — hati-hati agar tidak mengganggu]** |
| **Feedback** | Demo tidak pernah berjalan bersamaan dengan teks baru |

---

### FR-21 · Pengaturan Tampilan & Kesulitan — **SH**

| | |
|---|---|
| **Tujuan** | Mengakomodasi variasi kemampuan (6.1) dan sensitivitas gerak. |
| **User** | Siswa, guru |
| **LO** | mendukung seluruh LO |
| **Deskripsi** | Ukuran teks (normal/besar/sangat besar), animasi (penuh/dikurangi), tingkat kesulitan default (mudah/sedang), reset progress. |
| **Input** | Pilihan pengaturan |
| **Proses** | Disimpan lokal; menghormati `prefers-reduced-motion` sistem sebagai nilai awal |
| **Output** | Tampilan menyesuaikan |
| **Berhasil** | Berlaku seketika di semua halaman |
| **Gagal** | — |
| **Feedback** | Pratinjau langsung pada halaman pengaturan |

---

### FR-22 · Mode Guru / Proyeksi Kelas — **CH**

Tampilan sederhana tanpa panel kontrol siswa, elemen diperbesar, untuk diproyeksikan. Tidak butuh akun. **Perlu validasi OQ-04.**

---

### FR-23 · Konten Bahasa Isyarat (BISINDO/SIBI) — **WH (MVP) / prioritas tinggi Post-MVP**

Video isyarat pendek untuk istilah kunci dan instruksi aktivitas, tampil **berurutan** dengan demo visual (tidak bersamaan). Ditunda karena sistem isyarat sekolah belum diketahui (**OQ-05**) dan produksinya memerlukan talent serta validasi ahli. Arsitektur konten harus **menyediakan slot** untuk aset ini sejak awal *(TC-05)*.

---

### FR-24 · Akun Siswa & Sinkronisasi Progress — **WH (MVP)**

Ditunda sampai kebutuhan pelaporan guru terkonfirmasi (**OQ-04**). Model data dirancang agar penambahan `User` tidak membongkar struktur *(Bab 19)*.

---

### FR-25 · Leaderboard / Kompetisi — **WH**

Ditolak secara sadar: menambah tekanan sosial, tidak menambah pemahaman geometri, dan berisiko mendorong menebak cepat.

---

# 12. Accessibility Requirements

Dibagi tiga: **[WAJIB]** (blocker rilis) · **[REKOMENDASI]** (kuat, boleh dinegosiasi) · **[VALIDASI]** (butuh konfirmasi guru/ahli PLB).

## 12.1 Kemandirian dari audio

| ID | Requirement | Status |
|---|---|---|
| A11Y-01 | Tidak ada informasi, instruksi, umpan balik, atau peringatan yang hanya disampaikan lewat suara. | **[WAJIB]** |
| A11Y-02 | Produk harus berfungsi 100% dengan volume perangkat nol. Diuji secara eksplisit di QA. | **[WAJIB]** |
| A11Y-03 | Bila ada efek suara (mis. "ting" saat benar), sifatnya murni pelengkap, dapat dimatikan, dan selalu punya padanan visual. | **[REKOMENDASI]** |
| A11Y-04 | Semua konten video wajib punya **caption/teks** dan, bila memungkinkan, transkrip visual. | **[WAJIB]** (berlaku saat ada video) |

## 12.2 Bahasa dan teks

| ID | Requirement | Status |
|---|---|---|
| A11Y-05 | Instruksi aktivitas: **1 kalimat, ≤ 8 kata**, kalimat aktif, 1 aksi per kalimat. | **[WAJIB]** |
| A11Y-06 | Satu konsep = satu istilah, konsisten di seluruh produk (tidak berganti "sudut"/"pojok"/"ujung"). Daftar istilah baku dikunci sebelum development. | **[WAJIB]** |
| A11Y-07 | Hindari kalimat pasif, idiom, kiasan, negasi ganda, dan kalimat bersyarat berlapis. | **[WAJIB]** |
| A11Y-08 | Teks utama minimal **18 px**, teks soal **20–24 px**, tinggi baris ≥ 1,5. | **[WAJIB]** |
| A11Y-09 | Teks tidak pernah menjadi satu-satunya pembawa instruksi: selalu didampingi ikon dan/atau demonstrasi. | **[WAJIB]** |
| A11Y-10 | Font sans-serif dengan bentuk huruf mudah dibedakan (I/l/1, b/d). | **[REKOMENDASI]** |
| A11Y-11 | Tingkat keterbacaan teks divalidasi oleh guru SLB sebelum rilis. | **[VALIDASI]** |

## 12.3 Warna, kontras, dan redundansi

| ID | Requirement | Status |
|---|---|---|
| A11Y-12 | Kontras teks ≥ **4,5:1**; teks besar & elemen grafis/UI ≥ **3:1** (WCAG 2.2 AA). | **[WAJIB]** |
| A11Y-13 | Warna **tidak boleh** menjadi satu-satunya pembawa informasi. Setiap makna warna wajib disertai ikon, bentuk, pola, penanda, atau teks. | **[WAJIB]** |
| A11Y-14 | Palet aman untuk buta warna (hindari merah–hijau sebagai satu-satunya pembeda benar/salah). | **[WAJIB]** |
| A11Y-15 | Warna semantik geometri (sisi / sudut / keliling / luas) tetap sama di seluruh produk dan tidak dipakai untuk keperluan lain. | **[WAJIB]** |
| A11Y-16 | Garis bangun memiliki ketebalan minimum agar terlihat pada layar proyektor kelas. | **[REKOMENDASI]** |

## 12.4 Gerak dan animasi

| ID | Requirement | Status |
|---|---|---|
| A11Y-17 | Menghormati `prefers-reduced-motion`; tersedia juga saklar manual. | **[WAJIB]** |
| A11Y-18 | Tidak ada animasi berulang tanpa henti (loop) di area belajar. | **[WAJIB]** |
| A11Y-19 | Tidak ada kedipan > 3 kali per detik (risiko fotosensitif). | **[WAJIB]** |
| A11Y-20 | Animasi hanya untuk menjelaskan (menunjukkan proses/hubungan), tidak untuk dekorasi. | **[WAJIB]** |
| A11Y-21 | Animasi penjelas dapat diulang kapan saja oleh siswa. | **[WAJIB]** |

## 12.5 Interaksi, keyboard, dan sentuh

| ID | Requirement | Status |
|---|---|---|
| A11Y-22 | Semua fungsi dapat dijalankan dengan keyboard (Tab/Shift+Tab/Enter/Space/panah), termasuk padanan drag-and-drop. | **[WAJIB]** |
| A11Y-23 | Indikator fokus terlihat jelas (ketebalan ≥ 3 px, kontras ≥ 3:1). | **[WAJIB]** |
| A11Y-24 | Target sentuh minimal **44 × 44 px** (WCAG 2.5.8); untuk objek belajar utama **direkomendasikan ≥ 64 px**, area jatuh ≥ 96 px. | **[WAJIB]** / ukuran besar **[REKOMENDASI]** |
| A11Y-25 | Drag-and-drop **selalu** punya alternatif non-drag (tap-pilih → tap-tujuan). | **[WAJIB]** |
| A11Y-26 | Tidak ada batas waktu pada aktivitas belajar maupun latihan. | **[WAJIB]** |
| A11Y-27 | Tidak ada gestur multi-jari atau gerak perangkat sebagai satu-satunya cara. | **[WAJIB]** |
| A11Y-28 | Struktur HTML semantik + label ARIA yang benar untuk elemen kustom. | **[REKOMENDASI]** (menyiapkan dukungan bagi siswa dengan hambatan penyerta) |

## 12.6 Bahasa isyarat & dukungan komunikasi

| ID | Requirement | Status |
|---|---|---|
| A11Y-29 | Sistem isyarat yang dipakai (BISINDO atau SIBI) ditentukan mengikuti praktik sekolah — bukan dipilih tim produk. | **[VALIDASI — OQ-05]** |
| A11Y-30 | Bila video isyarat dipakai, ia **tidak** diputar bersamaan dengan animasi geometri (prinsip perhatian visual tunggal). | **[WAJIB saat diterapkan]** |
| A11Y-31 | Video isyarat harus dapat dijeda/diulang, dengan ukuran tampilan yang cukup untuk melihat ekspresi wajah (bagian dari tata bahasa isyarat). | **[REKOMENDASI]** |

## 12.7 Responsive

| ID | Requirement | Status |
|---|---|---|
| A11Y-32 | Berfungsi pada lebar 360 px hingga layar proyektor, tanpa scroll horizontal. | **[WAJIB]** |
| A11Y-33 | Pada layar sempit, tata letak dua-bangun berubah menjadi bertumpuk vertikal dengan skala kanvas yang tetap identik. | **[WAJIB]** |
| A11Y-34 | Zoom browser hingga 200% tidak merusak tata letak. | **[WAJIB]** |

---

# 13. UX/UI Requirements

## 13.1 Prinsip desain

| ID | Prinsip | Penjelasan |
|---|---|---|
| UXR-01 | **Satu tugas per layar** | Layar hanya memuat satu keputusan utama. Kontrol yang tidak relevan disembunyikan. |
| UXR-02 | **Satu fokus visual per waktu** | Teks, animasi, dan video tidak bersaing. Urutkan, jangan tumpuk. |
| UXR-03 | **Kanvas itu suci** | Area bangun tidak boleh berisi dekorasi, iklan tombol, atau maskot. Kontrol berada di luar kanvas. |
| UXR-04 | **Konsistensi mutlak** | Warna semantik, ikon, istilah, dan posisi tombol identik di seluruh produk. |
| UXR-05 | **Ikon + label** | Tidak pernah ikon saja. |
| UXR-06 | **Redundansi penanda** | Setiap makna dibawa minimal dua kanal (warna + bentuk/ikon/teks). |
| UXR-07 | **Aman untuk salah** | Kesalahan bersifat netral, dapat diulang, tanpa penalti, tanpa drama. |
| UXR-08 | **Tenang, bukan kekanak-kanakan** | Ramah dan cerah, tetapi rapi dan modern — persona Nabila (13 th) harus merasa dihargai. |

## 13.2 Layout

- Struktur tetap: **Header tipis** (rumah, judul topik, kamus, pengaturan) → **Area kanvas belajar (dominan, ≥ 55% tinggi layar)** → **Panel kontrol** → **Navigasi langkah**.
- Ruang kosong (whitespace) diperlakukan sebagai fitur: kepadatan elemen rendah secara sengaja.
- Maksimal **5 elemen interaktif** terlihat sekaligus pada layar belajar **[R]**.
- Grid 8 px; radius sudut 12–16 px (ramah tanpa menjadi "balon").

## 13.3 Visual hierarchy

1. Objek geometri (paling besar, paling kontras)
2. Instruksi/pertanyaan saat ini
3. Kontrol yang relevan
4. Navigasi
5. Meta (progress, pengaturan)

Ukuran, kontras, dan posisi — bukan warna — yang membawa hierarki.

## 13.4 Color system

Dua lapis palet yang **tidak boleh bercampur**:

**(a) Palet semantik geometri** — hanya untuk makna matematika:

| Peran | Penggunaan | Penanda pendamping (wajib) |
|---|---|---|
| Sisi | Highlight sisi | tanda garis (tick) + label "sisi" |
| Sudut | Highlight sudut | busur; kotak kecil untuk siku-siku |
| Titik sudut | Highlight titik | titik tebal berdiameter tetap |
| Keliling | Trace & soal keliling | garis tepi tebal + ikon jejak |
| Luas | Tiling & soal luas | isian berpetak + ikon petak |

**(b) Palet UI** — netral + 1 warna aksen untuk tombol utama + warna status (berhasil/ulangi/info). Warna status **berbeda** dari palet semantik geometri agar "hijau benar" tidak tertukar dengan "hijau sisi". **[R]**

Ketentuan: kontras terjamin di atas latar terang; mode gelap **Post-MVP** (**OQ-11**).

## 13.5 Typography

- Satu keluarga font sans-serif dengan dukungan Latin lengkap dan bentuk huruf jelas (mis. Inter, Plus Jakarta Sans, Nunito Sans). **[R]**
- Skala: Display 40–48 · H1 32 · H2 24 · Body 18–20 · Soal 22–24 · Label kecil ≥ 16 px.
- Angka pada bangun memakai **tabular figures** agar tidak "bergoyang" saat berubah.
- Tidak ada teks miring untuk penekanan (lebih sulit dibaca); pakai tebal.

## 13.6 Komponen

| Komponen | Ketentuan |
|---|---|
| **Button** | Tinggi ≥ 56 px; ikon + label; tiga varian (utama/sekunder/netral); status hover, focus, active, disabled terlihat jelas. |
| **Card** | Untuk bangun, ciri, dan topik. Bayangan tipis, batas terlihat (tidak hanya bayangan — penting untuk kontras). |
| **Chip atribut** | Untuk aktivitas Sama/Berbeda dan klasifikasi. Dapat di-drag maupun di-tap. |
| **Counter** | Angka besar, berubah dengan animasi naik singkat. |
| **Step indicator** | 4 langkah tetap (LIHAT → COBA → LATIHAN → HASIL) berbasis ikon + teks. |
| **Canvas kontrol** | Tombol mode eksklusif (segmented), bukan checkbox berganda. |
| **Kamus panel** | Panel samping yang tidak menutup kanvas. |

## 13.7 Iconography & illustration

- Satu set ikon bergaya garis tebal, konsisten, tanpa detail kecil.
- Ikon untuk konsep matematika harus **literal** (ikon "sisi" = ruas garis, bukan metafora).
- Ilustrasi (bila ada) bergaya **geometris datar**, tanpa bayangan/perspektif — tidak boleh bersaing dengan bangun yang sedang dipelajari.
- **Tanpa maskot animasi yang bergerak terus-menerus.** Bila client menginginkan karakter, ia hanya boleh muncul di halaman transisi (home/hasil), tidak di kanvas belajar. **[R]**

## 13.8 State

| State | Perlakuan |
|---|---|
| **Loading** | Skeleton bangun (bentuk abu-abu) alih-alih spinner berputar; teks minimal. |
| **Empty** | Ilustrasi + 1 kalimat + 1 tombol aksi (mis. progress kosong: "Ayo mulai belajar"). |
| **Error** | Tidak pernah menampilkan istilah teknis. Ikon + 1 kalimat + tombol "Coba lagi" + tombol "Rumah". |
| **Success (jawaban)** | ✓ + bentuk berdenyut sekali + warna status; durasi ≤ 800 ms; otomatis lanjut **hanya** jika siswa menekan "Lanjut" (bukan auto-advance). |
| **Incorrect** | ↩ netral + objek kembali + sorot bagian relevan. Tanpa suara, tanpa goyangan agresif, tanpa merah menyala. |
| **Disabled** | Dihindari; lebih baik sembunyikan kontrol yang belum relevan. |

## 13.9 Rekomendasi design system **[R]**

- **Tailwind CSS + komponen headless (Radix/shadcn-style)** — konsisten dengan pengalaman tim dan memberi kontrol penuh atas aksesibilitas, serta tidak memaksakan gaya visual yang kekanak-kanakan.
- Design token dikunci sejak awal: `color.semantic.side`, `color.semantic.angle`, `color.semantic.perimeter`, `color.semantic.area`, `space.*`, `radius.*`, `font.size.*`.
- **Trade-off yang dipertimbangkan:** memakai UI kit bertema anak-anak akan lebih cepat, tetapi (a) sulit menjamin kontras & target sentuh, (b) gaya visualnya menabrak kebutuhan persona remaja, (c) mengunci token warna yang kita butuhkan untuk makna geometri. Karena itu tidak disarankan.

---

# 14. Learning Experience (Visualisasi & Interaksi)

## 14.1 Prinsip visualisasi (LR)

| ID | Prinsip |
|---|---|
| LR-VIS-01 | **Satu kanal aktif**: animasi dan teks baru tidak muncul bersamaan. |
| LR-VIS-02 | **Progressive disclosure**: ciri bangun muncul satu per satu, bukan sebagai daftar sekaligus. |
| LR-VIS-03 | **Signaling**: bagian yang sedang dibahas selalu ditegaskan; bagian lain diredupkan (bukan dihilangkan) agar konteks bangun tetap utuh. |
| LR-VIS-04 | **Spatial contiguity**: label menempel dekat objeknya, bukan di legenda terpisah. |
| LR-VIS-05 | **Coherence**: apa pun yang tidak mengajar, dihapus dari kanvas. |
| LR-VIS-06 | **Konsistensi representasi**: satu konsep = satu cara menggambar di seluruh produk. |
| LR-VIS-07 | **Akurasi di atas estetika**: bila gaya visual bertabrakan dengan kebenaran matematis, akurasi menang (MATH-01…12). |
| LR-VIS-08 | **Variasi terkendali**: ukuran & orientasi bervariasi agar konsep tergeneralisasi; warna & ketebalan garis tetap konsisten. |

## 14.2 Perlakuan per bangun

### Persegi
- Digambar dari satu parameter sisi `s`; hanya skala uniform (MATH-01).
- Keempat sisi diberi **satu tanda garis** (menyatakan semua sama panjang).
- Keempat sudut diberi **kotak siku-siku kecil**.
- Wajib ditampilkan juga dalam orientasi 45° dengan label nama yang **tetap** "Persegi" — ini titik koreksi miskonsepsi penting.

### Persegi panjang
- Parameter `p` dan `l`, rasio dijaga ≥ 1,25 : 1 (MATH-02).
- Sisi berhadapan diberi **tanda garis berbeda** (satu garis untuk pasangan panjang, dua garis untuk pasangan lebar) — menunjukkan "sisi berhadapan sama panjang" tanpa kalimat.
- Sudut siku-siku ditandai kotak.
- Perbandingan dengan persegi disajikan berdampingan agar bedanya terlihat, bukan dibaca.

### Segitiga
- MVP: **segitiga sama sisi, sama kaki, dan siku-siku** (lancip & siku-siku saja — MATH-05).
- Sisi sama panjang ditandai tanda garis sesuai jumlah pasangan.
- Sudut ditandai busur; sudut siku-siku dengan kotak.
- Untuk luas: **tinggi** digambar sebagai garis putus-putus tegak lurus alas, dengan penanda siku-siku pada perpotongan — agar "tinggi" tidak tertukar dengan "sisi miring".

### Lingkaran
- Tidak memiliki titik sudut; **tidak diperlakukan sebagai poligon** dalam logika sistem (MATH-12).
- Yang divisualisasikan: **pusat**, **jari-jari** (segmen dari pusat ke tepi), **diameter** (melalui pusat), dan tepi/keliling.
- Diameter = 2 × jari-jari diperagakan dengan menggeser jari-jari ke sisi lain.
- Hanya skala uniform (MATH-01) — elips adalah kesalahan fatal di sini.
- **Konflik yang harus diselesaikan (OQ-06):** banyak buku SD Indonesia menyebut lingkaran "memiliki 1 sisi lengkung". Secara matematis, sisi adalah ruas garis lurus sehingga lingkaran tidak memilikinya. Sistem harus mengikuti satu keputusan yang konsisten, dan keputusan itu **harus diambil bersama guru**, bukan diputuskan sepihak oleh tim produk. Sampai ada keputusan, soal "berapa jumlah sisi?" **tidak menyertakan lingkaran** sebagai pilihan.

## 14.3 Perlakuan per bagian bangun

| Bagian | Cara menggambar | Penanda wajib | Kesalahan yang harus dihindari |
|---|---|---|---|
| **Sisi** | Ruas garis tepi, ditebalkan saat aktif | warna sisi + tick mark + label | Menebalkan seluruh keliling saat yang dimaksud satu sisi |
| **Titik sudut** | Titik tebal di perpotongan dua sisi | warna titik sudut + titik | Menyamakan dengan "sudut" |
| **Sudut** | Busur di antara dua sisi, radius tetap | busur / kotak siku-siku | Busur yang panjangnya mengikuti besar bangun sehingga terlihat "sudut lebih besar karena bangun lebih besar" — **miskonsepsi berbahaya**; radius busur harus konstan |
| **Panjang** | Garis dimensi dengan panah di luar bangun | angka + satuan | Menaruh angka di dalam bangun sehingga bertabrakan dengan ubin luas |
| **Ukuran** | Slider diskrit + label kata | label kecil/sedang/besar | Perubahan ukuran yang mengubah rasio |
| **Jari-jari / diameter** | Segmen dari pusat; diameter melalui pusat | titik pusat wajib terlihat | Menggambar "jari-jari" yang tidak berangkat dari pusat |

## 14.4 Aturan highlighting

- **Satu mode aktif** dalam satu waktu (sisi / sudut / titik sudut). Tidak pernah semua sekaligus.
- Bagian tidak aktif **diredupkan**, tidak dihapus — konteks bangun harus selalu utuh.
- Highlight muncul dengan animasi ≤ 300 ms agar mata mengikuti perubahan.
- Maksimal **dua kategori penanda** tampil bersamaan (mis. sisi + label panjang) — lebih dari itu kanvas menjadi ramai.
- Penanda persamaan (antar dua bangun) memakai **ikon rantai/sama** pada kedua bangun; penanda perbedaan memakai **ikon berbeda** — keduanya punya bentuk berbeda, bukan hanya warna berbeda.

## 14.5 Comparison Experience (detail)

**Bentuk UI:** dua kanvas identik berdampingan (vertikal di layar sempit), judul bangun di atas masing-masing, panel atribut di bawah.

**Mekanisme interaksi:**

1. Siswa memilih atribut ([Sisi] [Sudut] [Bentuk]).
2. Atribut tersebut menyala **serentak** di kedua bangun (bukan bergantian — di sinilah simultan justru dibutuhkan, karena tugasnya memang membandingkan).
3. Panel menampilkan nilai A dan B, plus tanda **=** atau **≠** dengan ikon.
4. Aktivitas: kartu atribut ("jumlah sisi", "punya sudut siku-siku", "jenis bangun") diseret/di-tap ke kolom **Sama** atau **Berbeda**.

**Tingkat kesulitan:**

| Level | Pasangan | Contoh |
|---|---|---|
| Mudah | Sangat berbeda | Segitiga vs Lingkaran |
| Sedang | Satu atribut sama | Persegi vs Segitiga (sama-sama punya sudut) |
| Sulit | Banyak atribut sama | Persegi vs Persegi panjang (beda hanya pada panjang sisi) |

**Visualisasi benar/salah:** kartu benar terkunci di kolomnya dengan ✓ dan bagian terkait menyala di kedua bangun; kartu salah kembali ke tumpukan dengan ikon ↩, lalu pada percobaan kedua atribut yang bersangkutan disorot sebagai petunjuk.

## 14.6 Classification & Grouping Experience (detail)

**Kriteria yang didukung MVP:** jumlah sisi · jumlah sudut · ada/tidak sudut siku-siku · nama bangun.
**Post-MVP:** sisi sama panjang atau tidak; bersudut vs tidak bersudut (melibatkan lingkaran — tergantung OQ-06).

**Bentuk UI:** area sumber (bawah) berisi 6–8 bangun dengan ukuran & orientasi bervariasi — variasi ini **disengaja** agar siswa mengelompokkan berdasarkan sifat, bukan berdasarkan kemiripan gambar. Keranjang berlabel ikon + teks di atas.

**Interaksi (wajib tersedia keduanya):**

| Cara | Perangkat | Mekanisme |
|---|---|---|
| Drag & drop | Mouse/tablet | Seret ke keranjang; radius snap besar; keranjang membesar saat didekati |
| Tap-select-tap | Semua, termasuk HP kecil & motorik terbatas | Tap bangun (terpilih dengan garis tebal) → tap keranjang |
| Keyboard | Aksesibilitas | Tab ke bangun → Space untuk memilih → panah ke keranjang → Enter |

**Umpan balik:** benar = keranjang berdenyut + ✓ + bangun menetap; salah = bangun kembali ke area sumber (tidak hilang, tidak ada pengurangan skor) + ikon ↩. Setelah semua tertempatkan, muncul ringkasan: tiap keranjang menampilkan ciri bersama anggotanya (mis. semua anggota "4 sisi" disorot sisinya serentak) — ini yang mengubah aktivitas dari permainan menjadi pembelajaran.

## 14.7 Perimeter & Area Learning (detail)

Empat tahap berikut dipakai konsisten pada topik keliling maupun luas (pola *gradual release*):

| Tahap | Peran sistem | Peran siswa | Ciri khas |
|---|---|---|---|
| **1. Concept Introduction** | Sistem memperagakan (animasi), siswa mengamati | Menonton, mengulang animasi sesuka hati | Tidak ada penilaian. Tidak ada soal. |
| **2. Guided Practice** | Sistem membimbing dengan *constraint* (snap, batas, sorotan) dan memberi umpan balik tiap langkah | Melakukan dengan bantuan | Kesalahan hampir tidak mungkin terjadi — sengaja |
| **3. Independent Practice** | Sistem hanya memvalidasi hasil | Melakukan sendiri | Bantuan muncul hanya bila diminta/berulang salah |
| **4. Assessment** | Sistem mencatat penguasaan | Menjawab tanpa bantuan | Menentukan status "sudah dikuasai" |

**Keliling — urutan pedagogis:**
1. Trace tepi (FR-11) → keliling = perjalanan mengelilingi.
2. Sisi dinyalakan satu per satu dengan angka → keliling = penjumlahan sisi.
3. Penjumlahan disusun sendiri (FR-12).
4. Jalan pintas: animasi 4 sisi identik menyatu menjadi "4 × 5" (persegi), 2 pasang sisi menjadi "2 × (8 + 5)" (persegi panjang).
5. Assessment campuran.

**Luas — urutan pedagogis:**
1. Ubin berjatuhan menutupi bangun (FR-13) → luas = banyak ubin.
2. Siswa mengubin sendiri (guided, snap).
3. Grid penuh → hitung baris & kolom → "3 baris × 5 kolom = 15".
4. Jalan pintas p × l; segitiga siku-siku = setengah persegi panjang (animasi duplikat-putar-tempel).
5. Assessment campuran + **soal pembeda keliling vs luas** (wajib ada, karena ini miskonsepsi utama).

**Pembeda visual keliling vs luas — wajib konsisten:** keliling selalu digambar sebagai **garis tepi tebal berwarna keliling dengan ikon jejak**; luas selalu sebagai **bidang berpetak berwarna luas dengan ikon petak**. Kedua representasi ini tidak pernah bertukar peran di mana pun dalam produk.

---

# 15. Game & Interactive Experience

**Aturan umum semua game:**

- Setiap game wajib memetakan ke minimal satu LO. Game tanpa LO tidak dibuat.
- **Tanpa timer dan tanpa nyawa/hati yang berkurang.** Tekanan waktu merugikan siswa yang perlu memproses instruksi visual lebih lama, dan mendorong menebak.
- Satu ronde = 5 soal. Selalu bisa diulang.
- Aturan main dijelaskan dengan **1 kalimat + 1 demo animasi**, bukan layar tutorial.
- Progres kesulitan bersifat **adaptif sederhana**: naik level bila ≥ 4/5 benar; tetap bila 2–3; turun bila ≤ 1 (turun tanpa pemberitahuan negatif).
- Scoring ditampilkan sebagai **jumlah benar dari 5** dengan ikon, bukan poin abstrak atau bintang kompetitif.

---

### FR-18a · Temukan Bangun — **MH**

| | |
|---|---|
| **LO** | LO-01, LO-02 |
| **Gameplay** | Ditampilkan target (nama + ikon bangun). Muncul 4–6 bangun dengan ukuran & orientasi bervariasi. Siswa menyentuh semua yang sesuai. |
| **Aturan** | Semua bangun yang cocok harus terpilih; bangun tidak cocok tidak boleh terpilih. |
| **Input** | Tap/klik/Enter |
| **Menang/kalah** | Ronde selesai saat 5 soal terjawab; tidak ada "kalah", hanya jumlah benar. |
| **Feedback** | Benar: bangun terkunci + ✓. Salah: kembali normal + ↩, dan pada percobaan kedua ciri target disorot. |
| **Difficulty** | L1: bangun sangat berbeda, orientasi standar → L2: orientasi diputar → L3: persegi vs persegi panjang mirip |
| **Replayability** | Bangun dan orientasi diacak dari generator, bukan daftar tetap |

### FR-18b · Siapa Aku? — **MH**

| | |
|---|---|
| **LO** | LO-05, LO-09 |
| **Gameplay** | Ditampilkan 2–3 kartu ciri (ikon + angka, mis. 🔲"4 sisi", 📐"4 siku-siku"). Siswa memilih bangun yang sesuai dari 4 pilihan. |
| **Aturan** | Ciri diberikan bertahap; bila salah, ciri ketiga ditambahkan sebagai petunjuk. |
| **Input** | Tap pilihan |
| **Menang/kalah** | Jumlah benar dari 5 |
| **Feedback** | Benar: ciri-ciri menyala satu per satu pada bangun terpilih (menjelaskan **mengapa** benar). Salah: bangun yang dipilih disorot cirinya dan dibandingkan dengan kartu ciri — siswa melihat sendiri ketidakcocokannya. |
| **Difficulty** | L1: 1 ciri unik → L2: 2 ciri → L3: ciri yang belum cukup unik (mis. "4 sisi" saja → dua jawaban mungkin, siswa harus minta ciri berikutnya) |
| **Replayability** | Kombinasi ciri dihasilkan dari data bangun |

### FR-18c · Sama atau Beda? — **MH**

| | |
|---|---|
| **LO** | LO-06, LO-07 |
| **Gameplay** | Dua bangun + satu pernyataan atribut berbentuk ikon (mis. ikon sisi + "4"). Siswa memilih **SAMA** atau **BERBEDA**. |
| **Aturan** | 5 pernyataan per ronde, mencakup atribut yang sama dan yang berbeda. |
| **Input** | Dua tombol besar |
| **Menang/kalah** | Jumlah benar dari 5 |
| **Feedback** | Atribut terkait menyala di kedua bangun bersamaan + tanda = / ≠ |
| **Difficulty** | L1: pasangan sangat berbeda → L3: persegi vs persegi panjang |
| **Replayability** | Pasangan & atribut diacak |

### FR-18d · Masukkan ke Keranjang — **MH**

| | |
|---|---|
| **LO** | LO-08 |
| **Gameplay** | Versi permainan dari FR-10: 6–8 bangun, 2–3 keranjang, kriteria diacak. |
| **Aturan** | Semua bangun harus tertempatkan; tanpa batas percobaan. |
| **Input** | Drag / tap-tap / keyboard |
| **Menang/kalah** | Selesai bila semua tertempatkan; dicatat jumlah penempatan benar pada percobaan pertama |
| **Feedback** | Seperti FR-10, ditutup ringkasan ciri bersama tiap keranjang |
| **Difficulty** | L1: 2 keranjang, kriteria jumlah sisi → L2: 3 keranjang → L3: kriteria gabungan (mis. "4 sisi **dan** siku-siku") |
| **Replayability** | Kriteria & kumpulan bangun diacak |

### FR-18e · Hitung Sisi — **SH**

| | |
|---|---|
| **LO** | LO-03 |
| **Gameplay** | Satu bangun; siswa menyentuh setiap sisi lalu memilih angka jawabannya. |
| **Aturan** | Sisi yang sudah disentuh bertanda agar tidak dihitung ulang. |
| **Feedback** | Sistem menghitung ulang sisi satu per satu dengan animasi bila jawaban salah. |
| **Difficulty** | L1 orientasi standar → L2 diputar → L3 ukuran sangat berbeda (menguji bahwa jumlah sisi tidak bergantung ukuran) |

### FR-18f · Hitung Sudut — **SH**

| | |
|---|---|
| **LO** | LO-04 |
| **Gameplay** | Sama seperti FR-18e untuk sudut; varian lanjutan: "temukan semua sudut siku-siku". |
| **Feedback** | Busur/kotak siku-siku muncul satu per satu saat dihitung ulang. |
| **Difficulty** | L1 hitung sudut → L2 kenali siku-siku → L3 campuran bangun |

### FR-18g · Keliling Cepat — **SH**

| | |
|---|---|
| **LO** | LO-11 |
| **Gameplay** | Bangun dengan angka pada sisi; siswa menyusun penjumlahan atau memilih hasil dari 4 pilihan. |
| **Aturan** | Angka selalu terbaca pada gambar; tidak ada soal berbentuk narasi. |
| **Feedback** | Salah → sisi disorot berurutan dengan penjumlahan berjalan. |
| **Difficulty** | L1 persegi (bilangan ≤ 10) → L2 persegi panjang → L3 segitiga & bilangan ≤ 20 |
| **Distraktor** | Pilihan salah sengaja memuat nilai **luas** bangun tersebut — untuk mendeteksi miskonsepsi keliling↔luas |

### FR-18h · Tutup dengan Ubin — **SH**

| | |
|---|---|
| **LO** | LO-12, LO-13 |
| **Gameplay** | Bangun harus ditutup penuh dengan satuan persegi, lalu siswa menyebut luasnya. |
| **Aturan** | Ubin tidak boleh bertumpuk/keluar; snap ke grid. |
| **Feedback** | Penghitung ubin; saat penuh, grid berubah menjadi tampilan baris × kolom. |
| **Difficulty** | L1 persegi 3×3 → L2 persegi panjang → L3 segitiga siku-siku (setengah persegi panjang) |
| **Distraktor** | Pilihan salah memuat nilai **keliling** bangun tersebut |

---

# 16. Assessment & Progress

## 16.1 Tipe soal (MVP)

| Kode | Tipe | Cocok untuk | Contoh | Catatan a11y |
|---|---|---|---|---|
| Q-MC | Pilihan ganda **visual** (gambar sebagai pilihan) | LO-01, LO-02, LO-06, LO-09 | "Mana persegi?" 4 gambar | Maks. 4 pilihan; pilihan besar |
| Q-MATCH | Mencocokkan | LO-02, LO-05 | Nama ↔ bangun | Garis penghubung tebal; alternatif tap-tap |
| Q-CLASS | Drag klasifikasi | LO-08 | Masukkan ke keranjang | Wajib alternatif tap |
| Q-SELECT | Seleksi pada bangun | LO-03, LO-04, LO-10 | "Sentuh semua sudut siku-siku" | Target ≥ 44 px |
| Q-NUM | Jawaban angka | LO-11, LO-13 | Keliling = __ | Papan angka di layar; tanpa keyboard fisik |

**Post-MVP:** Q-ORDER (mengurutkan langkah), Q-TRUEFALSE bergambar, Q-BUILD (menyusun bangun dari sisi).

**Ketentuan penulisan soal [WAJIB]:**
- Pertanyaan ≤ 8 kata, selalu disertai gambar.
- Angka menempel pada gambar, bukan di kalimat.
- Tidak ada soal cerita/narasi pada MVP.
- Distraktor dirancang untuk **mendiagnosis**, bukan menjebak: nilai keliling dipasang sebagai distraktor soal luas dan sebaliknya, sehingga pola kesalahan bisa dibaca.

## 16.2 Pemetaan pengukuran → kompetensi

| Yang diukur | Tipe soal | LO | Ambang penguasaan |
|---|---|---|---|
| Pengenalan bangun | Q-MC | LO-01, LO-02 | 4/5 |
| Karakteristik | Q-SELECT, Q-MC | LO-03, LO-04, LO-05 | 4/5 |
| Membandingkan | Q-MC, Q-MATCH | LO-06, LO-07 | 4/5 |
| Mengelompokkan | Q-CLASS | LO-08, LO-09 | semua benar pada ≥ 2 kriteria |
| Pemahaman keliling | Q-SELECT, Q-MC | LO-10 | 4/5 |
| Menghitung keliling | Q-NUM | LO-11 | 4/5 |
| Pemahaman luas | Q-SELECT, Q-MC | LO-12 | 4/5 |
| Menghitung luas | Q-NUM | LO-13 | 4/5 |

## 16.3 Elemen progres — keputusan sadar

| Elemen | Dipakai? | Alasan |
|---|---|---|
| **Progress per topik** | ✅ Ya | Memberi arah belajar dan berguna bagi guru |
| **Completion** | ✅ Ya | Menandai materi yang sudah dilalui |
| **Retry tanpa batas** | ✅ Ya | Inti dari desain "aman untuk salah" (N-09) |
| **Feedback** | ✅ Ya | Fungsi pedagogis utama |
| **Riwayat latihan (ringkas)** | ✅ Ya | Bahan guru; disimpan lokal, ringkas |
| **Level kesulitan** | ✅ Ya | Mengakomodasi variasi kemampuan dalam satu kelas |
| **Skor per sesi** | ⚠️ Terbatas | Hanya "benar dari 5", tanpa poin abstrak |
| **Streak harian** | ❌ Tidak | Mendorong kehadiran, bukan pemahaman; menghukum siswa yang absen |
| **Leaderboard** | ❌ Tidak | Tekanan sosial; tidak pedagogis |
| **Lencana/achievement** | ⚠️ Post-MVP | Hanya bila terikat penguasaan kompetensi ("Ahli Sisi"), bukan jumlah klik |
| **Timer / countdown** | ❌ Tidak | Merugikan pemrosesan visual & memicu tebakan |
| **Nyawa / hati berkurang** | ❌ Tidak | Menjadikan salah sebagai hukuman |

## 16.4 Aturan penguasaan (mastery)

- **Belum dicoba** → belum pernah membuka latihan topik.
- **Sedang belajar** → pernah mencoba, belum mencapai ambang.
- **Sudah dikuasai** → mencapai ambang (umumnya 4/5) pada sesi latihan **tanpa bantuan**, pada tingkat kesulitan ≥ L2.
- Status **tidak pernah turun** secara otomatis; guru dapat mereset. **[R]**
- Jawaban benar setelah petunjuk dicatat terpisah (`usedHint`) agar tidak dihitung sebagai penguasaan penuh.

---

# 17. Content Requirements

## 17.1 Jenis konten

| Jenis | Kebutuhan | Catatan |
|---|---|---|
| **Teks** | Instruksi, label, pertanyaan, nama bangun, ciri | Sangat singkat; lihat pedoman 17.2 |
| **Ilustrasi/bangun** | Dihasilkan **secara programatik (SVG)**, bukan gambar statis | Menjamin akurasi & konsistensi; lihat TC-03 |
| **Diagram** | Penanda dimensi, garis tinggi, grid satuan | Bagian dari sistem render bangun |
| **Animasi** | Trace keliling, tiling luas, rotasi, penurunan rumus | Hanya animasi penjelas |
| **Video** | Bahasa isyarat (Post-MVP) | Wajib caption; tidak bersamaan dengan animasi |
| **Visual cue** | Ikon, penanda, sorotan, denyut | Terdaftar dalam design token |
| **Instruksi** | 1 kalimat + ikon + demo | FR-20 |
| **Soal** | Bank soal per LO per level | Sebagian dihasilkan dari generator (TC-04) |
| **Feedback** | Teks pendek + ikon + sorotan visual | 3 lapis (FR-17) |

## 17.2 Pedoman penulisan konten **[WAJIB]**

1. Maksimal **8 kata** per instruksi; **satu aksi** per kalimat.
2. Gunakan kalimat perintah aktif: "Sentuh semua sisi." bukan "Sisi-sisi yang ada pada bangun tersebut dapat disentuh."
3. Satu konsep = satu istilah, selamanya. Daftar istilah baku dikunci sebelum development dan divalidasi guru (**OQ-07**).
4. Hindari: idiom, kiasan, negasi ("jangan pilih yang bukan…"), kalimat bersyarat, kata sambung bertingkat.
5. Angka ditulis sebagai angka (4), bukan kata (empat), agar tidak menambah beban baca.
6. Setiap teks penting berdampingan dengan ikon yang maknanya tetap.
7. Umpan balik tidak menghakimi: "Coba lagi" bukan "Salah!". Hindari tanda seru berlebihan.
8. Nama tombol adalah kata kerja pendek: **Mulai · Lanjut · Ulangi · Kembali · Selesai**.
9. Semua teks melalui review guru SLB sebelum rilis. **[VALIDASI]**

---

# 18. Technical Considerations

Bagian ini menentukan **arah teknis**, bukan implementasi. Keputusan akhir dibuat pada tahap Technical Design.

## 18.1 Struktur aplikasi (Next.js 16.3.5) — TC-01

- **App Router** dengan struktur rute yang mengikuti sitemap Bab 10.
- Route group disarankan: `(belajar)` untuk materi, `(latihan)` untuk latihan & game, `(meta)` untuk progress/pengaturan/kamus — memudahkan layout dan pemisahan tanggung jawab.
- Halaman materi bersifat **statis** (konten tidak berubah per pengguna) → cocok dirender di server/di-*prerender* untuk kecepatan.
- Komponen interaktif (kanvas, drag-drop, latihan) adalah **Client Component** karena memerlukan state dan event pointer.
- Pola yang disarankan: **Server Component mengambil/menyiapkan data konten → meneruskan sebagai props ke Client Component interaktif**, sehingga bundle JS klien tetap kecil.
- **Catatan versi:** Next.js 16 masih tergolong baru; risiko ketidakcocokan pustaka pihak ketiga (terutama animasi & drag-and-drop) harus diverifikasi lebih awal lewat *spike* teknis. → **R-12**

## 18.2 Rendering geometri: SVG vs Canvas vs WebGL — TC-02

| Opsi | Kelebihan | Kekurangan | Penilaian |
|---|---|---|---|
| **SVG (DOM)** | Tajam di semua resolusi; tiap sisi/sudut adalah elemen yang bisa diberi event, fokus keyboard, dan atribut ARIA; mudah dianimasikan lewat CSS; mudah diuji | Berat bila elemen sangat banyak (ribuan) | ✅ **Direkomendasikan.** Jumlah elemen di produk ini kecil, dan kebutuhan aksesibilitas + interaksi per-bagian justru inti fitur (FR-03) |
| **Canvas 2D** | Cepat untuk objek sangat banyak | Tidak ada DOM → hit-testing, fokus keyboard, dan ARIA harus dibuat manual; sangat merugikan aksesibilitas | ⚠️ Hanya bila muncul kebutuhan partikel/objek masif |
| **WebGL** | Grafis berat | Berlebihan; menambah risiko & ukuran bundle | ❌ Tidak relevan |

## 18.3 Sumber kebenaran geometri (geometry engine) — TC-03 / TC-04

Prinsip terpenting di bagian teknis: **satu definisi bangun menjadi sumber untuk semuanya**.

```
ShapeDefinition (persegi, s=5)
        │
        ├──► Renderer SVG        (gambar + penanda)
        ├──► Property derivation (jumlah sisi, jumlah sudut, siku-siku, keliling, luas)
        ├──► Question generator  (soal + jawaban benar + distraktor)
        └──► Validator           (menolak transformasi yang melanggar MATH-01…12)
```

Manfaatnya konkret: jawaban soal tidak mungkin berbeda dari gambar (mencegah kelas bug yang paling merusak kepercayaan pada produk pembelajaran), dan aturan MATH dapat diuji otomatis sebagai *unit test*.

**Validator** diperlakukan sebagai komponen kelas satu: setiap perubahan ukuran/rotasi melewatinya, dan pelanggaran ditolak secara diam-diam (nilai kembali ke terakhir yang valid) — siswa tidak boleh melihat pesan error teknis.

## 18.4 Pemisahan konten dan UI — TC-05

- Konten pembelajaran (definisi bangun, ciri, teks instruksi, bank soal, konfigurasi level) disimpan sebagai **data terstruktur bertipe** (TypeScript/JSON, atau MDX bila butuh teks kaya), terpisah dari komponen.
- Struktur data menyediakan **slot kosong untuk aset bahasa isyarat** sejak awal (FR-23), agar penambahannya nanti tidak membongkar model.
- Teks disimpan lewat lapisan yang siap i18n walau MVP hanya satu bahasa — biaya sekarang kecil, biaya retrofit besar.
- **Trade-off:** menaruh teks langsung di komponen lebih cepat pada awalnya, tetapi membuat review bahasa oleh guru (yang wajib, A11Y-11/17.2) menjadi sangat sulit. Karena itu tidak disarankan.

## 18.5 State management — TC-06

Tiga tingkat state yang dibedakan:

| Tingkat | Isi | Pendekatan |
|---|---|---|
| **Lokal komponen** | Mode highlight aktif, posisi drag, hitungan sementara | `useState` / `useReducer` — cukup, jangan diangkat ke global |
| **Sesi aktivitas** | Soal ke-n, jawaban, percobaan, petunjuk terpakai | `useReducer` + Context per aktivitas |
| **Persisten** | Progress, penguasaan, pengaturan | Store ringan (Zustand/Context) + penyimpanan lokal |

**Rekomendasi:** hindari state manager global besar pada MVP; kompleksitas state di sini rendah dan terisolasi per aktivitas.

## 18.6 Penyimpanan progress — TC-07

| Opsi | Kelebihan | Kekurangan | Penilaian |
|---|---|---|---|
| **localStorage / IndexedDB** | Tanpa backend, tanpa akun, tanpa data pribadi anak, cepat | Hilang bila ganti perangkat/browser; tidak bisa dilihat guru dari jauh | ✅ **MVP** |
| **Backend + akun** | Progress lintas perangkat, laporan guru | Butuh autentikasi, perlindungan data anak, biaya operasional | 🔜 Post-MVP, tergantung **OQ-04** |
| **Kode siswa tanpa password** (mis. PIN 4 digit yang dibagikan guru) | Kompromi ringan untuk perangkat bersama | Tetap butuh backend | ⚠️ Alternatif menarik bila perangkat dipakai bergantian (A-06) |

Model data (Bab 19) dirancang agar migrasi lokal → server tidak membongkar struktur.

## 18.7 Animasi — TC-08

- CSS transition/animation untuk transisi sederhana; pustaka animasi (mis. Framer Motion, yang sudah dipakai tim) untuk orkestrasi berurutan seperti trace keliling dan tiling.
- **Seluruh animasi wajib menghormati `prefers-reduced-motion`** — bukan sekadar mematikan gerak, tetapi menggantinya dengan perubahan status langsung (instan) yang tetap informatif.
- Animasi dikendalikan lewat *state machine* aktivitas agar tidak pernah tumpang tindih dengan tampilan teks baru (LR-VIS-01).

## 18.8 Lain-lain

- **Testing:** unit test untuk geometry engine & validator (aturan MATH); visual regression untuk render bangun; uji aksesibilitas otomatis (axe) + uji manual keyboard.
- **Analytics:** hanya event pembelajaran agregat, tanpa data pribadi; wajib dapat dimatikan. **OQ-12**
- **Deployment:** hosting statis/SSR standar; tidak ada kebutuhan komputasi berat.
- **Tanpa penguncian dini:** pemilihan pustaka drag-and-drop, animasi, dan state ditetapkan pada tahap Technical Design setelah *spike* kompatibilitas Next.js 16.

---

# 19. Data Model

Konseptual — belum skema database.

## 19.1 Entitas

| Entitas | Atribut inti | Catatan |
|---|---|---|
| **Shape** | `id`, `type` (persegi/persegi-panjang/segitiga/lingkaran), `params` (s / p,l / sisi-sisi / r), `rotation`, `scalePolicy` | Sumber kebenaran; seluruh properti diturunkan darinya |
| **ShapeCharacteristic** | `id`, `key` (jumlahSisi, jumlahSudut, punyaSikuSiku, sisiSamaPanjang), `value`, `visualMarker` | **Diturunkan (computed)**, tidak ditulis manual |
| **Term** (kamus) | `id`, `label`, `iconRef`, `animationRef`, `signVideoRef?`, `example`, `nonExample` | Slot `signVideoRef` disiapkan untuk Post-MVP |
| **Lesson** | `id`, `topic`, `stage` (concept/guided/independent), `loRefs[]`, `contentBlocks[]` | |
| **Exercise** | `id`, `topic`, `loRefs[]`, `level`, `questionRefs[]`, `masteryThreshold` | |
| **Question** | `id`, `type` (Q-MC/Q-MATCH/Q-CLASS/Q-SELECT/Q-NUM), `prompt`, `shapeRefs[]`, `options[]`, `correctRef`, `distractorRationale`, `level`, `loRef` | `distractorRationale` menyimpan diagnosis (mis. "tertukar dengan luas") |
| **Game** | `id`, `type`, `loRefs[]`, `levelConfig[]`, `roundSize` | |
| **Attempt** | `id`, `questionRef`, `answer`, `isCorrect`, `attemptCount`, `usedHint`, `durationMs`, `timestamp` | Dasar seluruh metrik |
| **SessionResult** | `id`, `exerciseRef` / `gameRef`, `attempts[]`, `score`, `level`, `completedAt` | |
| **Progress** | `topicId`, `status` (belum/sedang/dikuasai), `bestScore`, `lastLevel`, `updatedAt` | |
| **Setting** | `textSize`, `motion`, `difficulty`, `soundEnabled` | Lokal |
| **Achievement** | `id`, `criteria` (berbasis penguasaan) | Post-MVP |
| **User** | `id`, `displayName`, `classRef?` | **Post-MVP**; MVP memakai profil lokal anonim |

## 19.2 Relasi

```
LearningObjective 1─────n Lesson
LearningObjective 1─────n Exercise ──1:n──► Question ──n:1──► Shape
                                   │
Shape 1──n ShapeCharacteristic (derived)
                                   │
Question 1─────n Attempt ──n:1──► SessionResult ──n:1──► Progress(topic)
Game 1─────n SessionResult
Term n─────n Lesson  (istilah dirujuk materi)
User(post-MVP) 1─────n Progress / SessionResult
```

**Catatan desain:** `ShapeCharacteristic` sengaja **tidak** disimpan sebagai data tetap. Bila ditulis manual, ia akan menyimpang dari gambar begitu parameter bangun berubah — persis kelas kesalahan yang dilarang MATH-10.

---

# 20. Non-Functional Requirements

| ID | Kategori | Requirement | Ukuran |
|---|---|---|---|
| NFR-01 | Performance | Halaman materi tampil cepat pada perangkat sekolah kelas menengah | LCP ≤ 2,5 s (jaringan 4G lambat) |
| NFR-02 | Performance | Respons interaksi kanvas terasa seketika | ≤ 100 ms untuk highlight/tap; animasi 60 fps |
| NFR-03 | Performance | Bundle JS per halaman belajar ditekan | ≤ 200 KB gzip (target, dievaluasi pada Technical Design) |
| NFR-04 | Accessibility | WCAG 2.2 level AA untuk seluruh halaman | Audit otomatis + manual keyboard |
| NFR-05 | Accessibility | Berfungsi penuh tanpa audio | Uji eksplisit dengan volume 0 |
| NFR-06 | Responsiveness | 360 px – 2560 px tanpa scroll horizontal | Uji pada 5 breakpoint |
| NFR-07 | Usability | Siswa dapat memulai aktivitas tanpa bantuan pada percobaan pertama | ≥ 80% dalam uji dengan siswa **[VALIDASI]** |
| NFR-08 | Reliability | Kegagalan penyimpanan tidak menghentikan pembelajaran | Sesi tetap berjalan tanpa error ke siswa |
| NFR-09 | Maintainability | Konten dapat ditambah tanpa mengubah komponen | Tambah bangun/soal = tambah data |
| NFR-10 | Maintainability | Aturan MATH-01…12 tercakup unit test | Coverage 100% pada validator |
| NFR-11 | Scalability | Struktur mendukung penambahan bangun & topik baru | Tanpa refactor besar |
| NFR-12 | Security & Privacy | MVP tidak mengumpulkan data pribadi anak | Tanpa akun, tanpa PII; bila analytics dipakai, agregat & dapat dimatikan |
| NFR-13 | Browser support | Chrome, Edge, Firefox, Safari — 2 versi terakhir | Termasuk Chrome di Android & Safari iOS |
| NFR-14 | Device support | Desktop, laptop, tablet (utama); HP (didukung dengan layout alternatif) | Layar ≥ 360 px |
| NFR-15 | Compatibility | Berfungsi baik saat diproyeksikan ke layar kelas | Kontras & ketebalan garis diuji pada proyektor |

---

# 21. User Stories

## 21.1 Siswa

| ID | User Story | LO | Prioritas |
|---|---|---|---|
| US-01 | Sebagai siswa, saya ingin melihat bangun datar dalam ukuran besar dan jelas, sehingga saya dapat mengamati bentuknya dengan baik. | LO-01 | MH |
| US-02 | Sebagai siswa, saya ingin menyentuh setiap sisi bangun dan melihatnya berubah warna, sehingga saya tahu bagian mana yang disebut sisi. | LO-03 | MH |
| US-03 | Sebagai siswa, saya ingin menyentuh setiap sudut dan melihat penandanya, sehingga saya dapat menghitung jumlah sudut. | LO-04 | MH |
| US-04 | Sebagai siswa, saya ingin memutar dan mengubah ukuran bangun, sehingga saya paham namanya tidak berubah walau tampak berbeda. | LO-01, LO-05 | MH |
| US-05 | Sebagai siswa, saya ingin melihat dua bangun berdampingan dengan bagian yang sama disorot bersamaan, sehingga saya dapat menemukan persamaan dan perbedaannya. | LO-06, LO-07 | MH |
| US-06 | Sebagai siswa, saya ingin memindahkan bangun ke keranjang yang sesuai, sehingga saya belajar mengelompokkan berdasarkan ciri. | LO-08 | MH |
| US-07 | Sebagai siswa, saya ingin menyeret titik mengelilingi bangun dan melihat panjangnya bertambah, sehingga saya paham arti keliling. | LO-10 | MH |
| US-08 | Sebagai siswa, saya ingin menutup bangun dengan kotak satuan dan melihat jumlahnya, sehingga saya paham arti luas. | LO-12 | MH |
| US-09 | Sebagai siswa, saya ingin mengetahui apa yang harus dilakukan tanpa membaca kalimat panjang, sehingga saya bisa mulai sendiri. | semua | MH |
| US-10 | Sebagai siswa, saya ingin tahu mengapa jawaban saya salah lewat gambar, sehingga saya bisa memperbaiki cara berpikir saya. | semua | MH |
| US-11 | Sebagai siswa, saya ingin mengulang latihan tanpa dihukum, sehingga saya tidak takut mencoba. | LO-14 | MH |
| US-12 | Sebagai siswa, saya ingin melihat topik mana yang sudah saya kuasai, sehingga saya tahu harus belajar apa berikutnya. | LO-14 | MH |
| US-13 | Sebagai siswa, saya ingin mengerjakan soal tanpa batas waktu, sehingga saya bisa berpikir dengan tenang. | semua | MH |
| US-14 | Sebagai siswa, saya ingin melihat arti kata "sisi" atau "keliling" kapan saja, sehingga saya tidak tersesat oleh istilah. | semua | SH |
| US-15 | Sebagai siswa, saya ingin memilih level yang sesuai kemampuan saya, sehingga soal tidak terlalu mudah atau terlalu sulit. | LO-14 | SH |

## 21.2 Guru **[bergantung OQ-04]**

| ID | User Story | Prioritas |
|---|---|---|
| US-16 | Sebagai guru, saya ingin membuka satu materi dengan cepat untuk diproyeksikan, sehingga saya bisa memakainya saat mengajar. | CH |
| US-17 | Sebagai guru, saya ingin melihat topik mana yang paling banyak salah, sehingga saya tahu materi apa yang perlu diulang. | SH |
| US-18 | Sebagai guru, saya ingin mengatur tingkat kesulitan dan ukuran teks, sehingga sesuai kondisi siswa saya. | SH |
| US-19 | Sebagai guru, saya ingin mereset progress pada perangkat bersama, sehingga siswa berikutnya mulai dari awal. | SH |

---

# 22. Acceptance Criteria

Format Given / When / Then untuk user story paling kritis.

### AC untuk US-02 (highlight & hitung sisi)

> **Given** siswa berada di halaman detail persegi dan mode "Sisi" aktif
> **When** siswa menyentuh salah satu sisi bangun
> **Then** hanya sisi tersebut berubah warna sisi, mendapat tanda garis, dan label "sisi" muncul di dekatnya
> **And** penghitung bertambah 1
> **And** sisi tersebut tetap bertanda sehingga tidak dapat dihitung dua kali

> **Given** keempat sisi telah disentuh
> **When** sisi terakhir dihitung
> **Then** penghitung menunjukkan 4, ikon ✓ muncul, dan kartu ciri "4 sisi sama panjang" disorot

> **Given** mode "Sisi" aktif
> **When** siswa mengaktifkan mode "Sudut"
> **Then** seluruh penanda sisi hilang dan hanya penanda sudut yang tampil (mode eksklusif)

### AC untuk US-04 (ukuran & orientasi tidak mengubah identitas bangun)

> **Given** siswa berada di halaman detail persegi
> **When** siswa menggeser slider ukuran ke posisi mana pun
> **Then** panjang sisi horizontal dan vertikal tetap sama (skala uniform)
> **And** nama bangun tetap "Persegi"
> **And** kartu ciri tidak berubah isinya

> **Given** siswa menekan tombol putar hingga bangun miring 45°
> **When** bangun selesai diputar
> **Then** keempat penanda siku-siku ikut berputar mengikuti sisi
> **And** label nama tetap tegak dan tetap terbaca "Persegi"

> **Given** bangun adalah persegi panjang
> **When** siswa mengubah ukuran ke nilai ekstrem
> **Then** sistem menjaga rasio sisi ≥ 1,25 : 1 sehingga bangun tidak pernah terlihat seperti persegi

### AC untuk US-05 (membandingkan dua bangun)

> **Given** siswa memilih persegi dan segitiga pada Compare View
> **When** siswa memilih atribut "Sudut"
> **Then** seluruh sudut pada **kedua** bangun disorot bersamaan dengan penanda yang sama
> **And** panel menampilkan 4 vs 3 beserta tanda ≠ dan ikon "berbeda"

> **Given** aktivitas "Sama atau Berbeda" aktif
> **When** siswa menempatkan kartu "jumlah sisi" ke kolom **Berbeda**
> **Then** kartu terkunci dengan ✓ dan sisi kedua bangun dihitung ulang secara animasi sebagai penegasan

> **When** siswa menempatkan kartu ke kolom yang salah
> **Then** kartu kembali ke tumpukan dengan ikon ↩, tanpa pengurangan skor, dan pada percobaan berikutnya atribut tersebut disorot sebagai petunjuk

### AC untuk US-06 (mengelompokkan)

> **Given** sandbox klasifikasi dengan kriteria "jumlah sisi" dan keranjang "3 sisi" & "4 sisi"
> **When** siswa menyeret segitiga ke keranjang "3 sisi"
> **Then** keranjang berdenyut, ikon ✓ muncul, dan bangun menetap di dalamnya

> **When** siswa menyeret segitiga ke keranjang "4 sisi"
> **Then** bangun kembali ke area sumber dengan animasi lembut dan ikon ↩, tanpa pesan bernada menyalahkan

> **Given** perangkat sentuh atau siswa tidak menggunakan drag
> **When** siswa menyentuh sebuah bangun lalu menyentuh sebuah keranjang
> **Then** hasilnya identik dengan drag & drop

> **Given** seluruh bangun telah tertempatkan dengan benar
> **When** aktivitas selesai
> **Then** setiap keranjang menampilkan ciri bersama anggotanya (mis. sisi seluruh anggota disorot serentak)

### AC untuk US-07 (konsep keliling)

> **Given** siswa berada di tahap *guided* keliling dengan persegi bersisi 5 cm
> **When** siswa menyeret titik menyusuri satu sisi hingga ujung
> **Then** sisi tersebut menyala dengan warna keliling, angka "5 cm" muncul pada sisi itu, dan panel menampilkan penjumlahan berjalan "5"

> **When** siswa menyelesaikan keempat sisi dan kembali ke titik awal
> **Then** panel menampilkan "5 + 5 + 5 + 5 = 20 cm" dan seluruh tepi menyala sebagai satu garis tertutup

> **Given** titik keluar dari tepi saat diseret
> **When** hal itu terjadi
> **Then** titik kembali ke posisi terakhir yang valid di tepi dan proses **tidak** diulang dari awal

### AC untuk US-08 (konsep luas)

> **Given** tahap *guided* luas dengan persegi panjang 4 × 3
> **When** siswa menyeret satuan persegi ke dalam bangun
> **Then** ubin ter-*snap* ke grid tanpa celah dan penghitung bertambah 1

> **When** ubin dijatuhkan di luar bangun atau di atas ubin lain
> **Then** ubin kembali ke persediaan tanpa penalti

> **When** seluruh bangun tertutup
> **Then** sistem menampilkan "Luas = 12 satuan persegi" dan grid berubah menampilkan 3 baris × 4 kolom

### AC untuk US-09 (instruksi visual)

> **Given** siswa membuka aktivitas mana pun
> **When** layar aktivitas muncul
> **Then** terdapat tepat satu instruksi ≤ 8 kata, satu ikon, dan satu demo animasi 3–5 detik
> **And** tidak ada teks baru yang muncul selama demo berjalan
> **And** tombol "Ulangi contoh" tersedia sepanjang aktivitas

### AC untuk US-10 & US-13 (feedback & tanpa batas waktu)

> **Given** siswa menjawab salah pada percobaan pertama
> **When** umpan balik ditampilkan
> **Then** muncul ikon ↩ netral (bukan tanda silang merah besar), objek kembali ke posisi semula, dan bagian bangun yang relevan disorot
> **And** tidak ada suara, tidak ada pengurangan nyawa, dan tidak ada perpindahan soal otomatis

> **Given** sebuah soal atau aktivitas sedang terbuka
> **When** waktu berjalan berapa lama pun
> **Then** tidak ada hitung mundur, tidak ada peringatan waktu, dan tidak ada perpindahan otomatis

---

# 23. Edge Cases

| ID | Edge case | Perilaku yang diharapkan |
|---|---|---|
| EC-01 | Siswa menekan tombol berkali-kali dengan cepat | Aksi di-*debounce*; state tetap konsisten; animasi tidak menumpuk |
| EC-02 | Siswa menyeret bangun ke luar layar | Bangun kembali ke posisi awal dengan animasi lembut |
| EC-03 | Layar sangat sempit (360 px) pada aktivitas dua bangun | Beralih ke tata letak bertumpuk vertikal dengan skala kanvas identik |
| EC-04 | Layar sangat pendek (landscape HP) | Kanvas menjadi prioritas; panel kontrol dapat digulir; navigasi mengecil |
| EC-05 | Siswa mengulang latihan yang sama berkali-kali | Soal diacak dari generator; status penguasaan tidak "naik" hanya karena pengulangan; dicatat `repeatCount` untuk guru |
| EC-06 | localStorage penuh / dimatikan browser | Aplikasi tetap berjalan dalam mode sesi; tidak ada error ditampilkan ke siswa |
| EC-07 | Siswa menutup tab di tengah latihan | Sesi berikutnya dimulai ulang dari awal topik; jawaban parsial tidak dihitung sebagai penguasaan |
| EC-08 | Dua siswa memakai perangkat yang sama berurutan | Tersedia "Mulai baru / reset progress" di pengaturan; **OQ-03** |
| EC-09 | Drag gagal pada trackpad/layar yang kurang responsif | Alternatif tap-tap selalu terlihat, bukan tersembunyi |
| EC-10 | Siswa menjawab benar secara kebetulan (menebak) | Dicatat `attemptCount` & pola; penguasaan butuh 4/5 pada level ≥ L2 sehingga tebakan sulit lolos |
| EC-11 | Siswa tidak melakukan apa pun dalam waktu lama | Tidak ada timeout; setelah jeda panjang, elemen yang harus disentuh berdenyut **satu kali** |
| EC-12 | Angka soal menghasilkan nilai yang sangat besar | Generator dibatasi: sisi ≤ 20, luas ≤ 100 pada MVP |
| EC-13 | Rotasi membuat label bertabrakan dengan bangun | Label direposisi otomatis ke sisi luar; selalu tegak |
| EC-14 | Zoom browser 200% | Tata letak tetap utuh; kanvas mengecil proporsional, tidak terpotong |
| EC-15 | Bangun diskalakan sangat kecil lalu sisi di-tap | Target sentuh minimum dipaksakan (area tap lebih besar dari garis yang terlihat) |
| EC-16 | Warna isi dipilih siswa mendekati warna penanda sisi | Palet warna isi dibatasi & diuji kontras terhadap semua warna semantik |
| EC-17 | Koneksi terputus saat berpindah halaman | Halaman materi yang sudah di-*prerender* tetap dapat dibuka; pesan berbentuk ikon + 1 kalimat + "Coba lagi" |
| EC-18 | Siswa membuka topik lanjutan tanpa menyelesaikan prasyarat | Diizinkan (tidak dikunci), tetapi diberi tanda visual "disarankan belajar X dulu" **[R]** |

---

# 24. Risks & Mitigations

| ID | Risiko | Dampak | Kemungkinan | Mitigasi |
|---|---|---|---|---|
| R-01 | **Siswa salah memahami visualisasi** (mis. mengira sudut lebih besar karena bangun lebih besar) | Tinggi | Sedang | Radius busur sudut konstan (14.3); uji pemahaman dengan siswa nyata sebelum rilis; soal diagnostik khusus |
| R-02 | **Keliling & luas tertukar** | Tinggi | Tinggi | Representasi visual yang sangat berbeda & konsisten; distraktor diagnostik; soal pembeda wajib di setiap asesmen |
| R-03 | **Teks terlalu banyak / tidak terjangkau** | Tinggi | Tinggi | Batas keras 8 kata; review guru SLB wajib; uji keterbacaan bersama siswa |
| R-04 | **Instruksi tidak dipahami** sehingga siswa menebak | Tinggi | Tinggi | Demo animasi wajib (FR-20); metrik "menebak" dipantau (23.10/Bab 27) |
| R-05 | **Drag & drop sulit** pada perangkat tertentu | Sedang | Tinggi | Alternatif tap & keyboard **wajib**, bukan opsional; snap radius besar |
| R-06 | **Animasi mengganggu fokus** | Sedang | Sedang | Larangan animasi dekoratif; `prefers-reduced-motion`; saklar manual |
| R-07 | **Warna tidak terlihat** (proyektor, buta warna, layar murah) | Tinggi | Sedang | Redundansi penanda non-warna (A11Y-13); uji pada proyektor kelas |
| R-08 | **Soal terlalu mudah/sulit** | Sedang | Tinggi | Level adaptif sederhana; pengaturan guru; kalibrasi setelah uji coba |
| R-09 | **Gamifikasi menggeser fokus dari belajar** | Sedang | Sedang | Tidak ada timer/leaderboard/streak; setiap game terikat LO |
| R-10 | **Asumsi tentang siswa salah** (usia, literasi, perangkat) | **Sangat tinggi** | Sedang | Validasi asumsi A-01…A-10 **sebelum** development dimulai; lihat Bab 28 |
| R-11 | **Konflik definisi "sisi lingkaran"** antara matematika formal dan buku pelajaran sekolah | Tinggi | Tinggi | Keputusan diambil bersama guru (**OQ-06**); sampai itu, lingkaran dikeluarkan dari soal "jumlah sisi"; keputusan disimpan sebagai konfigurasi konten, bukan hardcode |
| R-12 | **Next.js 16.3.5 masih baru**, pustaka pihak ketiga belum kompatibel | Sedang | Sedang | *Spike* teknis di awal untuk animasi & drag-drop; pilih pustaka dengan dukungan React terbaru atau implementasi pointer-event sendiri |
| R-13 | **Ruang lingkup membesar** (permintaan bangun/fitur tambahan) | Sedang | Tinggi | MVP dikunci lewat matriks prioritas Bab 25; tambahan masuk Post-MVP |
| R-14 | **Progress hilang** karena perangkat bersama / storage bersih | Sedang | Sedang | Komunikasikan batasan ke guru sejak awal; sediakan reset; siapkan jalur akun Post-MVP |
| R-15 | **Aset bahasa isyarat tidak tersedia** atau memakai sistem yang salah | Sedang | Sedang | Ditunda ke Post-MVP dengan slot data sudah disiapkan; tentukan sistem lewat OQ-05 |
| R-16 | **Uji coba dengan siswa sulit dijadwalkan** | Tinggi | Sedang | Sepakati jadwal uji sejak awal proyek; siapkan uji tipis (5 siswa) di tiap milestone |
| R-17 | **Visual terlalu kekanak-kanakan** bagi siswa yang lebih besar | Sedang | Sedang | Arah desain "tenang & modern" (UXR-08); validasi bersama guru & siswa jenjang atas |

---

# 25. MVP Scope

## 25.1 Kriteria prioritisasi

Setiap fitur dinilai pada: (1) dampak terhadap tujuan pembelajaran, (2) kebutuhan aksesibilitas, (3) kompleksitas implementasi, (4) risiko, (5) ketergantungan.

## 25.2 MVP Feature Priority Matrix

| Fitur | Dampak belajar | Kebutuhan a11y | Kompleksitas | Risiko | Ketergantungan | Prioritas |
|---|---|---|---|---|---|---|
| FR-02 Shape Viewer + geometry engine | Sangat tinggi | Tinggi | Sedang | Sedang | — | **MVP (fondasi)** |
| FR-03 Highlight sisi/sudut | Sangat tinggi | Tinggi | Sedang | Rendah | FR-02 | **MVP** |
| FR-04 Penghitung sisi/sudut | Tinggi | Sedang | Rendah | Rendah | FR-03 | **MVP** |
| FR-01 Katalog bangun | Tinggi | Sedang | Rendah | Rendah | FR-02 | **MVP** |
| FR-20 Instruksi visual | Sangat tinggi | **Kritis** | Sedang | Sedang | — | **MVP** |
| FR-17 Feedback visual | Sangat tinggi | **Kritis** | Sedang | Rendah | — | **MVP** |
| FR-05 Ukuran & warna | Tinggi | Sedang | Rendah | Sedang (MATH) | FR-02 | **MVP** |
| FR-06 Orientasi | Tinggi | Rendah | Rendah | Rendah | FR-02 | **MVP** |
| FR-07 Kartu karakteristik | Tinggi | Sedang | Rendah | Rendah | FR-02 | **MVP** |
| FR-08 Compare View | Sangat tinggi | Sedang | Sedang | Sedang | FR-02/03 | **MVP** |
| FR-10 Classification sandbox | Tinggi | Tinggi (drag) | Tinggi | Sedang | FR-02 | **MVP** |
| FR-11 Perimeter trace | Sangat tinggi | Tinggi | Tinggi | Sedang | FR-02 | **MVP** |
| FR-13 Area tiling | Sangat tinggi | Tinggi | Tinggi | Sedang | FR-02 | **MVP** |
| FR-12 Latihan keliling | Tinggi | Sedang | Sedang | Rendah | FR-11, FR-16 | **MVP** |
| FR-16 Exercise engine | Sangat tinggi | Tinggi | Tinggi | Sedang | FR-02 | **MVP** |
| FR-18a–d Game inti | Tinggi | Sedang | Sedang | Rendah | FR-16 | **MVP** |
| FR-19 Progress | Sedang | Rendah | Rendah | Rendah | FR-16 | **MVP** |
| FR-21 Pengaturan | Sedang | Tinggi | Rendah | Rendah | — | **MVP (minimal: teks & animasi)** |
| FR-14 Ukuran ↔ luas | Sedang | Rendah | Sedang | Rendah | FR-13 | Post-MVP |
| FR-15 Kamus visual | Tinggi | Tinggi | Sedang | Rendah | — | Post-MVP (disarankan naik bila sumber daya ada) |
| FR-18e–h Game tambahan | Sedang | Rendah | Sedang | Rendah | FR-16 | Post-MVP |
| FR-09 Overlay comparison | Sedang | Rendah | Sedang | **Tinggi (miskonsepsi)** | FR-08 | Post-MVP setelah uji |
| FR-22 Mode guru/proyeksi | Sedang | Sedang | Rendah | Rendah | — | Post-MVP |
| FR-23 Bahasa isyarat | **Sangat tinggi** | **Sangat tinggi** | Tinggi (produksi) | Sedang | OQ-05 | Post-MVP prioritas 1 |
| FR-24 Akun & sinkronisasi | Rendah (belajar) | Rendah | Tinggi | Sedang (data anak) | OQ-04 | Post-MVP |
| FR-25 Leaderboard | Negatif | — | — | Tinggi | — | **Won't Have** |

## 25.3 Definition of Done untuk MVP

MVP dinyatakan selesai bila:

1. Seluruh fitur berlabel MVP berfungsi pada desktop, tablet, dan mobile.
2. Checklist MATH-01…12 lulus 100% dan tercakup unit test.
3. Audit WCAG 2.2 AA tanpa pelanggaran blocker; seluruh fungsi dapat dijalankan dengan keyboard; seluruh drag punya alternatif tap.
4. Produk diuji dengan volume 0 tanpa kehilangan informasi apa pun.
5. Seluruh teks telah direview guru SLB.
6. Uji coba dengan minimal 5 siswa target selesai dan temuan kritis diperbaiki.

---

# 26. Post-MVP Roadmap

| Fase | Isi | Alasan urutan |
|---|---|---|
| **Fase 2 — Dukungan bahasa** | FR-23 video BISINDO/SIBI untuk istilah & instruksi; FR-15 kamus visual lengkap | Dampak aksesibilitas terbesar setelah MVP; menyelesaikan hambatan bahasa yang tersisa |
| **Fase 3 — Pendalaman materi** | Game FR-18e–h; FR-14 hubungan ukuran–luas; segitiga tumpul & garis tinggi; bangun majemuk sederhana | Memperluas cakupan setelah fondasi konsep terbukti |
| **Fase 4 — Dukungan guru** | FR-22 mode proyeksi; ringkasan kelas; pengaturan per siswa; FR-24 akun & sinkronisasi | Bergantung pada hasil OQ-04; membutuhkan backend |
| **Fase 5 — Perluasan** | Keliling & luas lingkaran (π); simetri & pencerminan; mode gelap; PWA/offline | Materi paling abstrak dan fitur kenyamanan, dijalankan terakhir |

---

# 27. Product Metrics

Metrik dibagi dua: **metrik pembelajaran** (utama) dan **metrik penggunaan** (pendukung). Lama pemakaian **tidak** dipakai sebagai indikator keberhasilan — sesi panjang justru bisa berarti siswa kebingungan.

## 27.1 Metrik pembelajaran (utama)

| ID | Metrik | Definisi | Target awal **[A — kalibrasi setelah uji]** |
|---|---|---|---|
| M-01 | **Mastery per topik** | % siswa yang mencapai status "sudah dikuasai" per topik | ≥ 70% setelah 3 sesi |
| M-02 | **Exercise success rate** | % jawaban benar pada percobaan pertama, per LO | ≥ 65% pada level yang sesuai |
| M-03 | **Peningkatan antar percobaan** | Selisih success rate percobaan ke-2 vs ke-1 pada topik sama | Positif dan signifikan |
| M-04 | **Tingkat kesalahan keliling↔luas** | % jawaban yang memilih distraktor "nilai besaran lain" | Menurun antar sesi; < 15% pada sesi ketiga |
| M-05 | **Retensi orientasi** | Success rate soal bangun berorientasi tidak standar dibanding standar | Selisih < 15% (menandakan prototipe bentuk teratasi) |
| M-06 | **Mandiri tanpa petunjuk** | % jawaban benar tanpa `usedHint` | Meningkat antar sesi |
| M-07 | **Error pattern per LO** | Distribusi kesalahan per kompetensi | Dipakai guru untuk mengulang materi yang tepat |

## 27.2 Metrik pengalaman & penggunaan (pendukung)

| ID | Metrik | Definisi | Interpretasi |
|---|---|---|---|
| M-08 | **Completion rate aktivitas** | % aktivitas yang dimulai lalu diselesaikan | Rendah → instruksi atau kesulitan bermasalah |
| M-09 | **Retry rate** | Rata-rata pengulangan per aktivitas | Tinggi + akurasi tidak naik → siswa menebak, bukan belajar |
| M-10 | **Time on task** | Waktu per soal | Dibaca sebagai **diagnostik**, bukan target: terlalu cepat = menebak; terlalu lama = instruksi tidak terbaca |
| M-11 | **Rasio tebakan** | % jawaban < 2 detik atau pola mencoba semua pilihan | Indikator instruksi gagal dipahami (R-04) |
| M-12 | **Drop-off per layar** | Layar tempat siswa keluar | Menunjukkan titik kebingungan UI |
| M-13 | **Pemakaian alternatif tap vs drag** | Proporsi cara interaksi | Menguji apakah drag layak dipertahankan |
| M-14 | **Pemakaian "Ulangi contoh"** | Frekuensi per aktivitas | Tinggi → instruksi visual kurang jelas |

**Catatan privasi:** seluruh metrik bersifat agregat & anonim; tidak ada data pribadi siswa. Pengumpulan harus dapat dimatikan sepenuhnya. **OQ-12**

---

# 28. Open Questions / Items Requiring Client Validation

Diurutkan berdasarkan dampaknya terhadap desain. Pertanyaan bertanda ⛔ **memblokir** dimulainya desain UI.

| ID | Pertanyaan | Untuk | Dampak bila tidak terjawab |
|---|---|---|---|
| ⛔ OQ-01 | Nama produk dan identitas visual (logo, warna sekolah/lembaga)? | Client | Branding & design token tertunda |
| ⛔ OQ-02 | Berapa usia dan jenjang siswa target? Kelas berapa? | Client/Guru | Seluruh kalibrasi kesulitan, panjang kalimat, dan gaya visual bergantung di sini (A-01) |
| ⛔ OQ-03 | Bagaimana perangkat dipakai — satu siswa satu perangkat, bergantian, atau diproyeksikan guru? | Guru | Menentukan kebutuhan akun/reset progress (A-06) |
| ⛔ OQ-04 | Apakah guru menjadi pengguna sistem? Apakah dibutuhkan pelaporan? | Client | Menentukan kebutuhan backend, akun, dan dashboard (FR-22, FR-24) |
| ⛔ OQ-05 | Sistem isyarat apa yang dipakai sekolah — BISINDO atau SIBI? Apakah siswa mengandalkan isyarat, membaca, atau keduanya? | Guru | Menentukan prioritas dan bentuk FR-23 (A-02) |
| ⛔ OQ-06 | Bagaimana sekolah mengajarkan "sisi" pada lingkaran — mengikuti buku ("1 sisi lengkung") atau definisi formal (tidak punya sisi)? | Guru | Menentukan isi soal & konten lingkaran; konflik ini harus diselesaikan sebelum bank soal dibuat (R-11) |
| OQ-07 | Istilah baku apa yang dipakai guru: "titik sudut" atau "pojok"? "satuan persegi" atau "persegi satuan"? | Guru | Konsistensi istilah (A11Y-06) |
| OQ-08 | Apakah siswa perlu diajarkan bahwa persegi adalah persegi panjang khusus (hubungan hierarkis)? | Guru | Memengaruhi desain aktivitas klasifikasi & perbandingan |
| OQ-09 | Apakah keliling dan luas **lingkaran** (π) termasuk materi yang harus dicakup? | Client/Guru | Menentukan cakupan LO & jadwal (dikeluarkan dari MVP saat ini) |
| OQ-10 | Bagaimana kondisi koneksi internet dan spesifikasi perangkat di sekolah? Perlukah mode offline? | Client/Sekolah | Memengaruhi NFR performa & kebutuhan PWA |
| OQ-11 | Apakah dibutuhkan mode gelap atau penyesuaian tampilan lain untuk kondisi ruang kelas tertentu? | Guru | Menambah pekerjaan design token |
| OQ-12 | Apakah pengumpulan data penggunaan (analytics) diizinkan? Ada kebijakan perlindungan data siswa? | Client/Sekolah | Menentukan implementasi metrik Bab 27 |
| OQ-13 | Apakah ada kurikulum/buku acuan spesifik yang harus diikuti urutan materinya? | Guru | Memengaruhi urutan topik & istilah |
| OQ-14 | Apakah tersedia akses untuk uji coba langsung dengan siswa? Berapa siswa dan kapan? | Client/Sekolah | Tanpa ini, seluruh asumsi tetap tidak tervalidasi (R-16) |
| OQ-15 | Siapa yang menyediakan konten (soal, teks) — tim produk atau guru? Siapa yang mereview? | Client | Memengaruhi timeline & proses konten |
| OQ-16 | Apakah ada kebutuhan bahasa daerah atau variasi istilah lokal? | Client | Memengaruhi struktur konten |

---

# Lampiran A — Requirement Traceability Matrix

**Learning Objective → User Need → Feature → Requirement → Acceptance Criteria**

| LO | User Need | Feature | Requirement utama | Acceptance Criteria |
|---|---|---|---|---|
| LO-01 Mengenali bangun | N-01 | FR-01, FR-02, FR-06, FR-18a | Render akurat; variasi ukuran & orientasi (MATH-01, MATH-11) | AC US-04; pengenalan benar ≥ 4/5 termasuk orientasi tidak standar |
| LO-02 Nama bangun | N-01 | FR-01, FR-02, FR-18a | Label nama konsisten; nama tidak berubah saat diskalakan/diputar | AC US-04 (nama tetap "Persegi") |
| LO-03 Jumlah sisi | N-02, N-03 | FR-03, FR-04, FR-18e | Mode sisi eksklusif; penanda tick; anti hitung ganda | AC US-02 |
| LO-04 Jumlah sudut | N-02, N-03 | FR-03, FR-04, FR-18f | Busur radius konstan; kotak siku-siku (MATH-03) | AC US-02 (varian sudut); busur tidak membesar mengikuti bangun |
| LO-05 Karakteristik | N-02 | FR-02, FR-07, FR-16 | Kartu ciri satu per satu; terhubung ke bagian bangun | AC US-04; ciri tidak berubah saat ukuran berubah |
| LO-06 Membandingkan | N-04 | FR-08, FR-18c | Dua kanvas berskala identik; highlight serentak | AC US-05 |
| LO-07 Persamaan & perbedaan | N-04 | FR-08, FR-09 | Aktivitas kolom Sama/Berbeda; nilai dihitung dari definisi (MATH-10) | AC US-05 (kartu terkunci/kembali) |
| LO-08 Mengelompokkan | N-05 | FR-10, FR-18d | Drag + tap + keyboard (A11Y-25); bangun bervariasi | AC US-06 |
| LO-09 Bangun dari ciri | N-05 | FR-07, FR-16, FR-18b | Ciri bertahap; petunjuk pada percobaan kedua | Siswa menjawab ≥ 4/5 teka-teki ciri |
| LO-10 Konsep keliling | N-06 | FR-11 | Trace tepi dengan snap; penjumlahan berjalan | AC US-07 |
| LO-11 Hitung keliling | N-06 | FR-12, FR-18g | Angka menempel pada gambar; distraktor = nilai luas | ≥ 4/5 benar; kesalahan keliling↔luas terdeteksi (M-04) |
| LO-12 Konsep luas | N-07 | FR-13 | Tiling snap tanpa celah; satuan persegi (MATH-07) | AC US-08 |
| LO-13 Hitung luas | N-07 | FR-13, FR-14, FR-18h | Baris × kolom sebelum rumus; segitiga = ½ persegi panjang | AC US-08 (tampilan baris × kolom) |
| LO-14 Penerapan | N-08, N-09 | FR-16, FR-17, FR-18, FR-19 | Tanpa timer; retry tanpa penalti; feedback 3 lapis | AC US-10 & US-13 |
| *(lintas LO)* | N-10 | FR-20 | Instruksi ≤ 8 kata + ikon + demo; satu fokus visual | AC US-09 |
| *(lintas LO)* | N-11 | FR-19, FR-21, FR-22 | Progress per topik; pengaturan; mode proyeksi | US-17, US-18, US-19 |

---

# Lampiran B — Ringkasan Asumsi Utama

| ID | Asumsi | Cara memvalidasi | Prioritas validasi |
|---|---|---|---|
| A-01 | Jenjang setara SD 3–6 / awal SMPLB | Tanya guru (OQ-02) | ⛔ Tinggi |
| A-02 | Kemampuan baca di bawah level kelas | Observasi + wawancara guru (OQ-05) | ⛔ Tinggi |
| A-03 | Dipakai di kelas dengan pendampingan guru | Wawancara guru (OQ-03) | ⛔ Tinggi |
| A-04 | Perangkat ≥ 10 inci dengan internet sederhana | Survei perangkat sekolah (OQ-10) | Tinggi |
| A-05 | Tidak ada hambatan penglihatan/motorik berat | Konfirmasi guru | Sedang |
| A-06 | Perangkat dipakai bergantian | Konfirmasi guru (OQ-03) | Tinggi |
| A-07 | Antarmuka Bahasa Indonesia sederhana | Konfirmasi client (OQ-16) | Sedang |
| A-08 | Produk sebagai alat bantu, bukan pengganti guru | Konfirmasi client | Sedang |
| A-09 | Tanpa integrasi LMS pada rilis pertama | Konfirmasi client (OQ-04) | Sedang |
| A-10 | Mengikuti kurikulum SD Indonesia (termasuk konvensi sisi lingkaran & π) | Konfirmasi guru (OQ-06, OQ-09, OQ-13) | ⛔ Tinggi |
| A-11 | Distraktor diagnostik dapat dibaca sebagai indikator miskonsepsi | Uji coba dengan siswa (OQ-14) | Sedang |
| A-12 | Target metrik awal (Bab 27) realistis | Kalibrasi setelah uji coba pertama | Rendah |

---

# Lampiran C — Langkah Berikutnya yang Disarankan

1. **Sesi validasi dengan client & guru** menggunakan daftar OQ-01…OQ-16, khususnya 6 pertanyaan bertanda ⛔.
2. **Kunci daftar istilah baku** dan pedoman penulisan konten (Bab 17.2) bersama guru.
3. **Spike teknis** kompatibilitas Next.js 16.3.5 dengan pustaka animasi & drag-and-drop (R-12).
4. **Prototipe geometry engine + validator** (TC-03/TC-04) lebih dulu, sebelum UI — karena seluruh fitur bergantung padanya.
5. **Wireframe low-fidelity** untuk 6 layar kunci: Detail Bangun, Compare View, Classification Sandbox, Perimeter Trace, Area Tiling, Sesi Latihan.
6. **Uji coba tipis dengan 3–5 siswa** pada wireframe/prototipe klik sebelum masuk UI final.
7. **Kalibrasi ulang PRD** berdasarkan hasil validasi; terbitkan versi 1.1.

---

*Dokumen ini adalah draft untuk divalidasi. Setiap pernyataan bertanda **[A]**, **[R]**, atau **[OQ]** belum berstatus keputusan final dan tidak boleh diperlakukan sebagai kebutuhan client.*
