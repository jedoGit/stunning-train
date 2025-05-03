const arrayOfStrings = [
  "The quick bulldog fox jump over the lazy bulldog.",
  "Peter Piper picked bulldog a peck of pickled pepper.",
];

const word = "bulldog";

const searchWord = (arrayOfStrings, stringInput) => {
  for (let i = 0; i < arrayOfStrings.length; i++) {
    let strSplit = arrayOfStrings[i].split(" ");
    for (let j = 0; j < strSplit.length; j++) {
      if (
        strSplit[j].replace(/[^a-zA-Z]/g, "").toLowerCase() ===
        stringInput.toLowerCase()
      ) {
        console.log(
          "The word [" +
            stringInput +
            "] was found in sentence [" +
            arrayOfStrings[i] +
            "] at offset [" +
            j +
            "]"
        );
      }
    }
  }
};

searchWord(arrayOfStrings, word);
