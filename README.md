# expect-jsx

Expect-jsx clone with additional functionality for comparing shallow-rendered results and the ability to check for equality in rendering, JSX and HTML.

Work in Progress

# Changelog

Switched back to 'react-element-to-jsx-string' from 'react-to-jsx' after recent bugfixes (react-element-to-jsx-string 2.1.3)
https://github.com/algolia/react-element-to-jsx-string/blob/master/CHANGELOG.md

Added toExclude functionality

# Functionality

This addition to expect allows for comparing Components JSX strings or their shallow rendered output against other JSX, shallow renderd output or HTML.

For all of these variants it includes tests for equality, unequality, inclusion and exclusion.

## Function List

### toEqualJSX
Compares two JSX strings directly (no rendering)
```javascript
    it('can diff React elements', () => {
      expect(
        <TestComponent />
      ).toEqualJSX(
        <TestComponent />
      );
    });

    it('throws when elements are different', () => {
      let err;
      try {
        expect(<TestComponent extra="neous" />).toEqualJSX(<TestComponent />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message)
        .toInclude(`to equal`);
    });

    it('does not care about function', () => {
      var fns = {
        one() {return 'one';},
        two() {return 'two';}
      };

      expect(
        <TestComponent fn={fns.one} />
      ).toEqualJSX(
        <TestComponent fn={fns.two} />
      );
    });

    it('handle render method with interpolation', () => {
      expect(
        <TestComponent name="Jon" />
      ).toNotEqual(
      <TestComponent name="Marry" />
      );
    });
```
### toNotEqualJSX
Compares two JSX strings directly (no rendering)
```javascript

    it('works', () => {
      expect(<div />).toNotEqualJSX(<div Hello=", world!" />);
    });

    it('throws when elements are the same', () => {
      let err;
      try {
        expect(<div />).toNotEqualJSX(<div />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude(`to not equal`);
    });
```
### toIncludeJSX
Compares two JSX strings directly (no rendering)
```javascript

    it('works', () => {
      expect(<div><div><TestComponent Hello=", world!"/></div></div>)
        .toIncludeJSX(<div><TestComponent Hello=", world!"/></div>);
    });

    it('throws when element is not included', () => {
      let err;
      try {
        expect(<div />).toIncludeJSX(<div Hello=", world!" />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude(`to include`);
    });
```
### toRenderAs
Compares the HTML output of two shallow-rendered components
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toRenderAs(<TestComponent2 name="Mary" />);
    });
    it('throws an exception on unequal', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toRenderAs(<TestComponent2 name="Hans" />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to equal');
    });
```
### toNotRenderAs
Compares the HTML output of two shallow-rendered components
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toNotRenderAs(<TestComponent2 name="Hans" />);
    });

    it('throws an exception on equal', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toNotRenderAs(<TestComponent2 name="Mary" />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to not equal');
    });
```
### toRenderAsJSX
Compares the HTML output of a shallow-rendered components with some JSX 
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toRenderAsJSX(<div className="test-class"><span>Hi! Mary</span></div>);
    });
    it('throws an exception on unequal', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toRenderAsJSX(<div className="test-class"><span>Hi, Mary</span></div>);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to equal');
    });
```
### toNotRenderAsJSX
Compares the HTML output of a shallow-rendered components with some JSX 
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toNotRenderAsJSX(<div className="test-class"><span>Hi, Mary</span></div>);
    });

    it('throws an exception on equal', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toNotRenderAsJSX(<div className="test-class"><span>Hi! Mary</span></div>);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to not equal');
    });
```
### toIncludeWhenRendered
Compares the HTML output of two shallow-rendered components
```javascript

    it('works', () => {
      expect(<CombinedTestComponent name="Mary" />)
        .toIncludeWhenRendered(<TestComponent name="Mary" />);
    });


    it('throws an exception if not included', () => {
      let err;
      try {
        expect(<CombinedTestComponent name="Mary" />)
          .toIncludeJSXWhenRendered(<TestComponent name="Hans" />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to include');
    });
```
### toExcludeWhenRendered
Compares the HTML output of a shallow-rendered components with some HTML 
```javascript

    it('works', () => {
      expect(<CombinedTestComponent name="Mary" />)
        .toExcludeWhenRendered(<TestComponent name="Hans" />);
    });


    it('throws an exception if not excluded', () => {
      let err;
      try {
        expect(<CombinedTestComponent name="Mary" />)
          .toExcludeJSXWhenRendered(<TestComponent name="Mary" />);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to exclude');
    });
```
### toIncludeJSXWhenRendered
Compares the HTML output of a shallow-rendered components with some JSX 
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toIncludeJSXWhenRendered(<span>Hi! Mary</span>);
    });

    it('throws an exception if not included', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toIncludeJSXWhenRendered(<span className="test-class">Hi, Mary</span>);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to include');
    });
```
### toExcludeJSXWhenRendered
Compares the HTML output of a shallow-rendered components with some JSX 
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toExcludeJSXWhenRendered(<span className="test-class">Hi, Mary</span>);
    });

    it('throws an exception if not excluded', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toExcludeJSXWhenRendered(<span>Hi! Mary</span>);
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to exclude');
    });
```
### toIncludeHTMLWhenRendered
Compares the HTML output of a shallow-rendered components with some HTML 
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toIncludeHTMLWhenRendered('<div className="test-class"> <span>');
    });

    it('throws an exception if not included', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toIncludeHTMLWhenRendered('<div className="special-test-class"> <span>');
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to include');
    });
```
### toExcludeHTMLWhenRendered
Compares the HTML output of two shallow-rendered components
```javascript

    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toExcludeHTMLWhenRendered('<div className="special-test-class"> <span>');
    });

    it('throws an exception if not excluded', () => {
      let err;
      try {
        expect(<TestComponent name="Mary" />)
          .toExcludeHTMLWhenRendered('<div className="test-class"> <span>');
      } catch (error) {
        err = error;
      }
      expect(err instanceof Error).toBe(true);
      expect(err.message).toInclude('to exclude');
    });
```
