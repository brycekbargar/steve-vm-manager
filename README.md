### ChucK VM Manager ###
A node wrapper for the ChucK VM.

### Usage ###
Requiring this package returns an `VM` class. The class has the following methods:

##### `.start()` #####
Returns a `Promise` that resolves when the VM has started.  
Calls `chuck --loop` under the hood.

##### `.add(filePath)` #####
Returns a `Promise` when the file at the given absolute path is added to the VM.  
Calls `chuck --add filePath` under the hood.

*note: calling .add() on without starting a VM returns a rejected Promise*

### Example ###
```
const VM = require('chuck-steve-vm-manager'):

let chuck = new VM();

chuck
  .start()
  .then(() => chuck.add(someFilePath))
  .then(() => chuck.add(someFilePath));
```
