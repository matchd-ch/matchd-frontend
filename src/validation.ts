import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import de from "@vee-validate/i18n/dist/locale/de.json";

import { required, email } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);

configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
  generateMessage: localize({
    de,
  }),
});

setLocale("de");
