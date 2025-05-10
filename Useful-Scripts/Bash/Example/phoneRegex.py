import re
text = ["my phone number is 4085551234", "my phone number is (408)5551234","my phone number is (408) 5551234","my phone number is (408) 555-1234", "my phone number is (408)555-1234", "my phone number is (408)555.1234", "my phone number is (408) 555.1234", "my phone number is 408.555.1234", "my phone number is 408-555-1234", "my phone number is 1408-555-1234", "my phone number is 1-408-555-1234", "my phone number is 63-408-555-1234", "my phone number is +63-408-555-1234", "my phone number is -63-408+555-1234"]
print (text)
print ("Matches:")

# pattern = re.compile(r"[\+]?([0-9]{0,3})[-.]?\s?[\(]?([0-9]{3})[\)-.]?\s?([0-9]{3})[-.]?\s?([0-9]{4})")
pattern = re.compile(r"\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*")

for str in text:
    match = re.search(pattern, str)
    # print(match.group() + ": " + match.group(1) + match.group(2) + "-" + match.group(3) + "-" +  match.group(4))
    # if match.group() != NoneTy
    if ( match):
        print(str + " matched: " + match.group())
    else:
        print(str + " No Match for this one")