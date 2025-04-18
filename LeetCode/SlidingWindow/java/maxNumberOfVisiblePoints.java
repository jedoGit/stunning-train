class Solution {
    public int visiblePoints(List<List<Integer>> points, int angle, List<Integer> location) {
        List<Double> candidateAngles = new ArrayList();

        for (int i = 0; i < points.size(); i++) {
            // System.out.print("x: " + points.get(i).get(0) + " y: " + points.get(i).get(1)
            // + "\n");
            int x = points.get(i).get(0);
            int y = points.get(i).get(1);
            int lx = location.get(0);
            int ly = location.get(1);
            if (!(x == lx && y == ly)) {
                double a = Math.atan2((y - ly), (x - lx)) * 180 / Math.PI;
                candidateAngles.add(a);
            }
        }

        // System.out.println(candidateAngles);

        Collections.sort(candidateAngles);

        int onCenterCount = points.size() - candidateAngles.size();

        // System.out.println("candidateAngles: " + candidateAngles + "\nonCenterCount:
        // " + onCenterCount);

        List<Double> aList = new ArrayList(candidateAngles);

        for (Double a : candidateAngles) {
            if (a < 0) {
                aList.add(a + 360d);
            }
        }

        // System.out.println(aList);

        int r = 0;
        int l = 0;
        int res = 0;

        while (r < aList.size()) {
            while (aList.get(r) - aList.get(l) > Double.valueOf(angle)) {
                l++;
            }
            res = Math.max(res, r - l + 1);
            r++;
        }

        return res + onCenterCount;
    }
}