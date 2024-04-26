// Mengambil data anime dari API Jikan
const fetchData = async () => {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?type=tv');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// Fungsi untuk menampilkan data ke dalam HTML
const renderData = async () => {
    const animeData = await fetchData();
    if (animeData) {
        const bodyIsi = document.querySelector('.body-isi');
        bodyIsi.innerHTML = ''; // Mengosongkan konten sebelumnya

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('d-flex', 'flex-wrap', 'gap-5'); // Menambahkan kelas flexbox dan jarak antara item

        animeData.data.forEach(anime => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.maxWidth = '18rem'; // Menetapkan lebar maksimum kartu

            const cardImg = document.createElement('img');
            cardImg.src = anime.images.jpg.large_image_url; // Mengambil URL gambar besar
            cardImg.classList.add('card-img-top');
            cardImg.alt = anime.title;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = `Title: ${anime.title}`;

            const titleEnglish = document.createElement('p');
            titleEnglish.classList.add('card-text');
            titleEnglish.textContent = `English Title: ${anime.title_english}`;

            const titleJapanese = document.createElement('p');
            titleJapanese.classList.add('card-text');
            titleJapanese.textContent = `Japanese Title: ${anime.title_japanese}`;

            const titleSynonyms = document.createElement('p');
            titleSynonyms.classList.add('card-text');
            titleSynonyms.textContent = `Synonyms: ${anime.title_synonyms.join(', ')}`;

            cardBody.appendChild(title);
            cardBody.appendChild(titleEnglish);
            cardBody.appendChild(titleJapanese);
            cardBody.appendChild(titleSynonyms);

            card.appendChild(cardImg);
            card.appendChild(cardBody);

            cardContainer.appendChild(card);
        });

        bodyIsi.appendChild(cardContainer);
    }
};

// Memanggil fungsi renderData saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderData);

// Menangani pencarian anime saat pengguna mengetikkan di input
document.getElementById('searchInput').addEventListener('input', async (event) => {
    const searchTerm = event.target.value.trim(); // Mendapatkan nilai pencarian dan menghapus spasi awal dan akhir

    if (searchTerm !== '') {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);
        const data = await response.json();

        if (data) {
            const bodyIsi = document.querySelector('.body-isi');
            bodyIsi.innerHTML = ''; // Mengosongkan konten sebelumnya

            const cardContainer = document.createElement('div');
            cardContainer.classList.add('d-flex', 'flex-wrap', 'gap-5'); // Menambahkan kelas flexbox dan jarak antara item

            data.data.forEach(anime => {
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3');
                card.style.maxWidth = '18rem'; // Menetapkan lebar maksimum kartu

                const cardImg = document.createElement('img');
                cardImg.src = anime.images.jpg.large_image_url; // Mengambil URL gambar besar
                cardImg.classList.add('card-img-top');
                cardImg.alt = anime.title;

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = `Title: ${anime.title}`;

                const titleEnglish = document.createElement('p');
                titleEnglish.classList.add('card-text');
                titleEnglish.textContent = `English Title: ${anime.title_english}`;

                const titleJapanese = document.createElement('p');
                titleJapanese.classList.add('card-text');
                titleJapanese.textContent = `Japanese Title: ${anime.title_japanese}`;

                const titleSynonyms = document.createElement('p');
                titleSynonyms.classList.add('card-text');
                titleSynonyms.textContent = `Synonyms: ${anime.title_synonyms.join(', ')}`;

                cardBody.appendChild(title);
                cardBody.appendChild(titleEnglish);
                cardBody.appendChild(titleJapanese);
                cardBody.appendChild(titleSynonyms);

                card.appendChild(cardImg);
                card.appendChild(cardBody);

                cardContainer.appendChild(card);
            });

            bodyIsi.appendChild(cardContainer);
        }
    } else {
        renderData(); // Jika input dikosongkan, tampilkan data semula
    }
});

