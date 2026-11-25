# 3.  Group ticket IDs by status, from records like {"id": 1, "status": "open"}.
# Output should be an object where keys are the status and for each status, the value is a list of all ids.
# For example, {"open": [1,4,6], "complete": [2,6,9]}

# We'll use defaultdict vs standard dict because standard dict raise keyerror when a key does not exist, 
# while defaultdict can return a default value if a key does not exist.

from collections import defaultdict

# tickets is a list of dictionaries, where the dictionary, the keys are of string type
# and the values are either string or integer type
# We can also set it as a tuple so the array is immutable.
def by_status(tickets: tuple[dict[str,int|str]]) -> dict[str, list[int]]:
    groupStatus = defaultdict(list)

    for t in tickets:
        # for each ticket, access the status value and assign the ids to the status
        groupStatus[t.get("status")].append(t.get("id"))

    # Let's return as a standard dictionary
    return dict(groupStatus)


def main():
    record = (
        {"id": 1, "status": "open"},
        {"id": 2, "status": "complete"},
        {"id": 3, "status": "pending"},
        {"id": 4, "status": "pending"},
        {"id": 5, "status": "complete"},
        {"id": 6, "status": ""},

    )

    group = by_status(record)

    print(group)


if __name__ == "__main__":
    main()


