// https://github.com/CardJs/CardJs/blob/master/src/js/card-js.js

import { CustomInputElement } from "@/components/Input/CreditCard/types";

interface DateInterface {
  date: string;
  month: string;
  year: string;
}

interface CardTypeInterface {
  type: string;
  card: string;
  cvc: string;
}

const CREDIT_CARD_NUMBER_MASK = {
  DEFAULT: "XXXX XXXX XXXX XXXX",
  VISA: "XXXX XXXX XXXX XXXX",
  MASTERCARD: "XXXX XXXX XXXX XXXX",
  DISCOVER: "XXXX XXXX XXXX XXXX",
  JCB: "XXXX XXXX XXXX XXXX",
  AMEX: "XXXX XXXXXX XXXXX",
  DINERS: "XXXX XXXX XXXX XX"
};

const CVC_MASK = {
  CVC_3: "XXX",
  CVC_4: "XXXX"
};

const EXPIRY_MASK = "XX / XX";

const KEYS = {
  "0": 48,
  "9": 57,
  NUMPAD_0: 96,
  NUMPAD_9: 105,
  DELETE: 46,
  BACKSPACE: 8,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  HOME: 36,
  END: 35,
  TAB: 9,
  A: 65,
  X: 88,
  C: 67,
  V: 86
};

function keyCodeFromEvent(e: KeyboardEvent) {
  return e.which || e.keyCode;
}

function keyIsCommandFromEvent(e: KeyboardEvent) {
  return e.ctrlKey || e.metaKey;
}

export function keyIsTopNumber(e: KeyboardEvent): boolean {
  const keyCode = keyCodeFromEvent(e);

  return keyCode >= KEYS["0"] && keyCode <= KEYS["9"];
}

export function keyIsKeypadNumber(e: KeyboardEvent): boolean {
  const keyCode = keyCodeFromEvent(e);

  return keyCode >= KEYS["NUMPAD_0"] && keyCode <= KEYS["NUMPAD_9"];
}

export function keyIsDelete(e: KeyboardEvent): boolean {
  return keyCodeFromEvent(e) === KEYS["DELETE"];
}

export function keyIsBackspace(e: KeyboardEvent): boolean {
  return keyCodeFromEvent(e) === KEYS["BACKSPACE"];
}

export function keyIsNumber(e: KeyboardEvent): boolean {
  return keyIsTopNumber(e) || keyIsKeypadNumber(e);
}

export function keyIsDeletion(e: KeyboardEvent): boolean {
  return keyIsDelete(e) || keyIsBackspace(e);
}

export function keyIsArrow(e: KeyboardEvent): boolean {
  const keyCode = keyCodeFromEvent(e);

  return keyCode >= KEYS["ARROW_LEFT"] && keyCode <= KEYS["ARROW_DOWN"];
}

export function keyIsNavigation(e: KeyboardEvent): boolean {
  const keyCode = keyCodeFromEvent(e);

  return keyCode === KEYS["HOME"] || keyCode === KEYS["END"];
}

export function keyIsKeyboardCommand(e: KeyboardEvent): boolean {
  const keyCode = keyCodeFromEvent(e);

  return (
    keyIsCommandFromEvent(e) &&
    (keyCode === KEYS["A"] ||
      keyCode === KEYS["X"] ||
      keyCode === KEYS["C"] ||
      keyCode === KEYS["V"])
  );
}

export function keyIsTab(e: KeyboardEvent): boolean {
  return keyCodeFromEvent(e) === KEYS["TAB"];
}

export function filterNumberOnlyKey(e: KeyboardEvent) {
  const isNumber = keyIsNumber(e);
  const isDeletion = keyIsDeletion(e);
  const isArrow = keyIsArrow(e);
  const isNavigation = keyIsNavigation(e);
  const isKeyboardCommand = keyIsKeyboardCommand(e);
  const isTab = keyIsTab(e);

  if (
    !isNumber &&
    !isDeletion &&
    !isArrow &&
    !isNavigation &&
    !isKeyboardCommand &&
    !isTab
  ) {
    e.preventDefault();
  }
}

export function cardTypeFromNumber(number: string): string {
  // Diners - Carte Blanche
  let re = new RegExp("^30[0-5]");
  if (number.match(re) !== null) {
    return "Diners - Carte Blanche";
  }

  // Diners
  re = new RegExp("^(30[6-9]|36|38)");
  if (number.match(re) !== null) {
    return "Diners";
  }

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) !== null) {
    return "JCB";
  }

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) {
    return "AMEX";
  }

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) {
    return "Visa Electron";
  }

  // Visa
  re = new RegExp("^4");
  if (number.match(re) != null) {
    return "Visa";
  }

  // Mastercard
  re = new RegExp("^5[1-5]");
  if (number.match(re) != null) {
    return "Mastercard";
  }

  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
  );
  if (number.match(re) != null) {
    return "Discover";
  }

  return "";
}

