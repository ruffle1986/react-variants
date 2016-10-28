import test from 'tape';
import dom from 'cheerio';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import VariantOption from './variants-option';

test('components - variant option', (assert) => {
  let $ = dom.load(render(<VariantOption id={ 1 } showRemove={ false } />));
  assert.equal(
    $('.variants-option-remove').length,
    0,
    'it should not render the remove button'
  );

  $ = dom.load(render(<VariantOption id={ 1 } showRemove={ true } />));
  assert.equal(
    $('.variants-option-remove').length,
    1,
    'it should render the remove button'
  );

  $ = dom.load(render(<VariantOption id={ 1 } />));
  assert.equal(
    $('.variants-option-remove').length,
    1,
    'it should render the remove button by default'
  );

  $ = dom.load(render(<VariantOption id={ 1 } />));
  assert.equal(
    $('.variants-option-remove').attr('title'),
    'Remove option',
    'it should set the proper tooltip label'
  );

  $ = dom.load(render(<VariantOption id={ 1 } name={ 'foo' } />));
  assert.equal(
    $('.variants-option-name input[type="text"]').val(),
    'foo',
    'it should set the name as default input value if it`s given'
  );

  $ = dom.load(render(<VariantOption id={ 1 } />));
  assert.notOk(
    $('.variants-option-name input[type="text"]').val(),
    'it should set nothing as default input value if nothing is given'
  );

  $ = dom.load(render(<VariantOption id={ 1 } values={ ['foo', 'bar'] } />));
  assert.equal(
    $('.variants-option-value').length,
    2,
    'it should render the given option values'
  );

  $ = dom.load(render(<VariantOption id={ 1 } />));
  assert.equal(
    $('.variants-option-values li:last-child input[type="text"]').length,
    1,
    'it should render an input box as the last element of the list'
  );

  $ = dom.load(render(<VariantOption id={ 1 } values={ ['foo', 'bar'] } />));
  assert.equal(
    $('.variants-option-values li:last-child input[type="text"]').length,
    1,
    `it should render an input box as the last element of the list
     even if it has option values`
  );

  assert.end();
});
