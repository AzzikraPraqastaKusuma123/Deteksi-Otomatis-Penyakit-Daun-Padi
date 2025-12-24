-- SQL for Comprehensive Fallback Data (Version 2 - More Detail)
-- This script UPDATES existing records in diseases, pests, and agricultural_resources
-- to include rich, detailed fallback content in both Indonesian and English.

-- =============================================
-- UPDATE `diseases` table with richer content
-- =============================================

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Hawar Daun Bakteri (BLB), yang populer disebut penyakit kresek, disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae. Ini adalah salah satu penyakit paling merusak pada padi di seluruh dunia. Bakteri masuk melalui luka alami daun atau pori-pori (stomata) dan menyebar melalui sistem vaskular tanaman. Gejala awal sering muncul sebagai lesi bergaris dan berair di tepi daun, yang dengan cepat memanjang, berubah menjadi kuning jerami, dan akhirnya menyebabkan seluruh daun mengering. Serangan pada fase pembibitan dapat menyebabkan kematian bibit, sementara serangan pada fase generatif dapat menyebabkan pengisian gabah yang tidak sempurna dan kehilangan hasil yang signifikan. Penyakit ini sangat disukai oleh kondisi hangat, lembap, hujan deras, dan angin kencang yang dapat menciptakan luka pada daun.",
    "symptoms": "Gejala paling khas adalah lesi layu atau kekuningan yang dimulai dari ujung atau tepi daun, seringkali dengan batas bergelombang antara jaringan sehat dan terinfeksi. Pada pagi hari, tetesan embun bakteri berwarna kuning susu dapat terlihat di permukaan lesi. Pada serangan sistemik yang parah, seluruh rumpun bisa tampak layu dan mati, sebuah kondisi yang dikenal sebagai ''kresek''."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Pengendalian BLB yang efektif bergantung pada pendekatan terpadu. Penggunaan varietas tahan adalah strategi utama dan paling ekonomis. Hindari pemupukan Nitrogen (N) yang berlebihan karena membuat jaringan tanaman lebih lunak dan rentan. Berikan pupuk Kalium (K) yang cukup untuk memperkuat dinding sel. Atur jarak tanam agar tidak terlalu rapat untuk meningkatkan sirkulasi udara dan mengurangi kelembaban. Lakukan sanitasi dengan membersihkan gulma dan sisa-sisa tanaman yang terinfeksi. Jika serangan terjadi, aplikasi bakterisida berbahan aktif tembaga atau antibiotik pertanian seperti streptomisin sulfat bisa dilakukan, namun harus sesuai anjuran dan rotasi bahan aktif untuk mencegah resistensi."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Varietas Inpari atau Ciherang", "deskripsi_singkat": "Pilih varietas yang memiliki label ''tahan kresek'' atau resisten terhadap BLB yang umum di daerah Anda."},
    {"nama_produk": "Bakterisida berbahan aktif Tembaga Hidroksida", "deskripsi_singkat": "Bekerja sebagai pelindung yang mencegah infeksi bakteri. Aplikasikan pada awal gejala."},
    {"nama_produk": "Pupuk KCL (Kalium Klorida)", "deskripsi_singkat": "Tingkatkan dosis Kalium untuk memperkuat batang dan daun, membuatnya lebih tahan terhadap penetrasi bakteri."}
  ]''
