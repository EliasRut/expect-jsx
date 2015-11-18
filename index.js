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
  toRenderAsJSX(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    ).toEqual(
      collapse(reactToJsx(ReactElement)).replace(/[\n]/g, '')
    );
  },
  toRenderAs(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    const output = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    return expect(
      collapse(reactToJsx(output)).replace(/[\n]/g, '')
    ).toEqual(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    );
  },
  toNotRenderAsJSX(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    ).toNotEqual(
      collapse(reactToJsx(ReactElement)).replace(/[\n]/g, '')
    );
  },
  toNotRenderAs(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    const output = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    return expect(
      collapse(reactToJsx(output)).replace(/[\n]/g, '')
    ).toNotEqual(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    );
  },
  toIncludeJSXWhenRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    ).toInclude(
      collapse(reactToJsx(ReactElement)).replace(/[\n]/g, '')
    );
  },
  toIncludeHTMLWhenRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    return expect(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    ).toInclude(
      collapse(ReactElement).replace(/[\n]/g, '')
    );
  },
  toIncludeWhenRendered(ReactElement) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(this.actual);
    const output = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    return expect(
      collapse(reactToJsx(output)).replace(/[\n]/g, '')
    ).toInclude(
      collapse(reactToJsx(shallowRenderer.getRenderOutput())).replace(/[\n]/g, '')
    );
  }
};

export default api;
