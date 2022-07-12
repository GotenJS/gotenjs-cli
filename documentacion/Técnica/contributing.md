🌍 ∙ [English](contributing.md) ∙ [Español](contributing-es.md)

# Contributing Goten 

We encourage participation in Goten, and we would love for you to contribute to its growth. For this reason we ask you to read carefully how to do it:

1. [Raise an issue](#raiseIssue)
    - 1.1 [Report bug](#reportBug)
    - 1.2 [Request feature](#requestFeature)
2. [Solve an issue](#solveIssue)
3. [What to contribute](#toContribute)
4. [Environment for devs](#environmentDevs)

## Raise an issue<a name="raiseIssue"></a>

To raise an issue it is necessary to follow certain specifications according to whether it is a **bug** or if it is a **feature**.

### Report a bug<a name="reportBug"></a>

If you find a **bug** in Goten (any unexpected outcome of using the CLI or a project created by it), do not hesitate to report it. You can do so by raising an issue with the following specifications:

1. Create a new issue in the corresponding project repository.
2. Add the corresponding labels to this issue, so that we can more easily identify what is it about. You can see the labels [here](https://gitlab.cysonline.com.ar/goten/goten-cli/labels). For a **bug** we ask that the `bugs/fixes` label is added along any other that you consider necessary.
3. Describe the **bug**!

How should I describe the **bug**?

It is important that you give a good description when reporting the error you found. This is so that we can reproduce the **bug**, find it and fix it.
We ask that you at least take into account the following things to put in the description:

- **Environment**: specify the environment you were working on when you found the bug. You should specify your operating system, whether you were running with docker or not, what version of Goten were you using, and whatever else you think necessary.
- **Procedure**: What did you do to find the **bug**? A list of steps that can take us to the **bug**. For example, the commands and the sequence in which they were executed. If you can't reproduce the bug, try to be as clear and detailed as possible. 
- **Errors**: any output from the terminal is helpful. Screenshots or raw terminal output is appreciated.
- **Expected output**: the expected output is requested. This is to better understand what you were expecting, what you actually did and what the final outcome was.

### Request a feature<a name="requestFeature"></a>

If you are interested in a **feature** for Goten you can raise an issue to be reviewed. To do this we ask you to follow the specifications:

1. Create a new issue in the corresponding project repository.
2. Add the corresponding labels to this issue, so that you can more easily identify what it is about. You can see the labels [here](https://gitlab.cysonline.com.ar/goten/goten-cli/labels). For the **feature** we ask that the feature label is added along any other that you consider necessary.
3. Describe the **feature**! It is important that you describe as clearly as possible, so we can understand why is it important to have this **feature**, or why are you interested in it.

## Solve an issue <a name="solveIssue"> </a>

1. Create a branch with the name `<#issue>-<issue-name>` that comes out of master.
2. Add your solution to that branch (keep in mind that all our code follows a certain format).
3. Once you have the solution, and before you create a merge request, run the tests to verify that everything works as expected.
4. Now you can create the merge request. Make sure you are merging from your branch to master. It is not necessary that you assign someone to it, just wait for corrections in case it's needed.

## What should you contribute? <a name="toContribute"></a>

- Find a [reproducible bug](https://gitlab.cysonline.com.ar/goten/goten-cli/issues?scope=all&utf8=%E2%9C%93&state=opened&label_name[]=bugs%2Ffixes) in the issues or a [feature to be implemented](https://gitlab.cysonline.com.ar/goten/goten-cli/issues?scope=all&utf8=%E2%9C%93&state=opened&label_name[]=feature).

## Environment for devs <a name="environmentDevs"></a>
See [devs-readme](devs-readme.md)