WHERE `disease_name` = ''Bacterial Leaf Blight'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Bercak Coklat disebabkan oleh jamur Bipolaris oryzae (sebelumnya dikenal sebagai Helminthosporium oryzae). Penyakit ini sering dianggap sebagai penyakit ''tanaman miskin'' atau ''tanah miskin'' karena sering muncul pada sawah yang kekurangan nutrisi, terutama Kalium, atau pada tanah dengan masalah drainase dan toksisitas besi. Jamur ini menghasilkan bercak-bercak khas pada daun yang berbentuk oval atau bulat. Bercak ini dapat mengurangi area fotosintesis secara signifikan, dan pada serangan berat, dapat menyebabkan daun mengering sebelum waktunya. Selain daun, jamur juga dapat menginfeksi gabah, menyebabkan bintik-bintik hitam yang menurunkan kualitas dan harga jual gabah.",
    "symptoms": "Gejala utama adalah munculnya banyak bercak kecil berbentuk oval hingga bulat pada daun. Bercak ini biasanya memiliki pusat berwarna keabu-abuan atau coklat muda dengan batas coklat kemerahan yang jelas. Ukuran bercak bisa bervariasi dari sekecil kepala jarum hingga beberapa milimeter. Pada gabah, gejala berupa bintik-bintik hitam atau coklat gelap."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Kunci utama pengendalian adalah perbaikan nutrisi tanaman dan kesehatan tanah. Pastikan pemupukan berimbang dengan unsur N, P, dan K yang cukup. Penambahan Kalium (K) sangat krusial untuk meningkatkan ketahanan tanaman. Gunakan benih yang sehat dan bersertifikat, bebas dari patogen. Perlakuan benih dengan fungisida dapat memberikan perlindungan awal. Rotasi tanaman dengan tanaman non-padi membantu memutus siklus hidup jamur. Jaga kebersihan lahan dari gulma. Aplikasi fungisida berbahan aktif mancozeb atau propiconazole bisa efektif jika dilakukan saat awal munculnya gejala, terutama jika kondisi lingkungan mendukung perkembangan penyakit."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Pupuk KCL atau NPK seimbang", "deskripsi_singkat": "Pastikan rasio Kalium (K) seimbang atau lebih tinggi untuk meningkatkan ketahanan tanaman secara fundamental."},
    {"nama_produk": "Fungisida berbahan aktif Mancozeb atau Propiconazole", "deskripsi_singkat": "Gunakan sebagai tindakan kuratif pada awal serangan untuk menghentikan penyebaran bercak."},
    {"nama_produk": "Benih Padi Bersertifikat", "deskripsi_singkat": "Investasi awal yang sangat penting untuk memastikan benih bebas dari jamur patogen penyebab Bercak Coklat."}
  ]''
WHERE `disease_name` = ''Brown Spot'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Blas, disebabkan oleh jamur Magnaporthe oryzae, adalah penyakit paling destruktif pada tanaman padi secara global. Jamur ini memiliki kemampuan adaptasi yang tinggi dan dapat menginfeksi semua bagian tanaman: daun (leaf blast), ruas batang (node blast), dan leher malai (neck blast). Infeksi pada daun mengurangi kapasitas fotosintesis, sementara infeksi pada leher malai adalah yang paling merusak karena secara langsung memutus suplai nutrisi ke gabah, menyebabkan malai menjadi hampa dan patah. Penyakit ini berkembang pesat pada kondisi kelembaban tinggi (di atas 90%), suhu malam yang sejuk, dan pemupukan Nitrogen (N) yang berlebihan.",
    "symptoms": "Gejala paling ikonik pada daun adalah lesi berbentuk belah ketupat dengan pusat keabu-abuan dan tepi coklat gelap. Pada leher malai, gejala berupa cincin kehitaman yang menyebabkan seluruh malai di atasnya mati dan berwarna putih (hampa). Pada ruas batang, gejala serupa muncul dan dapat menyebabkan batang patah."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Strategi pengendalian blas harus bersifat preventif dan terpadu. Gunakan varietas padi yang tahan blas. Lakukan pemupukan N secara bijak, jangan berlebihan, dan aplikasikan dalam beberapa tahap. Pemberian pupuk Silika (Si) terbukti efektif memperkuat dinding sel daun sehingga sulit ditembus jamur. Atur waktu tanam untuk menghindari kondisi cuaca yang paling kondusif bagi blas. Jika diperlukan, aplikasi fungisida sistemik berbahan aktif triklasikazol, isoprotiolan, atau azoksistrobin sangat efektif, terutama pada fase bunting tua untuk melindungi leher malai."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Fungisida sistemik (e.g., Fujiwan, Amistartop)", "deskripsi_singkat": "Aplikasikan secara preventif pada fase bunting untuk melindungi leher malai dari infeksi Neck Blast."},
    {"nama_produk": "Pupuk mengandung Silika (Si)", "deskripsi_singkat": "Meningkatkan ketahanan mekanis daun padi sehingga jamur lebih sulit menginfeksi."},
    {"nama_produk": "Varietas Tahan Blas", "deskripsi_singkat": "Pilih benih yang direkomendasikan oleh balai pertanian setempat yang memiliki ketahanan terhadap ras blas dominan."}
  ]''
