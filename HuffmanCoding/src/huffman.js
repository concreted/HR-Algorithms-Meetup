// // Given a Huffman tree and a string, encode that string into a new string
// // consisting only of 1s and 0s, using the code given by the tree.
var encodeString = function(input, huffmanTree) {
    console.log(huffmanTree);
    var result = '';

    for (var i = 0; i < input.length; i++) {
	var current = huffmanTree	
    }

    return 
};

// // Given a Huffman tree and a string of 1s and 0s, decode that string into
// // a new, human-readable string, using the code given by the tree.
var decodeString = function(input, huffmanTree) {
  return "result";
};

// Given a corpus of text, return a Huffman tree that represents the
// frequencies of characters in the corpus.
//
// You should use the `PriorityQueue` class that is provided in the
// file `priorityQueue.js`.  The relevant methods are .insert(key, val),
// which inserts a value with the given key into the queue, and
// .extract(), which returns the {key: key, val: val} pair with the lowest
// key priority.
//
// You may also use the `Tree` class that is provided in the file `misc.js`
// Some corpuses are included as the variables `lorumIpsum` and `declaration`.
var makeHuffmanTree = function(corpus) {
    var chars = corpus.split('');
    var freqs = {};
    for (var i = 0; i < chars.length; i++) {
	if (freqs[chars[i]] === undefined) {
	    freqs[chars[i]] = 1;
	} 
	else {
	    freqs[chars[i]] += 1;
	}
    }

    var pq = new PriorityQueue;

    for (var c in freqs) {
	var tree = new Tree([c]);
	pq.insert(freqs[c], tree);
    }
    
    while (pq.size() > 1) {
	var a = pq.extract();
	var b = pq.extract();

	var totalFreq = a.key + b.key;


	var newNode = new Tree(a.val.val.concat(b.val.val));

	newNode.left = a.val;
	newNode.right = b.val;

	pq.insert(totalFreq, newNode);
    }

    console.log(pq.peek().val);
    
    return pq.peek().val;
};

