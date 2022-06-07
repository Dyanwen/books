const SPENDING_THRESHOLD = 200;//预期价格
const TAX_RATE = 0.08;//税率
const PHONE_PRICE = 99.99;//手机实际价格
const ACCESSORY_PRICE = 9.9;//配件价格

var bank_balance = 303.91;
var amount = 0;

function calculateTax(s) {
    return s * TAX_RATE;
}

function formatAmount(a) {
    return `$${a.toFixed(2)}`
}

while (amount < bank_balance) {
    amount = amount + PHONE_PRICE;
    if (amount < SPENDING_THRESHOLD) {
        amount = amount + ACCESSORY_PRICE;
    }
}

amount = amount + calculateTax(amount);
console.log(
    "Your purchase: " + formatAmount(amount)
);
// 你的购买金额：$334.76

// 你真的可以负担得起本次购买吗？
if (amount > bank_balance) {
    console.log(
        "You can't afford this purchase. :("
    );
}