export function caretStartPosition(element: CustomInputElement): number {
  if (typeof element.selectionStart === "number") {
    return element.selectionStart;
  }

  return -1;
}

export function caretEndPosition(element: CustomInputElement): number {
  if (typeof element.selectionEnd === "number") {
    return element.selectionEnd;
  }

  return -1;
}

export function normaliseCaretPosition(
  mask: string,
  caretPosition: number
): number {
  let numberPos = 0;

  if (caretPosition < 0 || caretPosition > mask.length) {
    return 0;
  }

  for (let i = 0; i < mask.length; i++) {
    if (i === caretPosition) {
      return numberPos;
    }

    if (mask[i] === "X") {
      numberPos++;
    }
  }

  return numberPos;
}

export function numbersOnlyString(string: string): string {
  let numbersOnlyString = "";

  for (let i = 0; i < string.length; i++) {
    const currentChar = string.charAt(i);
    const isValid = !isNaN(parseInt(currentChar));

    if (isValid) {
      numbersOnlyString += currentChar;
    }
  }

  return numbersOnlyString;
}

export function digitFromKeyCode(keyCode: number): number | null {
  if (keyCode >= KEYS["0"] && keyCode <= KEYS["9"]) {
    return keyCode - KEYS["0"];
  }

  if (keyCode >= KEYS["NUMPAD_0"] && keyCode <= KEYS["NUMPAD_9"]) {
    return keyCode - KEYS["NUMPAD_9"];
  }

  return null;
}

export function denormaliseCaretPosition(
  mask: string,
  caretPosition: number
): number {
  let numberPos = 0;

  if (caretPosition < 0 || caretPosition > mask.length) {
    return 0;
  }

  for (let i = 0; i < mask.length; i++) {
    if (numberPos === caretPosition) {
      return i;
    }

    if (mask[i] === "X") {
      numberPos++;
    }
  }

  return mask.length;
}

export function applyFormatMask(string: string, mask: string): string {
  let formattedString = "";
  let numberPos = 0;

  for (let i = 0; i < mask.length; i++) {
    const currentMaskChar = mask[i];

    if (currentMaskChar === "X") {
      const digit = string.charAt(numberPos);

      if (!digit) {
        break;
      }

      formattedString += string.charAt(numberPos);
      numberPos++;
    } else {
      formattedString += currentMaskChar;
    }
  }

  return formattedString;
}

export function setCaretPosition(
  element: CustomInputElement,
  caretPos: number
): void {
  if (element !== null) {
    if (element.createTextRange) {
      const range = element.createTextRange();
      range.move("character", caretPos);
      range.select();
    } else {
      if (element.selectionStart) {
        element.focus();
        element.setSelectionRange(caretPos, caretPos);
      } else {
        element.focus();
      }
    }
  }
}

export function handleMaskedNumberInputKey(
  e: KeyboardEvent,
  mask: string
): string {
  filterNumberOnlyKey(e);

  const keyCode: number = keyCodeFromEvent(e);
  //const element: CustomInputElement = <CustomInputElement>e.target;
  const element: CustomInputElement = e.target;
  let val = element.value;

  const caretStart: number = caretStartPosition(element);
  const caretEnd: number = caretEndPosition(element);

  // Calculate normalised caret position
  const normalisedStartCaretPosition = normaliseCaretPosition(mask, caretStart);
  const normalisedEndCaretPosition = normaliseCaretPosition(mask, caretEnd);

  let newCaretPosition: number = caretStart;

  const isNumber: boolean = keyIsNumber(e);
  const isDelete: boolean = keyIsDelete(e);
  const isBackspace: boolean = keyIsBackspace(e);

  if (isNumber || isDelete || isBackspace) {
    e.preventDefault();

    const rawText: string = element.value;
    const digit: number | null = digitFromKeyCode(keyCode);
    const rangeHighlighted: boolean =
      normalisedEndCaretPosition > normalisedStartCaretPosition;

    let numbersOnly: string = numbersOnlyString(rawText);

    // Remove values highlighted (if highlighted)
    if (rangeHighlighted) {
      numbersOnly =
        numbersOnly.slice(0, normalisedStartCaretPosition) +
        numbersOnly.slice(normalisedEndCaretPosition);
    }

    // Forward Action
    if (caretStart != mask.length) {
      // Insert number digit
      if (isNumber && rawText.length <= mask.length) {
        numbersOnly =
          numbersOnly.slice(0, normalisedStartCaretPosition) +
          digit +
          numbersOnly.slice(normalisedStartCaretPosition);
        newCaretPosition = Math.max(
          denormaliseCaretPosition(mask, normalisedStartCaretPosition + 1),
          denormaliseCaretPosition(mask, normalisedStartCaretPosition + 2) - 1
        );
      }

      // Delete
      if (isDelete) {
        numbersOnly =
          numbersOnly.slice(0, normalisedStartCaretPosition) +
          numbersOnly.slice(normalisedStartCaretPosition + 1);
      }
    }

    // Backward Action
    if (caretStart !== 0) {
      // Backspace
      if (isBackspace && !rangeHighlighted) {
        numbersOnly =
          numbersOnly.slice(0, normalisedStartCaretPosition - 1) +
          numbersOnly.slice(normalisedStartCaretPosition);
        newCaretPosition = denormaliseCaretPosition(
          mask,
          normalisedStartCaretPosition - 1
        );
      }
    }

    val = applyFormatMask(numbersOnly, mask);

    setCaretPosition(element, newCaretPosition);
  }

  return val;
}

