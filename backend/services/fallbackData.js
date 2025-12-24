// backend/services/fallbackData.js

const fallbackData = {
  diseases: {
    'Bacterial Leaf Blight': {
      id: {
        informasi_detail: "Penyakit Hawar Daun Bakteri (BLB), atau penyakit kresek, disebabkan oleh bakteri *Xanthomonas oryzae pv. oryzae*. Ini adalah salah satu penyakit padi paling merusak di dunia. Bakteri masuk melalui luka daun atau pori-pori alami dan menyebar melalui pembuluh tanaman, menyumbat aliran air dan nutrisi. Gejala awal berupa lesi berair di tepi daun yang cepat memanjang, menguning, dan mengering. Serangan ini sangat parah dalam kondisi hangat dan lembab, seringkali setelah hujan dan angin kencang.",
        solusi_penyembuhan: "Pengendalian yang efektif memerlukan pendekatan terpadu. Prioritaskan penggunaan varietas tahan. Hindari pemupukan Nitrogen (N) berlebihan yang membuat tanaman rentan. Pastikan pemupukan Kalium (K) cukup untuk memperkuat jaringan tanaman. Jaga jarak tanam untuk sirkulasi udara yang baik dan lakukan sanitasi lahan. Jika serangan parah, bakterisida berbahan aktif tembaga dapat digunakan sebagai pelindung.",
        rekomendasi_produk: [
          { nama_produk: "Varietas Inpari atau Ciherang", deskripsi_singkat: "Pilih varietas berlabel tahan kresek yang direkomendasikan untuk wilayah Anda." },
          { nama_produk: "Bakterisida Tembaga Hidroksida", deskripsi_singkat: "Gunakan sebagai tindakan preventif atau pada awal gejala untuk melindungi daun." },
          { nama_produk: "Pupuk KCL (Kalium)", deskripsi_singkat: "Tingkatkan dosis Kalium untuk memperkuat ketahanan alami tanaman." }
        ]
      },
      en: {
        informasi_detail: "Bacterial Leaf Blight (BLB), also known as 'kresek' disease, is caused by the bacterium *Xanthomonas oryzae pv. oryzae*. It is one of the most devastating rice diseases worldwide. The bacteria enter through leaf wounds or natural pores and spread through the plant's vascular system, blocking water and nutrient flow. Early symptoms appear as water-soaked lesions on the leaf margins, which rapidly elongate, turn yellow, and dry out. The attack is particularly severe in warm, humid conditions, often following heavy rain and wind.",
        solusi_penyembuhan: "Effective control requires an integrated approach. Prioritize the use of resistant varieties. Avoid excessive Nitrogen (N) fertilization, which makes the plant susceptible. Ensure sufficient Potassium (K) fertilization to strengthen plant tissues. Maintain proper plant spacing for good air circulation and practice field sanitation. If the attack is severe, bactericides with copper-based active ingredients can be used as a protective measure.",
        rekomendasi_produk: [
          { nama_produk: "Inpari or Ciherang Varieties", deskripsi_singkat: "Choose varieties labeled as resistant to 'kresek' recommended for your region." },
          { nama_produk: "Copper Hydroxide Bactericide", deskripsi_singkat: "Use as a preventive measure or at the onset of symptoms to protect the leaves." },
          { nama_produk: "Potassium (KCL) Fertilizer", deskripsi_singkat: "Increase Potassium dosage to enhance the plant's natural resistance." }
        ]
      }
    },
    'Brown Spot': {
      id: {
        informasi_detail: "Penyakit Bercak Coklat disebabkan oleh jamur *Bipolaris oryzae*. Penyakit ini sering disebut 'penyakit tanaman miskin' karena serangannya parah pada lahan yang kekurangan nutrisi, terutama Kalium. Jamur ini menghasilkan bercak oval pada daun, pelepah, dan gabah, yang mengurangi area fotosintesis dan menurunkan kualitas gabah. Kondisi tanah yang buruk dan kelembaban tinggi mempercepat perkembangan penyakit.",
        solusi_penyembuhan: "Kunci pengendalian adalah perbaikan nutrisi tanaman dan kesehatan tanah. Lakukan pemupukan berimbang dengan rasio Kalium (K) yang cukup. Gunakan benih sehat bersertifikat dan lakukan perlakuan benih dengan fungisida. Rotasi tanaman dan sanitasi lahan membantu mengurangi sumber penyakit. Aplikasi fungisida berbahan aktif mancozeb atau propiconazole efektif jika dilakukan pada awal gejala.",
        rekomendasi_produk: [
          { nama_produk: "Pupuk NPK K seimbang", deskripsi_singkat: "Pastikan rasio Kalium (K) cukup untuk meningkatkan ketahanan fundamental tanaman." },
          { nama_produk: "Fungisida Mancozeb", deskripsi_singkat: "Gunakan sebagai fungisida kontak preventif untuk melindungi daun dari infeksi." },
          { nama_produk: "Benih Padi Bersertifikat", deskripsi_singkat: "Pastikan benih bebas dari patogen jamur penyebab Bercak Coklat." }
        ]
      },
      en: {
        informasi_detail: "Brown Spot disease is caused by the fungus *Bipolaris oryzae*. It is often called a 'poor plant disease' because it is severe in nutrient-deficient fields, especially those lacking Potassium. The fungus produces oval-shaped spots on leaves, sheaths, and grains, reducing the photosynthetic area and degrading grain quality. Poor soil conditions and high humidity accelerate disease development.",
        solusi_penyembuhan: "The key to control is improving plant nutrition and soil health. Apply balanced fertilization with an adequate ratio of Potassium (K). Use certified healthy seeds and treat them with fungicides. Crop rotation and field sanitation help reduce the source of the disease. Application of fungicides with active ingredients like mancozeb or propiconazole is effective if done at the onset of symptoms.",
        rekomendasi_produk: [
          { nama_produk: "Balanced NPK Fertilizer", deskripsi_singkat: "Ensure a sufficient Potassium (K) ratio to fundamentally improve plant resistance." },
          { nama_produk: "Mancozeb Fungicide", deskripsi_singkat: "Use as a preventive contact fungicide to protect leaves from infection." },
          { nama_produk: "Certified Rice Seed", deskripsi_singkat: "Ensure seeds are free from the fungal pathogen that causes Brown Spot." }
        ]
      }
    },
    'Leaf Blast': {
        id: {
            informasi_detail: "Penyakit Blas, disebabkan oleh jamur *Magnaporthe oryzae*, adalah penyakit paling merusak pada padi secara global. Jamur ini dapat menginfeksi semua bagian tanaman: daun (leaf blast), ruas batang (node blast), dan leher malai (neck blast). Infeksi pada leher malai adalah yang paling fatal karena memutus suplai nutrisi ke gabah, menyebabkan gabah hampa. Penyakit ini berkembang pesat pada kelembaban tinggi dan pemupukan Nitrogen (N) berlebihan.",
            solusi_penyembuhan: "Gunakan varietas padi yang tahan blas. Lakukan pemupukan N secara bijak dan bertahap. Pemberian pupuk Silika (Si) terbukti efektif memperkuat dinding sel daun sehingga sulit ditembus jamur. Atur waktu tanam untuk menghindari cuaca yang kondusif bagi blas. Aplikasi fungisida sistemik (triziklazol, azoksistrobin) sangat efektif, terutama pada fase bunting tua untuk melindungi leher malai.",
            rekomendasi_produk: [
                { nama_produk: "Fungisida sistemik (e.g., Fujiwan, Amistartop)", deskripsi_singkat: "Aplikasikan secara preventif pada fase bunting untuk melindungi leher malai." },
                { nama_produk: "Pupuk mengandung Silika (Si)", deskripsi_singkat: "Meningkatkan ketahanan mekanis daun padi sehingga jamur sulit menginfeksi." },
                { nama_produk: "Varietas Tahan Blas", deskripsi_singkat: "Pilih benih yang direkomendasikan untuk ketahanan terhadap ras blas dominan." }
            ]
        },
        en: {
            informasi_detail: "Blast disease, caused by the fungus *Magnaporthe oryzae*, is the most destructive rice disease globally. The fungus can infect all parts of the plant: leaves (leaf blast), nodes (node blast), and panicle necks (neck blast). Neck blast is the most fatal as it cuts off nutrient supply to the grains, causing them to be empty. The disease thrives in high humidity and with excessive Nitrogen (N) fertilization.",
            solusi_penyembuhan: "Use blast-resistant rice varieties. Apply Nitrogen fertilizer wisely and in stages. Applying Silica (Si) fertilizer has been proven effective in strengthening leaf cell walls, making them difficult for the fungus to penetrate. Adjust planting time to avoid weather conditions conducive to blast. Systemic fungicides (e.g., tricyclazole, azoxystrobin) are very effective, especially during the late booting stage to protect the panicle neck.",
            rekomendasi_produk: [
                { nama_produk: "Systemic Fungicide (e.g., Fujiwan, Amistartop)", deskripsi_singkat: "Apply preventively at the booting stage to protect the panicle neck from infection." },
                { nama_produk: "Silica (Si) containing fertilizer", deskripsi_singkat: "Improves the mechanical resistance of rice leaves, making it harder for the fungus to infect." },
                { nama_produk: "Blast Resistant Varieties", deskripsi_singkat: "Choose seeds recommended for resistance against dominant blast races." }
            ]
        }
    },
    'Leaf Scald': {
        id: {
            informasi_detail: "Penyakit Hawar Daun atau ''Leaf Scald'' disebabkan oleh jamur *Microdochium oryzae*. Gejala khasnya adalah lesi besar yang memanjang dari ujung atau tepi daun dengan pola zonasi seperti gelombang atau sisik, memberikan penampilan seperti daun tersiram air panas. Penyakit ini umum di daerah tropis yang lembab dan dapat menyebabkan daun mengering, mengganggu fotosintesis, dan menurunkan hasil panen.",
            solusi_penyembuhan: "Gunakan varietas padi yang toleran. Jaga kebersihan lahan dari gulma dan sisa tanaman musim sebelumnya. Pastikan pemupukan berimbang, terutama Kalium (K), untuk meningkatkan ketahanan. Hindari kepadatan tanam yang terlalu tinggi. Jika serangan parah, aplikasi fungisida berbahan aktif propikonazol dapat dipertimbangkan.",
            rekomendasi_produk: [
                { nama_produk: "Varietas Padi Toleran", deskripsi_singkat: "Pilih varietas yang diketahui memiliki ketahanan lebih baik terhadap Leaf Scald." },
                { nama_produk: "Fungisida Propiconazole", deskripsi_singkat: "Gunakan sebagai tindakan kuratif jika serangan menyebar luas pada fase kritis." },
                { nama_produk: "Agens Hayati Trichoderma", deskripsi_singkat: "Aplikasikan ke tanah untuk menekan pertumbuhan jamur patogen." }
            ]
        },
        en: {
            informasi_detail: "Leaf Scald disease is caused by the fungus *Microdochium oryzae*. Its characteristic symptom is large, elongated lesions starting from the tip or edge of the leaf with a wave-like or scaly zonation pattern, giving a 'scalded' appearance. This disease is common in humid tropical areas and can cause leaves to dry up, disrupting photosynthesis and reducing yield.",
            solusi_penyembuhan: "Use tolerant rice varieties. Keep the field clean from weeds and previous season's crop residues. Ensure balanced fertilization, especially Potassium (K), to increase resistance. Avoid excessively high plant density. If the attack is severe, application of fungicides with the active ingredient propiconazole can be considered.",
            rekomendasi_produk: [
                { nama_produk: "Tolerant Rice Varieties", deskripsi_singkat: "Select varieties known to have better resistance to Leaf Scald in your area." },
                { nama_produk: "Propiconazole Fungicide", deskripsi_singkat: "Use as a curative measure if the attack spreads widely during critical stages." },
                { nama_produk: "Trichoderma Bio-agent", deskripsi_singkat: "Apply to the soil to suppress the growth of pathogenic fungi." }
            ]
        }
    },
    'Narrow Brown Leaf Spot': {
        id: {
            informasi_detail: "Penyakit Bercak Coklat Sempit disebabkan oleh jamur *Cercospora oryzae*. Gejalanya adalah lesi yang sangat sempit, linear, dan berwarna coklat kemerahan, sejajar dengan urat daun. Penyakit ini sering muncul pada tahap akhir pertumbuhan dan lebih sering menyerang daun tua. Kekurangan nutrisi Kalium (K) sangat memicu perkembangan penyakit ini.",
            solusi_penyembuhan: "Pengendalian utama berfokus pada manajemen nutrisi. Pastikan tanaman mendapatkan pasokan Kalium (K) yang cukup. Penggunaan varietas yang tahan adalah cara pencegahan yang efektif. Aplikasi fungisida seringkali tidak ekonomis, kecuali jika serangan terjadi sangat dini pada varietas yang sangat rentan.",
            rekomendasi_produk: [
                { nama_produk: "Pupuk KCL (Kalium)", deskripsi_singkat: "Solusi paling fundamental; pastikan kecukupan Kalium untuk menekan penyakit." },
                { nama_produk: "Varietas Padi Toleran", deskripsi_singkat: "Beberapa varietas memiliki ketahanan genetik yang lebih baik terhadap Cercospora." },
                { nama_produk: "Analisis Tanah", deskripsi_singkat: "Lakukan pengujian tanah untuk mengetahui tingkat kekurangan Kalium." }
            ]
        },
        en: {
            informasi_detail: "Narrow Brown Leaf Spot is caused by the fungus *Cercospora oryzae*. The symptom is very narrow, linear, reddish-brown lesions, parallel to the leaf veins. This disease often appears in the later stages of growth and more frequently attacks older leaves. Potassium (K) nutrient deficiency strongly triggers the development of this disease.",
            solusi_penyembuhan: "The main control focuses on nutrient management. Ensure the plant gets an adequate supply of Potassium (K). Using resistant varieties is an effective preventive measure. Fungicide application is often not economical, unless the attack occurs very early on highly susceptible varieties.",
            rekomendasi_produk: [
                { nama_produk: "Potassium (KCL) Fertilizer", deskripsi_singkat: "The most fundamental solution; ensure potassium sufficiency to suppress the disease." },
                { nama_produk: "Tolerant Rice Varieties", deskripsi_singkat: "Some varieties have better genetic resistance to Cercospora." },
                { nama_produk: "Soil Analysis", deskripsi_singkat: "Conduct a soil test to determine the level of Potassium deficiency." }
            ]
        }
    },
    'Rice Hispa': {
        id: {
            informasi_detail: "Rice Hispa adalah kerusakan akibat hama kumbang Hispa (*Dicladispa armigera*). Kumbang dewasa mengikis permukaan atas daun, meninggalkan goresan putih. Larva lebih merusak, masuk ke dalam jaringan daun (menjadi 'miner') dan memakan mesofil, menciptakan terowongan putih memanjang. Serangan berat dapat membuat sawah tampak putih terbakar.",
            solusi_penyembuhan: "Lakukan pemantauan rutin. Genangi sawah lebih tinggi untuk beberapa saat agar kumbang pindah. Gunakan jaring serangga untuk menangkap kumbang dewasa. Manfaatkan musuh alami seperti bebek. Jika populasi tinggi, gunakan insektisida sistemik berbahan aktif fipronil atau karbofuran, yang dapat membunuh larva di dalam daun.",
            rekomendasi_produk: [
                { nama_produk: "Insektisida Sistemik (bahan aktif Fipronil)", deskripsi_singkat: "Efektif membunuh larva yang berada di dalam jaringan daun. Gunakan secara bijak." },
                { nama_produk: "Pestisida Nabati (Minyak Mimba)", deskripsi_singkat: "Alternatif ramah lingkungan yang mengganggu siklus makan dan reproduksi hama." },
                { nama_produk: "Jaring Serangga", deskripsi_singkat: "Alat sederhana untuk menangkap kumbang dewasa secara manual." }
            ]
        },
        en: {
            informasi_detail: "Rice Hispa is damage caused by the Hispa beetle pest (*Dicladispa armigera*). The adult beetle scrapes the upper surface of the leaf, leaving white streaks. The larvae are more destructive, entering the leaf tissue (becoming 'miners') and eating the mesophyll, creating long white tunnels. A severe infestation can make the entire field look white and burnt.",
            solusi_penyembuhan: "Conduct regular monitoring. Flood the field higher for a while to make the adult beetles move. Use insect nets to catch adult beetles. Utilize natural enemies like ducks. If the pest population is high, use systemic insecticides with active ingredients like fipronil or carbofuran, which can kill the larvae inside the leaves.",
            rekomendasi_produk: [
                { nama_produk: "Systemic Insecticide (active ingredient Fipronil)", deskripsi_singkat: "Effectively kills larvae inside the leaf tissue. Use wisely." },
                { nama_produk: "Botanical Pesticide (Neem Oil)", deskripsi_singkat: "An eco-friendly alternative that disrupts the pest's feeding and reproductive cycles." },
                { nama_produk: "Insect Net", deskripsi_singkat: "A simple tool for manually catching adult beetles." }
            ]
        }
    },
    'Sheath Blight': {
        id: {
            informasi_detail: "Penyakit Hawar Pelepah disebabkan oleh jamur *Rhizoctonia solani*. Infeksi biasanya dimulai pada pelepah daun dekat permukaan air. Gejala khasnya adalah lesi besar berbentuk oval dengan warna tengah keabu-abuan dan tepi coklat kemerahan, sering digambarkan seperti 'sisik ular'. Dalam kondisi lembab dan hangat, penyakit bisa menyebar cepat ke atas hingga ke daun bendera, menyebabkan gabah hampa.",
            solusi_penyembuhan: "Manajemen kanopi tanaman adalah kunci. Atur jarak tanam lebih lebar untuk sirkulasi udara. Lakukan pengeringan sawah secara berkala. Hindari pemupukan Nitrogen berlebihan. Sanitasi lahan dengan membakar atau mengomposkan jerami terinfeksi. Aplikasi fungisida berbahan aktif heksakonazol atau validamisin bisa sangat efektif.",
            rekomendasi_produk: [
                { nama_produk: "Fungisida Heksakonazol", deskripsi_singkat: "Sangat efektif untuk Hawar Pelepah. Semprot ke bagian bawah rumpun padi." },
                { nama_produk: "Agens Hayati Trichoderma sp.", deskripsi_singkat: "Aplikasikan bersama pupuk kandang sebelum tanam untuk menekan jamur patogen." },
                { nama_produk: "Varietas Rumpun Tegak", deskripsi_singkat: "Pilih varietas dengan arsitektur tegak untuk mengurangi kelembaban di pelepah." }
            ]
        },
        en: {
            informasi_detail: "Sheath Blight is caused by the fungus *Rhizoctonia solani*. Infection usually starts on the leaf sheath near the water line. The typical symptom is large, oval-shaped lesions with a grayish center and a reddish-brown border, often described as a 'snake skin' pattern. In humid and warm conditions, the disease can spread rapidly upwards to the flag leaf, causing empty grains.",
            solusi_penyembuhan: "Canopy management is key. Use wider plant spacing for air circulation. Practice periodic field drying. Avoid excessive Nitrogen fertilization. Sanitize the field by burning or composting infected straw. Application of fungicides with active ingredients like hexaconazole or validamycin can be very effective.",
            rekomendasi_produk: [
                { nama_produk: "Hexaconazole Fungicide", deskripsi_singkat: "Very effective for Sheath Blight. Spray onto the lower part of the rice clumps." },
                { nama_produk: "Trichoderma sp. Bio-agent", deskripsi_singkat: "Apply with manure before planting to suppress pathogenic fungi in the soil." },
                { nama_produk: "Upright Culm Varieties", deskripsi_singkat: "Choose varieties with an upright architecture to reduce moisture in the sheaths." }
            ]
        }
    }
  },
  
  // Fallback for agricultural resources can be added here if needed
  agricultural_resources: {
      // Example for one resource
    'Urea (Nitrogen 46%)': {
        id: {
            overview: "Pupuk Urea adalah pupuk kimia yang menjadi sumber utama unsur Nitrogen (N) bagi tanaman, dengan kandungan N minimal 46%. Nitrogen adalah komponen kunci dalam pembentukan klorofil (zat hijau daun), protein, dan asam amino. Oleh karena itu, Urea sangat vital untuk memacu pertumbuhan vegetatif tanaman, seperti tinggi tanaman, jumlah anakan, dan lebar daun. Pemberian Urea akan membuat daun padi tampak lebih hijau, rimbun, dan subur. Namun, penggunaannya harus sangat bijaksana.",
            usage_tips: "Berikan Urea dalam 2-3 tahap: pemupukan dasar, pemupukan susulan 1 (fase anakan aktif), dan pemupukan susulan 2 (fase primordia/awal bunting). Hindari dosis berlebihan karena akan membuat tanaman terlalu subur, rentan rebah, dan disukai hama/penyakit. PENTING: Kurangi atau hentikan total pemberian Urea jika tanaman menunjukkan gejala serangan penyakit Blas atau Kresek (Hawar Daun Bakteri), karena Nitrogen tinggi akan mempercepat perkembangan patogen tersebut.",
            benefits: [
                { point: "Mempercepat pertumbuhan vegetatif tanaman." },
                { point: "Meningkatkan jumlah anakan produktif." },
                { point: "Membuat warna daun lebih hijau dan sehat." }
            ],
            additional_recommendations: [
                { recommendation: "Kombinasikan dengan pupuk P dan K untuk pemupukan berimbang." },
                { recommendation: "Simpan di tempat kering dan tertutup rapat karena sifatnya yang sangat higroskopis." }
            ]
        },
        en: {
            overview: "Urea fertilizer is a chemical fertilizer that is the main source of Nitrogen (N) for plants, with a minimum N content of 46%. Nitrogen is a key component in the formation of chlorophyll, proteins, and amino acids. Therefore, Urea is vital for stimulating vegetative growth, such as plant height, tiller number, and leaf width. Applying Urea will make rice leaves appear greener, lusher, and more fertile. However, its use must be very wise.",
            usage_tips: "Apply Urea in 2-3 stages: base fertilization, first top-dressing (active tillering phase), and second top-dressing (panicle initiation phase). Avoid excessive doses as it will make the plant too lush, prone to lodging, and susceptible to pests/diseases. IMPORTANT: Reduce or completely stop Urea application if the plant shows symptoms of Blast or Bacterial Leaf Blight, as high Nitrogen will accelerate the pathogen's development.",
            benefits: [
                { point: "Accelerates plant vegetative growth." },
                { point: "Increases the number of productive tillers." },
                { point: "Makes leaf color greener and healthier." }
            ],
            additional_recommendations: [
                { recommendation: "Combine with P and K fertilizers for balanced fertilization." },
                { recommendation: "Store in a dry, tightly closed place due to its highly hygroscopic nature." }
            ]
        }
    }
    // Add other resources here...
  }
};

