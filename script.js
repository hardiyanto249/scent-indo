document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = id('cart-count');
    const waButton = id('wa-checkout-btn');
    let count = 0;
    let selectedItems = [];

    // DATA PEMILIK (YAN)
    const WA_NUMBER = "628159102047";

    function updateCart() {
        cartCount.textContent = count;

        const orderSummary = selectedItems.join(", ");
        const waText = encodeURIComponent(`Halo Scent-Indo, saya mau pesan parfum:\n\n${orderSummary}\n\nMohon info total harganya ya.`);
        const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

        // 1. Jika di dalam Telegram
        if (tg.initData) {
            tg.MainButton.setText(`PESAN VIA WHATSAPP (${count})`);
            tg.MainButton.show();
            tg.MainButton.setParams({
                color: '#25D366', // Warna Hijau WA
                text_color: '#ffffff'
            });
            tg.MainButton.onClick(() => {
                tg.openLink(waLink);
            });
        }

        // 2. Tampilkan tombol melayang (Untuk WA/Browser Biasa)
        if (count > 0) {
            waButton.style.display = 'flex';
            waButton.onclick = () => {
                window.open(waLink, '_blank');
            };
            waButton.innerHTML = `<span>💬 Pesan via WA (${count})</span>`;
        }
    }

    cartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            const productName = btn.parentElement.querySelector('h3').textContent;
            selectedItems.push(productName);

            updateCart();

            // Animasi visual tombol kartu
            btn.textContent = 'Ditambahkan! ✓';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#4CAF50';

            setTimeout(() => {
                btn.textContent = 'Tambah ke Keranjang';
                btn.style.borderColor = '#c5a059';
                btn.style.color = '#f5f5f5';
            }, 2000);
        });
    });

    // Simple scroll reveal
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.product-card');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 150) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    function id(name) {
        return document.getElementById(name);
    }
});
