## Intro to Regex - Notes ##

- alphanumerics: `/s/` matches to the character `s` (case-sensitive)
- special characters (**metacharacters**): `$ ^ * + ? . ( ) [ ] { } | \ /`
    - matching a literal metacharacter: escape it with a leading backslash (`/\?/` will match `?`)
- concatenation: two or more patterns can be concatenated to form a larger pattern (or a larger regex)
    - fundamental unit of regex is not characters or strings, but patterns
        - ex/ `/abc/` is the concatenation of 3 patterns, `a`, `b` and `c` - matches `abc`
- character class: denoted by brackets `[]`, takes a list of characters inside the brackets, matches and occurrence of any of the characters in the brackets
    - ex/ `/[aB]/` matches the `a` and the `B` in `Bad`
    - metacharacters inside a character class: `^ \ - [ ]`
    - range of characters: inside a character class, denoted by a starting character, a hyphen `-`, and the ending character
        - ex/ `/[a-z]/` matches any lowercase letters `a`, `b`, ..., `z`. `/[0-9]/` matches digits, `/[A-Z]/` matches uppercase letters
        - ranges can be combined: `/[0-9A-Fa-f]/` matches any hexadecimal digit
        - non-alphanumeric characters can act as the start/end of a range but not recommended (uses unicode characters?)
        - don't mix lower/uppercase letters in a range: `/[A-z]/` will match characters whose unicode values are between `Z` and `a`
    - negated classes: denoted by a caret `^`, matches any character NOT in the range
        - ex/ `/[^a]/` matches any character that isn't `a`, `/[^aeiou]/` matches any character not `a`, `e`, `i`, `o`, or `u`
        - note that this matches any **character** that isn't negated; not just restricted to letters
    - character class shortcuts:
        - `.`: matches any character
            - `/m` multiline option enables `.` to match newlines
            - `.` inside square brackets is the literal period character
        - `\s` and `\S`: `\s` matches whitespace characters, `\S` matches non-whitespace characters
            - whitespace characters: ` ` (space), `\t` (tab), `\v` (vertical tab), `\r` (carriage return), `\n` (line feed), `\f` (form feed), so `\s` is the same as `[ \t\v\r\n\f]`
            - inside square brackets, `\s` and `\S` represent alternatives to the other members of the class - for instance, `/[a-z\s]/` matches any lowercase character OR any whitespace character
        - `\d` and `\D`: `\d` matches any decimal digit `0`-`9`, `\D` matches any character that isn't a decimal digit
        - `\h` and `\H`: **Ruby only** `\h` matches any hex digit (`0`-`9`, `a`-`f`, `A`-`F`), `\H` matches characters that aren't hex digits
          - in JavaScript: need to do `[\dA-Fa-f]` to match `\h`
        - `\w` and `\W`: `\w` matches word characters - all alphabetical characters (lower and upper), all decimal digits, and underscores. `\W` matches non-word characters
            - `\w` is equivalent to `[0-9A-Za-z_]`
- `String.prototype.match`: takes a regex as an argument, returns a truthy value if the regex matches anywhere in the string
    - `"xyx".match(/[^x]/)` returns a truthy value even though it doesn't match with `x` bc it matches with the second character, `y`
- anchors: tells a regex where matches can begin or end
    - start/end of line: `^` matches beginning of a line, `$` matches end of a line
    - word boundaries: `\b` matches a **word boundary**, which occurs
        - between any pair of characters, one of which is a word character (matched by `\w`) and one is not (matched by `\W`)
        - at the beginning of a string, if the first character is a word character
        - at the end of a string if the last character is a word character
    - non-word boundaries: matched by `\B`, non-word boundaries occur anywhere else:
        - between any pair of characters, where the characters are iether both word characters or both non-word characters
        - at the beginning/end of a string if the first/last character is a non-word character
    - `\b` and `\B` don't work the same way in brackets - `\b` matches a backspace character
- quantifiers: used to match some number of occurrences of a pattern
    - `*`: matches 0 or more occurrences of the pattern to its left
        - **a note about "0 or more"**: possible to match zero-length strings, for instance `.*` will match every "zero-length" string in between characters since it matches 0 or more occurrences of any character
    - `+`: matches 1 or more occurrences of the pattern to its left
    - `?`: matches 0 or 1 occurrences of the pattern to its left
    - ranges: `p{m}` matches exactly `m` occurrences of the pattern `p`, `p{m,}` matches at least `m` occurrences of `p`, `p{m,n}` matches up to `m`, at most `n`, occurrences of `p`
    - **greediness vs laziness**: quantifiers are **greedy** by default - they match the longest possible string
        - ex/ `/a[abc]*c/` matches once with `xabcabcy`, matching with `abcabc`, as opposed to matching twice with `abc` and `abc`
        - sommetimes, you want a **lazy** match, matching the fewest possible characters; to do this, add `?` after the main quantifier. (`/a[abc]*?c/` will match `abc` twice in `xabcabcy`)
- `String.prototype.match`: can take a regex instead of a string
    - returns a truthy value that indicates whether a match occurred, and what substrings matched
        - from [`match` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match): returns an array, contents depend on the presence of a global `g` flag
            - without `g`: returns the matched string, along with some other properties defined on the array that describe the matched string and the capture groups (see documentation)
            - with `g`: returns all the matched strings
            ```javascript
            console.log("hello".match(/l/)); // ["l", index: 2, input: 'hello', groups: undefined]
            console.log("hello".match(/l/g)); // ["l", "l"]
            ```
- `String.prototype.split`: can take a regex instead of a string
    - the string will be split on any substrings that match the regex, instead of just a single character
    - useful for handling arbitrary whitespace/tabs/etc that separate data (as opposed to csv)
    ```javascript
    console.log("hi       there  \t        , hello".split(/[, \t]+/)); // ["hi", "there", "hello"]
    ```
- capture groups
    - the `()` metacharacters, in addition to grouping, also provide **capture** and **non-capture** groups
    - **idea**: capture groups capture characters that match part of a regex, and allow you to reuse those matches later on in the regex, and when constructing new values based on the matched string
    ```javascript
    /(['"]).+?\1/
    ```
    - here, whatever is matched by the pattern in the parentheses, `['"]` (double or single quote), is captured as part of a capture group, and whatever that matched string is used at the end of the regex with `\1`, a **backreference** to the first capture group in the regex
        - the order of capture groups is determined left-to-right
        - also possible to name capture groups for easier referencing (see documentation)
- `String.prototype.replace`: takes a regex, and a replacement string to replace anything matched by the regex
    - the replacement string can backreference capture groups:
    ```javascript
    console.log("hello".replace(/(ell)/, '$1 $1 $1')); // hell ell ello
    ```
    - here, the `$1` in the replacement string backreferences the capture group `(ell)` in the regex