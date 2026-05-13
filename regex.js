const Joi = require("@hapi/joi");

// UK phone pattern (optional +44/0044, then UK formats 01/02/03/05/07/08/09).
// Reject only 01000000000 and 05000000000 (negative lookahead). 02000000000, 03000000000, 07000000000 are accepted.
//
// For regex101.com: use flavor "ECMAScript (JavaScript)", paste pattern WITHOUT the slashes below.
// Pattern for regex101: ^(\+44?|0044?)??(?!0?10{9}$)(?!0?50{9}$)(\(?0?1\d(?:\d){0,3}\d\)? ?\d(?:\d){2,5}\d|\(?0?2\d\)? ?\d{4} ?\d{4}|\(?0?3\d{2}\)? ?\d{3} ?\d{4}|\(?0?5(?:[56][00])\)? ?\d{3,4} ?\d{3,4}|0?7\(?\d{3}\)?\s?\d{3}\s?\d{3}|\(?0?[89]\d{2}\)? ?\d{3} ?\d{3})$
const phoneRegex =
  /^(\+44?|0044?)??(?!0?10{9}$)(?!0?50{9}$)(\(?0?1\d(?:\d){0,3}\d\)? ?\d(?:\d){2,5}\d|\(?0?2\d\)? ?\d{4} ?\d{4}|\(?0?3\d{2}\)? ?\d{3} ?\d{4}|\(?0?5(?:[56][00])\)? ?\d{3,4} ?\d{3,4}|0?7\(?\d{3}\)?\s?\d{3}\s?\d{3}|\(?0?[89]\d{2}\)? ?\d{3} ?\d{3})$/;

const phoneSchema = Joi.string().regex(phoneRegex);

const testCases = [
  // Valid for this pattern
  { value: "+447911123456", valid: true, label: "mobile with +44" },
  { value: "07911 123456", valid: true, label: "mobile 07" },
  { value: "020 7946 0958", valid: true, label: "London 02" },
  { value: "0300 123 4567", valid: true, label: "non-geographic 03" },
  { value: "07123 456789", valid: true, label: "mobile 07" },
  { value: "07890123456", valid: true, label: "mobile no spaces" },
  { value: "0800 123 456", valid: true, label: "08 freephone" },
  { value: "0900 123 456", valid: true, label: "09 premium" },
  // Invalid for this pattern
  { value: "0044 7911 123456", valid: false, label: "0044 + space" },
  {
    value: "0191 234 5678",
    valid: false,
    label: "01 with extra space in tail",
  },
  { value: "0113 496 0123", valid: false, label: "01 format" },
  { value: "0500 123 456", valid: false, label: "0500 too few digits" },
  { value: "0500 123 4567", valid: false, label: "0500 (56/60 only)" },
  {
    value: "+44 20 7946 0958",
    valid: false,
    label: "+44 with space before 20",
  },
  { value: "0161 496 0123", valid: false, label: "01 format" },
  { value: "0121 496 0123", valid: false, label: "01 format" },
  { value: "123", valid: false, label: "too short" },
  { value: "+44 123", valid: false, label: "too few digits" },
  { value: "abcdef", valid: false, label: "letters" },
  { value: "+1 555 123 4567", valid: false, label: "US number" },
  { value: "+44 7911 1234567", valid: false, label: "11 digits after +44" },
  { value: "", valid: false, label: "empty" },
  { value: "+44", valid: false, label: "no digits" },
  { value: "07911 12345", valid: false, label: "only 9 digits" },
  { value: "+33 1 23 45 67 89", valid: false, label: "French number" },
  { value: "0044 7911 12345", valid: false, label: "9 digits with 0044" },
  { value: " 07911 123456", valid: false, label: "leading space" },
  { value: "07911 123456 ", valid: false, label: "trailing space" },
  {
    value: "01000000000",
    valid: false,
    label: "01 all zeros (rejected by pattern)",
  },
  { value: "02000000000", valid: true, label: "02" },
  { value: "03000000000", valid: true, label: "03" },
  { value: "04000000000", valid: true, label: "04" },
  {
    value: "05000000000",
    valid: false,
    label: "05 all zeros (rejected by pattern)",
  },
  { value: "06000000000", valid: true, label: "06" },
  { value: "07000000000", valid: true, label: "07" },
  { value: "08000000000", valid: true, label: "08" },
  { value: "09000000000", valid: true, label: "09" },
  { value: "01987654321", valid: true, label: "01 any digits" },
  { value: "07123456789", valid: true, label: "07 any digits" },
];

console.log("UK phone validation (Joi + reused pattern)\n");

testCases.forEach(({ value }) => {
  const { error } = phoneSchema.validate(value);
  const result = error ? "invalid" : "valid";
  console.log(`${value} -- ${result}`);
});
