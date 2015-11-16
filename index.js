import React from 'react';
import expect from 'expect';
import collapse from 'collapse-white-space';
import TestUtils from 'react-addons-test-utils';

import reactToJsx from 'react-to-jsx';

let api = {
  toEqualJSX(ReactElement) {
    return expect(
      reactToJsx(this.actual)
    ).toEqual(
      reactToJsx(ReactElement)
    );
  },
  toNotEqualJSX(ReactElement) {
    return expect(
      reactToJsx(this.actual)
    ).toNotEqual(
      reactToJsx(ReactElement)
    );
  },
  toIncludeJSX(ReactElement) {
    return expect(
      collapse(reactToJsx(this.actual))
    ).toInclude(
      collapse(reactToJsx(ReactElement))
    );
  },
  toEqualShallowRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      reactToJsx(shallowRenderer.getRenderOutput()).replace(/[\t\n]/g, '')
    ).toEqual(
      reactToJsx(ReactElement).replace(/[\t\n]/g, '')
    );
  },
  toNotEqualShallowRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      reactToJsx(shallowRenderer.getRenderOutput()).replace(/[\t\n]/g, '')
    ).toNotEqual(
      reactToJsx(ReactElement).replace(/[\t\n]/g, '')
    );
  },
  toIncludeShallowRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\t\n]/g, '')
    ).toInclude(
      collapse(reactToJsx(ReactElement)).replace(/[\t\n]/g, '')
    );
  }
};

export default api;
