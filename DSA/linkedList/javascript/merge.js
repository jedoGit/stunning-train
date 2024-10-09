// Description
// The merge method takes in another LinkedList as an input and merges it with the current LinkedList.
// The elements in both lists are assumed to be in ascending order, but the input lists themselves do not need to be sorted.

// Parameters
// otherList: the other LinkedList to merge with the current list

// Return Value
// This method does not return a value, but it modifies the current LinkedList to contain the merged list.

// Example:
// // Create the first linked list with elements 1 -> 3 -> 5 -> 7
// const l1 = new LinkedList(1);
// l1.push(3);
// l1.push(5);
// l1.push(7);
 
// // Create the second linked list with elements 2 -> 4 -> 6 -> 8
// const l2 = new LinkedList(2);
// l2.push(4);
// l2.push(6);
// l2.push(8);
 
// // Merge the second list into the first one
// l1.merge(l2);
 
// // Now, l1 should contain the merged list 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8


// Details
// The merge method works by first obtaining the head node of the 'otherList' and storing it in a local variable named otherHead.
// A new dummy node is created, initialized with a value of 0. This dummy node serves as the temporary head of the merged list.
// A variable called current is set to the dummy node. This variable is used to traverse and construct the merged list.
// The method iterates through both the current list (this.head) and the other list (otherHead). It appends the node with the smaller value to the merged list and moves the head of that list to its next node.
// The current variable is updated to point to the last node in the merged list.
// If either of the original lists still has remaining nodes, these are appended to the end of the merged list.
// The head of the current list is updated to point to the node next to the dummy node, effectively removing the dummy node from the list.
// The length of the current list (this.length) is updated to include the length of the merged list.

// Notes
// This method assumes that both the current list and the other list are sorted in ascending order. If this is not the case, the merged list may not be sorted.
// The merge method modifies the current list to include elements from both lists. If you wish to keep the original lists intact, you should create a new list and copy elements into it.
// This JavaScript implementation doesn't have getHead, getTail, or getLength methods, unlike some other implementations. The head, tail, and length are directly accessed as properties of the LinkedList instance (this.head, this.tail, this.length).


function merge(otherList) {
    // This is the pointer to the head of the other LL
    // that we need to merge with our current LL
    let otherHead = otherList.head;

    // This is the dummy node. The dummy node is what we use to 
    // link all the merged nodes.
    let dummy = { value: 0, next: null };

   // Initially we point current pointer to dummy node
    let current = dummy;

    // We need to traverse to both LL until one of them is null
    while (this.head !== null && otherHead !== null) {

        // We check if the value pointed by head in the 
        // original LL is less than the other LL's head
        if (this.head.value < otherHead.value) {
        // Remember, initially, current points to the dummy node.
        // We link the dummy.next to the head of original LL.
        // Then, we move the new head to the next node on the original LL
            current.next = this.head;
            this.head = this.head.next;
        } else {
            // This means the otherhead is less.
            // So, we point the current.next to the other head
            // and move the otherhead pointer to the next node on the
            // other LL.
            current.next = otherHead;
            otherHead = otherHead.next;
        }

        // Then, lastly, we move current to the next node where 
        // we found the lower value.
        current = current.next;
    }

    // At this point, we exited the while loop because one of the LL
    // node is a null. So, we need to link to the rest of the LL.
    // Since the LLs are sorted, we just need to link directly.
    if (this.head !== null) {
        current.next = this.head;
    } else {
        current.next = otherHead;
        this.tail = otherList.tail;
    }

    // Now, we update the head of the original LL to point to dummy.next
    this.head = dummy.next;
    // The new lenght of the original LL is the sum of the lenght of both LLs
    this.length += otherList.length;
}