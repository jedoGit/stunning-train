package LeetCode.HeapPriorityQueue.java;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.IntStream;

// class Project {
record Project(Integer capital, Integer profit) {
    // @Override
    // public String toString() {
    // return "Project [capital=" + capital + ", profit=" + profit + "]";
    // }
}

public class ipo {

    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        List<Project> projects = new ArrayList<>();

        int n = profits.length;

        IntStream.range(0, capital.length)
                .forEach(idx -> projects.add(new Project(capital[idx], profits[idx])));

        // for( int i = 0 ; i < n ; i++ ) {
        // projects.add(new Project(capital[i],profits[i]));
        // }

        // System.out.println(projects);
        Function<Project, Integer> comp = (project) -> project.capital();
        projects.sort(Comparator.comparing(comp));

        // System.out.println(projects);

        // Comparator<Integer> compIntegerReverse = (x,y) -> y-x;
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        int i = 0;

        while (k-- > 0) {
            while (i < n && projects.get(i).capital() <= w) {
                maxHeap.add(projects.get(i).profit());
                i++;
            }
            if (maxHeap.isEmpty()) {
                return w;
            }
            w += maxHeap.poll();
        }

        return w;
    }

    public static void main(String[] args) {
        int k = 2;
        int w = 0;
        int[] profits = { 1, 2, 3 };
        int[] capital = { 0, 1, 1 };

        int res = new ipo().findMaximizedCapital(k, w, profits, capital);

        System.out.println("Result: " + res);

    }
}
