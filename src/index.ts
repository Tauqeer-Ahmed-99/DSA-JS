import LinkedList from "./linked-list/linked-list.js";

const ll = new LinkedList<number>();

ll.push(1);

ll.push(2);

ll.push(3);

ll.push(4);

ll.push(5);

ll.log();

console.log(ll.pop());

ll.log();

console.log(ll.pop());

ll.log();

console.log(ll.pop());

ll.log();

console.log(ll.pop());

ll.log();

console.log(ll.pop());

ll.log();

console.log(ll);