WHERE `disease_name` = ''Leaf Blast'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Hawar Daun atau ''Leaf Scald'' disebabkan oleh jamur Microdochium oryzae. Penyakit ini umum terjadi di daerah tropis yang lembab. Jamur ini biasanya menginfeksi daun padi yang sudah tua, dimulai dari ujung atau tepi daun. Gejala khasnya adalah lesi besar yang memanjang dengan pola zonasi seperti gelombang atau sisik, memberikan penampilan seperti daun tersiram air panas. Warna lesi bervariasi dari coklat muda keabu-abuan hingga coklat jerami. Serangan parah dapat menyebabkan seluruh daun mengering, mengganggu fotosintesis dan akhirnya menurunkan hasil panen.",
    "symptoms": "Lesi besar memanjang mulai dari ujung atau tepi daun. Lesi menunjukkan pola zonasi konsentris (seperti gelombang) dengan warna bervariasi dari coklat muda hingga keabu-abuan. Pada kondisi lembab, dapat terlihat massa spora berwarna merah muda di permukaan lesi."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Gunakan varietas padi yang menunjukkan tingkat toleransi yang baik. Jaga kebersihan lahan dari gulma dan sisa-sisa tanaman musim sebelumnya yang bisa menjadi sumber inokulum. Pastikan pemupukan berimbang, terutama unsur Kalium (K) untuk meningkatkan ketahanan tanaman. Hindari kepadatan tanam yang terlalu tinggi untuk menjaga sirkulasi udara. Jika serangan terjadi pada fase kritis (misalnya, setelah pembungaan), aplikasi fungisida berbahan aktif propikonazol atau benomil dapat dipertimbangkan."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Varietas Padi Toleran", "deskripsi_singkat": "Pilih varietas yang diketahui memiliki ketahanan lebih baik terhadap Leaf Scald di wilayah Anda."},
    {"nama_produk": "Fungisida Berbahan Aktif Propiconazole", "deskripsi_singkat": "Gunakan sebagai tindakan kuratif jika serangan menyebar luas pada fase penting tanaman."},
    {"nama_produk": "Agens Hayati Trichoderma", "deskripsi_singkat": "Aplikasikan ke tanah untuk menekan pertumbuhan jamur patogen dan meningkatkan kesehatan perakaran."}
  ]''
WHERE `disease_name` = ''Leaf Scald'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Bercak Coklat Sempit disebabkan oleh jamur Cercospora oryzae. Penyakit ini khas dengan gejala lesi yang sangat sempit, linear, dan berwarna coklat kemerahan, berjalan sejajar dengan urat daun. Penyakit ini sering muncul pada tahap akhir pertumbuhan tanaman dan lebih sering menyerang daun-daun yang lebih tua. Meskipun sering dianggap sebagai penyakit sekunder, pada varietas yang rentan dan kondisi lingkungan yang mendukung, serangan berat dapat menyebabkan penuaan daun dini dan secara signifikan mengurangi hasil panen. Kekurangan nutrisi Kalium (K) sangat memicu perkembangan penyakit ini.",
    "symptoms": "Lesi berupa garis-garis pendek (2-10 mm) dan sempit (<1 mm) berwarna coklat kemerahan. Lesi ini berjalan sejajar dengan urat daun dan paling jelas terlihat pada daun-daun tua. Pada serangan berat, seluruh daun bisa tampak berkarat dan mengering."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Pengendalian utama berfokus pada manajemen nutrisi. Pastikan tanaman mendapatkan pasokan Kalium (K) yang cukup melalui pemupukan yang seimbang. Penggunaan varietas yang tahan adalah cara pencegahan yang efektif. Karena penyakit ini sering muncul pada tahap akhir, aplikasi fungisida seringkali tidak ekonomis, kecuali jika serangan terjadi sangat dini pada varietas yang sangat rentan. Menjaga kebersihan lahan dan rotasi tanaman dapat membantu mengurangi sumber penyakit untuk musim tanam berikutnya."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Pupuk KCL (Kalium)", "deskripsi_singkat": "Ini adalah solusi paling fundamental. Pastikan kecukupan Kalium untuk menekan perkembangan penyakit secara alami."},
    {"nama_produk": "Varietas Padi Toleran", "deskripsi_singkat": "Beberapa varietas memiliki ketahanan genetik yang lebih baik terhadap Cercospora."},
    {"nama_produk": "Analisis Tanah", "deskripsi_singkat": "Lakukan pengujian tanah untuk mengetahui tingkat kekurangan Kalium dan nutrisi lain untuk pemupukan yang tepat sasaran."}
  ]''
