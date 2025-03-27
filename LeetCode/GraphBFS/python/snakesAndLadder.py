# You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.

# You start on square 1 of the board. In each move, starting from square curr, do the following:

# Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
# This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
# If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
# The game ends when you reach the square n2.
# A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or ladder is board[r][c]. Squares 1 and n2 are not the starting points of any snake or ladder.

# Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

# For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
# Return the least number of dice rolls required to reach the square n2. If it is not possible to reach the square, return -1.

# Example 1:

# Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
# Output: 4
# Explanation:
# In the beginning, you start at square 1 (at row 5, column 0).
# You decide to move to square 2 and must take the ladder to square 15.
# You then decide to move to square 17 and must take the snake to square 13.
# You then decide to move to square 14 and must take the ladder to square 35.
# You then decide to move to square 36, ending the game.
# This is the lowest possible number of moves to reach the last square, so return 4.
# Example 2:

# Input: board = [[-1,-1],[-1,3]]
# Output: 1

# Constraints:

# n == board.length == board[i].length
# 2 <= n <= 20
# board[i][j] is either -1 or in the range [1, n2].
# The squares labeled 1 and n2 are not the starting points of any snake or ladder.

# TC: O(n*n). Worst case is when there are no ladders, you'll visit all cells. There maybe cycle if you keep on getting a snake? It's hard to quantify
# SC: O(k). Worst case is when there are no ladders and you keep getting 1 on the die. You'll add 6 moves to your queue.


class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        length = len(board)
        #  We need to reverse the board. If you look at the snakes and ladder board, cell 1 is in position [5, 0]. Also, in each row, every odd row, the positions are flipped. We have to account for that.
        #   Reversing the rows now will move cell 1 to position [0,0] and cell 36 to position [5,0]. This will make the coding easier.
        board.reverse()

        # print(board)

        # Helper function that converts the value in a cell to a position in the grid. This is used to jump from a cell to another cell if you hit a snake or a ladder
        def intToPos(cell):
            # Convert the cell number to a row, column position of the grid
            r = (cell-1)//length
            c = (cell-1) % length
            # For every even row, we need to inverse the column value
            if r % 2:
                c = length - 1 - c

            return [r, c]

        # Using BFS
        q = deque()
        q.append([1,0]) #Here, we're pushing a pair, [cellNumber, numMoves]

        visited = set() #We need to keep track of the cell we've visited and we want to visit it only once.

        while q:
            cell, numMoves = q.popleft() # pop left from the queue

            for i in range(1, 7):
                # We'll try all cells and find which one will take less moves
                nextCell = cell + i

                # The value in the cell represents the number of cell we need to jump to.
                # This helper function will return the position of the grid were we need to jump to
                r,c = intToPos(nextCell)

                # Jump to the next cell if the cell we landed is not -1
                if board[r][c] != -1:
                    nextCell = board[r][c]
                # this is the case were we reached the cell last cell and we're done!
                if nextCell == length*length: return numMoves + 1

                # Check if we've have not visited this cell. Add it to the visited and BFS to the next cell
                if nextCell not in visited:
                    visited.add(nextCell)
                    q.append([nextCell, numMoves + 1])

        return -1