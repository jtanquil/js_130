// DNA class:
// takes a sequence of nucleic acids as an argument (string whose only characters are G, A, C, T)
// method hammingDistance(strand) which computes the hamming distance b/t it and strand
// input: a strand (string whose only characters are G/A/C/T)
// output: the hamming distance between the strand and this.strand
// given two strands, iterate through the characters in parallel, 
// comparing each pair of characters at the given index, 
// count the number of pairs that don't match up, 
// stop after exhausting the characters in the shorter strand
// 1. let index = 0 and hammingDistance = 0
// 2. if this.strand[index] !== strand[index], increment hammingDistance by 1
// 3. increment index by 1
// 4. repeat steps 1-3 until index >= min length between strand and this.strand
// 5. return hammingDistance

class DNA {
  constructor(strand) {
    this.strand = strand;
  }

  hammingDistance(otherStrand) {
    let strandLength = Math.min(otherStrand.length, this.strand.length);
    let hDist = 0;

    for (let index = 0; index < strandLength; index += 1) {
      if (this.strand[index] !== otherStrand[index]) {
        hDist += 1;
      }
    }

    return hDist;
  }
}

module.exports = DNA;