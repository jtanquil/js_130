"use strict";

let Account = {
  init(email, password, firstName, lastName) {
    const DIGIT_UNICODE_RANGE = {min: 48, max: 57};
    const UPPERCASE_UNICODE_RANGE = {min: 65, max: 90};
    const LOWERCASE_UNICODE_RANGE = {min: 97, max: 122};
    const VALID_UNICODE_CHARS =
      [].concat(getRange(DIGIT_UNICODE_RANGE),
        getRange(UPPERCASE_UNICODE_RANGE), getRange(LOWERCASE_UNICODE_RANGE));

    function getRange(rangeBounds) {
      let range = [];
      for (let index = rangeBounds.min; index <= rangeBounds.max; index += 1) {
        range.push(index);
      }

      return range;
    }
    
    function generateDisplayName() {
      const DISPLAY_NAME_LENGTH = 16;
      let displayName = "";

      while (displayName.length < DISPLAY_NAME_LENGTH) {
        let randomIndex = Math.floor(Math.random() * VALID_UNICODE_CHARS.length);
        displayName += String.fromCharCode(VALID_UNICODE_CHARS[randomIndex]);
      }

      return displayName;
    }

    function validPassword(inputPassword) {
      return password === inputPassword;
    }

    function checkForPassword(callback, inputPassword, ...args) {
      return validPassword(inputPassword) ? callback(...args) : "Invalid Password";
    }

    this.displayName = generateDisplayName();

    Object.assign(Account, {
      firstName(inputPassword) {
        return checkForPassword(() => firstName, inputPassword);
      },

      lastName(inputPassword) {
        return checkForPassword(() => lastName, inputPassword);
      },

      email(inputPassword) {
        return checkForPassword(() => email, inputPassword);
      },

      resetPassword(inputPassword, newPassword) {
        return checkForPassword((newPass) => {
          password = newPass;
          return true;
        }, inputPassword, newPassword);
      },

      reanonymize(inputPassword) {
        return checkForPassword(() => {
          this.displayName = generateDisplayName();
          return true;
        }, inputPassword);
      }
    })

    return this;
  }
}

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(displayName === fooBar.displayName); // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

console.log(fooBar.hasOwnProperty("firstName")); // logs false