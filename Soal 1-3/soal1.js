const barang1 = {
    type: "A",
    qty: 14
}

function price(data) {

    function qualityType() {
        if (data.type == "A") {
            if (data.qty > 13){
                discount = data.qty * 231
                totalPrice = data.qty * 4550
                totalFinal = totalPrice - discount
            } else {
                discount = 0
                totalPrice = data.qty * 4550
                totalFinal = totalPrice - discount
            }
           
        } else if (data.type == "B") {
            if (data.qty > 7) {
                totalPrice = data.qty * 5330
                toRound = 23/100 * totalPrice
                discount = Math.round(toRound)
                totalFinal = totalPrice - discount
            } else {
                totalPrice = data.qty * 5330
                discount = 0
                totalFinal = totalPrice - discount
            }
        } else if (data.type == "C") {
            totalPrice = data.qty * 8653
            discount = 0
            totalFinal = totalPrice - discount
        } 
    }

    let sum = qualityType();
    return `
            Total Harga Barang: ${totalPrice}
            Potongan: ${discount}
            Total yang harus dibayar: ${totalFinal}
            `


}

console.log(price(barang1));