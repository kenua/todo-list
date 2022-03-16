export default function sanitizeText(str) {
   return str.replace(/[\<\>\/\\]/ig, '').trim();
}