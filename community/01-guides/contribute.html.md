```
title: Contributing
```



## General Contributions

### Donations

With your help, we'll be able to work on our open-source projects full time! Isn't that awesome? [Donate now to let that happen!](/donate)


### Publicize

Help spread the word:

- Join the [Bevry Gratipay Community](/gittip-community)
- Join the [Bevry Google+ Community](/google+)
- Talk about us on Social Media; Twitter, Blogging, etc.
- Write about your experiences of our projects on your blog
- Do a short less than a minute video testimonial of our project on YouTube!
- And just continue to be awesome

DocPad users can also:

- Star the [DocPad GitHub Repository](https://github.com/bevry/docpad) by clicking the "Star" button on the top right
- Star the [DocPad NPM Package](https://npmjs.org/package/docpad) by running `npm star docpad` in your terminal



## Contributing Code & Documentation


### Coding Standards & Style Guide

Follow the [Bevry Coding Standards](/community/coding-standards) when writing your changes



### Documentation

To update our documentation:

1. Our documentation is located at the [`bevry/documentation` repository](https://github.com/bevry/documentation)
1. We have [strict documentation criteria](/community/documentation-guidelines) that all documentation changes must abide by
1. You can edit a file by opening that file in the repository browser, and then clicking the "Edit" button
1. Once done, click save changes or whatever the button says and this will then take you to a "Submit Pull Request" page
1. Fill in the details and click submit

DocPad documentation is located at the [`docpad/documentation` repository](https://github.com/docpad/documentation)



### Development Environment

Before you begin coding, you have to setup your development environment for our projects. This involves the following steps:

1. Install [Node.js](/node/install)
1. Install CoffeeScript globally: `npm install -g coffee-script` (may require `sudo` access). This will give you access to the `cake` command which we use to automate a lot of publishing, build, and testing processes.
1. Make your changes!


### Publishing

Follow these steps in order to implement your changes/improvements into your desired project:


#### Preparation

1. Make sure your changes are on their own branch that is branched off from master
    1. You can do this by: `git checkout master; git checkout -b your-new-branch`
    1. And push the changes up by: `git push origin your-new-branch`
1. Make sure all tests are passing: `cake test`
    1. If possible, add tests for your change, if you don't know how, mention this in your pull request
1. If the project has a prepublish step, run it: `cake prepublish` (if it doesn't have this step that command will fail)


#### Pull Request

To send your changes for the project owner to merge in:

1. Submit your pull request
    1. When submitting, if the original project has a `dev` or `integrate` branch, use that as the target branch for your pull request instead of the default `master`
    1. By submitting a pull request you agree for your changes to have the same license as the original plugin


#### Publish

To publish your changes as the project owner:

1. Switch to the master branch: `git checkout master`
1. Merge in the changes of the feature branch (if applicable)
1. Increment the version number in the `package.json` file according to the [semantic versioning](http://semver.org) standard, that is:
    1. `x.0.0` MAJOR version when you make incompatible API changes (note: DocPad plugins must use v2 as the major version, as v2 corresponds to the current DocPad v6.x releases)
    1. `x.y.0` MINOR version when you add functionality in a backwards-compatible manner
    1. `x.y.z` PATCH version when you make backwards-compatible bug fixes

1. Add an entry to the changelog following the format of the previous entries, an example of this is:

    ``` markdown
    - v6.29.0 April 1, 2013
        - Progress on [issue #474](https://github.com/bevry/docpad/issues/474)
        - DocPad will now set permissions based on the process's ability
            - Thanks to [Avi Deitcher](https://github.com/deitch), [Stephan Lough](https://github.com/stephanlough) for [issue #165](https://github.com/bevry/docpad/issues/165)
        - Updated dependencies
    ```


1. Commit the changes with the commit title set to something like `v6.29.0. Bugfix. Improvement.` and commit description set to the changelog entry
1. Use `cake publish`, which will publish the module to npm, create a Git tag for it, push your master changes and new tags up to origin
    1. When prompted for your Git tag annotation (your text editor will open up automatically), enter the changelog entry, save the prompted file, and close the file
