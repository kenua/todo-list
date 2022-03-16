export default function removeWeirdChars(str) {
   return str.replace(/[\<\>\/\\]/ig, '');
}