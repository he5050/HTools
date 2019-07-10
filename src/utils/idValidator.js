const IDValidator = require("id-validator");
const GB2260 = require("id-validator/src/GB2260");

export const idValidator = new IDValidator();
export const idValidatorGB = new IDValidator(GB2260);