WHERE `disease_name` = ''Narrow Brown Leaf Spot'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Rice Hispa adalah kerusakan yang disebabkan oleh hama kumbang Hispa (Dicladispa armigera), bukan penyakit jamur atau bakteri. Kumbang dewasa berwarna biru kehitaman dan memiliki duri di tubuhnya. Kerusakan disebabkan oleh dua fase: kumbang dewasa dan larva. Kumbang dewasa memakan permukaan atas daun, mengikis klorofil dan meninggalkan bekas goresan putih yang khas. Larva (fase ulat) lebih merusak, karena masuk ke dalam jaringan daun (menjadi ''miner'') dan memakan mesofil di antara dua lapisan epidermis, menciptakan terowongan putih memanjang. Serangan berat dapat membuat seluruh sawah tampak putih terbakar dan gagal panen.",
    "symptoms": "Kumbang dewasa meninggalkan bekas goresan putih paralel di permukaan daun. Gejala utama adalah terowongan atau lorong-lorong putih memanjang pada helaian daun akibat aktivitas larva. Jika terowongan dibuka, akan ditemukan larva kecil berwarna kekuningan di dalamnya. Pada serangan parah, daun menjadi putih, kering, dan mati."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Pengendalian harus mengacu pada prinsip Pengendalian Hama Terpadu (PHT). Lakukan pemantauan rutin sejak awal tanam. Cara sederhana adalah dengan menggenangi sawah lebih tinggi untuk beberapa saat agar kumbang dewasa pindah. Penggunaan jaring serangga bisa dilakukan untuk menangkap kumbang dewasa. Manfaatkan musuh alami seperti bebek yang dilepas di sawah atau parasitoid. Jika populasi hama sangat tinggi (melebihi ambang batas ekonomi), gunakan insektisida sistemik berbahan aktif fipronil atau karbofuran, yang dapat membunuh larva di dalam daun."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Insektisida Sistemik (e.g. berbahan aktif Fipronil)", "deskripsi_singkat": "Efektif membunuh larva yang berada di dalam jaringan daun. Gunakan secara bijak dan sesuai ambang batas."},
    {"nama_produk": "Pestisida Nabati (e.g. Minyak Mimba/Neem Oil)", "deskripsi_singkat": "Sebagai alternatif yang lebih ramah lingkungan, dapat mengganggu siklus makan dan reproduksi hama."},
    {"nama_produk": "Jaring Serangga", "deskripsi_singkat": "Alat sederhana untuk menangkap kumbang dewasa secara manual saat populasi belum meledak."}
  ]''
WHERE `disease_name` = ''Rice Hispa'';

UPDATE `diseases` SET
  `gemini_informasi_detail` = ''{
    "informasi_detail": "Penyakit Hawar Pelepah disebabkan oleh jamur Rhizoctonia solani. Jamur ini adalah patogen tular tanah yang bertahan hidup sebagai sklerotium (struktur tahan) di dalam tanah atau pada sisa-sisa tanaman. Infeksi biasanya dimulai pada pelepah daun bagian bawah yang dekat dengan permukaan air. Gejala khasnya adalah lesi besar, berbentuk oval atau tidak beraturan, dengan warna tengah keabu-abuan atau keputihan dan tepi coklat kemerahan yang jelas. Pola lesi ini sering digambarkan seperti ''sisik ular''. Pada kondisi yang sangat mendukung (lembab, hangat, dan populasi tanaman rapat), penyakit bisa menyebar cepat ke atas hingga ke daun bendera dan malai, menyebabkan tanaman layu dan gabah menjadi hampa.",
    "symptoms": "Lesi besar berbentuk oval atau tidak beraturan pada pelepah daun, biasanya mulai dari dekat permukaan air. Lesi memiliki pusat keabu-abuan dan tepi coklat gelap yang khas. Seringkali, miselium jamur berwarna keputihan dan sklerotium kecil berwarna coklat (seperti biji sawi) dapat ditemukan pada lesi yang sudah parah."
  }'',
  `gemini_solusi_penyembuhan` = ''{
    "solusi_penyembuhan": "Manajemen kanopi tanaman adalah kunci. Atur jarak tanam lebih lebar untuk meningkatkan sirkulasi udara dan mengurangi kelembapan. Lakukan pengeringan sawah secara berkala (intermittent irrigation) untuk memutus siklus hidup jamur. Hindari pemupukan Nitrogen berlebihan. Lakukan sanitasi lahan dengan membakar atau mengomposkan jerami yang terinfeksi. Penggunaan agens hayati seperti Trichoderma yang diaplikasikan ke tanah sebelum tanam dapat menekan pertumbuhan jamur patogen. Jika serangan melebihi ambang batas, aplikasi fungisida berbahan aktif heksakonazol, validamisin, atau pencycuron bisa sangat efektif."
  }'',
  `gemini_rekomendasi_produk_json` = ''[
    {"nama_produk": "Fungisida berbahan aktif Heksakonazol atau Validamisin", "deskripsi_singkat": "Sangat efektif untuk mengendalikan Hawar Pelepah. Aplikasikan dengan cara disemprot ke bagian bawah rumpun padi."},
    {"nama_produk": "Agens Hayati Trichoderma sp.", "deskripsi_singkat": "Aplikasikan bersama pupuk kandang sebelum tanam untuk menekan jamur patogen di dalam tanah secara alami."},
    {"nama_produk": "Varietas dengan Rumpun Tegak", "deskripsi_singkat": "Pilih varietas yang memiliki arsitektur daun dan batang yang tegak untuk mengurangi kelembaban di bagian pelepah."}
  ]''
