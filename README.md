# [Zen UI](https://github.com/ilyabogdanov/zen-ui/) &#x25B8; React implementation

This package contains UI components build with [React](https://facebook.github.io/react/).

Documentation
-------------

Basic information about components is in the package [zen-ui](https://github.com/ilyabogdanov/zen-ui/).


Running tests
-------------

To start unit tests, use:

    npm test

Setup
-------------

Firstly include core package:
```
require("zen-ui-core");
```
Then import components:
```
import { VerticalLayout, VerticalLayoutRow } from "zen-ui-react";
```
Then use components in you template:
```JSX
<VerticalLayout>
    <VerticalLayoutRow/>
    <VerticalLayoutRow height="100%"/>
</VerticalLayout>
```
Alternatively you can import only `Zen` which is a container
for all components.
```
import { Zen } from "zen-ui-react";
```
and use dot syntax:
```JSX
<Zen.VerticalLayout>
    <Zen.VerticalLayoutRow/>
    <Zen.VerticalLayoutRow height="100%"/>
</Zen.VerticalLayout>
```

Examples
--------

There are examples at [www.zen-ui.org](http://www.zen-ui.org)
with sources in the package
[zen-ui-react-examples](https://github.com/ilyabogdanov/zen-ui-react-examples/)