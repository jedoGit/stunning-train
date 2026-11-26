# 4.  Load JSON safely, returning a clear error instead of crashing.

import json

def safe_load(text: str | bytes | bytearray) -> tuple[any, str | None]:
    # use try-except to safely handle errors
    try:
        # This returns a tuple "json, None" for a successful load
        return json.loads(text), None
    except json.JSONDecodeError as err:
        # This returns a tuple "None, error message" for a non-successful load
        return None, f"bad JSON at line {err.lineno}: {err.msg}"

def main():
    # This is a valid input
    text_input = '{"name": "Alice", "age": 30, "active": true}'
    data, err = safe_load(text_input)

    print(f"data: {data}, error: {err}")


if __name__ == "__main__":
    main()

