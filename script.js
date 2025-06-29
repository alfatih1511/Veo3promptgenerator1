document.addEventListener('DOMContentLoaded', () => {
    const cameraMovements = [
        { en: "Static", id: "Statis" },
        { en: "Pan (Right/Left)", id: "Geser (Kanan/Kiri)" },
        { en: "Tilt (Up/Down)", id: "Miring (Atas/Bawah)" },
        { en: "Dolly (In/Out)", id: "Doli (Maju/Mundur)" },
        { en: "Truck (Right/Left)", id: "Lori (Kanan/Kiri)" },
        { en: "Pedestal (Up/Down)", id: "Penyangga (Atas/Bawah)" },
        { en: "Zoom (In/Out)", id: "Perbesar/Perkecil (Maju/Mundur)" },
        { en: "Rack Focus", id: "Fokus Rak" },
        { en: "Tracking Shot", id: "Tembakan Pelacakan" },
        { en: "Aerial Shot", id: "Tembakan Udara" },
        { en: "Bullet Time", id: "Waktu Peluru" },
        { en: "Crash Zoom-in", id: "Perbesar Cepat" },
        { en: "Dolly Zoom-in", id: "Doli Perbesar" },
        { en: "Robo Arm", id: "Lengan Robot" },
        { en: "Super Dolly-in", id: "Super Doli Masuk" },
        { en: "Focus Change", id: "Perubahan Fokus" },
        { en: "360 Orbit", id: "Orbit 360" },
        { en: "FPV Drone", id: "Drone FPV" },
        { en: "Through Object-in", id: "Menembus Objek" },
        { en: "Crane-up", id: "Derek ke Atas" },
        { en: "Lazy Susan", id: "Putaran Lambat" },
        { en: "Action Run", id: "Lari Aksi" },
        { en: "Handheld", id: "Genggam Tangan" },
        { en: "Dutch Angle", id: "Sudut Belanda" },
        { en: "Car Grip", id: "Pegangan Mobil" },
        { en: "Whip Pan", id: "Geser Cepat" }
    ];

    const cameraSelect = document.getElementById('gerakanKamera');
    cameraMovements.forEach(move => {
        const option = document.createElement('option');
        option.value = move.en;
        option.textContent = `${move.en} (${move.id})`;
        cameraSelect.appendChild(option);
    });
    // Set a default value
    cameraSelect.value = "Tracking Shot";


    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generatePrompts);
});

