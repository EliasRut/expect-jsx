/* eslint-env mocha */
/* eslint react/prop-types:0 */

import React from 'react';
import expect from 'expect';
import expectJSX from './index';
import TestComponent from './TestComponent';
import TestComponent2 from './TestComponent2';
import CombinedTestComponent from './CombinedTestComponent';

expect.extend(expectJSX);

describe('expect(ReactElement).toEqualJSX(ReactElement)', () => {
  context('api', () => {
    it('has toEqualJSX', () => {
      expect(expect().toEqualJSX).toBeA('function');
    });

    it('has toNotEqualJSX', () => {
      expect(expect().toNotEqualJSX).toBeA('function');
    });

    it('has toIncludeJSX', () => {
      expect(expect().toIncludeJSX).toBeA('function');
    });

    it('has toRenderAs', () => {
      expect(expect().toRenderAs).toBeA('function');
    });

    it('has toRenderAsJSX', () => {
      expect(expect().toRenderAsJSX).toBeA('function');
    });

    it('has toNotRenderAs', () => {
      expect(expect().toNotRenderAs).toBeA('function');
    });

    it('has toNotRenderAsJSX', () => {
      expect(expect().toNotRenderAsJSX).toBeA('function');
    });

    it('has toIncludeWhenRendered', () => {
      expect(expect().toIncludeWhenRendered).toBeA('function');
    });

    it('has toIncludeJSXWhenRendered', () => {
      expect(expect().toIncludeJSXWhenRendered).toBeA('function');
    });

    it('has toIncludeHTMLWhenRendered', () => {
      expect(expect().toIncludeHTMLWhenRendered).toBeA('function');
    });

    it('has toExcludeWhenRendered', () => {
      expect(expect().toExcludeWhenRendered).toBeA('function');
    });

    it('has toExcludeJSXWhenRendered', () => {
      expect(expect().toExcludeJSXWhenRendered).toBeA('function');
    });

    it('has toExcludeHTMLWhenRendered', () => {
      expect(expect().toExcludeHTMLWhenRendered).toBeA('function');
    });
  });

  context('toEqualJSX', () => {
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
  });

  context('toNotEqualJSX', () => {
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
  });

  context('toIncludeJSX', () => {
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
  });

  context('toRenderAs', () => {
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
  });

  context('toRenderAsJSX', () => {
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
  });

  context('toNotRenderAs', () => {
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
  });

  context('toNotRenderAsJSX', () => {
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
  });

  context('toIncludeJSXWhenRendered', () => {
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
  });

  context('toIncludeHTMLWhenRendered', () => {
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
  });

  context('toIncludeWhenRendered', () => {
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
  });

  context('toExcludeJSXWhenRendered', () => {
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
  });

  context('toExcludeHTMLWhenRendered', () => {
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
  });

  context('toExcludeWhenRendered', () => {
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
  });
});
