class Solution:
    def visiblePoints(self, points: List[List[int]], angle: int, location: List[int]) -> int:
        candidateAngles = []
        
        for (x,y) in points:
            if not (x == location[0] and y == location[1]):
                a = math.atan2((y-location[1]),(x-location[0])) * 180 / math.pi
                candidateAngles.append(a)
                
        candidateAngles.sort()
        # print(candidateAngles)

        onCenterCount = len(points) - len(candidateAngles)
        # print(onCenterCount)
        
        for a in candidateAngles:
            if a < 0:
                candidateAngles.append(a + 360)

        # print(candidateAngles)

        r = 0
        l = 0
        res = 0

        while ( r < len(candidateAngles) ):
            while( candidateAngles[r] - candidateAngles[l] > float(angle) ):
                l += 1
            res = max(res, r-l+1)
            r += 1
        
        return res + onCenterCount