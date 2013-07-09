var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  

    Home
    Download
    About
    npm Registry
    Docs
    Blog
    Community
    Logos
    Jobs

@nodejs
Node.js v0.10.12 Manual & Documentation

Index | View on single page | View as JSON
Table of Contents

    File System
        fs.rename(oldPath, newPath, callback)
        fs.renameSync(oldPath, newPath)
        fs.ftruncate(fd, len, callback)
        fs.ftruncateSync(fd, len)
        fs.truncate(path, len, callback)
        fs.truncateSync(path, len)
        fs.chown(path, uid, gid, callback)
        fs.chownSync(path, uid, gid)
        fs.fchown(fd, uid, gid, callback)
        fs.fchownSync(fd, uid, gid)
        fs.lchown(path, uid, gid, callback)
        fs.lchownSync(path, uid, gid)
        fs.chmod(path, mode, callback)
        fs.chmodSync(path, mode)
        fs.fchmod(fd, mode, callback)
        fs.fchmodSync(fd, mode)
        fs.lchmod(path, mode, callback)
        fs.lchmodSync(path, mode)
        fs.stat(path, callback)
        fs.lstat(path, callback)
        fs.fstat(fd, callback)
        fs.statSync(path)
        fs.lstatSync(path)
        fs.fstatSync(fd)
        fs.link(srcpath, dstpath, callback)
        fs.linkSync(srcpath, dstpath)
        fs.symlink(srcpath, dstpath, [type], callback)
        fs.symlinkSync(srcpath, dstpath, [type])
        fs.readlink(path, callback)
        fs.readlinkSync(path)
        fs.realpath(path, [cache], callback)
        fs.realpathSync(path, [cache])
        fs.unlink(path, callback)
        fs.unlinkSync(path)
        fs.rmdir(path, callback)
        fs.rmdirSync(path)
        fs.mkdir(path, [mode], callback)
        fs.mkdirSync(path, [mode])
        fs.readdir(path, callback)
        fs.readdirSync(path)
        fs.close(fd, callback)
        fs.closeSync(fd)
        fs.open(path, flags, [mode], callback)
        fs.openSync(path, flags, [mode])
        fs.utimes(path, atime, mtime, callback)
        fs.utimesSync(path, atime, mtime)
        fs.futimes(fd, atime, mtime, callback)
        fs.futimesSync(fd, atime, mtime)
        fs.fsync(fd, callback)
        fs.fsyncSync(fd)
        fs.write(fd, buffer, offset, length, position, callback)
        fs.writeSync(fd, buffer, offset, length, position)
        fs.read(fd, buffer, offset, length, position, callback)
        fs.readSync(fd, buffer, offset, length, position)
        fs.readFile(filename, [options], callback)
        fs.readFileSync(filename, [options])
        fs.writeFile(filename, data, [options], callback)
        fs.writeFileSync(filename, data, [options])
        fs.appendFile(filename, data, [options], callback)
        fs.appendFileSync(filename, data, [options])
        fs.watchFile(filename, [options], listener)
        fs.unwatchFile(filename, [listener])
        fs.watch(filename, [options], [listener])
            Caveats
                Availability
                Filename Argument
        fs.exists(path, callback)
        fs.existsSync(path)
        Class: fs.Stats
        fs.createReadStream(path, [options])
        Class: fs.ReadStream
            Event: 'open'
        fs.createWriteStream(path, [options])
        Class: fs.WriteStream
            Event: 'open'
            file.bytesWritten
        Class: fs.FSWatcher
            watcher.close()
            Event: 'change'
            Event: 'error'

File System#

Stability: 3 - Stable

File I/O is provided by simple wrappers around standard POSIX functions. To use this module do require('fs'). All the methods have asynchronous and synchronous forms.

The asynchronous form always take a completion callback as its last argument. The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception. If the operation was completed successfully, then the first argument will be null or undefined.

When using the synchronous form any exceptions are immediately thrown. You can use try/catch to handle exceptions or allow them to bubble up.

Here is an example of the asynchronous version:

var fs = require('fs');

