document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = id('cart-count');
    let count = 0;
    let selectedItems = [];

    cartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;

            const productName = btn.parentElement.querySelector('h3').textContent;
            selectedItems.push(productName);

            // Tampilkan Main Button Telegram
            tg.MainButton.setText(`LIHAT PESANAN (${count})`);
            tg.MainButton.show();
            tg.MainButton.setParams({
                color: '#c5a059',
                text_color: '#ffffff'
            });

            // Animasi tombol kartu
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

    // Ketika tombol utama Telegram diklik (Checkout)
    tg.onEvent('mainButtonClicked', function () {
        const orderSummary = selectedItems.join(", ");
        tg.sendData("ORDER_PARFUM:" + orderSummary);
        tg.close();
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
