import { DateTime } from "luxon";
import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import de from "@vee-validate/i18n/dist/locale/de.json";

import { required, email, regex } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("regex", regex);

defineRule("uid", value => {
  if (!value.match(/^CHE-(\d{3}\.\d{3}\.\d{3})$/)) {
    return `Dieses Feld muss eine gültige UID-Nr. im Format CHE-123.456.789 enthalten.`;
  }

  return true;
});

defineRule("password-strengh", value => {
  if (!value.match(/^(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[a-zA-Z]).*$/)) {
    return `Das Passwort erfüllt die Kriterien nicht.`;
  }

  return true;
});

defineRule("phone", (value, _, ctx) => {
  if (!value) {
    return true;
  }
  if (!value.match(/^\+(\d+)$/)) {
    return `${ctx.field} muss eine gültige Telefonnummer im Format +41711234567 enthalten`;
  }

  return true;
});

defineRule("birthday", (value, fields, ctx) => {
  const [day, month, year] = fields as string[];

  if (ctx.form[day] && ctx.form[month] && ctx.form[year]) {
    const date = DateTime.fromObject({
      month: ctx.form[month],
      day: ctx.form[day],
      year: ctx.form[year],
    });
    if (date.isValid) {
      return true;
    } else {
      return "Geburtstag muss ein gültiges Datum sein";
    }
  }

  return "Geburtstag muss aus Tag, Monat und Jahr bestehen";
});

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