function generatePrompts() {
    const getVal = (id) => document.getElementById(id).value;
    const setVal = (id, value) => document.getElementById(id).value = value;

    const judul = getVal('judul');
    const deskripsiKarakter = getVal('deskripsiKarakter');
    const suaraKarakter = getVal('suaraKarakter');
    const aksiKarakter = getVal('aksiKarakter');
    const ekspresiKarakter = getVal('ekspresiKarakter');
    const latar = getVal('latar');
    const gerakanKamera = getVal('gerakanKamera');
    const pencahayaan = getVal('pencahayaan');
    const gayaVideo = getVal('gayaVideo');
    const kualitasVisual = getVal('kualitasVisual');
    const suasana = getVal('suasana');
    const suaraLingkungan = getVal('suaraLingkungan');
    const dialog = getVal('dialog');
    const negativePrompt = getVal('negativePrompt');

    // --- Generate Indonesian Prompt ---
    const promptIndonesia = `[JUDUL SCENE: ${judul}]
[DESKRIPSI KARAKTER INTI]
${deskripsiKarakter}
[DETAIL SUARA KARAKTER]
${suaraKarakter}
[AKSI KARAKTER]
${aksiKarakter}
[EKSPRESI KARAKTER]
${ekspresiKarakter}
[LATAR TEMPAT & WAKTU]
${latar}
[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: ${gerakanKamera}, mengikuti langkahnya secara sinematik.
Pencahayaan: ${pencahayaan}
Gaya Video/Art Style: ${gayaVideo}
Kualitas Visual: ${kualitasVisual}
[SUASANA KESELURUHAN]
${suasana}
[SUARA LINGKUNGAN (AMBIENCE)]
${suaraLingkungan}
[DIALOG KARAKTER]
${dialog}
[NEGATIVE PROMPT]
${negativePrompt}`;

    const promptIndonesiaTextarea = document.getElementById('prompt-indonesia');
    promptIndonesiaTextarea.value = promptIndonesia;
    promptIndonesiaTextarea.readOnly = false;


    // --- Generate English Prompt ---
    // Simple translation logic, can be improved
    const translations = {
        'Seorang vlogger pria muda': 'A young male vlogger',
        'Seorang vlogger wanita muda': 'A young female vlogger',
        'asal': 'from',
        'berusia': 'aged',
        'tahun': 'years old',
        'Perawakan/Bentuk Tubuh': 'Physique/Body Shape',
        'tubuh kekar': 'sturdy body',
        'tinggi': 'height',
        'bentuk badan proporsional': 'proportional body shape',
        'tubuh mungil': 'petite body',
        'warna kulit': 'skin color',
        'sawo matang cerah': 'bright tan',
        'Rambut': 'Hair',
        'lurus, hitam kecokelatan, belah samping': 'straight, brownish-black, side-parted',
        'ikal sebahu, hitam kecokelatan, diikat setengah ke belakang': 'shoulder-length wavy, brownish-black, tied half back',
        'Wajah': 'Face',
        'wajah oval': 'oval face',
        'alis tebal alami': 'natural thick eyebrows',
        'mata hitam besar': 'big black eyes',
        'senyum ramah': 'friendly smile',
        'pipi merona': 'blushing cheeks',
        'bibir natural': 'natural lips',
        'dengan sentuhan lip tint': 'with a touch of lip tint',
        'Pakaian': 'Clothing',
        'mengenakan jaket hoddie warna loreng': 'wearing a camouflage-colored hoodie jacket',
        'celana panjang hitam robek di lutut': 'black trousers torn at the knee',
        'membawa ransel kecil': 'carrying a small backpack',
        'mengenakan jaket parasut warna kuning mustard': 'wearing a mustard yellow parachute jacket',
        'celana panjang hitam': 'black trousers',
        'Dia berbicara dengan suara': 'Speaks with a',
        'pria muda yang hangat dan penuh semangat': 'warm and enthusiastic young male voice',
        'wanita muda yang hangat dan penuh semangat': 'warm and enthusiastic young female voice',
        'Nada': 'Tone',
        'Timbre': 'Timbre',
        'bersahabat dan enerjik': 'friendly and energetic',
        'Aksen/Logat': 'Accent',
        'logat Indonesia dengan sentuhan khas': 'Indonesian accent with a subtle hint of',
        'halus': 'soft',
        'berbicara murni dalam Bahasa Indonesia': 'speaks purely in Indonesian',
        'Cara Berbicara': 'Speaking Style',
        'tempo sedang-cepat': 'medium-fast tempo',
        'gaya bicara lincah dan ekspresif': 'agile and expressive speaking style',
        'PENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.': 'IMPORTANT: All dialogue must be in Indonesian with natural and clear pronunciation. Ensure this character\'s voice is consistent throughout the video.',
        'berjalan di sekitar': 'walking around the',
        'sambil melihat-lihat aktivitas penumpang dan pedagang': 'while observing the activities of passengers and vendors',
        'Karakter menunjukkan ekspresi': 'The character shows an expression of',
        'kagum dan antusias': 'amazement and enthusiasm',
        'sering tersenyum sambil melirik kamera': 'often smiling while glancing at the camera',
        'Latar tempat': 'Setting',
        'di terminal bus antar kota malam hari': 'in an inter-city bus terminal at night',
        'terdapat pedagang kaki lima di pinggir jalur keberangkatan': 'there are street vendors on the edge of the departure lane',
        'beberapa bus berjajar dengan lampu menyala': 'several buses are lined up with their lights on',
        'Waktu': 'Time',
        'malam hari': 'night time',
        'hujan rintik-rintik': 'drizzling rain',
        'Gerakan Kamera': 'Camera Movement',
        'mengikuti langkahnya secara sinematik': 'following their steps cinematically',
        'Pencahayaan': 'Lighting',
        'natural dari lampu jalan dan lampu bus': 'natural from streetlights and bus lights',
        'pantulan cahaya pada aspal basah': 'reflections of light on the wet asphalt',
        'Gaya Video/Art Style': 'Video/Art Style',
        'cinematic realistis': 'cinematic realism',
        'Kualitas Visual': 'Visual Quality',
        'Resolusi 4K': '4K Resolution',
        'Suasana': 'Atmosphere',
        'sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan': 'A busy, crowded atmosphere, with the impression of a lively and dynamic night journey despite the rain',
        'SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang': 'SOUND: the sound of bus engines starting, announcements from loudspeakers, the patter of light rain, and faint conversations among passengers and vendors',
        'Hindari': 'Avoid',
        'teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah': 'on-screen text, subtitles, text in the video, fonts, logos, distortion, artifacts, anomalies, double faces, deformed limbs, abnormal hands, extra people, distracting objects, low quality, blur, glitch, robotic voice, broken audio'
    };
    
    function translateText(text, dictionary) {
        let translatedText = text;
        // This is a very simplistic replacement. A more robust solution would be needed for complex cases.
        Object.entries(dictionary).forEach(([key, value]) => {
            // Use a regular expression for case-insensitive, whole-word replacement
            const regex = new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
            translatedText = translatedText.replace(regex, value);
        });
        return translatedText;
    }

    const promptEnglish = `[SCENE TITLE: ${translateText(judul, translations)}]
[CORE CHARACTER DESCRIPTION]
${translateText(deskripsiKarakter, translations)}
[CHARACTER VOICE DETAILS]
${translateText(suaraKarakter, translations)}
[CHARACTER ACTION]
${translateText(aksiKarakter, translations)}
[CHARACTER EXPRESSION]
${translateText(ekspresiKarakter, translations)}
[SETTING & TIME]
${translateText(latar, translations)}
[ADDITIONAL VISUAL DETAILS]
Camera Movement: ${gerakanKamera}, following their steps cinematically.
Lighting: ${translateText(pencahayaan, translations)}
Video/Art Style: ${translateText(gayaVideo, translations)}
Visual Quality: ${translateText(kualitasVisual, translations)}
[OVERALL ATMOSPHERE]
${translateText(suasana, translations)}
[ENVIRONMENTAL SOUND (AMBIENCE)]
${translateText(suaraLingkungan, translations)}
[CHARACTER DIALOGUE]
${dialog}
[NEGATIVE PROMPT]
${translateText(negativePrompt, translations)}`;
    
    setVal('prompt-english', promptEnglish);
} 