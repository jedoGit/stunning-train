# 5.  Sort releases by date, then by name
# sample input: [
#                {"date":"2026-10-1", "name": "Andy Shovel"}, 
#                {"date":"2026-10-1", "name": "Sandy Shovel"}, 
#                {"date":"2026-9-30", "name": "Warlock Dave"}, 
#                {"date":"2025-5-6", "name": "Watanabe Shaziki"}
#               ]

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

    sorted_list = sort_releases(releases)

    print(f"before: {releases}")
    print(f"after: {sorted_list}")

if __name__ == "__main__":
    main()


