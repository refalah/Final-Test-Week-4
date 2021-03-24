

let x = ''
for (let i = 0; i < 5; i++){
    for (j = 0; j <= 5; j++){
        if(j % 2 == 0){
            x += '*'
        } else {
            x += '#'
        }
    }
    x += '\n'
}

// for (let i = 0; i < 5; i++){
//     for (j = 1, k = i; j <= i; j++, k--){
//         if(k % 2 == 0){
//             x += '*'
//         } else {
//             x += '#'
//         }
        
//     }
//     x += '\n'
// }
console.log(x)