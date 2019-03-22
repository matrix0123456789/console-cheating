//Credits dazinator@github
const VLQ_BASE_SHIFT = 5;
const VLQ_BASE = 1 << VLQ_BASE_SHIFT;
const VLQ_BASE_MASK = VLQ_BASE - 1;
const VLQ_CONTINUATION_BIT = VLQ_BASE;
const BASE64_DIGITS = [];

let charCode = "A".charCodeAt(0);
for (let i = 0; i < 26; ++i)
    BASE64_DIGITS.push(String.fromCharCode(charCode + i));
charCode = "a".charCodeAt(0);
for (let i = 0; i < 26; ++i)
    BASE64_DIGITS.push(String.fromCharCode(charCode + i));
charCode = "0".charCodeAt(0);
for (let i = 0; i < 10; ++i)
    BASE64_DIGITS.push(String.fromCharCode(charCode + i));
BASE64_DIGITS.push("+");
BASE64_DIGITS.push("/");

function encodeVLQ(value) {
    if (value < 0)
        value = ((-value) << 1) | 1;
    else
        value <<= 1;

    let result = "";
    do {
        let digit = value & VLQ_BASE_MASK;
        value >>>= VLQ_BASE_SHIFT;
        if (value > 0)
            digit |= VLQ_CONTINUATION_BIT;
        result += BASE64_DIGITS[digit];
    } while (value > 0);
    return result;
}

export default encodeVLQ;