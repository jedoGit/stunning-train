# 2.  Remove duplicates but keep the original order.

# Use a set to track if an items has been seen in the past. 
# If not, add to the list and if seen don't add to the list.

def dedupe_keep_order(items: list[int]) -> list[int]:
    seen = set()
    ordered_list = []

    # loop through the items
    for item in items:
        if item not in seen:
            seen.add(item)
            ordered_list.append(item)

    return ordered_list

def main() -> None:
    items = [3, 1, 5, 3, 2, 5, 1, 4, 3, 2]
    out = []
    out = dedupe_keep_order(items)
    print(f"Original List: {items}" )
    print(f"Deduplicated List: {out}")


if __name__ == "__main__":
    main()