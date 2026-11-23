

# 1.  Count words, ignoring case and punctuation at the ends.

def word_counts(text: str) -> int:
    # Use a dictionary to assign a count for each word found in the text input
    counts = {}

    # Get each words in the text input by spliting the string and converting each word to a lower case
    # Also remove any punctuations for example hello! or Dear or heaven, or ending.
    for word in text.lower().split():
        word = word.strip(".,!?")
        if word is not None:
            # Search the dictionary for the word key, and increment the value by 1.
            # If there's no value assigned yet, return default value of 0.
            counts[word] = counts.get(word, 0) + 1

    return counts

def main() -> None:
    text = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quo in dolore sint est dolore laboris amet tempore commodo aute et nisi. Quo et accusamus proident incididunt cumque incididunt iusto commodo est excepteur. Eiusmod ad imperdiet officia culpa pariatur in culpa dolorem elit atque. Sunt esse maxime eligendi provident nulla."
    counts = {}
    counts = word_counts(text)
    print(counts)


if __name__ == "__main__":
    main()
