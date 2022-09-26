//implementasi try-catch pada kasus yang lebih umum
let json = '{ "name": "Yoda", "age": 20 }';
 
try {
    let user = JSON.parse(json);
 
    console.log(user.name);
    console.log(user.age);
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}

console.log("");
//jika json string tidak sesuai dengan format object JavaScript
let json2 = '{ bad json }';
 
try {
    let user = JSON.parse(json2);
 
    console.log(user.name);
    console.log(user.age);
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}
console.log("");

//mengimplementasikan throw untuk menimbulkan eror sendiri:
let json3 = '{ "age": 20 }';
 
try {
    let user = JSON.parse(json3);
    
    if (!user.name) {
        throw new SyntaxError("'name' is required.");
    }
 
    console.log(user.name); // undefined
    console.log(user.age);  // 20
} catch (error) {
    console.log(`JSON Error: ${error.message}`);
}
console.log("");

//menggunakan if-statement dengan operator instanceof untuk mendapatkan tipe eror
let json4 = '{ "name": "Yoda", "age": 20 }';
 
try {
    let user = JSON.parse(json4);
 
    if (!user.name) {
        throw new SyntaxError("'name' is required.");
    }
 
    errorCode;
 
    console.log(user.name); // Yoda
    console.log(user.age);  // 20
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON Error: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }

}

//output yang dihasilkan
/* output
Yoda
20

SyntaxError
Unexpected token b in JSON at position 2

JSON Error: 'name' is required.

errorCode is not defined
*/
