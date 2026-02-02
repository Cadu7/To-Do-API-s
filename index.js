console.log(new RegExp("^\\s*(\\d{2}|\\d{0})[-. ]?(\\d{5}|\\d{4})[-. ]?(\\d{4})[-. ]?\\s*$").test("(24) 99200-8077"))
console.log(new RegExp("(\\d{2}) \\d{5}-\\d{4}").test("24 99200-8077"))