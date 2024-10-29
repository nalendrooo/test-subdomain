// Import dependencies
const express = require('express');

// Initialize Express and Prisma
const app = express();

// Middleware untuk memeriksa subdomain dan mengambil tenant dari database
app.use(async (req, res, next) => {
    try {
        const host = req.headers.host; // Mendapatkan host, contoh: 'subdomain.example.com'
        const subdomain = host.split('.')[0]; // Ambil bagian subdomain

        // Cari subdomain di database
        // const tenant = await db.tenants.findUnique({
        //     where: { subdomain: subdomain }
        // });

        // if (!tenant) {
        //     return res.status(404).send('Subdomain not found');
        // }

        // Simpan informasi tenant di `req` untuk digunakan di handler berikutnya
        req.tenant = subdomain;
        req.subdomains = host
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint contoh untuk memeriksa informasi tenant
app.get('/', (req, res) => {
    res.send(`Hello, tenant: ${req.tenant} with subdomains: ${req.subdomains}`);
});

// Jalankan server pada port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