WHERE `disease_name` = ''Sheath Blight'';


-- =============================================
-- UPDATE `pests` table with rich content
-- =============================================

UPDATE `pests` SET
  `description_id` = ''Wereng Batang Coklat (WBC) adalah serangga penghisap cairan yang sangat rakus dan menjadi hama utama padi di Asia. Mereka hidup bergerombol di pangkal batang padi, tersembunyi di bawah kanopi daun. Perkembangbiakannya sangat cepat, terutama pada kondisi lembab dan hangat. Baik nimfa (wereng muda) maupun imago (wereng dewasa) merusak tanaman dengan cara mengisap cairan dari jaringan floem, yang mengganggu transportasi hasil fotosintesis. Selain kerusakan langsung, WBC juga merupakan vektor virus kerdil hampa dan kerdil rumput.'',
  `symptoms_id` = ''Gejala serangan awal sulit terlihat, namun populasi yang tinggi menyebabkan daun menguning secara cepat, dimulai dari daun bawah, kemudian seluruh tanaman mengering seolah-olah terbakar. Fenomena ini dikenal dengan istilah ''hopperburn''. Di pangkal batang akan ditemukan ribuan wereng dan seringkali terdapat jamur jelaga hitam akibat embun madu yang dikeluarkan wereng.'',
  `prevention_id` = ''Tanam serentak untuk memutus siklus hidup wereng. Gunakan varietas padi yang tahan WBC (misal: Inpari 31, 33). Lakukan rotasi tanaman dengan tanaman non-padi. Konservasi musuh alami seperti laba-laba, kumbang, dan kepik predator. Hindari penggunaan insektisida spektrum luas pada awal tanam yang bisa membunuh musuh alami.'',
  `treatment_id` = ''Lakukan pemantauan rutin. Jika populasi melebihi ambang batas ekonomi, gunakan insektisida sistemik berbahan aktif imidakloprid, buprofezin, atau tiametoksam. Arahkan semprotan ke pangkal batang. Hindari penyemprotan berulang dengan bahan aktif yang sama untuk mencegah resistensi.''
WHERE `name_id` = ''Wereng Batang Coklat'';

UPDATE `pests` SET
  `description_id` = ''Penggerek Batang Padi Kuning (PBP) adalah ngengat yang larvanya menjadi salah satu hama paling merugikan. Ngengat betina meletakkan telur di ujung daun, kemudian larva yang menetas akan masuk ke dalam batang padi. Di dalam batang, larva memakan jaringan internal, memotong jalur transportasi nutrisi dan air.'',
  `symptoms_id` = ''Pada fase vegetatif (sebelum berbunga), serangan menyebabkan pucuk tanaman tengah mati, mengering, dan mudah dicabut. Gejala ini disebut ''sundep''. Pada fase generatif (setelah berbunga), serangan pada pangkal malai menyebabkan seluruh malai menjadi putih, tegak, dan gabahnya hampa. Gejala ini disebut ''beluk''.'',
  `prevention_id` = ''Tanam serentak dan lakukan rotasi tanaman. Gunakan perangkap feromon untuk memantau dan menangkap ngengat jantan. Sanitasi lahan dengan menghancurkan tunggul jerami setelah panen untuk membunuh pupa yang tersisa. Manfaatkan musuh alami seperti Trichogramma sp. yang merupakan parasitoid telur.'',
  `treatment_id` = ''Aplikasi insektisida paling efektif dilakukan saat puncak penerbangan ngengat atau saat telur baru menetas, sebelum larva masuk ke dalam batang. Gunakan insektisida sistemik atau granular (butiran) berbahan aktif fipronil, karbofuran, atau klorantraniliprol.''