/**
 * Retrieves fallback data for a given disease name and language.
 * @param {string} diseaseName - The English name of the disease.
 * @param {string} lang - The language code ('id' or 'en').
 * @returns {object|null} The fallback data object or null if not found.
 */
export function getDiseaseFallbackData(diseaseName, lang = 'id') {
  const disease = fallbackData.diseases[diseaseName];
  if (disease && disease[lang]) {
    return { ...disease[lang], isFallback: true };
  }
  
  // Generic fallback if specific disease not found
  const genericLang = lang === 'id' ? 'id' : 'en';
  return {
    informasi_detail: genericLang === 'id' ? "Informasi detail untuk penyakit ini tidak tersedia dalam data fallback." : "Detailed information for this disease is not available in the fallback data.",
    solusi_penyembuhan: genericLang === 'id' ? "Silakan hubungi ahli pertanian untuk rekomendasi lebih lanjut." : "Please contact an agricultural expert for further recommendations.",
    rekomendasi_produk: [],
    isFallback: true
  };
}

/**
 * Retrieves fallback data for a given agricultural resource.
 * @param {string} resourceName - The name of the resource.
 * @param {string} lang - The language code ('id' or 'en').
 * @returns {object|null} The fallback data object or null if not found.
 */
export function getResourceFallbackData(resourceName, lang = 'id') {
    const resource = fallbackData.agricultural_resources[resourceName];
    if (resource && resource[lang]) {
        // The structure for resources is different from diseases
        const data = resource[lang];
        return {
            overview: data.overview,
            usage_tips: data.usage_tips,
            benefits: data.benefits,
            additional_recommendations: data.additional_recommendations,
            isFallback: true
        };
    }
    return null; // Or return a generic object
}
