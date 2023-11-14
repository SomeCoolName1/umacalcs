export const TextCleaner = (text) => {
  if (!text) return;

  let output = text.replace(/<size=18>|<b>|<\/b>|\\n|\\N|<\/size>/gi, "");

  return TextNewLine(output);
};

export const TextNewLine = (text) => {
  if (!text) return;

  //For conditions, replaces & and @ to have line breaks
  const newLineSymbols = text.replace(/&/g, "\n&").replace(/@/g, "\n@\n");
  const newLineText = newLineSymbols
    .replace(/when:/, "when: \n")
    .replace(/OR/g, "\nOR\n");

  return newLineText;
};

//Text break for before and after
//When:
//Or
//@