fs.unlink('/tmp/hello', function (err) {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

Here is the synchronous version:

var fs = require('fs');

fs.unlinkSync('/tmp/hello')
console.log('successfully deleted /tmp/hello');

With the asynchronous methods there is no guaranteed ordering. So the following is prone to error:

fs.rename('/tmp/hello', '/tmp/world', function (err) {
  if (err) throw err;
  console.log('renamed complete');
});
fs.stat('/tmp/world', function (err, stats) {
  if (err) throw err;
  console.log('stats: ' + JSON.stringify(stats));
});

It could be that fs.stat is executed before fs.rename. The correct way to do this is to chain the callbacks.

fs.rename('/tmp/hello', '/tmp/world', function (err) {
  if (err) throw err;
  fs.stat('/tmp/world', function (err, stats) {
    if (err) throw err;
    console.log('stats: ' + JSON.stringify(stats));
  });
});

In busy processes, the programmer is strongly encouraged to use the asynchronous versions of these calls. The synchronous versions will block the entire process until they complete--halting all connections.

Relative path to filename can be used, remember however that this path will be relative to process.cwd().

Most fs functions let you omit the callback argument. If you do, a default callback is used that ignores errors, but prints a deprecation warning.

IMPORTANT: Omitting the callback is deprecated. v0.12 will throw the errors as exceptions.
fs.rename(oldPath, newPath, callback)#

Asynchronous rename(2). No arguments other than a possible exception are given to the completion callback.
fs.renameSync(oldPath, newPath)#

Synchronous rename(2).
fs.ftruncate(fd, len, callback)#

Asynchronous ftruncate(2). No arguments other than a possible exception are given to the completion callback.
fs.ftruncateSync(fd, len)#

Synchronous ftruncate(2).
fs.truncate(path, len, callback)#

Asynchronous truncate(2). No arguments other than a possible exception are given to the completion callback.
fs.truncateSync(path, len)#

Synchronous truncate(2).
fs.chown(path, uid, gid, callback)#

Asynchronous chown(2). No arguments other than a possible exception are given to the completion callback.
fs.chownSync(path, uid, gid)#

Synchronous chown(2).
fs.fchown(fd, uid, gid, callback)#

Asynchronous fchown(2). No arguments other than a possible exception are given to the completion callback.
fs.fchownSync(fd, uid, gid)#

Synchronous fchown(2).
fs.lchown(path, uid, gid, callback)#

Asynchronous lchown(2). No arguments other than a possible exception are given to the completion callback.
fs.lchownSync(path, uid, gid)#

Synchronous lchown(2).
fs.chmod(path, mode, callback)#

Asynchronous chmod(2). No arguments other than a possible exception are given to the completion callback.
fs.chmodSync(path, mode)#

Synchronous chmod(2).
fs.fchmod(fd, mode, callback)#

Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback.
fs.fchmodSync(fd, mode)#

Synchronous fchmod(2).
fs.lchmod(path, mode, callback)#

Asynchronous lchmod(2). No arguments other than a possible exception are given to the completion callback.

Only available on Mac OS X.
fs.lchmodSync(path, mode)#

Synchronous lchmod(2).
fs.stat(path, callback)#

Asynchronous stat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. See the fs.Stats section below for more information.
fs.lstat(path, callback)#

Asynchronous lstat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.
fs.fstat(fd, callback)#

Asynchronous fstat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. fstat() is identical to stat(), except that the file to be stat-ed is specified by the file descriptor fd.
fs.statSync(path)#

Synchronous stat(2). Returns an instance of fs.Stats.
fs.lstatSync(path)#

Synchronous lstat(2). Returns an instance of fs.Stats.
fs.fstatSync(fd)#

Synchronous fstat(2). Returns an instance of fs.Stats.
fs.link(srcpath, dstpath, callback)#

Asynchronous link(2). No arguments other than a possible exception are given to the completion callback.
fs.linkSync(srcpath, dstpath)#

Synchronous link(2).
fs.symlink(srcpath, dstpath, [type], callback)#

Asynchronous symlink(2). No arguments other than a possible exception are given to the completion callback. type argument can be either 'dir', 'file', or 'junction' (default is 'file'). It is only used on Windows (ignored on other platforms). Note that Windows junction points require the destination path to be absolute. When using 'junction', the destination argument will automatically be normalized to absolute path.
fs.symlinkSync(srcpath, dstpath, [type])#

Synchronous symlink(2).
fs.readlink(path, callback)#

Asynchronous readlink(2). The callback gets two arguments (err, linkString).
fs.readlinkSync(path)#

Synchronous readlink(2). Returns the symbolic link's string value.
fs.realpath(path, [cache], callback)#

Asynchronous realpath(2). The callback gets two arguments (err, resolvedPath). May use process.cwd to resolve relative paths. cache is an object literal of mapped paths that can be used to force a specific path resolution or avoid additional fs.stat calls for known real paths.

Example:

var cache = {'/etc':'/private/etc'};
fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
});

fs.realpathSync(path, [cache])#

Synchronous realpath(2). Returns the resolved path.
fs.unlink(path, callback)#

Asynchronous unlink(2). No arguments other than a possible exception are given to the completion callback.
fs.unlinkSync(path)#

Synchronous unlink(2).
fs.rmdir(path, callback)#

Asynchronous rmdir(2). No arguments other than a possible exception are given to the completion callback.
fs.rmdirSync(path)#

Synchronous rmdir(2).
fs.mkdir(path, [mode], callback)#

Asynchronous mkdir(2). No arguments other than a possible exception are given to the completion callback. mode defaults to 0777.
fs.mkdirSync(path, [mode])#

Synchronous mkdir(2).
fs.readdir(path, callback)#

Asynchronous readdir(3). Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'.
fs.readdirSync(path)#

Synchronous readdir(3). Returns an array of filenames excluding '.' and '..'.
fs.close(fd, callbac
  response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
