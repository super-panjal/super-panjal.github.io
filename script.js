const rankOptions = [
    { rank: "Master 5", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Master 4", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Master 3", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Master 2", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Master 1", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 5", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 4", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 3", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 2", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 1", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Epic 5", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 4", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 3", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 2", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 1", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Legend 5", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 4", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 3", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 2", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 1", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Mytic", maxBintang: 24, pricePerBintang: 7000 },
    { rank: "Mytical Honor", minBintang: 25, maxBintang: 49, pricePerBintang: 10000 },
    { rank: "Mytical Glory", minBintang: 50, maxBintang: 99, pricePerBintang: 13000 }
];

document.addEventListener("DOMContentLoaded", () => {
    const rankAwal = document.getElementById("rankAwal");
    const rankTujuan = document.getElementById("rankTujuan");
    const bintangAwal = document.getElementById("bintangAwal");
    const bintangTujuan = document.getElementById("bintangTujuan");

    // Mengisi dropdown rank
    rankOptions.forEach(option => {
        const optionElementAwal = document.createElement("option");
        optionElementAwal.text = option.rank;
        optionElementAwal.value = option.rank;
        rankAwal.add(optionElementAwal);

        const optionElementTujuan = document.createElement("option");
        optionElementTujuan.text = option.rank;
        optionElementTujuan.value = option.rank;
        rankTujuan.add(optionElementTujuan);
    });

    // Event listener saat rank awal dan tujuan berubah
    rankAwal.addEventListener("change", () => updateBintangOptions(rankAwal, bintangAwal));
    rankTujuan.addEventListener("change", () => updateBintangOptions(rankTujuan, bintangTujuan));

    document.getElementById("hitungHarga").addEventListener("click", () => {
        const rankAwalValue = rankAwal.value;
        const rankTujuanValue = rankTujuan.value;
        const bintangAwalValue = parseInt(bintangAwal.value);
        const bintangTujuanValue = parseInt(bintangTujuan.value);

        const totalHarga = calculateTotalPrice(rankAwalValue, bintangAwalValue, rankTujuanValue, bintangTujuanValue);
        document.getElementById("totalHarga").innerText = `Total Harga: Rp${totalHarga.toLocaleString()}`;

        // Pesan WhatsApp sesuai yang Anda inginkan
        const customMessage = `Hallo Min!\nsaya mau joki dari ${rankAwalValue} bintang (${bintangAwalValue}) ke ${rankTujuanValue} bintang (${bintangTujuanValue}) dengan total harga: Rp${totalHarga.toLocaleString()}.\nMohon diproses untuk kelanjutan transaksinya min.`;
        const waLink = document.getElementById("waLink");
        waLink.href = `https://wa.me/6282160663017?text=${encodeURIComponent(customMessage)}`;
    });
});

// Fungsi untuk memperbarui opsi bintang berdasarkan rank yang dipilih
function updateBintangOptions(rankSelect, bintangSelect) {
    const selectedRank = rankOptions.find(option => option.rank === rankSelect.value);
    bintangSelect.innerHTML = ''; // Reset options

    const minBintang = selectedRank.minBintang || 1;
    for (let i = minBintang; i <= selectedRank.maxBintang; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        bintangSelect.add(option);
    }
}

function calculateTotalPrice(rankAwal, bintangAwal, rankTujuan, bintangTujuan) {
    const startIndex = rankOptions.findIndex(option => option.rank === rankAwal);
    const endIndex = rankOptions.findIndex(option => option.rank === rankTujuan);
    let totalHarga = 0;

    if (startIndex === endIndex) {
        // Jika rank awal dan tujuan sama, hitung dari bintang awal ke bintang tujuan
        for (let i = bintangAwal; i <= bintangTujuan; i++) {
            totalHarga += rankOptions[startIndex].pricePerBintang; // Menggunakan harga per bintang untuk rank yang sama
        }
    } else {
        // Hitung dari bintang awal ke maksimum bintang dalam rank awal
        totalHarga += (rankOptions[startIndex].maxBintang - bintangAwal + 1) * rankOptions[startIndex].pricePerBintang;

        // Hitung harga untuk rank tengah
        for (let i = startIndex + 1; i <= endIndex - 1; i++) {
            totalHarga += rankOptions[i].maxBintang * rankOptions[i].pricePerBintang;
        }

        // Hitung harga dari 1 ke bintang tujuan dalam rank tujuan
        totalHarga += bintangTujuan * rankOptions[endIndex].pricePerBintang;
    }

    return totalHarga;
}
