import { db } from "../src/lib/prisma";
import bcrypt from "bcryptjs"

const main = async () => {
    const metadata = [{
        destination: "homepage",
        title_id: "Beranda",
        title_en: "Home",
        description_id: "Rasakan masa depan mobilitas bersama Apollo Global Interactive. Kami adalah perusahaan otomotif terintegrasi terkemuka yang menyediakan penjualan, layanan, penyewaan, dan suku cadang untuk memenuhi kebutuhan Anda.",
        description_en: "Experience the future of mobility with Apollo Global Interactive. We are a leading integrated automotive company providing comprehensive sales, services, rentals, and spare parts solutions tailored to your needs."
    },
    {
        destination: "aboutuspage",
        title_id: "Tentang Kami",
        title_en: "About Us",
        description_id: "Temukan warisan keunggulan Apollo Global Interactive. Pelajari visi kami untuk mobilitas berkelanjutan, tim kepemimpinan yang berdedikasi, dan komitmen kami terhadap inovasi.",
        description_en: "Discover Apollo Global Interactive's legacy of excellence. Learn about our vision for sustainable mobility, our dedicated leadership team, and our commitment to automotive innovation."
    },
    {
        destination: "investorpage",
        title_id: "Hubungan Investor",
        title_en: "Investor Relations",
        description_id: "Hubungan Investor: Akses data saham real-time, laporan keuangan, dan wawasan strategis. Bergabunglah dalam perjalanan pertumbuhan berkelanjutan dan kepemimpinan pasar kami.",
        description_en: "Investor Relations: Access real-time stock data, financial reports, and strategic insights. Join us in our journey of sustainable growth and market leadership."
    },
    {
        destination: "newspage",
        title_id: "Berita & CSR",
        title_en: "News & CSR",
        description_id: "Tetap terinformasi bersama Apollo Global Interactive. Baca berita perusahaan terbaru, pembaruan keuangan, dan inisiatif Tanggung Jawab Sosial Perusahaan (CSR) yang membawa perubahan positif.",
        description_en: "Stay informed with Apollo Global Interactive. Read our latest corporate news, financial updates, and Corporate Social Responsibility (CSR) initiatives driving positive change."
    },
    {
        destination: "servicepage",
        title_id: "Layanan Kami",
        title_en: "Our Services",
        description_id: "Solusi otomotif komprehensif yang disesuaikan untuk Anda. Mulai dari dealer mobil baru dan perawatan bersertifikat hingga sewa fleksibel dan mobil bekas berkualitas, Apollo memiliki semuanya.",
        description_en: "Comprehensive automotive solutions tailored for you. From new car dealerships and certified maintenance to flexible rentals and quality used cars, Apollo has it all.",
    }
    ]

    const newMetaData = await db.metadata.createMany({
  data: metadata,
  skipDuplicates: true
})

    console.log("Metadata created successfully")

    const hashedPassword = bcrypt.hashSync("10203040", 10)
    const user = await db.user.createMany({
        data: [{
            email: "willdan@gmail.com",
            password: hashedPassword,
            name: "WILLDAN",
            role: "SUPER_ADMIN"
        },
        {
            email: "zpnever7@gmail.com",
            password: hashedPassword,
            name: "willdan",
            role: "SUPER_ADMIN"
        }]
        ,
        skipDuplicates: true
    })

    console.log("User created successfully")
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });