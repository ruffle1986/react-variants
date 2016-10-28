import test from 'tape';
import dom from 'cheerio';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import VariantOptionValue from './variants-option-value';

test('components - variants option value', (assert) => {

  let $ = dom.load(
    render(<VariantOptionValue value={ 'foo' } color={ 'cyan' } />)
  );
  assert.equal(
    $('.variants-option-value').css('background-color'),
    'cyan',
    'it should set the given color as inline style'
  );

  $ = dom.load(render(<VariantOptionValue value={ 'foo bar' } />));
  assert.equal(
    $('.variants-option-value-label').text(),
    'foo bar',
    'it should render the given label'
  );

  $ = dom.load(render(<VariantOptionValue />));
  assert.equal(
    $('.variants-option-value-remove').length,
    1,
    'it should render a remove button'
  );

  $ = dom.load(render(<VariantOptionValue />));
  assert.equal(
    $('.variants-option-value-remove').attr('title'),
    'Remove value',
    'it should set the proper tooltip label'
  );

  assert.end();
});