WHERE `name_id` = ''Penggerek Batang Padi'';

UPDATE `pests` SET
  `description_id` = ''Hama putih palsu adalah larva dari ngengat Cnaphalocrocis medinalis. Larva ini merusak dengan cara melipat atau menggulung daun padi secara memanjang dan mengikatnya dengan benang sutra. Di dalam gulungan daun yang terlindung tersebut, larva memakan jaringan hijau (klorofil) daun dari sisi dalam, meninggalkan bekas goresan putih transparan. Serangan yang parah dapat menyebabkan seluruh daun menjadi putih dan kering, yang sangat mengurangi kemampuan tanaman untuk berfotosintesis dan pada akhirnya menurunkan hasil panen.'',
  `symptoms_id` = ''Gejala yang paling jelas adalah adanya gulungan daun padi secara vertikal. Jika gulungan dibuka, akan terlihat larva kecil berwarna hijau di dalamnya. Dari luar, daun yang terserang menunjukkan bekas goresan putih memanjang yang transparan. Dari kejauhan, sawah yang terserang berat tampak seperti terbakar atau berwarna keputihan.'',
  `prevention_id` = ''Hindari penanaman yang terlalu rapat dan pemupukan Nitrogen yang berlebihan. Lakukan sanitasi lingkungan sawah dengan membersihkan gulma yang dapat menjadi inang alternatif. Tanam tanaman berbunga di pematang sawah untuk menarik musuh alami seperti tawon parasitoid. Pemantauan rutin sangat penting untuk deteksi dini.'',
  `treatment_id` = ''Pada serangan ringan, gulungan daun dapat dibuka secara manual untuk membunuh larva. Jika serangan meluas, gunakan insektisida berbahan aktif fipronil, klorantraniliprol, atau flubendiamida. Penyemprotan sebaiknya dilakukan pada pagi atau sore hari.''
WHERE `name_id` = ''Hama Putih Palsu'';

UPDATE `pests` SET
  `description_id` = ''Tikus sawah adalah mamalia pengerat yang menjadi salah satu hama paling merusak dan sulit dikendalikan. Mereka aktif pada malam hari dan dapat merusak tanaman padi pada semua fase pertumbuhan, mulai dari memakan benih yang baru disebar, memotong bibit muda, hingga memakan batang dan bulir padi yang mulai matang. Kerusakan yang ditimbulkan bisa sangat masif dan menyebabkan gagal panen total jika populasi tidak terkendali. Tikus membuat lubang-lubang sarang di pematang sawah.'',
  `symptoms_id` = ''Kerusakan terlihat berupa potongan-potongan batang padi yang tidak beraturan. Pada fase generatif, malai padi seringkali hilang atau terkulai karena batangnya digigit. Tanda keberadaan tikus lainnya adalah adanya lubang-lubang aktif di pematang sawah, jejak kaki, dan kotoran tikus. Kerusakan seringkali terjadi secara berkelompok pada area tertentu.'',
  `prevention_id` = ''Tanam serentak dalam area yang luas untuk mengurangi sumber makanan tikus secara berkelanjutan. Lakukan sanitasi habitat dengan membersihkan semak-semak di sekitar sawah. Manfaatkan predator alami seperti burung hantu dengan memasang rumah burung hantu (rubuha). Lakukan ''gropyokan'' atau perburuan massal bersama kelompok tani sebelum musim tanam dimulai.'',
  `treatment_id` = ''Pengendalian dilakukan dengan pemasangan umpan beracun yang mengandung rodentisida (misalnya: zink fosfida, brodifakum) secara serentak dan sistematis. Pemasangan perangkap (misal: Linear Trap Barrier System/LTBS) di sepanjang pematang juga sangat efektif untuk menangkap tikus dalam jumlah besar.''
