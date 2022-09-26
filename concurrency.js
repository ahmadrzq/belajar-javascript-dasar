//Fungsi setTimeout() untuk membuat kode kita dijalankan secara asynchronous
console.log("Selamat Datang");
setTimeout(() => {
    console.log("Terima Kasih Sudah Datang, Silahkan Berkunjung Kembali");
}, 3000);
console.log("Ada Yang bisa dibantu?");

//Membuat callback function untuk menangani suatu nilai yang didapatkan secara asynchronous pada program yang berjalan secara synchronous
const orderCoffee = callback => {
    let coffee = null;
    console.log("Sedang membuat kopi, silakan tunggu...");
    setTimeout(() => {
        coffee = "Kopi sudah jadi!";
        callback(coffee);
    }, 3000);
}

orderCoffee(coffee => {
    console.log(coffee);
});


/* output
Sedang membuat kopi, silakan tunggu...
---- setelah 3 detik ----
Kopi sudah jadi!
*/

//Membuat fungsi Callback Hell. Callback hell terjadi karena banyak sekali callback function yang bersarang karena saling membutuhkan satu sama lain

function makeACake(...rawIngredients) {
    collectIngredients(rawIngredients, function (ingredients) {
        makeTheDough(ingredients, function (dough) {
            pourDough(dough, function (pouredDough) {
                bakeACake(pouredDough, function (cake) {
                    console.log(cake);
                })
            })
        })
    });
}

//Dengan Promise, kita dapat meminimalisir callback hell dan mengubahnya menjadi kode yang sangat mudah dibaca
function makeACake(...rawIngredients) {
    collectIngredients(rawIngredients)
        .then(makeTheDough)
        .then(pourDough)
        .then(bakeACake)
        .then(console.log);
}

//Di dalam constructor Promise, menetapkan resolver function atau bisa disebut executor function yang dijalankan secara otomatis ketika constructor Promise dipanggil.
const executorFunction = (resolve, reject) => {
    const isCoffeeMakerReady = true;
    if (isCoffeeMakerReady) {
        resolve("Kopi berhasil dibuat");
    } else {
        reject("Mesin kopi tidak bisa digunakan");
    }
}


const makeCoffee = () => {
    return new Promise(executorFunction);
}
const coffeePromise = makeCoffee();
console.log(coffeePromise);


/* output
Promise { 'Kopi berhasil dibuat' }
*/

//Consuming Promise
const stock = {
    coffeeBeans: 250,
    water: 1000,
}

// const checkStock = () => {
//     return new Promise((resolve, reject) => {
//         if (stock.coffeeBeans >= 16 && stock.water >= 250) {
//             resolve("Stok cukup. Bisa membuat kopi");
//         } else {
//             reject("Stok tidak cukup");
//         }
//     });
// };

const handleSuccess = resolvedValue => {
    console.log(resolvedValue);
}

const handleFailure = rejectionReason => {
    console.log(rejectionReason);
}

checkStock().then(handleSuccess, handleFailure);

//onRejected with Catch Method
//menulis kode dengan prinsip separation of concerns
//memisah kode ke dalam tugas tertentu
//memudahkan pencarian kode yg salah
checkStock()
    .then(handleSuccess)
    .catch(handleFailure);

//Chaining Promises
const state = {
    stock: {
        coffeeBeans: 250,
        water: 1000,
    },
    isCoffeeMachineBusy: false,
}

const checkAvailability = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!state.isCoffeeMachineBusy) {
                resolve("Mesin kopi siap digunakan.");
            } else {
                reject("Maaf, mesin sedang sibuk.");
            }
        }, 1000);
    });
};

const checkStock = () => {
    return new Promise((resolve, reject) => {
        state.isCoffeeMachineBusy = true;
        setTimeout(() => {
            if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
                resolve("Stok cukup. Bisa membuat kopi.");
            } else {
                reject("Stok tidak cukup!");
            }
        }, 1500);
    });
};

const brewCoffee = () => {
    console.log("Membuatkan kopi Anda...")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Kopi sudah siap!")
        }, 2000);
    });
};

function makeEspresso() {
    checkAvailability()
        .then((value) => {
            console.log(value);
            return checkStock();
        })
        .then((value) => {
            console.log(value)
            return brewCoffee();
        })
        .then(value => {
            console.log(value);
            state.isCoffeeMachineBusy = false;
        })
        .catch(rejectedReason => {
            console.log(rejectedReason);
            state.isCoffeeMachineBusy = false;
        });
}

makeEspresso();

/* output
Mesin kopi siap digunakan.
Stok cukup. Bisa membuat kopi.
Membuatkan kopi Anda...
Kopi sudah siap!
*/

//Promise All
// Method Promise.all() dapat menerima banyak promise dalam bentuk array pada parameternya. 
// Kemudian method tersebut mengembalikan nilai seluruh hasil dari promise dalam bentuk array.

const boilWater = () => {
    return new Promise((resolve, reject) => {
        console.log("Memanaskan air...");
        setTimeout(() => {
            resolve("Air panas sudah siap!");
        }, 2000);
    })
}

const grindCoffeeBeans = () => {
    return new Promise((resolve, reject) => {
        console.log("Menggiling biji kopi...");
        setTimeout(() => {
            resolve("Kopi sudah siap!");
        }, 1000);
    })
}



/* output
Mesin kopi siap digunakan.
Stok cukup. Bisa membuat kopi.
Memanaskan air...
Menggiling biji kopi...
[ 'Air panas sudah siap!', 'Kopi sudah siap!' ]
Membuatkan kopi Anda...
Kopi sudah siap!
*/

function makeEspresso() {
    checkAvailability()
        .then((value) => {
            console.log(value);
            return checkStock();
        })
        .then(value => {
            console.log(value);
            const promises = [boilWater(), grindCoffeeBeans()];
            return Promise.all(promises);
        })
        .then((value) => {
            console.log(value)
            return brewCoffee();
        })
        .then(value => {
            console.log(value);
            state.isCoffeeMachineBusy = false;
        })
        .catch(rejectedReason => {
            console.log(rejectedReason);
            state.isCoffeeMachineBusy = false;
        });
}

makeEspresso();

/* output
Mesin kopi siap digunakan.
Stok cukup. Bisa membuat kopi.
Memanaskan air...
Menggiling biji kopi...
[ 'Air panas sudah siap!', 'Kopi sudah siap!' ]
Membuatkan kopi Anda...
Kopi sudah siap!
*/

//Async-await
//Promise
function makeCoffee() {
    getCoffee().then(coffee => {
        console.log(coffee);
    });
}
 
makeCoffee();

//Callback
function makeCoffee() {
    getCoffee(function(coffee) {
        console.log(coffee);
    });
}
 
makeCoffee();

//Menggunakan Async-await
async function makeCoffee() {
    const coffee = await getCoffee();
    console.log(coffee);
}
 
makeCoffee();
 
/* output
Kopi didapatkan!
*/

//Handle onRejected using async-await
async function makeCoffee() {
    try {
        const coffee = await getCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}
 
makeCoffee();
 
/* output
Biji kopi habis!
*/

//Chaining Promise using async-await
async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}
 
makeEspresso();
 
/* output
Membuatkan kopi Anda...
Kopi sudah siap!
*/

//using promise all
async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        await Promise.all([boilWater(), grindCoffeeBeans()]);
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}


