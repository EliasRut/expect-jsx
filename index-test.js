/* eslint-env mocha */
/* eslint react/prop-types:0 */

import React from 'react';
import expect from 'expect';
import expectJSX from './index';

expect.extend(expectJSX);

class TestComponent extends React.Component {
  render() {
    return <div><span>Hi! {this.props.name}</span></div>;
  }
}

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

    it('has toEqualShallowRendered', () => {
      expect(expect().toEqualShallowRendered).toBeA('function');
    });

    it('has toNotEqualShallowRendered', () => {
      expect(expect().toNotEqualShallowRendered).toBeA('function');
    });

    it('has toIncludeShallowRendered', () => {
      expect(expect().toIncludeShallowRendered).toBeA('function');
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
      try {
        expect(<TestComponent extra="neous" />).toEqualJSX(<TestComponent />);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message)
          .toEqual(`Expected '<TestComponent extra="neous"/>\\n' to equal '<TestComponent/>\\n'`);
      }
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
      try {
        expect(<div />).toNotEqualJSX(<div />);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Expected '<div/>\\n' to not equal '<div/>\\n'`);
      }
    });
  });

  context('toIncludeJSX', () => {
    it('works', () => {
      expect(<div><div><TestComponent Hello=", world!"/></div></div>)
        .toIncludeJSX(<div><TestComponent Hello=", world!"/></div>);
    });

    it('throws when element is not included', () => {
      try {
        expect(<div />).toIncludeJSX(<div Hello=", world!" />);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Expected '<div/> ' to include '<div Hello=", world!"/> '`);
      }
    });
  });

  context('toEqualShallowRendered', () => {
    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toEqualShallowRendered(<div><span>Hi! Mary</span></div>);
    });
    it('throws an exception on unequal', () => {
      try {
        expect(<TestComponent name="Mary" />)
          .toEqualShallowRendered(<div><span>Hi, Mary</span></div>);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Expected '<div><span>Hi! Mary</span></div>' to equal '<div><span>Hi, Mary</span></div>'`);
      }
    });
  });

  context('toNotEqualShallowRendered', () => {
    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toNotEqualShallowRendered(<div><span>Hi, Mary</span></div>);
    });

    it('throws an exception on equal', () => {
      try {
        expect(<TestComponent name="Mary" />)
          .toNotEqualShallowRendered(<div><span>Hi! Mary</span></div>);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Expected '<div><span>Hi! Mary</span></div>' to not equal '<div><span>Hi! Mary</span></div>'`);
      }
    });
  });

  context('toIncludeShallowRendered', () => {
    it('works', () => {
      expect(<TestComponent name="Mary" />)
        .toIncludeShallowRendered(<span>Hi! Mary</span>);
    });

    it('throws an exception if not included', () => {
      try {
        expect(<TestComponent name="Mary" />)
          .toIncludeShallowRendered(<span>Hi, Mary</span>);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Expected '<div><span>Hi! Mary</span></div>' to include '<span>Hi, Mary</span>'`);
      }
    });
  });
});
