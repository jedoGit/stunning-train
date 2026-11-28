# 5.  Sort releases by date, then by name
# sample input: [
#                {"date":"2026-10-1", "name": "Andy Shovel"}, 
#                {"date":"2026-10-1", "name": "Sandy Shovel"}, 
#                {"date":"2026-9-30", "name": "Warlock Dave"}, 
#                {"date":"2025-5-6", "name": "Watanabe Shaziki"}
#               ]

# 6.  Return the last three releases, newest first (list). Key idea: slice from -3, then reverse with [::-1].

from datetime import date

def sort_releases(releases: list[dict[str, str | date]]) -> list[dict[str, str]]:
    return sorted(releases, key=lambda r: (r["date"], r["name"]))

def main():
    releases =  [
               {"date": date(2026, 10, 1), "name": "Sandy Shovel"}, 
               {"date": date(2026, 10, 1), "name": "Andy Shovel"}, 
               {"date": date(2026, 9, 30), "name": "Warlock Dave"}, 
               {"date": date(2025, 5, 6), "name": "Watanabe Shaziki"}
              ]

    # Sort the release records by date then by name
    sorted_list = sort_releases(releases)

    # Return the last 3 releases, newest first.
    last_three_releases = sorted_list[-3:]

    # Slicing will return a new copy of the list.
    last_three_releases_newest_first = last_three_releases[::-1]

    print(f"before: {releases}")
    print(f"after: {sorted_list}")
    print(f"last 3 releases: {last_three_releases}")
    print(f"last 3 releases newest first: {last_three_releases_newest_first}")

if __name__ == "__main__":
    main()


