import { isValidUrl } from "@/helpers/isValidUrl";
import { DateTime } from "luxon";
import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import de from "@vee-validate/i18n/dist/locale/de.json";

import { required, email, regex } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("regex", regex);

defineRule("uid", (value: string) => {
  if (!value.match(/^CHE-(\d{3}\.\d{3}\.\d{3})$/)) {
    return `Dieses Feld muss eine gültige UID-Nr. im Format CHE-123.456.789 enthalten.`;
  }

  return true;
});

defineRule("password-strengh", (value: string) => {
  if (!value.match(/^(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[a-zA-Z]).*$/)) {
    return `Das Passwort erfüllt die Kriterien nicht.`;
  }

  return true;
});

defineRule("phone", (value: string, _, ctx) => {
  if (!value) {
    return true;
  }
  if (!value.match(/^\+(\d{11})$/)) {
    return `${ctx.field} muss eine gültige Telefonnummer im Format +41711234567 enthalten`;
  }

  return true;
});

defineRule("url", (value: string, _, ctx) => {
  if (!value) {
    return true;
  }
  if (!isValidUrl(value)) {
    return `${ctx.field} muss eine gültige URL enthalten`;
  }

  return true;
});

defineRule("requiredIfNotEmpty", (value: string, fields, ctx) => {
  const [field] = fields as string[];

  if (!ctx.form[field] || (ctx.form[field] && value)) {
    return true;
  }

  return `${ctx.field} darf nicht leer sein`;
});

defineRule("birthday", (value: string, fields, ctx) => {
  const [day, month, year] = fields as string[];

  if (ctx.form[day] && ctx.form[month] && ctx.form[year]) {
    const date = DateTime.fromObject({
      month: ctx.form[month] as number,
      day: ctx.form[day] as number,
      year: ctx.form[year] as number,
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
