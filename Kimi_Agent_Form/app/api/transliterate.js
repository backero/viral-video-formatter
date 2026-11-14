// Comprehensive Tamil to Thanglish transliteration
export function tamilToThanglish(text) {
  if (!text) return text;

  // Complete Tamil character mapping
  const mapping = {
    // Vowels (standalone)
    'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ii', 'உ': 'u', 'ஊ': 'uu',
    'எ': 'e', 'ஏ': 'ee', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'oo', 'ஔ': 'au',

    // Vowel signs (matras) - these modify consonants
    'ா': 'aa', 'ி': 'i', 'ீ': 'ii', 'ु': 'u', 'ூ': 'uu',
    'ெ': 'e', 'ே': 'ee', 'ை': 'ai', 'ொ': 'o', 'ோ': 'oo', 'ௌ': 'au',

    // Consonants with inherent 'a'
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya', 'ட': 'ta',
    'ண': 'na', 'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma',
    'ய': 'ya', 'ர': 'ra', 'ல': 'la', 'வ': 'va', 'ழ': 'zha',
    'ள': 'la', 'ற': 'ra', 'ன': 'na', 'ஜ': 'ja', 'ஷ': 'sha',
    'ஸ': 'sa', 'ஹ': 'ha', 'ௐ': 'au',

    // Consonants with virama (pure consonants)
    'க்': 'k', 'ங்': 'ng', 'ச்': 'ch', 'ஞ்': 'ny', 'ட்': 't',
    'ண்': 'n', 'த்': 'th', 'ந்': 'n', 'ப்': 'p', 'ம்': 'm',
    'ய்': 'y', 'ர்': 'r', 'ல்': 'l', 'வ்': 'v', 'ழ்': 'zh',
    'ள்': 'l', 'ற்': 'r', 'ன்': 'n', 'ஜ்': 'j', 'ஷ்': 'sh',
    'ஸ்': 's', 'ஹ்': 'h',

    // Special characters
    '்': '', // virama (remove it)
    '়': '', // nukta
    'ஃ': 'h', // aytham

    // Numbers
    '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4',
    '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',

    // Punctuation and common symbols
    '।': '.', '॥': ':', '्': '', '॒': '', '॓': '', '॔': '',
    '़': '', 'ँ': 'n', 'ः': 'h', 'ঃ': 'h', 'ৃ': 'ri',
  };

  let result = '';
  let i = 0;

  while (i < text.length) {
    let found = false;

    // Try to match 2-character combinations first (like consonant + virama)
    if (i < text.length - 1) {
      const twoChar = text.substr(i, 2);
      if (mapping[twoChar]) {
        result += mapping[twoChar];
        i += 2;
        found = true;
      }
    }

    // If no 2-char match, try single character
    if (!found) {
      const char = text[i];
      if (mapping[char]) {
        result += mapping[char];
      } else {
        // Keep unmapped characters (English, numbers, punctuation)
        result += char;
      }
      i += 1;
    }
  }

  // Clean up common issues
  // Remove duplicate vowels in certain patterns
  result = result.replace(/aa([aeiou])/g, 'a$1');
  result = result.replace(/ii([aeiou])/g, 'i$1');
  result = result.replace(/uu([aeiou])/g, 'u$1');
  result = result.replace(/ee([aeiou])/g, 'e$1');
  result = result.replace(/oo([aeiou])/g, 'o$1');

  // Remove extra spaces
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

// Helper to transliterate entire JSON objects
export function transliterateResponse(obj) {
  if (typeof obj === 'string') {
    return tamilToThanglish(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => transliterateResponse(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = tamilToThanglish(value);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = transliterateResponse(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return obj;
}

