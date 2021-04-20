## Intro to Regex - Exercises ##

### Basic Matching ###

1. `/K/`

2. `/H/i`; you might want to use alternation (`/(h|H)/`) instead of the `i` flag in the case where you need to match a particular letter (not case-sensitive) as part of the regex, but there are other parts that require case sensitivity; in that case the `i` flag would render the entire regex case-insensitive, which is not what is needed.

3. `/dragon/`

4. `/(banana|orange|apple|strawberry)/`

5. `/(,| )/`

6. `/(blue|black)berry/`. This regex doesn't match `black berry` because it doesn't match the space between `black` and `berry` - there are two possible matches (due to alternation in the pattern `(blue|black)`) - `blueberry` and `blackberry`.

### Character Classes ###

1. `/[Kks]/`

2. `/[BCbc][AOUaou][tT]/`

3. `/[0-9A-Ja-j]/`

4. `/[a-wyz]/i`

5. `/[^xX]/` is not a valid answer to the previous exercise because we need an expression that only matches letters that are not `x` or `X`. `/[^xX]/` matches any **character** that isn't `x` or `X`; in particular, it will match `0`, `1`, `2`, `3`, `4` on the first line, which we don't want.

6. `/[^a-z]/i`

7. `/(ABC|abc)/` matches `ABC` and `abc`, whereas `/[Aa][Bb][Cc]/` will match any string where the first character is either `a` or `A`, the second either `b` or `B`, and the third either `c` or `C`. The first regex will not match `aBc`, but the second one will.

8. Both `/abc/i` and `/[Aa][Bb][Cc]/` will match any string consisting of the letters `a`, `b` and `c` in sequence, case-insensitive.

9. `/\[\^[0-9A-Za-z]-[0-9A-Za-z]\]/`

### Character Class Shortcuts ###

1. `/\s...\s/`

2. `/\s...\s/` doesn't match `Doc` because `Doc` is not delimited by whitespace characters. It doesn't match `red` because the whitespace character before `r` is already matched as the whitespace character aftter `g` in `big` and matches can't overlap (presumably). It doesn't match `box` because the character after `x` is `.` which is not a whitespace character. `Hup` is not matched because the character before `H` is a newline and the character after `p` is `!`, neither are whitespace. `2 3` is matched because the space between `2` and `3` matches the any character class shortcut `.`.

3. `/\s\h\h\h\h\s/` in Ruby, `/\s[\dA-F][\dA-F][\dA-F][\dA-F]\s/ig` in JavaScript.

4. `/[a-z][a-z][a-z]/i`

### Anchors ###

1. `/^The\b/`

2. `/\bcat$/`

3. `/\b[a-z][a-z][a-z]\b/i`

4. `/^(A|The) [A-Za-z][A-Za-z][A-Za-z][A-Za-z] (dog|cat)$/`

### Quantifiers ###

1. `/\bb[a-z]*e\b/`

2. `/^.*\?$/`

3. `/^.+\?$/`

4. `/^https?:\/\/\S*$/`

5. `/^\s*https?:\/\/\S*\s*$/`

6. `/\bhttps?:\/\/\S*/`

7. `/\b[a-z]*i[a-z]*i[a-z]*i[a-z]*\b/i`

8. `/\b\S+$/`

9. `/^(,\d+){3,6},$/`

10. `/^(\d+,){2,5}\d+$/`

11. `/^((\d+,){2}|(\d+,){5,})\d+$/`

12. `/<h1>.*?<\/h1>/`