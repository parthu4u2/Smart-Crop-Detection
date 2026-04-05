function Harvest() {
    const harvesters = [
        {
            name: "Raj Tractor Service",
            phone: "9876543210",
            location: "Anand, Gujarat",
            price: "₹500/hr",
            image: "https://imgs.search.brave.com/XutT5HQuDamj3QXjmjVNUp4YP48yT2wwjlL6eQ2iJOY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9paGFy/dmVzdGVyLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8w/OC80TFotNi4wLVJp/Y2UtQ29tYmluZS1I/YXJ2ZXN0ZXIuanBn"
        },
        {
            name: "Kisan Harvester",
            phone: "9123456780",
            location: "Vadodara",
            price: "₹600/hr",
            image: "https://imgs.search.brave.com/kJttp5MGTTLJmzC1xOmHG5RoNU3ehHgwqDw9C9pn8Mk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDAwLzY2My9zbWFs/bC9mYXJtLWNvbWJp/bmUtaGFydmVzdGVy/LTNkLXJlbmRlcmlu/Zy1vbi13aGl0ZS1i/YWNrZ3JvdW5kLXBo/b3RvLmpwZw"
        },
        {
            name: "Agro Machine",
            phone: "9012345678",
            location: "Nadiad",
            price: "₹550/hr",
            image: "https://imgs.search.brave.com/N9eHisiK_ZWOoikhem8K3e7NdkmgaUGIZy6pGcMHdFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDAxLzAyNy9zbWFs/bC9jb21iaW5lLWhh/cnZlc3Rlci0zZC1y/ZW5kZXJpbmctb24t/d2hpdGUtYmFja2dy/b3VuZC1waG90by5q/cGc"

        },
        {
            name: "Green Farm Tools",
            phone: "9988776655",
            location: "Ahmedabad",
            price: "₹700/hr",
            image: "https://imgs.search.brave.com/HCsRukzymgJ2W9fCqSxf2_8uUFpIMY1obQkmP96WrRQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDAwLzIyOC9zbWFs/bC9mYXJtLWNvbWJp/bmUtaGFydmVzdGVy/LTNkLXJlbmRlcmlu/Zy1vbi13aGl0ZS1i/YWNrZ3JvdW5kLXBo/b3RvLmpwZw"

        },
        {
            name: "Krushi Seva",
            phone: "9090909090",
            location: "Surat",
            price: "₹650/hr",
            image: "https://imgs.search.brave.com/loCsfkVCmndgEOUh_yQADULEeFj9556ZtyM7MBPylkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/Mzk2LzQ4Ni9zbWFs/bC9jb21iaW5lLWhh/cnZlc3Rlci0zZC1y/ZW5kZXJpbmctb24t/d2hpdGUtYmFja2dy/b3VuZC1waG90by5q/cGc"
        },
        {
            name: "Farm Expert",
            phone: "8888888888",
            location: "Rajkot",
            price: "₹580/hr",
            image: "https://imgs.search.brave.com/Tswgx10SDBi4aggIDe8njufXfgNbO6_SDwuS08lEbT8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDAwLzM2MS9zbWFs/bC9jb21iaW5lLWhh/cnZlc3Rlci0zZC1y/ZW5kZXJpbmctb24t/d2hpdGUtYmFja2dy/b3VuZC1waG90by5q/cGc"
        }
    ];

    return (
        <div>
            <h2>🚜 Harvest Services</h2>

            <div style={styles.grid}>
                {harvesters.map((h, index) => (
                    <div key={index} style={styles.card}>

                        {/* Image */}
                        <img src={h.image} alt="harvester" style={styles.image} />

                        {/* Content */}
                        <div style={styles.content}>
                            <h3>{h.name}</h3>

                            {/* 🔥 Highlighted Price */}
                            <p style={styles.price}>{h.price}</p>

                            <p>📞 {h.phone}</p>
                            <p>📍 {h.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px"
    },

    card: {
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "0.3s"
    },

    image: {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    },

    content: {
        padding: "15px"
    },

    // 🔥 IMPORTANT STYLE (UI IMPROVEMENT)
    price: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#2e7d32", // green highlight
        margin: "8px 0"
    }
};

export default Harvest;