WHERE `name_id` = ''Tikus Sawah'';

UPDATE `pests` SET
  `description_id` = ''Walang sangit adalah serangga yang menjadi hama utama pada fase generatif tanaman padi, yaitu saat pengisian bulir. Hama ini merusak dengan cara menusuk bulir padi yang masih dalam tahap masak susu dan mengisap cairannya. Tusukan ini tidak hanya menyebabkan gabah menjadi hampa atau berkualitas rendah, tetapi juga meninggalkan luka yang bisa menjadi pintu masuk bagi jamur dan bakteri patogen, yang menyebabkan gabah menjadi busuk atau berubah warna menjadi kehitaman.'',
  `symptoms_id` = ''Gabah yang diserang menjadi hampa, kempes, atau terdapat bintik-bintik kecil berwarna coklat kehitaman bekas tusukan. Jika diremas, gabah tidak berisi atau mengeluarkan cairan berbau tidak sedap (bau ''sangit''). Di pagi hari, hama ini sering ditemukan bergerombol di malai padi.'',
  `prevention_id` = ''Lakukan tanam serentak untuk membatasi ketersediaan makanan bagi walang sangit. Jaga kebersihan sawah dari gulma, karena banyak jenis rumput-rumputan yang menjadi inang alternatif bagi hama ini. Tanam tanaman refugia (tanaman perangkap) yang berbau tajam di pematang, seperti selasih atau tapak dara, untuk mengusir walang sangit.'',
  `treatment_id` = ''Pemantauan dilakukan pada pagi atau sore hari. Jika ditemukan lebih dari 1 ekor walang sangit per 2 rumpun padi, lakukan pengendalian dengan insektisida. Gunakan insektisida kontak berbahan aktif fipronil atau klorpirifos. Penyemprotan paling efektif dilakukan pada pagi hari saat walang sangit masih aktif di pertanaman.''
WHERE `name_id` = ''Walang Sangit'';

UPDATE `pests` SET
  `description_id` = ''Wereng hijau sebenarnya tidak menyebabkan kerusakan langsung yang parah melalui aktivitas makannya. Bahaya utama dari wereng hijau adalah perannya sebagai vektor atau penular penyakit Tungro, salah satu penyakit virus paling berbahaya pada padi. Saat wereng hijau mengisap cairan dari tanaman yang terinfeksi virus Tungro, virus tersebut akan terbawa dan ditularkan ke tanaman sehat lain yang diisapnya. Penyakit Tungro menyebabkan tanaman menjadi kerdil, daun menguning atau oranye, dan tidak mampu menghasilkan malai secara normal.'',
  `symptoms_id` = ''Gejala yang terlihat pada tanaman sebenarnya adalah gejala penyakit Tungro yang ditularkan, bukan gejala serangan wereng hijau secara langsung. Gejalanya meliputi: tanaman kerdil, anakan berkurang, daun muda berwarna kuning hingga oranye dengan bercak-bercak karat, dan waktu pembungaan tertunda. Tanaman yang terinfeksi parah tidak akan menghasilkan gabah.'',
  `prevention_id` = ''Cara paling efektif untuk mencegah kerugian akibat Tungro adalah dengan menanam varietas yang tahan terhadap virus Tungro atau tahan terhadap wereng hijau itu sendiri (misal: Inpari 36, 37). Lakukan rotasi tanaman untuk memutus siklus hidup wereng. Atur waktu tanam agar tidak bersamaan dengan puncak populasi wereng hijau di daerah tersebut.'',
  `treatment_id` = ''Pengendalian fokus pada pemberantasan serangga vektornya. Jika ditemukan populasi wereng hijau, segera kendalikan dengan insektisida sistemik berbahan aktif imidakloprid atau tiametoksam. Tanaman yang sudah jelas menunjukkan gejala Tungro harus segera dicabut dan dimusnahkan (dibakar atau dikubur) untuk menghilangkan sumber penularan virus.''
WHERE `name_id` = ''Wereng Hijau'';


-- =========================================================
-- UPDATE `agricultural_resources` table with rich content
-- =========================================================

UPDATE `agricultural_resources` SET
  `gemini_overview_id` = ''Pupuk Urea adalah pupuk kimia yang menjadi sumber utama unsur Nitrogen (N) bagi tanaman, dengan kandungan N minimal 46%. Nitrogen adalah komponen kunci dalam pembentukan klorofil (zat hijau daun), protein, dan asam amino. Oleh karena itu, Urea sangat vital untuk memacu pertumbuhan vegetatif tanaman, seperti tinggi tanaman, jumlah anakan, dan lebar daun. Pemberian Urea akan membuat daun padi tampak lebih hijau, rimbun, dan subur. Namun, penggunaannya harus sangat bijaksana.'',
  `gemini_usage_tips_id` = ''Berikan Urea dalam 2-3 tahap: pemupukan dasar, pemupukan susulan 1 (fase anakan aktif), dan pemupukan susulan 2 (fase primordia/awal bunting). Hindari dosis berlebihan karena akan membuat tanaman terlalu subur, rentan rebah, dan disukai hama/penyakit. PENTING: Kurangi atau hentikan total pemberian Urea jika tanaman menunjukkan gejala serangan penyakit Blas atau Kresek (Hawar Daun Bakteri), karena Nitrogen tinggi akan mempercepat perkembangan patogen tersebut.'',
  `gemini_benefits_json` = ''[
    {"point": "Mempercepat pertumbuhan vegetatif tanaman."},
    {"point": "Meningkatkan jumlah anakan produktif."},
    {"point": "Membuat warna daun lebih hijau dan sehat."},
    {"point": "Merupakan komponen utama pembentuk protein tanaman."}
  ]'',
  `gemini_rekomendasi_tambahan_json` = ''[
    {"recommendation": "Kombinasikan dengan pupuk P dan K untuk pemupukan berimbang."},
    {"recommendation": "Sebaiknya diaplikasikan pada kondisi tanah yang lembab (macak-macak) agar tidak banyak menguap."},
    {"recommendation": "Simpan di tempat kering dan tertutup rapat karena sifatnya yang sangat higroskopis (mudah menyerap air)."}
  ]''
WHERE `name` = ''Urea (Nitrogen 46%)'';

UPDATE `agricultural_resources` SET
  `gemini_overview_id` = ''Pupuk KCL (Kalium Klorida) adalah sumber utama unsur Kalium (K) bagi tanaman, biasanya dengan kandungan K2O sekitar 60%. Kalium sering disebut sebagai ''pengatur kualitas'' pada tanaman. Unsur ini berperan penting dalam lebih dari 50 fungsi enzimatik, mengatur pembukaan stomata (pernapasan daun), dan transportasi hasil fotosintesis. Pada padi, Kalium sangat krusial untuk memperkuat dinding sel batang sehingga tanaman lebih tahan rebah, meningkatkan resistensi terhadap serangan penyakit (terutama Bercak Coklat), dan mengisi gabah hingga penuh dan bernas (berbobot).'',
  `gemini_usage_tips_id` = ''Aplikasikan pupuk KCL bersamaan dengan Urea dan SP-36 pada saat pemupukan dasar dan pemupukan susulan pertama. Dosis KCL harus seimbang dengan dosis N; rasio N:K yang baik adalah sekitar 1:0.5 hingga 1:1. Kekurangan Kalium akan menyebabkan tanaman kerdil, daun terkulai, dan sangat rentan terhadap penyakit Bercak Coklat. Jangan menunda aplikasi KCL karena perannya sangat penting sejak awal pertumbuhan.'',
  `gemini_benefits_json` = ''[
    {"point": "Memperkuat batang padi sehingga lebih tahan rebah."},
    {"point": "Meningkatkan ketahanan tanaman terhadap stres kekeringan dan serangan penyakit."},
    {"point": "Meningkatkan bobot gabah dan kualitas hasil panen (beras tidak mudah patah)."},
    {"point": "Mengoptimalkan penyerapan dan penggunaan unsur hara lain seperti Nitrogen."}
  ]'',
  `gemini_rekomendasi_tambahan_json` = ''[
    {"recommendation": "Pada tanah dengan riwayat penyakit Bercak Coklat, tingkatkan dosis KCL."},
    {"recommendation": "Dapat dicampur langsung dengan pupuk Urea dan SP-36 saat aplikasi."},
    {"recommendation": "Gejala kekurangan K sering muncul pada daun tua yang menguning dari ujung dan tepi."}
  ]''
WHERE `name` = ''KCL Mahkota'';

-- ... (Continue for all other agricultural resources) ...

COMMIT;