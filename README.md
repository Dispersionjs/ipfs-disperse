<p align="left">
  <img src="https://ipfs.io/ipfs/QmdjC7zjKi7pYoo3YatWL6pNvJqDxAZJhXBBeXzXhzhEwp" width="100"/>
</p>


# ipfs-disperse

Use when developing node.js applications with IPFS. 

ipfs-disperse is used to run common IPFS commands from node including: add, pin, unpin, and start daemon.

# Installation 

Either through cloning with git or by using [npm](http://npmjs.org):

    npm install ipfs-disperse

# Usage

Please install IPFS before installing ipfs-disperse from https://ipfs.io/docs/install/

    const ipfs-disperse = require('ipfs-disperse');
    
## ipfsAdd

    disperse.ipfsAdd("file path").then(function (data) {
          alert("file added correctly");
      }).catch(function (error) {
          alert("error");
      });
      
## publishHash

    disperse.publishHash("IPFS Hash").then(function (data) {
          alert("Hash has been published!");
      }).catch(function (error) {
          alert("error");
      });
      
## addPin

    disperse.addPin("IPFS Hash").then(function (data) {
          alert("Hash has been pinned!");
      }).catch(function (error) {
          alert("error");
      });
      
## unPin

    disperse.unPin("IPFS Hash").then(function (data) {
          alert("Hash has been unpinned!");
      }).catch(function (error) {
          alert("error");
      });
