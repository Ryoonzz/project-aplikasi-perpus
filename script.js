const formPeminjaman = document.getElementById("formPeminjaman");
const tablePeminjaman = document.getElementById("tablePeminjaman");
const peminjaman = JSON.parse(localStorage.getItem("peminjaman")) || [];

function munculTable() {
        tablePeminjaman.innerHTML =
        "<tr><th>Nama peminjam</th><th>Buku yang dipinjam</th><th>Tanggal peminjaman</th><th>Tanggal pengembalian</th><th>Keterangan</th><th>Action</th></tr>";
    for (let i = 0; i < peminjaman.length; i++) {
        const pinjamanItem = peminjaman[i];
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${pinjamanItem.nama}</td>
                <td>${pinjamanItem.namabuku}</td>
                <td>${pinjamanItem.tanggalpinjam}</td>
                <td>${pinjamanItem.tanggalbalik}</td>
                <td>${pinjamanItem.keterangan}</td>
                <td>
                    <button class="tmblEdit" onclick="editPeminjaman(${i})">Edit</button>
                    <button class="tmblHapus" onclick="hapusPeminjaman(${i})">Hapus</button>
                </td>
            `;
        tablePeminjaman.appendChild(row);
        }
    }

function editPeminjaman(index) {
    const pinjamanItem = peminjaman[index];
    document.getElementById("nama").value = pinjamanItem.nama;
    document.getElementById("namabuku").value = pinjamanItem.namabuku;
    document.getElementById("tanggalpinjam").value = pinjamanItem.tanggalpinjam;
    document.getElementById("tanggalbalik").value = pinjamanItem.tanggalbalik;
    document.getElementById("keterangan").value = pinjamanItem.keterangan;
    const nama = document.getElementById('nama')
    nama.removeAttribute('requiered')
    nama.setAttribute('readonly','readonly')
    const namabuku = document.getElementById('namabuku')
    namabuku.removeAttribute('requiered')
    namabuku.setAttribute('readonly','readonly')
    const tanggalpinjam = document.getElementById('tanggalpinjam')
    tanggalpinjam.removeAttribute('requiered')
    tanggalpinjam.setAttribute('readonly','readonly')
    peminjaman.splice(index, 1); // Hapus data peminjaman yang akan diubah
    localStorage.setItem("peminjaman", JSON.stringify(peminjaman));
    munculTable();
}

function hapusPeminjaman(index) {
    peminjaman.splice(index, 1); // Hapus data peminjaman
    localStorage.setItem("peminjaman", JSON.stringify(peminjaman));
    munculTable();
    }

formPeminjaman.addEventListener("submit", function (e) {
e.preventDefault();
    const nama = document.getElementById("nama").value;
    const namabuku = document.getElementById("namabuku").value;
    const tanggalpinjam = document.getElementById("tanggalpinjam").value;
    const tanggalbalik = document.getElementById("tanggalbalik").value;
    const keterangan = document.getElementById("keterangan").value;
    const pinjamanItem = { nama, namabuku, tanggalpinjam, tanggalbalik, keterangan };
    peminjaman.push(pinjamanItem);
    localStorage.setItem("peminjaman", JSON.stringify(peminjaman));
    document.getElementById("nama").value = "";
    document.getElementById("namabuku").value = "";
    document.getElementById("tanggalpinjam").value = "";
    document.getElementById("tanggalbalik").value = "";
    document.getElementById("keterangan").value = "";
munculTable();
location.reload()
});

munculTable();