export function refreshCreditCardNumberFormat(
  value: string,
  mask: string
): string {
  const numbersOnly: string = numbersOnlyString(value);

  return applyFormatMask(numbersOnly, mask);
}

export function handleDateKey(e: KeyboardEvent, mask: string): DateInterface {
  let val: string = handleMaskedNumberInputKey(e, mask);

  if (val.length === 1 && parseInt(val) > 1 && keyIsNumber(e)) {
    val = applyFormatMask("0" + val, mask);
  }

  if (parseInt(val) > 12 && keyIsNumber(e)) {
    val = applyFormatMask("0" + parseInt(val), mask);
  }

  const date = val;
  const month = val.length >= 2 ? val.substr(0, 2) : "";
  const year = val.length >= 6 ? val.substr(5, 2) : "";

  return { date, month, year };
}

export function refreshDateFormat(value: string, mask: string): DateInterface {
  let numbersOnly = numbersOnlyString(value);

  if (parseInt(numbersOnly) > 12 && parseInt(numbersOnly) < 100) {
    numbersOnly = `0${numbersOnly}`;
  }

  const date = applyFormatMask(numbersOnly, mask);
  const month = date.length >= 2 ? date.substr(0, 2) : "";
  const year = date.length === 7 ? date.substr(5, 2) : "";

  return { date, month, year };
}

export function handleCvcInputKey(e: KeyboardEvent, mask: string): string {
  const isNumber: boolean = keyIsNumber(e);
  const isDeletion: boolean = keyIsDeletion(e);
  const isArrow: boolean = keyIsArrow(e);
  const isNavigation: boolean = keyIsNavigation(e);
  const isKeyboardCommand: boolean = keyIsKeyboardCommand(e);
  const isTab: boolean = keyIsTab(e);

  if (
    !isNumber &&
    !isDeletion &&
    !isArrow &&
    !isNavigation &&
    !isKeyboardCommand &&
    !isTab
  ) {
    e.preventDefault();
  }

  return handleMaskedNumberInputKey(e, mask);
}

export function refreshCvcFormat(value: string, mask: string): string {
  const numbersOnly = numbersOnlyString(value);

  return applyFormatMask(numbersOnly, mask);
}

export function getCardTypeFromNumber(number: string): CardTypeInterface {
  const type = cardTypeFromNumber(number);

  let card = CREDIT_CARD_NUMBER_MASK.DEFAULT;
  let cvc = CVC_MASK.CVC_3;

  switch (type) {
    case "Visa Electron":
    case "Visa":
      card = CREDIT_CARD_NUMBER_MASK.VISA;
      break;
    case "Mastercard":
      card = CREDIT_CARD_NUMBER_MASK.MASTERCARD;
      break;
    case "AMEX":
      card = CREDIT_CARD_NUMBER_MASK.AMEX;
      cvc = CVC_MASK.CVC_4;
      break;
    case "Discover":
      card = CREDIT_CARD_NUMBER_MASK.DISCOVER;
      break;
    case "Diners - Carte Blanche":
    case "Diners":
      card = CREDIT_CARD_NUMBER_MASK.DINERS;
      break;
    case "JCB":
      card = CREDIT_CARD_NUMBER_MASK.JCB;
      break;
  }

  return { type, card, cvc };
}

export default {
  KEYS,
  CREDIT_CARD_NUMBER_MASK,
  EXPIRY_MASK,
  CVC_MASK,

  handleMaskedNumberInputKey,
  refreshCreditCardNumberFormat,

  handleDateKey,
  refreshDateFormat,

  handleCvcInputKey,
  refreshCvcFormat,

  getCardTypeFromNumber
};
