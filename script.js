
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Explore Button Smooth Scroll ---
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 2. Live Interactive Cart & Bill Calculator ---
    let cart = [
        { name: 'Veg Burger', price: 120, qty: 2 },
        { name: 'Cheese Sandwich', price: 100, qty: 1 },
        { name: 'Cold Coffee', price: 90, qty: 2 }
    ];

    function updateCartTable() {
        const tableBody = document.getElementById('cartTableBody');
        const subtotalText = document.getElementById('subtotalText');
        const taxText = document.getElementById('taxText');
        const grandTotalText = document.getElementById('grandTotalText');

        if (!tableBody) return;

        // Clear existing rows
        tableBody.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemAmount = item.price * item.qty;
            subtotal += itemAmount;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td>₹${itemAmount}</td>
            `;
            tableBody.appendChild(row);
        });

        const tax = Math.round(subtotal * 0.05);
        const grandTotal = subtotal + tax;

        subtotalText.innerText = `₹${subtotal}`;
        taxText.innerText = `₹${tax}`;
        grandTotalText.innerText = `₹${grandTotal}`;
    }

    // Add To Cart Buttons in Menu Cards
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'), 10);

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name, price, qty: 1 });
            }

            updateCartTable();
            alert(`${name} added to your live invoice!`);
        });
    });

    // --- 3. Form Submission Handling ---
    const orderForm = document.getElementById('cafeOrderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page reload

            const customerName = document.getElementById('fullName').value;
            const itemSelect = document.getElementById('item').value;
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            const orderType = document.querySelector('input[name="orderType"]:checked').value;

            if (itemSelect) {
                const [itemName, itemPriceStr] = itemSelect.split('|');
                const itemPrice = parseInt(itemPriceStr, 10);

                // Add ordered item to cart
                const existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.qty += quantity;
                } else {
                    cart.push({ name: itemName, price: itemPrice, qty: quantity });
                }

                // Update invoice header details
                document.getElementById('billCustomerName').innerText = customerName;
                document.getElementById('billOrderType').innerText = orderType;

                updateCartTable();

                alert(`Thank you ${customerName}! Your order for ${quantity}x ${itemName} has been placed.`);
                orderForm.reset();

                // Scroll down to view billing
                document.getElementById('billing').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});