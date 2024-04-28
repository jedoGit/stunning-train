// Implement a member function called partitionList(x) that partitions the linked list such that all nodes with values less than x come before nodes with values greater than or equal to x.
// Note: this linked list class does not have a tail which will make this method easier to implement.
// The original relative order of the nodes should be preserved.

// Input:
// An integer x, the partition value.

// Output:
// The function should modify the linked list in-place, such that all nodes with values less than x come before nodes with values greater than or equal to x.

// Constraints:
// You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
// You can only traverse the linked list once.
// You can create temporary nodes to make the implementation simpler.

// Example 1:
// Input:
// Linked List: 3 -> 8 -> 5 -> 10 -> 2 -> 1 x: 5

// Process:
// Values less than 5: 3, 2, 1
// Values greater than or equal to 5: 8, 5, 10

// Output:
// Linked List: 3 -> 2 -> 1 -> 8 -> 5 -> 10

// Example 2:
// Input:
// Linked List: 1 -> 4 -> 3 -> 2 -> 5 -> 2 x: 3

// Process:
// Values less than 3: 1, 2, 2
// Values greater than or equal to 3: 4, 3, 5

// Output:
// Linked List: 1 -> 2 -> 2 -> 4 -> 3 -> 5

// Tips:
// While traversing the linked list, maintain two separate chains: one for values less than x and one for values greater than or equal to x.
// Use dummy nodes to simplify the handling of the heads of these chains.
// After processing the entire list, connect the two chains to get the desired arrangement.

// Note:
// The solution must maintain the relative order of nodes. For instance, in the first example, even though 8 appears before 5 in the original list, the partitioned list must still have 8 before 5 as their relative order remains unchanged.

// Note:
// You must solve the problem WITHOUT MODIFYING THE VALUES in the list's nodes (i.e., only the nodes' next pointers may be changed.)

function partitionList(x) {
  // If LL is empty, return right away
  if (this.head === null) {
    return;
  }

  // Use two dummy nodes, we'll use these nodes to connect
  // the nodes from the original LL

  // This node will capture all the nodes where value < x
  const dummy1 = new Node(0);

  // This node will capture all the nodes where value >= x
  const dummy2 = new Node(0);

  // We also need pointers for these two dummy nodees
  let prev1 = dummy1;
  let prev2 = dummy2;

  // We need a pointer to traverse the original ll
  let current = this.head;

  // Let's traverse the ll
  while (current !== null) {
    // Check if current.value < XMLList
    if (current.value < x) {
      // connect this node to dummy1
      prev1.next = current;
      prev1 = current;
    } else {
      // connect this node to dummy2
      prev2.next = current;
      prev2 = current;
    }
    // Move the pointer to the next node
    current = current.next;
  }

  // Once we're done traversing the original LL, we should now have
  // 2 dummy LLs, that we need to connect
  // Remember dummy2(0) === 0, we need to connect to dummy2.next
  dummy2.next = null;
  dummy1.next = dummy2.next;

  // We don't have the original LL anymore, let's point the orinial head TO
  // the new LL. Remember dummy1(0) === 0, we need to connect to dummy1.next
  this.head = dummy1.next;
}
